const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Route 1: Profile (Any logged-in user can access this)
// Notice how we put `verifyToken` before the final (req, res) function
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to your secure profile area!', 
    userData: req.user 
  });
});

// Route 2: Admin Dashboard (ONLY Superadmins can access this)
// Here we use both middlewares
router.get('/admin-only', verifyToken, authorizeRoles('Superadmin'), (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to the Superadmin control panel. Highly classified data here.' 
  });
});

module.exports = router;