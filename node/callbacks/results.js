const dbSingleton = require('./../mongo');
const dbInstance = new dbSingleton();
const moment = require('moment');
const consts = require('./../consts');
const utils = require('./../utils');
const authUtils = require('./../utils/auth.utils');


const AGGREGATE_PARAMS = [
  {
    "$project": {
      "exerciseId": {
        $toObjectId: "$exerciseId"
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
      foreignField: '_id',
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
];

function updateExerciseAverageValue(res, record) {
  const trainingDate = moment(record.trainingDate).format('YYYY-MM-DD');
  const db = dbInstance.getDd();
  
  db.collection('results').find({
    trainingDate,
    exerciseId: record.exerciseId,
  }).toArray(function(err, result) {
    if (result) {
      let average = result.filter((item) => item.cardNumber === consts.AVERAGE_CARD_NUMBER)[0];
      if (!average) {
        average = {
          trainingDate,
          exerciseId: record.exerciseId,
          workoutType: record.workoutType,
          cardNumber: consts.AVERAGE_CARD_NUMBER,
          workoutResult: utils.getAverage(result),
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
        average.workoutResult = utils.getAverage(result);
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

function post(req, res) {
  authUtils.checkBearer(req, res);
  
  const record = req.body;
  const trainingDate = moment(record.trainingDate).format('YYYY-MM-DD');
  const db = dbInstance.getDd();
  
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
}

function get(req, res) {
  authUtils.checkBearer(req, res);
  
  const db = dbInstance.getDd();
  
  db.collection('results').aggregate(AGGREGATE_PARAMS)
    .toArray((err, result) => {
    if (err) {
      res.statusCode = 404;
      res.end(JSON.stringify(err));
      return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });
}

function getByCardNumber(req, res) {
  authUtils.checkBearer(req, res);
  
  const params = {};
  const db = dbInstance.getDd();
  
  if (req.params && req.params.cardNumber) {
    params["$or"] = [{'cardNumber': req.params.cardNumber}, {cardNumber: 'average'}];
  }
  
  if (req.query && req.query.exerciseId) {
    params.exerciseId = req.query.exerciseId;
  }
  
  db.collection('results').aggregate([{$match: params}, ...AGGREGATE_PARAMS])
    .toArray(function(err, result) {
    if (err) {
      res.statusCode = 404;
      res.end(JSON.stringify(err));
      return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });
}

module.exports = {
  post,
  get,
  getByCardNumber,
};
