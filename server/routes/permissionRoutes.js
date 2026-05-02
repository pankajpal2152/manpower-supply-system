const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// ==========================================
// PERMISSION & ROLE ROUTES
// Expected Base Path in server.js: /api/permissions
// ==========================================

// 1. Global Route Protection
// Highly Restricted: Only Superadmins can view or manage roles and permissions.
router.use(verifyToken, authorizeRoles('Superadmin'));

// 2. GET /api/permissions
// Fetches all available permissions in the system (grouped by module for the UI)
router.get('/', permissionController.getAllPermissions);

// 3. GET /api/permissions/roles
// Fetches all available roles (Superadmin, HR Admin, Employee, etc.) for the dropdown
router.get('/roles', permissionController.getAllRoles);

// 4. GET /api/permissions/role/:roleId
// Fetches only the permissions currently checked/assigned to a specific role
router.get('/role/:roleId', permissionController.getRolePermissions);

// 5. PUT /api/permissions/role/:roleId
// Saves the updated array of checked permissions to the database for a specific role
router.put('/role/:roleId', permissionController.updateRolePermissions);

module.exports = router;