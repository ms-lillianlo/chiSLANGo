'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var dotenv    = require('dotenv');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

require('dotenv').config();

if (process.env.DB_HOST) {
  var sequelize = new Sequelize('postgres://hmnkedwbonngcv:659c311e16d62673193fc81c722d8ee05b75dec14558451591d9962a4e5d641b@ec2-23-23-226-190.compute-1.amazonaws.com:5432/deifsfdnk4q9p5');
} else if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
