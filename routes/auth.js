/**
 * Authentication Routes for /api/auth
 * 
 * Written by Nicholas Cannon
 */
const express = require('express');
const globals = require('../config/globals');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

/**
 * Login Route. 
 */
router.post('/login', (req, res, next) => {
  if (!req.body.password) {
    res.status(400);
    return next(new Error('Please supply a password'));
  }

  // Compare passwords
  bcrypt.compare(req.body.password, globals.admin.password, (err, valid) => {
    if (err) return next(new Error(err));
    
    if (valid) {
      // Password is correct
      const token = jwt.sign({ user: 'admin' }, globals.secret, { expiresIn: '7d' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ msg: 'Invalid password' });
    }
  });
});

module.exports = router;