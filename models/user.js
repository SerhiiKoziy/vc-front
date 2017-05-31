"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    title: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    inHouse: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        User.Skill = User.hasMany(models.Skill, {
          as: 'skills',
        })
      }
    }
  });

  return User;
};
