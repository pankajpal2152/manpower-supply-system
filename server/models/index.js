const { sequelize, connectDB } = require('../config/database');

const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Employee = require('./Employee'); 
const Document = require('./Document');
const Client = require('./Client'); // <-- NEW IMPORT

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permissionId' });

Employee.hasMany(Document, { foreignKey: 'employeeId', as: 'documents', onDelete: 'CASCADE' });
Document.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = {
  sequelize,
  connectDB,
  User,
  Role,
  Permission,
  Employee,
  Document,
  Client // <-- NEW EXPORT
};