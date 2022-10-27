module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define("Unit", {
    name: DataTypes.STRING,
  });

  Unit.associate = (models) => {
    Unit.hasMany(models.ExaminationValue);
  };
  return Unit;
};
