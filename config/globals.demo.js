/**
 * Defines global variables for project
 */
const bcrypt = require('bcryptjs');

module.exports = {
  admin: {
    password: bcrypt.hashSync('', 10) // Store hashed admin passwword here
  },
  db: {
    URL: ''
  }
}