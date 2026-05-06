const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Job = sequelize.define('Job', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
  
  // 1. Branch Office / Basic Info
  AcctId: { type: DataTypes.STRING, allowNull: true },
  ProfilePicture: { type: DataTypes.STRING, allowNull: true }, // Stores Document Name
  AccountName: { type: DataTypes.STRING, allowNull: false },

  // 2. Address
  CityVillage: { type: DataTypes.STRING, allowNull: true },
  Landmark: { type: DataTypes.STRING, allowNull: true },
  State: { type: DataTypes.STRING, allowNull: true },
  District: { type: DataTypes.STRING, allowNull: true },
  PostOffice: { type: DataTypes.STRING, allowNull: true },
  PolicStation: { type: DataTypes.STRING, allowNull: true }, // Spelled exactly as requested
  PinCode: { type: DataTypes.STRING, allowNull: true },

  // 3. Bank Information
  BankName: { type: DataTypes.STRING, allowNull: true },
  BankAddress: { type: DataTypes.STRING, allowNull: true },
  IFSCode: { type: DataTypes.STRING, allowNull: true },
  AcctNo: { type: DataTypes.STRING, allowNull: true },

  // System Flags
  status: { type: DataTypes.STRING, defaultValue: 'Available' },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
  tableName: 'jobs',
  timestamps: true,
});

module.exports = Job;