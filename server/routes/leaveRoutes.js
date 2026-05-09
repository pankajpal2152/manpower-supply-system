// routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Protect all leave routes
router.use(verifyToken);

// Employee Route: Apply for leave
router.post('/apply', leaveController.applyLeave);

// Admin Routes: View all and Update Status
// We restrict these to HR and Superadmins so standard employees cannot approve their own leave
router.get('/', authorizeRoles('Superadmin', 'HR Admin'), leaveController.getAllLeaves);
router.put('/:id/status', authorizeRoles('Superadmin', 'HR Admin'), leaveController.updateLeaveStatus);

module.exports = router;