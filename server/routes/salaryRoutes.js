// routes/salaryRoutes.js
const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(verifyToken);

// 1. Save or Update Structure
router.post('/save', authorizeRoles('Superadmin', 'HR Admin'), salaryController.saveSalaryStructure);

// 2. Fetch existing structure for an employee
router.get('/:employeeId', authorizeRoles('Superadmin', 'HR Admin'), salaryController.getSalaryStructure);

module.exports = router;