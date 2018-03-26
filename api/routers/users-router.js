const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const User = require('../models/User');
const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
  let user

  Promise.resolve()
    .then(() => {
      user = new User(req.body)

      return new Promise((res, rej) => {
        user.validate((err) => err ? rej(err) : res())
      })
    })
    .then(() => res.status(201).json(user))
    .catch((err) => {
      // Mongoose validation errors has this `errors` key, so this error is
      // related to a failured document validation.
      const statusCode = (err.errors)
        ? 422
        : 500

      res.status(statusCode).json({ error: true, reason: err })
    })
})

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => res.status(500).json({ error: true, reason: err }))
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user.apiRepr()))
    .catch(err => res.status(500).json({error: true, reason: JSON.stringify(err) }))
})

router.put('/:id', jsonParser, (req, res) => {
  // TODO: entirely replace document properties without throwing model validations
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(doc => res.json(doc.apiRepr()))
    .catch(err => res.status(500).json({error: true, reason: JSON.stringify(err) }))
})

router.delete('/:id', [
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let user

    Promise.resolve()
      .then(() => {
        if (req.user.id !== req.params.id) {
          throw new Error(`You can't delete an user account that's not yours`)
        }
      })
      .then(User.findByIdAndRemove(req.params.id))
      .then(() => res.status(204).end())
      .catch(err => res.status(500).json({ error: true, reason: err }))
  }
]);

module.exports = {usersRouter:router};
