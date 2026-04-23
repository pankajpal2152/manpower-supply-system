const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { User, Role } = require('../models');
const { User, Role, Permission } = require('../models');

// --- REGISTER A NEW USER ---
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. For now, let's automatically create a 'Superadmin' role if it doesn't exist
    // (Later, we will seed roles properly, but this helps us get started testing)
    let [role] = await Role.findOrCreate({
      where: { name: 'Superadmin' },
      defaults: { description: 'Has access to everything' }
    });

    // 4. Create the new user
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
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// --- LOGIN USER ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user, include Role, AND include Permissions!
    const user = await User.findOne({ 
        where: { email },
        include: [{ 
          model: Role,
          include: [{ model: Permission, through: { attributes: [] } }] // Include permissions!
        }] 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Extract just the permission names into a simple array (e.g., ['VIEW_DASHBOARD', 'MANAGE_EMPLOYEES'])
    const userPermissions = user.Role.Permissions.map(perm => perm.name);

    const token = jwt.sign(
      { id: user.id, role: user.Role.name }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.Role.name,
        permissions: userPermissions // <-- Send permissions to frontend!
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};