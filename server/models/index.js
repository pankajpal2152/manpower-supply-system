const { sequelize, connectDB } = require('../config/database');
const Leave = require('./Leave');
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Employee = require('./Employee'); 
const Document = require('./Document');
const Client = require('./Client'); 
const Job = require('./Job');
const EmpCode = require('./EmpCode');
const Attendance = require('./Attendance');
const SalaryStructure = require('./SalaryStructure');
const Payroll = require('./Payroll');

// --- Authentication & RBAC ---
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'roleId', timestamps: false });
Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permissionId', timestamps: false });

// --- Document Logic ---
Employee.hasMany(Document, { foreignKey: { name: 'employeeId', allowNull: true }, as: 'documents', onDelete: 'CASCADE' });
Document.belongsTo(Employee, { foreignKey: { name: 'employeeId', allowNull: true } });

Client.hasMany(Document, { foreignKey: { name: 'clientId', allowNull: true }, as: 'documents', onDelete: 'CASCADE' });
Document.belongsTo(Client, { foreignKey: { name: 'clientId', allowNull: true } });

Job.hasMany(Document, { foreignKey: { name: 'jobId', allowNull: true }, as: 'documents', onDelete: 'CASCADE' });
Document.belongsTo(Job, { foreignKey: { name: 'jobId', allowNull: true } });

// --- NEW: Payroll & Attendance Logic ---
// An employee can have many attendance records (one for each day)
Employee.hasMany(Attendance, { foreignKey: 'employeeId', as: 'attendanceRecords' });
Attendance.belongsTo(Employee, { foreignKey: 'employeeId' });

// An employee has one active salary structure
Employee.hasOne(SalaryStructure, { foreignKey: 'employeeId', as: 'salaryStructure' });
SalaryStructure.belongsTo(Employee, { foreignKey: 'employeeId' });

// An employee can have many leave requests
Employee.hasMany(Leave, { foreignKey: 'employeeId', as: 'leaves' });
Leave.belongsTo(Employee, { foreignKey: 'employeeId' });

// An employee has many payroll records (one per month)
Employee.hasMany(Payroll, { foreignKey: 'employeeId', as: 'payrolls' });
Payroll.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = {
  sequelize,
  connectDB,
  User,
  Role,
  Permission,
  Employee,
  Document,
  Client,
  Job,
  EmpCode,
  Attendance,
  SalaryStructure ,
  Payroll
};