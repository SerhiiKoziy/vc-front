'use strict';

module.exports = function (sequelize, DataTypes) {
  var Summary = sequelize.define('Summary', {
    managerName: DataTypes.STRING,
    cvSummary: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function (models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        Summary.belongsTo(models.Summary, {
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return Summary;
};
