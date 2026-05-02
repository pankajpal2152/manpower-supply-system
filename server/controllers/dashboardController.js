const { Employee, User, Role } = require('../models');

exports.getStats = async (req, res) => {
  try {
    // 1. Get total counts from the database
    const totalEmployees = await Employee.count();
    const totalUsers = await User.count();
    
    // 2. Get counts based on status (Example logic)
    const activeEmployees = await Employee.count({ where: { status: 'Available' } });
    const assignedEmployees = await Employee.count({ where: { status: 'Assigned' } });

    // 3. Send the statistics back to the frontend
    res.status(200).json({
      totalEmployees,
      totalUsers,
      activeEmployees,
      assignedEmployees,
      // You can add more stats here as you build out Clients and Jobs
      totalClients: 0, 
      activeJobs: 0
    });
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics.' });
  }
};