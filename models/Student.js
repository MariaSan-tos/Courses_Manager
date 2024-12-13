module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
      courseId: DataTypes.INTEGER,
  }, {
    timestamps: true, 
  });
  Student.associate = function(models) {
    Student.belongsTo(models.Course, {foreignKey: 'courseId', as: 'course' })
  };
  return Student;
};
 
