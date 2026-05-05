const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Client = sequelize.define('Client', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  
  // Basic Info
  OrganizationName: { type: DataTypes.STRING, allowNull: false },
  Abbreviation: { type: DataTypes.STRING, allowNull: true },
  Address: { type: DataTypes.STRING, allowNull: true },
  NoOfBranch: { type: DataTypes.STRING, allowNull: true },
  Location: { type: DataTypes.STRING, allowNull: true },
  State: { type: DataTypes.STRING, allowNull: true },
  
  // Billing Info
  BillingAddress: { type: DataTypes.STRING, allowNull: true },
  BillingState: { type: DataTypes.STRING, allowNull: true },
  ContactPerson: { type: DataTypes.STRING, allowNull: true },
  ContactNumber: { type: DataTypes.STRING, allowNull: true },
  
  // Compliance & Documents
  GSTNo: { type: DataTypes.STRING, allowNull: true },
  EmailId: { type: DataTypes.STRING, allowNull: true },
  AgreementType: { type: DataTypes.STRING, allowNull: true },
  PrincipalEmp: { type: DataTypes.STRING, allowNull: true },
  PECNo: { type: DataTypes.STRING, allowNull: true },
  ValidUpto: { type: DataTypes.STRING, allowNull: true }, // Date
  DateOfWorkOrder: { type: DataTypes.STRING, allowNull: true }, // Date
  EffectiveFrom: { type: DataTypes.STRING, allowNull: true }, // Date
  SecurityLicence: { type: DataTypes.STRING, allowNull: true },
  
  // Soft Delete Flag
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
  tableName: 'clients',
  timestamps: true,
});

module.exports = Client;