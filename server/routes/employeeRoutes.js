const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Import BOTH of our security middlewares
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// ==========================================
// EMPLOYEE ROUTES
// Expected Base Path in server.js: /api/employees
// ==========================================

// 1. Protect all employee routes (user must be logged in with a valid token)
// This applies to every route written below this line.
router.use(verifyToken);

// 2. GET /api/employees - Fetch all employees
// Any logged-in user can view the list of employees.
router.get('/', employeeController.getAllEmployees);

// 3. POST /api/employees - Create new employee
// Restricted: Only Superadmins and HR Admins can add new staff.
router.post('/', authorizeRoles('Superadmin', 'HR Admin'), employeeController.createEmployee);

// 4. PUT /api/employees/:id - Update existing employee
// Restricted: Only Superadmins and HR Admins can edit staff details.
router.put('/:id', authorizeRoles('Superadmin', 'HR Admin'), employeeController.updateEmployee);

// 5. DELETE /api/employees/:id - Delete employee
// Highly Restricted: Only Superadmins can permanently delete an employee record.
router.delete('/:id', authorizeRoles('Superadmin'), employeeController.deleteEmployee);

module.exports = router;