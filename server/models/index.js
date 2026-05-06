const { sequelize, connectDB } = require('../config/database');

const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Employee = require('./Employee'); 
const Document = require('./Document');
const Client = require('./Client'); 
const Job = require('./Job'); // <-- NEW IMPORT

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permissionId' });

// Employee Documents
Employee.hasMany(Document, { foreignKey: { name: 'employeeId', allowNull: true }, as: 'documents', onDelete: 'CASCADE' });
Document.belongsTo(Employee, { foreignKey: { name: 'employeeId', allowNull: true } });

// Client Documents
Client.hasMany(Document, { foreignKey: { name: 'clientId', allowNull: true }, as: 'documents', onDelete: 'CASCADE' });
Document.belongsTo(Client, { foreignKey: { name: 'clientId', allowNull: true } });

// Job / Branch Documents (NEW)
Job.hasMany(Document, { foreignKey: { name: 'jobId', allowNull: true }, as: 'documents', onDelete: 'CASCADE' });
Document.belongsTo(Job, { foreignKey: { name: 'jobId', allowNull: true } });

module.exports = {
  sequelize,
  connectDB,
  User,
  Role,
  Permission,
  Employee,
  Document,
  Client,
  Job // <-- NEW EXPORT
};