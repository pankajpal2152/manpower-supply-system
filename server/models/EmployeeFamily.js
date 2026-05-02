const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmployeeFamily = sequelize.define('EmployeeFamily', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'employees', key: 'id' } },
  hasNominee: { type: DataTypes.BOOLEAN, defaultValue: false },
  nomineeRelation: { type: DataTypes.STRING, allowNull: true },
  nomineeDob: { type: DataTypes.STRING, allowNull: true },
  familyDetails: { type: DataTypes.TEXT, allowNull: true },
  familyRelation: { type: DataTypes.STRING, allowNull: true },
  familyMemberDob: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'employee_families',
  timestamps: true,
});

module.exports = EmployeeFamily;