// models/Payroll.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Payroll = sequelize.define('Payroll', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: 'employees', key: 'id' } 
  },
  month: { type: DataTypes.INTEGER, allowNull: false }, // e.g., 5 for May
  year: { type: DataTypes.INTEGER, allowNull: false },  // e.g., 2026
  
  // --- Attendance Snapshot ---
  totalDays: { type: DataTypes.INTEGER, allowNull: false },
  payableDays: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  
  // --- Earnings Snapshot (Pro-Rata / Actual Earned) ---
  earnedBasic: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  earnedAllowances: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 }, // Combined DA, HRA, etc.
  grossEarned: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  
  // --- Deductions Snapshot ---
  pfDeduction: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  esiDeduction: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  tdsDeduction: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  otherDeductions: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  
  // --- Final Payout ---
  netPayable: { type: DataTypes.DECIMAL(15, 2), allowNull: false, defaultValue: 0.00 },
  
  status: { 
    type: DataTypes.ENUM('Draft', 'Approved', 'Paid'), 
    defaultValue: 'Draft' 
  }
}, {
  tableName: 'payrolls',
  timestamps: true,
  // Prevent generating multiple payrolls for the same employee in the same month
  indexes: [{ unique: true, fields: ['employeeId', 'month', 'year'] }] 
});

module.exports = Payroll;