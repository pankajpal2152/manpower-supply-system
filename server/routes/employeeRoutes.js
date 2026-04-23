const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Protect all employee routes (user must be logged in)
router.use(verifyToken);

// GET /api/employees - Fetch all
router.get('/', employeeController.getAllEmployees);

// POST /api/employees - Create new
router.post('/', employeeController.createEmployee);

// PUT /api/employees/:id - Update existing
router.put('/:id', employeeController.updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;