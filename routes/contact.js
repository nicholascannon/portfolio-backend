/**
 * Contact object routes. /api/contact
 * Written by Nicholas Cannon
 */
const express = require('express');
const Contact = require('../models/Contact');
const isValid = require('mongoose').Types.ObjectId.isValid;
const loggedIn = require('../middleware/auth').loggedIn;

const router = express.Router();
const contactsPerPage = 5;

/**
 * Contact object pagination route. This route is private.
 * METHOD: GET
 */
router.get('/page/:page', loggedIn, (req, res, next) => {
  let page = req.params.page;

  if (page < 1) {
    res.status(400);
    return next(new Error('Invalid page number'));
  }

  Contact
    .find()
    .skip((contactsPerPage*page)-contactsPerPage)
    .limit(contactsPerPage)
    .exec((err, contacts) => {
      if (err) return next(new Error(err));
      res.status(200).json({ contacts });
    });
});

/**
 * Creates a new contact object and stores it in the database.
 * This route is public.
 * METHOD: POST
 */
router.post('/', (req, res, next) => {
  // Check if request is valid
  if (!req.body.email || !req.body.name || !req.body.message) {
    res.status(400);
    return next(new Error('Please supply a name, email and message'));
  }

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
 * Deletes a Contact object by id. This route is private
 * METHOD: DELETE
 */
router.delete('/:id', loggedIn, (req, res, next) => {
  // Check if id is a valid mongo ObjectId
  if (isValid(req.params.id)) {
    Contact.findByIdAndDelete(req.params.id, (err, contact) => {
      if (err) return next(new Error(err));
      res.status(200).json({ msg: 'Successfully deleted', id: contact._id });
    });
  } else {
    return next(new Error('Invalid Contact ID'));
  }
});

module.exports = router;