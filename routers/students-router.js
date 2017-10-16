const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {Student} = require('../models/students');

const router = express.Router();

const jsonParser = bodyParser.json();



router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  Student
    .find()
    .then(students => {
      res.json(students.map(student => student.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

router.get('/:username', (req, res) => {
  Student
    .findOne({username: req.params.username})
    .then(student => res.json(student.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});

router.post('/', (req, res) => {
  const requiredFields = ['name', 'bio', 'image', 'instrument', 'level', 'username'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Student
    .create({
      name: req.body.name,
      image: req.body.image,
      instrument: req.body.instrument,
      level: req.body.level,
      bio: req.body.bio,
      username: req.body.username
    })
    .then(student => res.status(201).json(student.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});


router.delete('/:id', (req, res) => {
  Student
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['title', 'content', 'author'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Student
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});


module.exports = {studentsRouter:router};
