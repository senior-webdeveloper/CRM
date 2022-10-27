module.exports = (sequelize, DataTypes) => {
  const ExaminationGroup = sequelize.define("ExaminationGroup", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    countEV: DataTypes.INTEGER,
    status: {
      defaultValue: "A",
      type: DataTypes.STRING(1),
    },
  });

  ExaminationGroup.associate = (models) => {
    ExaminationGroup.Examination = ExaminationGroup.belongsTo(
      models.Examination
    );
    ExaminationGroup.ExaminationValues = ExaminationGroup.hasMany(
      models.ExaminationValue,
      { as: "examinationValues", onDelete: "CASCADE" }
    );
  };

  ExaminationGroup.addScope(
    "defaultScope",
    {
      where: { status: "A" },
    },
    { override: true }
  );
  return ExaminationGroup;
};
