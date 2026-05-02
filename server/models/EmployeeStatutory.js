const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmployeeStatutory = sequelize.define('EmployeeStatutory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'employees', key: 'id' } },
  panNo: { type: DataTypes.STRING, allowNull: true },
  aadharNo: { type: DataTypes.STRING, allowNull: true },
  voterId: { type: DataTypes.STRING, allowNull: true },
  bankName: { type: DataTypes.STRING, allowNull: true },
  bankBranchName: { type: DataTypes.STRING, allowNull: true },
  ifscCode: { type: DataTypes.STRING, allowNull: true },
  accountNo: { type: DataTypes.STRING, allowNull: true },
  bankAddress: { type: DataTypes.STRING, allowNull: true },
  hasStatutoryInfo: { type: DataTypes.BOOLEAN, defaultValue: false },
  pfNo: { type: DataTypes.STRING, allowNull: true },
  noPf: { type: DataTypes.BOOLEAN, defaultValue: false },
  esicNo: { type: DataTypes.STRING, allowNull: true },
  notEligibleEsic: { type: DataTypes.BOOLEAN, defaultValue: false },
  deductionDetails: { type: DataTypes.TEXT, allowNull: true },
  hasLicenses: { type: DataTypes.BOOLEAN, defaultValue: false },
  policeVerification: { type: DataTypes.STRING, allowNull: true },
  gunFitnessCertificate: { type: DataTypes.STRING, allowNull: true },
  drivingLicense: { type: DataTypes.STRING, allowNull: true },
  dlValidUpto: { type: DataTypes.STRING, allowNull: true },
  gunLicense: { type: DataTypes.STRING, allowNull: true },
  gunValidUpto: { type: DataTypes.STRING, allowNull: true },
  qualification: { type: DataTypes.STRING, allowNull: true },
  educationalCertificate: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'employee_statutory',
  timestamps: true,
});

module.exports = EmployeeStatutory;