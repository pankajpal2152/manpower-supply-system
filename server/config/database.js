const { Sequelize } = require('sequelize');
require('dotenv').config();

// 1. Early Safety Check: Ensure critical environment variables exist
if (!process.env.DB_NAME || !process.env.DB_USER) {
  console.error('❌ FATAL ERROR: Missing database environment variables. Please check your .env file.');
  process.exit(1);
}

// 2. Initialize Sequelize with our environment variables and performance best practices
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // Set to console.log to see raw SQL queries in the terminal during debugging
    
    // 3. Connection Pooling: Re-uses database connections for better performance
    pool: {
      max: 5,        // Maximum number of concurrent connections
      min: 0,        // Minimum number of connections to keep open
      acquire: 30000, // Maximum time (in ms) Sequelize will try to get a connection before throwing an error
      idle: 10000    // Maximum time (in ms) a connection can sit idle before being released
    }
  }
);

// Function to test the connection on server startup
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