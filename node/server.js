const http = require('http');
const MongoClient = require('mongodb').MongoClient;

const hostname = '127.0.0.1';
const dbPort = 27017;
const dbName = 'crossfit';

const dbConfig = {
  url: `mongodb://${hostname}:${dbPort}/${dbName}`,
};


function setHeaders(res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}

function setOptionHeaders(res) {
  const headers = {};
  // IE8 does not allow domains to be specified, just the *
  // headers["Access-Control-Allow-Origin"] = req.headers.origin;
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
  headers["Access-Control-Allow-Credentials"] = false;
  headers["Access-Control-Max-Age"] = '86400'; // 24 hours
  headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
  headers['Content-Type'] = 'application/json';
  res.writeHead(200, headers);
}

const port = 3000;

let data = [];
var db;

MongoClient.connect(dbConfig.url, (err, database) => {
  if (err) return console.error(err);

  const myAwesomeDB = database.db(dbName);
  myAwesomeDB.collection('results');
  db = myAwesomeDB;
});

const server = http.createServer((req, res) => {
  let body = '';

  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    switch (req.method) {
      case 'OPTIONS':
        setOptionHeaders(res);
        res.end();
        break;
      case 'GET':
        switch (req.url) {
          case '/results':
            db.collection('results').find({}).toArray(function(err, result) {
              setHeaders(res);

              if (err) {
                res.statusCode = 404;
                res.end(JSON.stringify(err));
              }
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            });
            break;
          case '/exercises':
            db.collection('exercises').find({}).toArray(function(err, result) {
              setHeaders(res);

              if (err) {
                res.statusCode = 404;
                res.end(JSON.stringify(err));
              }
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            });
            break;
            break;
          default:
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello World\n');
            break;
        }
        break;
      case 'POST':
        const record = JSON.parse(body);
        switch (req.url) {
          case '/results':

            db.collection('results').insert(record, (err, results) => {
              if (err) {
                res.statusCode = 300;
                res.end('Can\'t save data to database');
                return;
              }

              data.push(record);
              res.statusCode = 200;

              setHeaders(res);
              res.end(body);
            });
            break;
          case '/exercises':

            db.collection('exercises').insert(record, (err, results) => {
              if (err) {
                res.statusCode = 300;
                res.end('Can\'t save data to database');
                return;
              }

              data.push(record);
              res.statusCode = 200;

              setHeaders(res);
              res.end(body);
            });
            break;
          default:
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello World\n');
            break;
        }
        break;
      default:
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
        break;
    }
  });
});




server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});