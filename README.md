# Student Tracker

[![Build Status](https://travis-ci.org/sulfurshade/student-app.svg?branch=master)](https://travis-ci.org/sulfurshade/student-app)

## Architecture

**API**

```
- /users
  GET: lists/finds users
  POST: creates a new user

- /users/:id
  GET: shows a single user
  PUT: updates a new user
  DELETE: delete an user

- /students
  GET: lists/finds users
  POST: creates a new user

- /students/:id
  GET: shows a single user
  PUT: updates a new user
  DELETE: delete an user

- /logs
  GET: lists/finds logs
  POST: creates a new user

- /logs/:id
  GET: shows a single user
  PUT: updates a new user
  DELETE: delete an user

- /login
  POST: new token

- /refresh
  POST: token refresh
```

**SPA**

```
- / (home page; sign in/sign up)
- /dashboard (teachers' dashboard)
- /students (students listing page)
- /students/:uuid (student page)
- /students/new (new student page)
```
