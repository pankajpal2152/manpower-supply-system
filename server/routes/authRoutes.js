const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ==========================================
// AUTHENTICATION ROUTES
// Expected Base Path in server.js: /api/auth
// ==========================================

// POST /api/auth/register
// Handles new user registration and role assignment
router.post('/register', authController.register);

// POST /api/auth/login
// Handles user authentication and token generation
router.post('/login', authController.login);

module.exports = router;