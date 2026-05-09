// models/EmpCode.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmpCode = sequelize.define('EmpCode', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  prefix: { type: DataTypes.STRING, allowNull: false, defaultValue: 'BB' },
  separator: { type: DataTypes.STRING, allowNull: false, defaultValue: '-' },
  lastNumber: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1026 } // Set this to 1 less than your desired start
}, {
  tableName: 'emp_codes',
  timestamps: true,
});

module.exports = EmpCode;