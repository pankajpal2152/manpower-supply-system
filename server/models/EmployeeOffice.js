const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmployeeOffice = sequelize.define('EmployeeOffice', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'employees', key: 'id' } },
  officeName: { type: DataTypes.STRING, allowNull: true },
  officeRegLocation: { type: DataTypes.STRING, allowNull: true },
  officeWorkingAddress: { type: DataTypes.STRING, allowNull: true },
  officeRegNo: { type: DataTypes.STRING, allowNull: true },
  officeRegYear: { type: DataTypes.STRING, allowNull: true },
  officeEmail: { type: DataTypes.STRING, allowNull: true },
  officePhoneNo: { type: DataTypes.STRING, allowNull: true },
  headOfficeId: { type: DataTypes.STRING, allowNull: true },
  organizationName: { type: DataTypes.STRING, allowNull: true },
  siteName: { type: DataTypes.STRING, allowNull: true },
  rank: { type: DataTypes.STRING, allowNull: true },
  doj: { type: DataTypes.STRING, allowNull: true },
  tktNo: { type: DataTypes.STRING, allowNull: true },
  officerName: { type: DataTypes.STRING, allowNull: true },
  officerNo: { type: DataTypes.STRING, allowNull: true },
  hasBranch: { type: DataTypes.BOOLEAN, defaultValue: false },
  branchName: { type: DataTypes.STRING, allowNull: true },
  branchWorkingAddress: { type: DataTypes.STRING, allowNull: true },
  branchRegNo: { type: DataTypes.STRING, allowNull: true },
  branchRegYear: { type: DataTypes.STRING, allowNull: true },
  branchEmail: { type: DataTypes.STRING, allowNull: true },
  branchPhoneNo: { type: DataTypes.STRING, allowNull: true },
  branchHeadOfficeId: { type: DataTypes.STRING, allowNull: true },
  branchId: { type: DataTypes.STRING, allowNull: true },
  forNaps: { type: DataTypes.STRING, allowNull: true },
  remarks: { type: DataTypes.TEXT, allowNull: true },
  uniformDetails: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'employee_offices',
  timestamps: true,
});

module.exports = EmployeeOffice;