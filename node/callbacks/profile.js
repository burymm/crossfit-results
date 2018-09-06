const dbSingleton = require('./../mongo');
const authUtils = require('./../utils/auth.utils');
const ObjectId = require('mongodb').ObjectID;
const dbInstance = new dbSingleton();

function post(req, res) {
  const profile = req.body;
  const db = dbInstance.getDd();
  
  db.collection('profiles').find({
    id: profile.id,
  }).toArray(function(err, result) {
    if (err) {
      res.statusCode = 300;
      res.end('Error with saving profile in db');
      return;
    }
    
    if (result.length > 0) {
      const profile = result[0];
      
      res.statusCode = 200;
      res.end(JSON.stringify({
        ...profile,
        token: authUtils.getToken(profile),
      }));
      return;
    }
  
    db.collection('profiles').insert(profile, (err, results) => {
      if (err) {
        res.statusCode = 300;
        res.end('Can\'t save data to database');
        return;
      }
      
      res.statusCode = 200;
      
    
      res.end(JSON.stringify({
        ...results,
        token: authUtils.getToken(results),
      }));
    });
  });
}

function loginViaToken(req, res) {
  const loginData = req.body;
  const db = dbInstance.getDd();
  
  authUtils.verify(loginData.token, function (err, decoded) {
    if (err)  {
      return res.status(401).send({ auth: false, message: `Failed to authenticate token: ${err.message}` });
    }
  
    db.collection('profiles').findOne({_id: ObjectId(decoded.id) }).then((profile) => {
      
      res.statusCode = 200;
      res.end(JSON.stringify(profile));
    });
  });
}

function get(req, res) {
  const profile = req.body;
  const db = dbInstance.getDd();
  
  db.collection('profiles').find({
    email: profile.id,
  })
}

module.exports = {
  post,
  get,
  loginViaToken,
};
