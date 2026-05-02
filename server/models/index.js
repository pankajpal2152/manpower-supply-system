const { sequelize, connectDB } = require('../config/database');

// 1. Import all models
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Employee = require('./Employee'); 
const EmployeeOffice = require('./EmployeeOffice'); 
const EmployeeStatutory = require('./EmployeeStatutory'); 
const EmployeeFamily = require('./EmployeeFamily'); 

// 2. Define User Roles Relationships
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permissionId' });

// 3. Define Employee Sub-Table Relationships (One-to-One)
Employee.hasOne(EmployeeOffice, { foreignKey: 'employeeId', as: 'officeInfo', onDelete: 'CASCADE' });
EmployeeOffice.belongsTo(Employee, { foreignKey: 'employeeId' });

Employee.hasOne(EmployeeStatutory, { foreignKey: 'employeeId', as: 'statutoryInfo', onDelete: 'CASCADE' });
EmployeeStatutory.belongsTo(Employee, { foreignKey: 'employeeId' });

Employee.hasOne(EmployeeFamily, { foreignKey: 'employeeId', as: 'familyInfo', onDelete: 'CASCADE' });
EmployeeFamily.belongsTo(Employee, { foreignKey: 'employeeId' });

// Export everything
module.exports = {
  sequelize,
  connectDB,
  User,
  Role,
  Permission,
  Employee,
  EmployeeOffice,
  EmployeeStatutory,
  EmployeeFamily
};