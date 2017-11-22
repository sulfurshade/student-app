const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {Log} = require('../models/logs');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  Log
    .find()
    .then(logs => {
      res.json(logs.map(log => log.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});