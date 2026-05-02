const jwt = require('jsonwebtoken');

// 1. Verify Token Middleware: Checks if the user is logged in
const verifyToken = (req, res, next) => {
  // Grab the header (handling both lowercase and uppercase variations)
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Check if the header exists and starts with "Bearer "
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Access Denied: No token provided.' });
  }

  // Extract the actual token string from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using our secret key from the .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user data (id and role) to the request object
    // Now, every subsequent route will have access to req.user!
    req.user = decoded; 
    
    // Move on to the actual route handler (like createEmployee)
    next(); 
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// 2. Role Authorization Middleware: Checks if the user has the right permission
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is populated by the verifyToken middleware above.
    // We check if the user exists and if their role is in the allowed list.
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Forbidden: Your role (${req.user?.role || 'Unassigned'}) does not have permission to access this resource.` 
      });
    }
    
    // User has the correct role, allow them through!
    next(); 
  };
};

module.exports = { verifyToken, authorizeRoles };