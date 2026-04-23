const { Role, Permission } = require('../models');

// --- GET ALL PERMISSIONS (Grouped for the Frontend Checkboxes) ---
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    
    // Group permissions by module so the frontend can render sections easily
    const groupedPermissions = permissions.reduce((acc, perm) => {
      if (!acc[perm.module]) {
        acc[perm.module] = [];
      }
      acc[perm.module].push(perm);
      return acc;
    }, {});

    res.status(200).json(groupedPermissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    res.status(500).json({ message: 'Server error fetching permissions.' });
  }
};

// --- UPDATE PERMISSIONS FOR A ROLE ---
// The frontend will send an array of permission IDs that were checked
exports.updateRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissionIds } = req.body; // Array of IDs, e.g., [1, 3, 4, 7]

    // 1. Find the role
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    // 2. Magic Sequelize Method: setPermissions
    // This automatically removes old unchecked permissions and adds new checked ones!
    await role.setPermissions(permissionIds);

    res.status(200).json({ message: 'Role permissions updated successfully!' });
  } catch (error) {
    console.error('Error updating permissions:', error);
    res.status(500).json({ message: 'Server error updating role permissions.' });
  }
};

// --- GET PERMISSIONS FOR A SPECIFIC ROLE ---
exports.getRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await Role.findByPk(roleId, {
      include: [{
        model: Permission,
        through: { attributes: [] } // Hides the junction table data to keep the response clean
      }]
    });

    if (!role) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    res.status(200).json(role.Permissions);
  } catch (error) {
    console.error('Error fetching role permissions:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// --- GET ALL ROLES ---
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Server error fetching roles.' });
  }
};