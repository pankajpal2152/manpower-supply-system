const jwt = require('jsonwebtoken');
const { User, Role, Permission } = require('../models');

// --- REGISTER A NEW USER ---
exports.register = async (req, res) => {
  try {
    const { role: requestedRoleName, fullName, email, contactNo, username, password } = req.body;

    // Basic Validation
    if (!fullName || !email || !contactNo || !username || !password || !requestedRoleName) {
        return res.status(400).json({ message: 'All fields are required, including role.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    // Find or create the role
    let [role] = await Role.findOrCreate({
      where: { name: requestedRoleName },
      defaults: { description: `Standard access for ${requestedRoleName}` }
    });

    // Create the new user with the PLAIN TEXT password
    const newUser = await User.create({
      fullName,
      email,
      contactNo,
      username,
      password: password, // <-- Storing exactly as the user typed it
      roleId: role.id 
    });

    res.status(201).json({ message: 'User registered successfully!', userId: newUser.id });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
};

// --- LOGIN USER ---
exports.login = async (req, res) => {
  try {
    const { role, username, password } = req.body;

    // Basic validation
    if (!role || !username || !password) {
        return res.status(400).json({ message: 'Role, username, and password are required.' });
    }

    // 1. Find user by username, include Role and Permissions
    const user = await User.findOne({ 
        where: { username },
        include: [{ 
          model: Role,
          include: [{ model: Permission, through: { attributes: [] } }] 
        }] 
    });

    // 2. Verify existence
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 3. SECURITY CHECK: Is the user active?
    if (!user.isActive) {
      return res.status(403).json({ 
        message: 'Your account has been deactivated. Please contact the administrator.' 
      });
    }

    // 4. Verify that the selected role matches the user's actual role
    if (!user.Role || user.Role.name !== role) {
      return res.status(403).json({ message: 'Role mismatch. Please select your correct role.' });
    }

    // 5. Verify password using simple plain text comparison
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // 6. Extract permissions
    const userPermissions = (user.Role && user.Role.Permissions) 
        ? user.Role.Permissions.map(perm => perm.name) 
        : [];

    // 7. Generate the JSON Web Token
    const token = jwt.sign(
      { id: user.id, role: user.Role.name }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } 
    );

    // 8. Send back everything the frontend needs
    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.Role.name,
        permissions: userPermissions 
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
};