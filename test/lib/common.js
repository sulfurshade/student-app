const faker = require('faker')
const mongoose = require('mongoose')
const util = require('util')

const { TEST_DATABASE_URL } = require('../../api/config')

const User = require('../../api/models/User')
const Student = require('../../api/models/Student')
const Log = require('../../api/models/Log')

function seedDatabase() {
  return Promise.resolve()
    .then(() => {
      const users = []

      for (let i = 0; i < 3; i++) users.push(createFakeUser())

      return User.insertMany(users)
    })
    .then(users => {
      const students = []

      users.forEach(user => {
        for (var i = 0; i < 3; i++) students.push(createFakeStudent(user._id))
      })

      return Student.insertMany(students)
    })
    .then(students => {
      const logs = []

      students.forEach(student => {
        for (var i = 0; i < 3; i++) logs.push(createFakeLog(student._id))
      })

      return Log.insertMany(logs)
    })
}

/**
 * Deletes the testing database if it exists
 */
function dropDatabase() {
  return mongoose.connection.dropDatabase()
}

function createFakeUser () {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }
}

function createFakeStudent (userId) {
  return {
    userId: userId,
    name: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    },
    image: '<image-url>',
    instrument: '<instrument>',
    level: 'Basic',
    username: faker.internet.userName(),
    bio: faker.lorem.sentence()
  }
}

function createFakeLog (studentId) {
  return {
    studentId: studentId,
    date: new Date(),
    dueDate: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)),
    goals: faker.lorem.sentence(),
    notes: faker.lorem.sentence()
  }
}

module.exports = {
  seedDatabase,
  dropDatabase,
  createFakeLog,
  createFakeUser,
  createFakeStudent
}
