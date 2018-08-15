/* var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://hmnkedwbonngcv:659c311e16d62673193fc81c722d8ee05b75dec14558451591d9962a4e5d641b@ec2-23-23-226-190.compute-1.amazonaws.com:5432/deifsfdnk4q9p5');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

module.exports = app; */

//CODE BELOW HERE IS NEW AND WILL BE COMMITTED AT A LATER DATE. THIS IS COMMENTED OUT BECAUSE IT WAS BREAKING THE BACKEND

var createError = require('http-errors');
var express = require('express');
let handlebars = require('handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
var Sequelize = require('sequelize');
var pg = require('pg');
pg.defaults.ssl = true;
var sequelize = new Sequelize('postgres://hmnkedwbonngcv:659c311e16d62673193fc81c722d8ee05b75dec14558451591d9962a4e5d641b@ec2-23-23-226-190.compute-1.amazonaws.com:5432/deifsfdnk4q9p5');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
const setupAuth = require('./auth');

dotenv.load();

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

setupAuth(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app; 

