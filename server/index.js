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
const clientRoutes = require('./routes/clientRoutes');
const jobRoutes = require('./routes/jobRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

// Middleware
app.use(cors());

// ==========================================
// INCREASE PAYLOAD SIZE LIMITS
// Increased the limit to 500mb to safely accommodate Base64 image strings
// ==========================================
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// ==========================================
// CENTRAL STARTUP FUNCTION
// ==========================================
const startServer = async () => {
  try {
    // 2. Connect to the Database
    await connectDB();

    // 3. Sync database models (INDUSTRY STANDARD FIX)
    // We remove { alter: true } to prevent the "Too many keys (64 limit)" bug.
    // In production, 'alter' or 'force' should ALWAYS be false to prevent data loss.
    // If you add new columns to your models in the future, you can temporarily change this to { alter: true } for one run, then change it back.
    const syncOptions = {
      alter: true,
      force: true
    };

    await sequelize.sync(syncOptions);
    console.log('✅ Database models synchronized successfully (without altering existing schemas).');

    // 4. Register Routes
    app.use('/api/jobs', jobRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/permissions', permissionRoutes);
    app.use('/api/employees', employeeRoutes);
    app.use('/api/dashboard', dashboardRoutes);
    app.use('/api/clients', clientRoutes);
    app.use('/api/leaves', leaveRoutes);
    app.use('/api/salary', salaryRoutes);
    app.use('/api/payroll', payrollRoutes);
    app.use('/api/attendance', attendanceRoutes);

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