const dbSingleton = require('./../mongo');
const dbInstance = new dbSingleton();
const authUtils = require('./../utils/auth.utils');

function post(req, res) {
  authUtils.checkBearer(req, res);
  
  const record = req.body;
  const db = dbInstance.getDd();
  
  db.collection('exercises').insert(record, (err, results) => {
    if (err) {
      res.statusCode = 300;
      res.end('Can\'t save data to database');
      return;
    }
    res.statusCode = 200;
    
    res.end(JSON.stringify(record));
  });
}

function get(req, res) {
  authUtils.checkBearer(req, res);
  
  const db = dbInstance.getDd();
  
  db.collection('exercises').find({}).toArray(function(err, result) {
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
};
