// models/Employee.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Core ID for system relationships
  
  // 1. Personal Information
  AcctId: { type: DataTypes.STRING, allowNull: true },
  ProfilePicture: { type: DataTypes.STRING, allowNull: true },
  AcctName: { type: DataTypes.STRING, allowNull: false },
  FathersName: { type: DataTypes.STRING, allowNull: true },
  Gender: { type: DataTypes.STRING, allowNull: true },
  DOB: { type: DataTypes.STRING, allowNull: true },
  MaritalStatus: { type: DataTypes.STRING, defaultValue: 'Single' },

  // 2. Personal Address
  CityVillage: { type: DataTypes.STRING, allowNull: true },
  Landmark: { type: DataTypes.STRING, allowNull: true },
  State: { type: DataTypes.STRING, allowNull: true },
  District: { type: DataTypes.STRING, allowNull: true },
  PostOffice: { type: DataTypes.STRING, allowNull: true },
  PolicStation: { type: DataTypes.STRING, allowNull: true }, // Spelled exactly as requested
  PinCode: { type: DataTypes.STRING, allowNull: true },

  // 3. Identity
  PanNo: { type: DataTypes.STRING, allowNull: true },
  AadharNo: { type: DataTypes.STRING, allowNull: true },
  VoterNo: { type: DataTypes.STRING, allowNull: true },

  // 4. Bank Information
  BankName: { type: DataTypes.STRING, allowNull: true },
  BankAddress: { type: DataTypes.STRING, allowNull: true },
  IFSCode: { type: DataTypes.STRING, allowNull: true },
  AcctNo: { type: DataTypes.STRING, allowNull: true },

  // System Flags (Required for UI logic and deletion)
  status: { type: DataTypes.STRING, defaultValue: 'Available' },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
  tableName: 'employees',
  timestamps: true,
});

module.exports = Employee;