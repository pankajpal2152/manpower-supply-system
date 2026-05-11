const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// All attendance routes require login
router.use(verifyToken);

// GET /api/attendance?date=2026-05-11
router.get('/', attendanceController.getAttendanceByDate);

// POST /api/attendance/save
router.post('/save', authorizeRoles('Superadmin', 'HR Admin'), attendanceController.saveAttendance);

module.exports = router;