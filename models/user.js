'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,

    githubid: DataTypes.STRING,

    facebookid: DataTypes.STRING,

    githubid: DataTypes.STRING,

    githubid: DataTypes.STRING,

    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Answer);
  };
}
  return User;
