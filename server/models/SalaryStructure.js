// models/SalaryStructure.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SalaryStructure = sequelize.define('SalaryStructure', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { 
    type: DataTypes.INTEGER, 
    unique: true, 
    references: { model: 'employees', key: 'id' } 
  },
  
  // --- EARNINGS (From your uploaded image) ---
  basicPay: { type: DataTypes.DECIMAL(15, 2), allowNull: false, defaultValue: 0.00 },
  dearnessAllowance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  houseRentAllowance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  incentives: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  attendanceBonus: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  cityCompensatoryAllowance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  mealAllowance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  uniformAllowance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },
  specialAllowance: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },

  // --- AUTOMATIC CALCULATION FIELDS ---
  grossSalary: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },

  // --- DEDUCTIONS ---
  pfContribution: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 }, // Usually 12% of Basic + DA
  esiContribution: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 }, // Usually 0.75% of Gross
  tdsDeduction: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 }, // Income Tax
  otherDeductions: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 },

  // --- FINAL PAY ---
  netSalary: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0.00 }
}, {
  tableName: 'salary_structures',
  timestamps: true,
});

module.exports = SalaryStructure;