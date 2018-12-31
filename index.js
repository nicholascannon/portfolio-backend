/**
 * Portfolio-backend entry point.
 * 
 * Written by Nicholas Cannon
 */
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = 8080;

/**
 * Database setup
 */
require('./config/db').connect();

/**
 * Middleware
 */
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Enable CORS for all resources on the server
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Mount API routes
 */
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));

/**
 * 404 Handler
 */
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Page not found' });
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ msg: err.message });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));