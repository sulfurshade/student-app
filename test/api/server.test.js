require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })

const chai = require('chai')
const mongoose = require('mongoose')

const { seedDatabase, dropDatabase } = require('../lib/common')
const { TEST_DATABASE_URL } = require('../../api/config')

const { app, runServer, closeServer } = require('../../api/server')

const expect = chai.expect

mongoose.set('useMongoClient', true)
mongoose.Promise = Promise

describe('Student Tracker', () => {
  before(function () {
    this.timeout(5000)

    return new Promise((res, rej) => {
      mongoose.connect(TEST_DATABASE_URL, err => {
        if (err) return rej(err)

        res()
      })
    })
      .then(console.log.bind(console, 'connected!'))
      .then(dropDatabase)
  })
  beforeEach(seedDatabase)
  afterEach(dropDatabase)

  describe('/users endpoint', () => {
    it('lists all students', () => {
      expect(true).to.not.be(false)
    })
    it('creates a new student')
  })

  describe('/users/:id', () => {
    it('shows a user')
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
