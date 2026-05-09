// models/Attendance.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: 'employees', key: 'id' } 
  },
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false,
    defaultValue: DataTypes.NOW 
  },
  checkIn: { type: DataTypes.STRING, allowNull: true },
  checkOut: { type: DataTypes.STRING, allowNull: true },
  status: { 
    type: DataTypes.ENUM('Present', 'Absent', 'Late', 'On Leave'), 
    defaultValue: 'Present' 
  },
  overtimeHours: { 
    type: DataTypes.DECIMAL(10, 2), 
    defaultValue: 0.00 
  }
}, {
  tableName: 'attendance',
  timestamps: true,
  // Ensure an employee only has one record per date
  indexes: [{ unique: true, fields: ['employeeId', 'date'] }]
});

module.exports = Attendance;