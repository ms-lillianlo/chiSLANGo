const dotenv = require("dotenv");
dotenv.load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var pg = require('pg');
pg.defaults.ssl = true;
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://hmnkedwbonngcv:659c311e16d62673193fc81c722d8ee05b75dec14558451591d9962a4e5d641b@ec2-23-23-226-190.compute-1.amazonaws.com:5432/deifsfdnk4q9p5');

var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');
const setupAuth = require('./auth');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

setupAuth(app);

app.use('/', apiRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

/* app.get('/', function (req, res) {
  res.redirect('/about')
}) */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var GitHub = require('github-api');

var gh = new GitHub();

// check our rate-limit status
// since we're unauthenticated the limit is 60 requests per hour
gh.getRateLimit().getRateLimit()
  .then(function(resp) {
      console.log('Limit remaining: ' + resp.data.rate.remaining);
      // date constructor takes epoch milliseconds and we get epoch seconds
      console.log('Reset date: ' + new Date(resp.data.rate.reset * 1000));
  }).catch(function(error) {
      console.log('Error fetching rate limit', error.message);
  });

module.exports = app;
