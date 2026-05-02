const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  middleName: { type: DataTypes.STRING, allowNull: true },
  lastName: { type: DataTypes.STRING, allowNull: false },
  fathersName: { type: DataTypes.STRING, allowNull: true },
  mothersName: { type: DataTypes.STRING, allowNull: true },
  relation: { type: DataTypes.STRING, allowNull: true }, 
  dob: { type: DataTypes.STRING, allowNull: true },
  sex: { type: DataTypes.STRING, allowNull: true },
  spouseName: { type: DataTypes.STRING, allowNull: true },
  maritalStatus: { type: DataTypes.STRING, defaultValue: 'Single' },
  city: { type: DataTypes.STRING, allowNull: true },
  state: { type: DataTypes.STRING, allowNull: true },
  district: { type: DataTypes.STRING, allowNull: true },
  pinCode: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phoneNo: { type: DataTypes.STRING, allowNull: true },
  localAddress: { type: DataTypes.TEXT, allowNull: true },
  permanentAddress: { type: DataTypes.TEXT, allowNull: true },
  department: { type: DataTypes.STRING, defaultValue: 'General' },
  position: { type: DataTypes.STRING, defaultValue: 'Staff' },
  status: { type: DataTypes.STRING, defaultValue: 'Available' },
  baseSalary: { type: DataTypes.FLOAT, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
  tableName: 'employees',
  timestamps: true,
});

module.exports = Employee;