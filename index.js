/**
 * Portfolio-backend entry point.
 * Written by Nicholas Cannon
 */
const express = require('express');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Settings
app.set('port', 8000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middelware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Routes
app.use('/api', require('./routes/api/index'));
app.use('/', require('./routes/admin/index'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).render('404', { test: 'it works' });
});

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Running on port ${app.get('port')}`);
});