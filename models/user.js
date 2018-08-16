'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
<<<<<<< HEAD
    githubid: DataTypes.STRING,
=======
    facebookid: DataTypes.STRING,
>>>>>>> 942dd52032f3b775c9b6942227dda90b9f90c455
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Answer);
  };
  return User;
<<<<<<< HEAD
};
=======
};

>>>>>>> 942dd52032f3b775c9b6942227dda90b9f90c455
