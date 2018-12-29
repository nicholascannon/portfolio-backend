/**
 * Authentication middleware file
 */
const jwt = require('jsonwebtoken');
const secret = require('../config/globals').secret;

/**
 * Validates JWT attached to the Authorization header of a request.
 */
function loggedIn (req, res, next) {
  try {
    let decoded = jwt.verify(req.get('Authorization'), secret, { maxAge: '7d' });
    if (decoded) next();
  } catch(err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
}

module.exports.loggedIn = loggedIn;