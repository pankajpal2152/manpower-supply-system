// routes/salaryRoutes.js
const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Protect all salary routes with JWT
router.use(verifyToken);

// Route to Save or Update an Employee's Salary Structure
// Only Superadmins and HR Admins should be allowed to modify pay structures
router.post('/save', authorizeRoles('Superadmin', 'HR Admin'), salaryController.saveSalaryStructure);

// Optional: You might want a route to fetch the structure later when editing!
// router.get('/:employeeId', authorizeRoles('Superadmin', 'HR Admin'), salaryController.getSalaryStructure);

module.exports = router;