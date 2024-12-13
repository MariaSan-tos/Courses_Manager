module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });
    //TODO: se der erro, retire ISSO
  Course.associate = (models) => {
    Course.hasMany(models.Student, { foreignKey: 'courseId', as: 'students' });
  };
  return Course;
};
