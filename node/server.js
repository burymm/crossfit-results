const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
const dbSingleton = require('./mongo');
const config = require('./config');

// routing callbacks
const exersices = require('./callbacks/exercises');
const results = require('./callbacks/results');

const oauth2Client = new google.auth.OAuth2(
  '40421314935-dv7j9srrkesqgmmv2rtilimocklfe7e6.apps.googleusercontent.com',
  'NVCsNakLbS0p62WgDI9eLOWa',
  'localhost:4200/user'
);

const scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];

const dbInstance = new dbSingleton();

app.use(function(req, res, next) {
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

app.get('/exercises', exersices.get);
app.post('/exercises', exersices.post);

app.post('/googleAuth', function (req, res) {
  const token = req.body.token;
  const db = dbInstance.getDd();
  
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
        res.statusCode = error.code;
        res.end(JSON.stringify({
          text: error.message,
        }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(response.data));
      }
    });
});

app.post('/results', results.post);
app.get('/results', results.get);
app.get('/results/:cardNumber', results.getByCardNumber);

app.listen(config.app.port, function() {
  console.log(`Server running at ${config.app.port} port`);
});