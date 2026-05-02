const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // e.g., 'MANAGE_EMPLOYEES'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true // e.g., 'Allows creating, editing, and deleting employees'
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false // e.g., 'Employee Management' - Used for UI grouping
  }
}, {
  tableName: 'permissions',
  timestamps: false, // We usually don't need createdAt/updatedAt for static permissions
});

module.exports = Permission;