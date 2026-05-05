// models/index.js
const { sequelize, connectDB } = require('../config/database');

// 1. Import all active models
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Employee = require('./Employee'); 
const Document = require('./Document');

// COMMENTED OUT UNUSED MODELS
// const EmployeeOffice = require('./EmployeeOffice'); 
// const EmployeeStatutory = require('./EmployeeStatutory'); 
// const EmployeeFamily = require('./EmployeeFamily'); 

// 2. Define User Roles Relationships
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permissionId' });

// 3. Define Document Relationships (For Profile Picture)
Employee.hasMany(Document, { foreignKey: 'employeeId', as: 'documents', onDelete: 'CASCADE' });
Document.belongsTo(Employee, { foreignKey: 'employeeId' });

// Export active models
module.exports = {
  sequelize,
  connectDB,
  User,
  Role,
  Permission,
  Employee,
  Document 
};