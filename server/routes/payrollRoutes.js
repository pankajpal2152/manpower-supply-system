// routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(verifyToken);

// Generate payroll for a specific month/year
router.post('/generate', authorizeRoles('Superadmin', 'HR Admin'), payrollController.generateMonthlyPayroll);

module.exports = router;