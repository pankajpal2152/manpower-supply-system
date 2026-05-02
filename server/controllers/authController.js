const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role, Permission } = require('../models');

// --- REGISTER A NEW USER ---
exports.register = async (req, res) => {
  try {
    // 1. Extract all fields, including the 'role' sent from our React frontend!
    const { role: requestedRoleName, firstName, lastName, email, password } = req.body;

    // Basic Validation
    if (!firstName || !lastName || !email || !password || !requestedRoleName) {
        return res.status(400).json({ message: 'All fields are required, including role.' });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // 3. Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Find the specific role requested by the frontend, or create it if it doesn't exist yet
    // (This is a great approach for quickly bootstrapping a new database)
    let [role] = await Role.findOrCreate({
      where: { name: requestedRoleName },
      defaults: { description: `Standard access for ${requestedRoleName}` }
    });

    // 5. Create the new user and link them to the role
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId: role.id 
    });

    res.status(201).json({ message: 'User registered successfully!', userId: newUser.id });
  } catch (error) {
    console.error('Registration Error:', error);
    // Change this line to see the actual database or logic error in your browser
    res.status(500).json({ 
      message: 'Server error during registration.', 
      error: error.message 
    });
  }
};

// --- LOGIN USER ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 1. Find user, include Role, AND include Permissions!
    const user = await User.findOne({ 
        where: { email },
        include: [{ 
          model: Role,
          include: [{ model: Permission, through: { attributes: [] } }] // Include permissions without junction table clutter
        }] 
    });

    // 2. Verify existence and password
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // 3. Safely extract just the permission names into a simple array
    // Adding safety checks just in case the Role or Permissions array is missing
    const userPermissions = (user.Role && user.Role.Permissions) 
        ? user.Role.Permissions.map(perm => perm.name) 
        : [];

    // 4. Generate the JSON Web Token
    const token = jwt.sign(
      { id: user.id, role: user.Role ? user.Role.name : 'Unassigned' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // 5. Send back everything the frontend needs
    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.Role ? user.Role.name : 'Unassigned',
        permissions: userPermissions // <-- Securely powers our frontend Sidebar filtering!
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};