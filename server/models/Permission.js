const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // e.g., 'CREATE_EMPLOYEE', 'VIEW_INVOICE'
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false, // e.g., 'Employee Management', 'Invoice System'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: false, // We don't really need createdAt/updatedAt for static permissions
});

module.exports = Permission;