const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.parseToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(422).json('Unauthorized user');

  jwt.verify(token.split(' ')[1], keys.SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json('Unauthorized user');
      //add token to req.user
      req.user = decoded
    next()
  })
}

// Create JWT token w/ payload
exports.newToken = (res, payload) => {
  jwt.sign(payload, keys.SECRET, {
      expiresIn: 3600 * 1000 //3hrs
    }, (err, token) => res.json({ token: 'Bearer ' + token }));
}