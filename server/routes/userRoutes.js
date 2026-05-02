const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');
const { User, Role, Permission } = require('../models');

// ==========================================
// USER PROFILE & TESTING ROUTES
// Expected Base Path in server.js: /api/users
// ==========================================

// Route 1: Get Current Logged-in User Profile
// Any logged-in user can access this. It uses the token to find their DB record.
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // req.user.id is securely provided by our verifyToken middleware
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }, // Security: Never send the hashed password to the frontend!
      include: [{ 
        model: Role,
        include: [{ model: Permission, through: { attributes: [] } }] 
      }] 
    });

    if (!user) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    res.status(200).json({ 
      message: 'Profile retrieved successfully!', 
      userData: user 
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error retrieving profile.' });
  }
});

// Route 2: Admin Dashboard Test Route
// Highly Restricted: Validates that BOTH middlewares are working in tandem.
router.get('/admin-only', verifyToken, authorizeRoles('Superadmin'), (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to the Superadmin control panel. Your middleware is working perfectly!' 
  });
});

module.exports = router;