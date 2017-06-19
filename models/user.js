module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    title: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    inHouse: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    fileName: DataTypes.STRING,
    interviewDate: DataTypes.STRING,
    whereInterviewed: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        User.Skill = User.hasMany(models.Skill, {
          as: 'skills',
        });
        User.Work = User.hasMany(models.Work, {
          as: 'works',
        });
        User.Summary = User.hasMany(models.Summary, {
          as: 'summary',
        });
      },
    },
  });

  return User;
};
