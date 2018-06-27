const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const MongoClient = require('mongodb').MongoClient;

const hostname = '127.0.0.1';
const dbPort = 27017;
const dbName = 'crossfit';

const dbConfig = {
  url: `mongodb://${hostname}:${dbPort}/${dbName}`,
};

const port = 3000;

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
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
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

app.post('/results', function (req, res) {
  const record = req.body;

  db.collection('results').insert(record, (err, results) => {
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

app.get('/results', function (req, res) {
  db.collection('results').find({}).toArray(function(err, result) {

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
  db.collection('results').find({
    'cardNumber': req.params.cardNumber,
    'exerciseId': req.query && req.query.exerciseId,
  }).toArray(function(err, result) {

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