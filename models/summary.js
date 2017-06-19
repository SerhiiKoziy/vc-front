module.exports = function (sequelize, DataTypes) {
  const Summary = sequelize.define('Summary', {
    managerName: DataTypes.STRING,
    cvSummary: DataTypes.STRING,
    imageManager: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
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
