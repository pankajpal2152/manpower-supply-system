const jwt = require('jsonwebtoken');

// 1. Verify Token Middleware: Checks if the user is logged in
const verifyToken = (req, res, next) => {
  // Grab the token from the request header
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Access Denied: No token provided.' });
  }

  // Tokens usually come in the format "Bearer <token>", so we strip the "Bearer " part
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user data (id and role) to the request object
    req.user = decoded; 
    
    // Move on to the next function or route
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// 2. Role Authorization Middleware: Checks if the user has the right permission
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is set by the verifyToken middleware above
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Forbidden: You do not have permission to access this resource.' 
      });
    }
    next(); // User has the right role, let them through
  };
};

module.exports = { verifyToken, authorizeRoles };