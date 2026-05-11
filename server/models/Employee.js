const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  
  // 1. Personal Information
  AcctId: { type: DataTypes.STRING, allowNull: true },
  ProfilePicture: { type: DataTypes.STRING, allowNull: true },
  AcctName: { type: DataTypes.STRING, allowNull: false },
  FathersName: { type: DataTypes.STRING, allowNull: true },
  Gender: { type: DataTypes.STRING, allowNull: true },
  DOB: { type: DataTypes.STRING, allowNull: true },
  MaritalStatus: { type: DataTypes.STRING, defaultValue: 'Single' },
  BloodGroup: { type: DataTypes.STRING, allowNull: true }, // NEW

  // 2. Personal Address
  CityVillage: { type: DataTypes.STRING, allowNull: true },
  Landmark: { type: DataTypes.STRING, allowNull: true },
  State: { type: DataTypes.STRING, allowNull: true },
  District: { type: DataTypes.STRING, allowNull: true },
  PostOffice: { type: DataTypes.STRING, allowNull: true },
  PolicStation: { type: DataTypes.STRING, allowNull: true },
  PinCode: { type: DataTypes.STRING, allowNull: true },

  // 3. Identity & Licenses
  PanNo: { type: DataTypes.STRING, allowNull: true },
  AadharNo: { type: DataTypes.STRING, allowNull: true },
  VoterNo: { type: DataTypes.STRING, allowNull: true },
  DrivingLicense: { type: DataTypes.STRING, allowNull: true }, // NEW
  DrivingLicenseExpiry: { type: DataTypes.STRING, allowNull: true }, // NEW
  GunLicense: { type: DataTypes.STRING, allowNull: true }, // NEW
  GunLicenseExpiry: { type: DataTypes.STRING, allowNull: true }, // NEW
  IdentificationMark: { type: DataTypes.STRING, allowNull: true }, // NEW

  // 4. Academic Information (NEW SECTION)
  HighestQualification: { type: DataTypes.STRING, allowNull: true },
  InstitutionName: { type: DataTypes.STRING, allowNull: true },
  PassingYear: { type: DataTypes.STRING, allowNull: true },

  // 5. Employment & Statutory (NEW SECTION)
  DateOfJoining: { type: DataTypes.STRING, allowNull: true },
  Designation: { type: DataTypes.STRING, allowNull: true },
  DeploymentLocation: { type: DataTypes.STRING, allowNull: true },
  PFNumber: { type: DataTypes.STRING, allowNull: true }, // PF
  ESINumber: { type: DataTypes.STRING, allowNull: true }, // ESI

  // 6. Bank Information
  BankName: { type: DataTypes.STRING, allowNull: true },
  BankAddress: { type: DataTypes.STRING, allowNull: true },
  IFSCode: { type: DataTypes.STRING, allowNull: true },
  AcctNo: { type: DataTypes.STRING, allowNull: true },

  status: { type: DataTypes.STRING, defaultValue: 'Available' },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
  tableName: 'employees',
  timestamps: true,
});

module.exports = Employee;