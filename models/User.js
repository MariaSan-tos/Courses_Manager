'use strict';

const User = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    tableName: 'User',
    timestamps: true,
  });

  return model;
};

module.exports = User;
