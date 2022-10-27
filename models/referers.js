module.exports = (sequelize, DataTypes) => {
  const Referer = sequelize.define('Referers', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    refererName: {
      type: DataTypes.STRING,
    }
  });
  
  Referer.associate = (models) => {
  
    Referer.hasMany(models.Appointment);

  };
  return Referer;
};
