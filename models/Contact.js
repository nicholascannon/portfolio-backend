/**
 * Defines the contact model
 */
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  email: mongoose.Schema.Types.String,
  name: mongoose.Schema.Types.String,
  message: mongoose.Schema.Types.String,
});

module.exports = mongoose.model('Contact', contactSchema);