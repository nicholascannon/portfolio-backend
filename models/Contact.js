/**
 * Defines the contact model
 */
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  email: mongoose.Schema.Types.String,
  name: mongoose.Schema.Types.String,
  message: mongoose.Schema.Types.String,
  date: mongoose.Schema.Types.Date,
  html: mongoose.Schema.Types.String
});

contactSchema.pre('save', function (next) {
  this.date = Date.now();
  next();
});

module.exports = mongoose.model('Contact', contactSchema);