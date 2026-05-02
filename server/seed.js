require('dotenv').config();
const { sequelize, User, Role, Permission } = require('./models');

const seedDatabase = async () => {
  try {
    console.log('--- 🚀 Starting Database Seed ---');
    await sequelize.authenticate();

    // 1. Seed Permissions
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
    await Permission.bulkCreate(permissionsData, { ignoreDuplicates: true });

    // 2. Create Superadmin Role
    const [superAdminRole] = await Role.findOrCreate({
      where: { name: 'Superadmin' },
      defaults: { description: 'Ultimate access to all modules' }
    });
    const allPermissions = await Permission.findAll();
    await superAdminRole.setPermissions(allPermissions);

    // 3. Create the Default Superadmin User in PLAIN TEXT
    const adminEmail = 'admin@manpower.com';
    const adminUsername = 'superadmin';
    const adminPassword = 'adminpassword123';

    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (!existingAdmin) {
      await User.create({
        fullName: 'System Admin',       
        contactNo: '0000000000',        
        username: adminUsername,        
        email: adminEmail,
        password: adminPassword, // <-- PLAIN TEXT SAVING HERE
        roleId: superAdminRole.id
      });
      
      console.log(`✅ Superadmin created successfully!`);
      console.log(`👤 Username: ${adminUsername}`);
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