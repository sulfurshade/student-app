const page = require('page')
const api = require('./api')

page('/', () => {
  console.log("route '/'")
})
page('/dashboard', () => {
  console.log("route '/dashboard'")

  api.User.all()
  .then(res => {
    const users = JSON.parse(res.responseData)
    console.log(users)
  })
  .catch(err => {
    console.error('Something went wrong:', err)
  })
})
page('/students', () => {
  console.log("route '/students'")
})
page('/students/:id', () => {
  console.log("route '/students/:id'")
})
page('/students/new', () => {
  console.log("route '/students/new'")
})
page('/sign-in', () => {
  console.log("route 'sign-in'")
})
page('/sign-out', () => {
  console.log("route 'sign-out'")
})

page({ hashbang: true })
