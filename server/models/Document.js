// models/Document.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Document = sequelize.define('Document', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  documentName: { type: DataTypes.STRING, allowNull: false },
  documentType: { type: DataTypes.STRING, allowNull: false },
  // Using TEXT('long') is crucial for storing large Base64 image strings
  documentData: { type: DataTypes.TEXT('long'), allowNull: false },
  employeeId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'AllUploadDocuments', // <-- UPDATED TABLE NAME
  timestamps: true,
});

module.exports = Document;