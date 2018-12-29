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
const PORT = 8000;

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
 * Mount API routes
 */
app.use('/api', require('./routes/contact'));

/**
 * 404 Handler
 */
app.use('*', (req, res) => {
  res.status(404).render('404', { test: 'it works' });
});

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ msg: err.message });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));