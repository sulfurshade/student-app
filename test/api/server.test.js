require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })

const chai = require('chai')
const mongoose = require('mongoose')

const { seedDatabase, dropDatabase } = require('../lib/common')
const { app, runServer, closeServer } = require('../../api/server')
const { TEST_DATABASE_URL } = require('../../api/config')

const User = require('../../api/models/User')

chai.use(require('chai-http'))
chai.use(require('chai-as-promised'))
const expect = chai.expect

mongoose.Promise = Promise

describe('Student Tracker', () => {
  before(function () {
    this.timeout(5000)

    return new Promise((res, rej) => {
      mongoose.connect(TEST_DATABASE_URL, err => err ? rej(err) : res())
    })
    .then(() => console.log('MongoDB connected'))
    .then(dropDatabase)
  })
  beforeEach(seedDatabase)
  afterEach(dropDatabase)

  describe('/users endpoint', () => {
    it('lists all users', () => {
      return chai.request(app)
      .get('/api/users')
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.be.an('object')
      })
    })

    it('creates a new user', () => {
      const user = {
        username: 'john-doe',
        password: 'lololol',
        firstName: 'John',
        lastName: 'Doe'
      }

      return chai.request(app)
      .post('/api/users')
      .send(user)
      .then((res) => {
        expect(res).to.have.status(201)
        expect(res).to.be.json
        expect(res.body).to.be.an('object')

        Object.keys(user).forEach((key) => {
          if (['_id', 'password'].includes(key)) return

          expect(res.body[key]).to.be.ok
          expect(res.body[key]).to.equal(user[key])
        })
      })
    })
  })

  describe('/users/:id', () => {
    it('shows a user', () => {
      let user

      return User.findOne()
      .then((doc) => (user = doc.toObject()))
      .then(() => chai.request(app).get(`/api/users/${user._id}`))
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('object')
        expect(res.body.id).to.equal(user._id.toString())

        Object.keys(user).forEach((key) => {
          if (['_id', 'password', '__v'].includes(key)) return

          expect(res.body[key]).to.not.be.undefined
          expect(user[key]).to.equal(res.body[key])
        })
      })
    })

    xit('updates a user', () => {
      let user, newUser = {}

      return User.findOne()
      .then((doc) => {
        user = doc
        const userObj = doc.toObject()

        Object.keys(userObj).forEach(key => {
          newUser[key] = userObj[key]
        })

        newUser.firstName = 'Paul John'
        newUser.lastName = 'Doe'
      })
      .then(() => {
        // TODO: it needs to have the PUT /api/users/:id handler already implemented
        return chai.request(app)
          .put(`/api/users/${user._id}`)
          .send(newUser)
      })
      .then((res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.an('object')

        ;['firstName', 'lastName'].forEach(key => expect(res.body[key]).to.equal(newUser[key]))
      })
    })

    xit('deletes a user', () => {
      // TODO: mock the passport JWT strategy to allow DELETE /api/users/:id
      let user

      return User.findOne()
      .then((doc) => (user = doc.toObject()))
      .then(() => chai.request(app).delete(`/api/users/${user._id}`))
      .then((res) => {
        expect(res).to.have.status(204)
      })
      .then(() => {
        expect(User.findById(user._id)).to.be.rejected
      })
    })
  })

  // all `/auth`, `/students` and `/logs` endpoints uses Passport-based
  // authentication middlewares, and in order to test it, mocking becomes
  // necessary. Since it's not covered by the Node.js curric we'll going to skip
  // their implementations.

  describe('/auth endpoint', () => {
    xit('signs in a user')

    xit('signs out a user')
  })

  // TODO: passport mocking
  describe('/students endpoint', () => {
    xit('lists all students')

    xit('creates a new student')
  })

  describe('/students/:id', () => {
    xit('shows a student entry')

    xit('updates a student entry')

    xit('deletes a student entry')
  })

  describe('/logs endpoint', () => {
    xit('lists all log entries')

    xit('creates a new log entry')
  })

  describe('/logs/:id', () => {
    xit('shows a log entry')

    xit('updates a log entry')

    xit('deletes a log entry')
  })
})
