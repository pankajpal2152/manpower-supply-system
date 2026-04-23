const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(verifyToken, authorizeRoles('Superadmin'));

// Fetch all available permissions
router.get('/', permissionController.getAllPermissions);

// NEW: Fetch all roles
router.get('/roles', permissionController.getAllRoles); // <-- ADD THIS LINE

// Get permissions checked for a specific role
router.get('/role/:roleId', permissionController.getRolePermissions);

// Save the checked boxes
router.put('/role/:roleId', permissionController.updateRolePermissions);

module.exports = router;