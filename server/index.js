require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 1. Correctly import sequelize and connectDB using destructuring from our models folder
const { sequelize, connectDB } = require('./models');

// Import Route Files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// CENTRAL STARTUP FUNCTION
// ==========================================
const startServer = async () => {
  try {
    // 2. Connect to the Database
    await connectDB();

    // 3. Sync database models
    // { alter: true } matches the database tables to the models without losing data
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized successfully.');

    // 4. Register Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/permissions', permissionRoutes);
    app.use('/api/employees', employeeRoutes);
    app.use('/api/dashboard', dashboardRoutes);
    
    // Test Route
    app.get('/api/test', (req, res) => {
      res.json({ message: 'Welcome to the Manpower Supply System API!' });
    });

    // 5. Start the Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start the application:', error.message);
    process.exit(1); // Exit if the database connection or sync fails
  }
};

// Launch the application
startServer();