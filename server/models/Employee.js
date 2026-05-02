const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  firstName: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: { notEmpty: true } // Ensures the string isn't just empty spaces
  },
  middleName: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  lastName: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: { notEmpty: true }
  },
  fathersName: { type: DataTypes.STRING, allowNull: true },
  mothersName: { type: DataTypes.STRING, allowNull: true },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true,
    validate: { 
      isEmail: true // Built-in Sequelize validation for standard email formats
    } 
  },
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

  // System Fields
  department: { type: DataTypes.STRING, defaultValue: 'Unassigned' },
  position: { type: DataTypes.STRING, defaultValue: 'Employee' },
  status: { 
    type: DataTypes.ENUM('Available', 'Assigned', 'On Leave', 'Terminated'), 
    defaultValue: 'Available' 
  },
  baseSalary: { 
    type: DataTypes.DECIMAL(10, 2), 
    defaultValue: 0.00 
  }
}, {
  tableName: 'employees', // Explicitly naming the table prevents Sequelize pluralization surprises
  timestamps: true,       // Automatically adds createdAt and updatedAt columns
});

module.exports = Employee;