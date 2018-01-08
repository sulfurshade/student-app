const passport = require('passport');
const Log = require('../models/Log');

const router = require('express').Router();

// router.use(passport.authenticate('jwt', { session: false }))

router.get('/', (req, res) => {
  Log.find()
    .then(logs => {
      res.json(logs.map(log => log.apiRepr()))
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

router.post('/', (req, res) => {
  ;['studentId', 'date', 'dueDate', 'goals', 'notes'].forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  })

  Log.create({
    studentId: req.body.studentId,
    date: req.body.date,
    dueDate: req.body.dueDate,
    goals: req.body.goals,
    notes: req.body.notes,
  })
    .then(log => res.status(201).json(log.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

router.get('/:id', (req, res) => {
  Log
    .findOne({id: req.params.id})
    .then(log => res.json(log.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['goals', 'notes', 'dueDate'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
})

router.delete('/:id', (req, res) => {
  Log
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});
