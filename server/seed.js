const bcrypt = require('bcryptjs');
require('dotenv').config();
// Ensure the path to your models folder is correct
const { sequelize, User, Role, Permission } = require('./models');

const seedDatabase = async () => {
  try {
    console.log('--- 🚀 Starting Database Seed ---');
    
    // Test the connection
    await sequelize.authenticate();
    console.log('📡 Database connection verified.');

    // 1. Define all the permissions based on the system modules
    const permissionsData = [
      { name: 'VIEW_DASHBOARD', module: 'Dashboard', description: 'View main overview' },
      { name: 'MANAGE_EMPLOYEES', module: 'Employee Management', description: 'Add, edit, delete employees' },
      { name: 'MANAGE_CLIENTS', module: 'Client Management', description: 'Add, edit, delete clients' },
      { name: 'MANAGE_JOBS', module: 'Job Management', description: 'Create and assign jobs' },
      { name: 'MANAGE_PAYROLL', module: 'Payroll System', description: 'Generate payroll and payslips' },
      { name: 'MANAGE_INVOICES', module: 'Invoice System', description: 'Create and manage invoices' },
      { name: 'VIEW_REPORTS', module: 'Reports', description: 'View system analytics and reports' },
      { name: 'MANAGE_USERS', module: 'User Management', description: 'Manage system users and access' }
    ];

    console.log('🌱 Seeding Permissions...');
    // ignoreDuplicates prevents errors if the permissions already exist
    await Permission.bulkCreate(permissionsData, { ignoreDuplicates: true });

    // 2. Create or Find the Superadmin Role
    console.log('👑 Configuring Superadmin Role...');
    const [superAdminRole] = await Role.findOrCreate({
      where: { name: 'Superadmin' },
      defaults: { description: 'Ultimate access to all modules' }
    });

    // Sync Permissions to Role (This populates the RolePermissions junction table)
    const allPermissions = await Permission.findAll();
    await superAdminRole.setPermissions(allPermissions);
    console.log('✅ All permissions linked to Superadmin role.');

    // 3. Create the Default Superadmin User
    const adminEmail = 'admin@manpower.com';
    const adminPassword = 'adminpassword123';

    console.log('👤 Checking for Superadmin User...');
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (!existingAdmin) {
      // Hash the password just like the registration controller
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      await User.create({
        firstName: 'Super',
        lastName: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        roleId: superAdminRole.id
      });
      
      console.log(`✅ Superadmin created successfully!`);
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    } else {
      console.log('⚠️ Superadmin user already exists. Skipping creation.');
    }

    console.log('--- 🎉 Seeding Process Complete ---');
    process.exit(0); 
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1); 
  }
};

seedDatabase();