"use strict";

module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define("Skill", {
    skill: DataTypes.STRING,
    experience: DataTypes.STRING,
    main: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        Skill.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Skill;
};
