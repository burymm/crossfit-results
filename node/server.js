const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const { google } = require('googleapis');

const app = express();
const MongoClient = require('mongodb').MongoClient;

const hostname = '127.0.0.1';
const dbPort = 27017;
const dbName = 'crossfit';

const dbConfig = {
  url: `mongodb://${hostname}:${dbPort}/${dbName}`,
};

const port = 3000;


const AVERAGE_CARD_NUMBER = 'average';

const oauth2Client = new google.auth.OAuth2(
  '40421314935-dv7j9srrkesqgmmv2rtilimocklfe7e6.apps.googleusercontent.com',
  'NVCsNakLbS0p62WgDI9eLOWa',
  'localhost:4200/user'
);

const scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];


let data = [];
let db;

MongoClient.connect(dbConfig.url, (err, database) => {
  if (err) return console.error(err);

  const myAwesomeDB = database.db(dbName);
  myAwesomeDB.collection('results');
  db = myAwesomeDB;
});

app.use(function(req, res, next) {
  const headers = {};
  // IE8 does not allow domains to be specified, just the *
  // headers["Access-Control-Allow-Origin"] = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", false);
  res.setHeader("Access-Control-Max-Age", '86400'); // 24 hours
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', function (req, res) {
  res.end('works');
});

app.get('/exercises', function (req, res) {
  db.collection('exercises').find({}).toArray(function(err, result) {
    if (err) {
      res.statusCode = 404;
      res.end(JSON.stringify(err));
      return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });
});

app.post('/exercises', function (req, res) {
  const record = req.body;

  db.collection('exercises').insert(record, (err, results) => {
    if (err) {
      res.statusCode = 300;
      res.end('Can\'t save data to database');
      return;
    }

    data.push(record);
    res.statusCode = 200;

    res.end(JSON.stringify(record));
  });
});

app.post('/googleAuth', function (req, res) {
  const token = req.body.token;
  
  if (!token) {
    res.statusCode = 400;
    res.end('token is unavailable');
    return;
  }
  
  oauth2Client.setCredentials({access_token: token});
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2'
  });
  oauth2.userinfo.get(
    function(error, response) {
      if (error) {
        res.statusCode = 400;
        res.end('Token error', error);
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(response.data));
      }
    });
});

function getAverage(array) {
  let sum = 0;
  let count = 0;
  
  array.forEach((item) => {
    if (item.cardNumber !== AVERAGE_CARD_NUMBER) {
      sum += parseInt(item.workoutResult);
      count += 1;
    }
  });
  
  return Math.round(sum / count * 10) / 10;
}

function updateExerciseAverageValue(res, record) {
  const trainingDate = moment(record.trainingDate).format('YYYY-MM-DD');
  
  db.collection('results').find({
    trainingDate,
    exerciseId: record.exerciseId,
  }).toArray(function(err, result) {
    if (result) {
      let average = result.filter((item) => item.cardNumber === AVERAGE_CARD_NUMBER)[0];
      if (!average) {
        average = {
          trainingDate,
          exerciseId: record.exerciseId,
          workoutType: record.workoutType,
          cardNumber: AVERAGE_CARD_NUMBER,
          workoutResult: getAverage(result),
        };
        db.collection('results').insert(average, (err, results) => {
          if (err) {
            res.statusCode = 300;
            res.end('Can\'t save data to database');
            return;
          }
          
          record.average = average;
          res.statusCode = 200;
          res.end(JSON.stringify(record));
        });
      } else {
        average.workoutResult = getAverage(result);
        db.collection('results').update({ _id: average._id },
          average,
          (err) => {
            if (err) {
              res.statusCode = 300;
              res.end('Can\'t save data to database');
              return;
            }
            
            record.average = average;
            res.statusCode = 200;
            res.end(JSON.stringify(record));
          });
      }
    }
  });
}

app.post('/results', function (req, res) {
  const record = req.body;
  const trainingDate = moment(record.trainingDate).format('YYYY-MM-DD');
  
  db.collection('results').insert({
    ...record,
    trainingDate,
  },
  (err, results) => {
    if (err) {
      res.statusCode = 300;
      res.end('Can\'t save data to database');
      return;
    }
    updateExerciseAverageValue(res, record);
  });
});

app.get('/results', function (req, res) {
  db.collection('results').aggregate([
  {
    "$project": {
      "_id": {
        $toString: "$_id"
      },
      trainingDate: true,
      cardNumber: true,
      workoutResult: true,
      exercise: true
    },
  }, {
    $lookup: {
      from: 'exercises',
      localField: 'exerciseId',
      foreignField: 'exerciseId'.valueOf(),
      as: 'exercise',
    }
  }, {
    $project: {
      trainingDate: true,
      cardNumber: true,
      workoutResult: true,
      exercise: { $arrayElemAt: [ "$exercise", 0 ] },
    }
  }, {
    $project: {
      trainingDate: true,
      cardNumber: true,
      workoutResult: true,
      exerciseName: "$exercise.name",
    }
  }
]).toArray((err, result) => {
    if (err) {
      res.statusCode = 404;
      res.end(JSON.stringify(err));
      return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });
});

app.get('/results/:cardNumber', function (req, res) {
  const params = {};
  
  if (req.params && req.params.cardNumber) {
    params.cardNumber = req.params.cardNumber;
  }
  
  if (req.query && req.query.exerciseId) {
    params.exerciseId = req.query.exerciseId;
  }
  
  db.collection('results').find(params).toArray(function(err, result) {
    if (err) {
      res.statusCode = 404;
      res.end(JSON.stringify(err));
      return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });
});

app.listen(port, function() {
  console.log(`Server running at ${port} port`);
});