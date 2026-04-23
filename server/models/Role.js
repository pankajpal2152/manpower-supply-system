const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // e.g., 'Superadmin', 'Employee'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt columns
});

module.exports = Role;