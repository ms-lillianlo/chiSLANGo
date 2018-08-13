'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {
    is_answer_correct: DataTypes.BOOLEAN
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.User);
    Answer.belongsTo(models.Question);
  };
  return Answer;
};