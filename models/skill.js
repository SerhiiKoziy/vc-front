module.exports = function (sequelize, DataTypes) {
  const Skill = sequelize.define('Skill', {
    skill: DataTypes.STRING,
    experience: DataTypes.STRING,
    main: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate(models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        Skill.belongsTo(models.User, {
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return Skill;
};
