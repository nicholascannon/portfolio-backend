/**
 * Database config file
 */
const mongoose = require('mongoose');
const URL = require('./globals').db.URL;

/**
 * Connects to Database
 */
module.exports.connect = function() {
  mongoose.connect(URL, { useNewUrlParser: true });
  mongoose.connection.on('open', () => console.log('Connected to DB'));
};