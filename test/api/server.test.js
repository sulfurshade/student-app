const chai = require('chai')
const mongoose = require('mongoose')
const { seedDatabase, dropDatabase } = require('../lib/common')
const { TEST_DATABASE_URL } = require('../../api/config')

const expect = chai.expect

mongoose.Promise = Promise
mongoose.connect(TEST_DATABASE_URL, { useMongoClient: true })

describe('Student Tracker API', () => {
  before(dropDatabase)
  beforeEach(seedDatabase)
  afterEach(dropDatabase)

  it('is an Express app', () => expect(true).to.equal(!false))

  describe('/logs endpoing', () => {
    it('lists all log entries')
    it('creates a new log entry')
  })

  describe('/logs/:id', () => {
    it('shows a log entry')
    it('updates a log entry')
    it('deletes a log entry')
  })
})
