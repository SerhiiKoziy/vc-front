'use strict';

module.exports = function (sequelize, DataTypes) {
  var Work = sequelize.define('Work', {
    work: DataTypes.STRING,
    workDescription: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function (models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        Work.belongsTo(models.User, {
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return Work;
};
