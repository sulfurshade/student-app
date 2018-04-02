const forge = require('mappersmith').default

const api = forge({
  host: '/api',
  resources: {
    User: {
      all: { path: '/users' },
      create: { method: 'post', path: '/users' },
      load: { path: '/users/{id}' },
      update: { method: 'put', path: '/users/{id}' },
      delete: { method: 'delete', path: '/users/{id}' }
    },
    Student: {
      all: { path: '/students' },
      create: { method: 'post', path: '/students' },
      load: { path: '/students/{id}' },
      update: { method: 'put', path: '/students/{id}' },
      delete: { method: 'delete', path: '/students/{id}' }
    },
    Log: {
      all: { path: '/logs' },
      create: { method: 'post', path: '/logs' },
      load: { path: '/logs/{id}' },
      update: { method: 'put', path: '/logs/{id}' },
      delete: { method: 'delete', path: '/logs/{id}' }
    }
  }
})

module.exports = api
