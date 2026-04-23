const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with our environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // Set to console.log to see SQL queries in the terminal
  }
);

// Function to test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { sequelize, connectDB };