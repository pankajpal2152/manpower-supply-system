const bcrypt = require('bcryptjs');
require('dotenv').config();
const { sequelize, User, Role, Permission } = require('./models');

const seedDatabase = async () => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();

    // 1. Define all the permissions based on your system diagram
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
    // We use ignoreDuplicates so it won't crash if you run the script twice
    await Permission.bulkCreate(permissionsData, { ignoreDuplicates: true });

    // 2. Create the Superadmin Role
    console.log('👑 Seeding Superadmin Role...');
    const [superAdminRole] = await Role.findOrCreate({
      where: { name: 'Superadmin' },
      defaults: { description: 'Ultimate access to all modules' }
    });

    // Assign ALL permissions to the Superadmin role automatically
    const allPermissions = await Permission.findAll();
    await superAdminRole.setPermissions(allPermissions);

    // 3. Create the Superadmin User
    console.log('👤 Seeding Superadmin User...');
    const adminEmail = 'admin@manpower.com';
    const adminPassword = 'adminpassword123';

    // Check if the admin already exists
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (!existingAdmin) {
      // Hash the password just like we do in the register controller
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

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0); // Exit the script successfully
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1); // Exit with failure
  }
};

// Run the function
seedDatabase();