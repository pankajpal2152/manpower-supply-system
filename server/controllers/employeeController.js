const { Employee } = require('../models');

// --- GET ALL EMPLOYEES ---
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      order: [['createdAt', 'DESC']] // Show newest first
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error fetching employees.' });
  }
};

// --- CREATE NEW EMPLOYEE ---
exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // 1. Backend Validation: Ensure critical fields aren't missing
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'First name, last name, and email are required.' });
    }

    // 2. Check if email already exists in the database
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ message: 'An employee with this email already exists.' });
    }

    // 3. Create the employee
    const newEmployee = await Employee.create(req.body);
    res.status(201).json({ message: 'Employee created successfully!', employee: newEmployee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error creating employee.' });
  }
};

// --- UPDATE EMPLOYEE ---
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. Find the employee we want to update
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // 2. Prevent Email Collisions: If they are updating their email, make sure no one else has it
    if (req.body.email && req.body.email !== employee.email) {
      const emailTaken = await Employee.findOne({ where: { email: req.body.email } });
      // If we found a record with this email, and it's NOT the user we are currently updating...
      if (emailTaken && emailTaken.id !== Number(id)) {
        return res.status(400).json({ message: 'This email is already in use by another employee.' });
      }
    }

    // 3. Apply the updates
    await employee.update(req.body);
    res.status(200).json({ message: 'Employee updated successfully!', employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error updating employee.' });
  }
};

// --- DELETE EMPLOYEE ---
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted successfully!' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error deleting employee.' });
  }
};