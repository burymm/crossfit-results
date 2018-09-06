const jwt = require('jsonwebtoken');
const config = require('./../config');

function getToken(profile) {
  const token = jwt.sign( {
    id: profile._id
  }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
  
  return token;
}

function verify(token, callback) {
  jwt.verify(token, config.jwt.secret, callback);
}

function checkBearer(req, res) {
  let bearer;
  let token;
  
  try {
    bearer = req.headers['authorization'];
    token = bearer.split('Bearer ').pop();
  } catch (e) {
    return res.status(401).send({ auth: false, message: `Failed to authenticate token` });
  }
  
  verify(token, function (error, decoded) {
    if (error) {
      return res.status(401).send({ auth: false, message: `Failed to authenticate token: ${error.message}` });
    }
  });
}

module.exports = {
  getToken,
  verify,
  checkBearer,
};
