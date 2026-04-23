const { sequelize } = require('../config/database');
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Employee = require('./Employee'); // <-- 1. Import the new model

// 1. One-to-Many: A Role has many Users
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// 2. Many-to-Many: Roles and Permissions
Role.belongsToMany(Permission, { 
  through: 'RolePermissions', // Sequelize creates this table for us automatically
  foreignKey: 'roleId' 
});
Permission.belongsToMany(Role, { 
  through: 'RolePermissions', 
  foreignKey: 'permissionId' 
});

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
  Employee // <-- 2. Export it
};