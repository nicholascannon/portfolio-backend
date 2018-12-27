/**
 * Admin Routes
 */
const express = require('express');
const loggedIn = require('../../middleware/auth').loggedIn;
const Contact = require('../../models/Contact');

const router = express.Router();

/**
 * Admin home
 */
router.get('/', loggedIn, (req, res) => {
  res.render('index');
});

/**
 * Settings route
 */
router.get('/settings', loggedIn, (req, res) => {
  res.render('settigns');
});

// TODO: finish route
router.post('/settings', loggedIn, (req, res) => {
  res.redirect('/');
});

/**
 * Login route
 */
router.get('/login', (req, res) => {
  res.render('login');
});

// TODO: complete login route
router.post('/login', (req, res) => {
  res.redirect('/');
});

// Logout Route
// TODO: Complete logout route
router.get('/logout', (req, res) => {
  res.redirect('/login', { msg: 'Successfully logged out' });
});

module.exports = router;