'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
    githubid: DataTypes.STRING,
=======
    facebookid: DataTypes.STRING,
>>>>>>> 942dd52032f3b775c9b6942227dda90b9f90c455
=======
    githubid: DataTypes.STRING,
>>>>>>> Stashed changes
=======
    githubid: DataTypes.STRING,
>>>>>>> Stashed changes
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Answer);
  };
  return User;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
};
=======
};

>>>>>>> 942dd52032f3b775c9b6942227dda90b9f90c455
=======
};
>>>>>>> Stashed changes
=======
};
>>>>>>> Stashed changes
