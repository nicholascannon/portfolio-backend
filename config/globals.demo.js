/**
 * Defines global variables for project
 */
const bcrypt = require('bcryptjs');

module.exports = {
  admin: {
    password: bcrypt.hashSync('', 10) // Store hashed admin password here
  },
  db: {
    URL: ''
  }
}