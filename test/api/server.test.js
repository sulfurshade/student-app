require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })

const chai = require('chai')
const mongoose = require('mongoose')

const { seedDatabase, dropDatabase } = require('../lib/common')
const { app, runServer, closeServer } = require('../../api/server')
const { TEST_DATABASE_URL } = require('../../api/config')

const User = require('../../api/models/User')

chai.use(require('chai-http'))
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

      User.findOne()
        .then((doc) => (user = doc.toObject()))
        .then(() => chai.request(app).get(`api/users/${user._id}`))
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.equal(user._id)

          Object.keys(user).forEach((key) => {
            if (['_id', 'password'].includes(key)) return

            expect(res.body).to.have.key(key)
            expect(res.body[key]).to.equal(user[key])
          })
        })
    })
    it('updates a user')
    it('deletes a user')
  })

  describe('/auth endpoint', () => {
    it('signs in a user')
    it('signs out a user')
  })

  describe('/students endpoint', () => {
    it('lists all students')
    it('creates a new student')
  })

  describe('/students/:id', () => {
    it('shows a student entry')
    it('updates a student entry')
    it('deletes a student entry')
  })

  describe('/logs endpoint', () => {
    it('lists all log entries')
    it('creates a new log entry')
  })

  describe('/logs/:id', () => {
    it('shows a log entry')
    it('updates a log entry')
    it('deletes a log entry')
  })
})
