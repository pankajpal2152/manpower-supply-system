const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/database');
// UPDATE THIS LINE: Import sequelize from models instead of config
const { sequelize } = require('./models'); 

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Sync database models (we will create models later)
// { alter: true } updates the tables to match our models without dropping data
sequelize.sync({ alter: true })
  .then(() => console.log('Database models synchronized.'))
  .catch((err) => console.log('Error syncing models:', err));

// --- ADD THIS NEW BLOCK ---
// ... existing imports ...
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const employeeRoutes = require('./routes/employeeRoutes'); // <-- 1. Add this

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/employees', employeeRoutes); // <-- 2. Add this

// ... rest of the file ...
// --------------------------

// Define a test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Welcome to the Manpower Supply System API!' });
});

// Set the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});