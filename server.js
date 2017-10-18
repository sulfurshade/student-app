require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');


const {usersRouter} = require('./routers/users-router'); // REGISTER USER
const {studentsRouter} = require('./routers/students-router');
const {authRouter} = require('./routers/auth-router'); // Login + refresh
const {localStrategy, jwtStrategy} = require('./auth/strategies');


mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const app = express();

app.use(express.static('public'));
app.use(morgan('common')); // Logging

// create application/json parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// CORS
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//     if (req.method === 'OPTIONS') {
//         return res.send(204);
//     }
//     next();
// });

app.use(passport.initialize());
passport.use('local', localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/students/', studentsRouter);

// A protected endpoint which needs a valid JWT to access it
app.get('/a-protected-route', passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.json({ data: 'this is protected'});
});
//
app.get('/some-route', (req, res) => {
  return res.json({ data: 'hello'});
});

app.use('*', (req, res) => {
    return res.status(404).json({message: 'Not Found'});
});

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            server = app
                .listen(PORT, () => {
                    console.log(`Your app is listening on port ${PORT}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
