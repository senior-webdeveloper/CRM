module.exports = (sequelize, DataTypes) => {
  const ExaminationReferenceValue = sequelize.define(
    "ExaminationReferenceValue",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    }
  );

  ExaminationReferenceValue.associate = (models) => {
    ExaminationReferenceValue.ExaminationValue = ExaminationReferenceValue.belongsTo(
      models.ExaminationValue
    );
    ExaminationReferenceValue.belongsTo(models.Examination);
  };

  return ExaminationReferenceValue;
};
