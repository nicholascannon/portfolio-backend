/**
 * API for dealing with contact objects.
 * Written by Nicholas Cannon
 */
const express = require('express');
const Contact = require('../models/Contact');
const isValid = require('mongoose').Types.ObjectId.isValid;

const router = express.Router();

/**
 * Creates a new contact object and stores it in the database
 */
router.post('/contact', (req, res, next) => {
  Contact.create({
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  }, (err, contact) => {
    if (err) return next(new Error(err));
    return res.status(200).json({ msg: 'Successfully sent' });
  });
});

/**
 * Contact object delete endpoint. ID must be supplied to delete
 */
router.delete('/delete', (req, res, next) => {
  if (isValid(req.body.id)) {
    Contact.findByIdAndDelete(req.body.id, (err, contact) => {
      if (err) return next(new Error(err));
      res.status(200).json({ msg: 'Successfully deleted', id: contact._id });
    });
  } else {
    return next(new Error('Invalid Contact ID'));
  }
});

module.exports = router;