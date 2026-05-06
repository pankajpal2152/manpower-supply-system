const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Document = sequelize.define('Document', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  documentName: { type: DataTypes.STRING, allowNull: false },
  documentType: { type: DataTypes.STRING, allowNull: false },
  documentData: { type: DataTypes.TEXT('long'), allowNull: false },
  
  // Allowing nulls so a document can belong to an Employee, Client, OR Job
  employeeId: { type: DataTypes.INTEGER, allowNull: true },
  clientId: { type: DataTypes.INTEGER, allowNull: true },
  jobId: { type: DataTypes.INTEGER, allowNull: true } // <-- NEW FOR JOB MANAGEMENT
}, {
  tableName: 'AllUploadDocuments', 
  timestamps: true,
});

module.exports = Document;