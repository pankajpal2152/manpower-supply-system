// 1. Import the database connection and the sequelize instance
const { sequelize, connectDB } = require('../config/database');

// 2. Import all your models
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const Employee = require('./Employee'); 

// ==========================================
// DEFINE RELATIONSHIPS (ASSOCIATIONS)
// ==========================================

// One-to-Many: A Role has many Users
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// Many-to-Many: Roles and Permissions
Role.belongsToMany(Permission, { 
  through: 'RolePermissions', 
  foreignKey: 'roleId' 
});
Permission.belongsToMany(Role, { 
  through: 'RolePermissions', 
  foreignKey: 'permissionId' 
});

// ==========================================
// EXPORT EVERYTHING
// ==========================================
module.exports = {
  sequelize,
  connectDB, // Now this is defined because we imported it at the top!
  User,
  Role,
  Permission,
  Employee 
};