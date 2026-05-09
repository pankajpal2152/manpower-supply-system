// models/Leave.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Leave = sequelize.define('Leave', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  employeeId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: 'employees', key: 'id' } 
  },
  leaveType: { 
    type: DataTypes.ENUM('Sick Leave', 'Casual Leave', 'Earned Leave'), 
    allowNull: false 
  },
  startDate: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  endDate: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  reason: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), 
    defaultValue: 'Pending' 
  }
}, {
  tableName: 'leaves',
  timestamps: true,
});

module.exports = Leave;