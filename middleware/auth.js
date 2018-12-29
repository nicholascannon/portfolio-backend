/**
 * Authentication middleware file
 */
const jwt = require('jsonwebtoken');
const secret = require('../config/globals').secret;

/**
 * Checks if the attached jwt is valid
 */
function loggedIn (req, res, next) {
  if (jwt.verify(req.get('authentication'), secret)) {
    next();
  } else {
    res.status(403);
    next(new Error('Invalid token supplied. Please login'));
  }
}

module.exports.loggedIn = loggedIn;