"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    title: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    inHouse: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    fileName: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Skill)
      }
    }
  });

  return User;
};
