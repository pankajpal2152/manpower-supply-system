const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  middleName: { type: DataTypes.STRING, allowNull: true },
  lastName: { type: DataTypes.STRING, allowNull: false },
  fathersName: { type: DataTypes.STRING, allowNull: true },
  mothersName: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phoneNo: { type: DataTypes.STRING, allowNull: true },
  
  // Address Fields
  city: { type: DataTypes.STRING, allowNull: true },
  state: { type: DataTypes.STRING, allowNull: true },
  district: { type: DataTypes.STRING, allowNull: true },
  pinCode: { type: DataTypes.STRING, allowNull: true },
  
  // Identification
  panNo: { type: DataTypes.STRING, allowNull: true },
  aadharNo: { type: DataTypes.STRING, allowNull: true },
  maritalStatus: { type: DataTypes.STRING, defaultValue: 'Single' },
  
  // Bank Details
  bankName: { type: DataTypes.STRING, allowNull: true },
  ifscCode: { type: DataTypes.STRING, allowNull: true },
  accountNo: { type: DataTypes.STRING, allowNull: true },
  bankAddress: { type: DataTypes.STRING, allowNull: true },

  // System Fields (Keeping these from earlier so the table doesn't break)
  department: { type: DataTypes.STRING, defaultValue: 'Unassigned' },
  position: { type: DataTypes.STRING, defaultValue: 'Employee' },
  status: { type: DataTypes.ENUM('Available', 'Assigned', 'On Leave', 'Terminated'), defaultValue: 'Available' },
  baseSalary: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 }
}, {
  timestamps: true,
});

module.exports = Employee;