module.exports = (sequelize, DataTypes) => {
  const ExaminationValue = sequelize.define("ExaminationValue", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    countVR: DataTypes.INTEGER,
    status: {
      defaultValue: "A",
      type: DataTypes.STRING(1),
    },
  });

  ExaminationValue.associate = (models) => {
    ExaminationValue.ExaminationGroup = ExaminationValue.belongsTo(
      models.ExaminationGroup
    );
    ExaminationValue.belongsTo(models.Method);
    ExaminationValue.belongsTo(models.Unit);
    ExaminationValue.ExaminationReferenceValues = ExaminationValue.hasMany(
      models.ExaminationReferenceValue,
      {
        as: "examinationReferenceValues",
        onDelete: "CASCADE",
      }
    );
  // ExaminationValue.hasOne(models.ExaminationDetail)
  ExaminationValue.belongsToMany(models.AppointmentDetail, {
    through: "ExaminationDetail",
  });

  };

  ExaminationValue.addScope(
    "defaultScope",
    {
      where: { status: "A" },
    },
    { override: true }
  );
  return ExaminationValue;
};
