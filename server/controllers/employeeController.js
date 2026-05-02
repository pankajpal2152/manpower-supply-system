const { Employee, EmployeeOffice, EmployeeStatutory, EmployeeFamily } = require('../models');

// Fetch ONLY active employees with ALL nested data
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { isActive: true },
      include: [
        { model: EmployeeOffice, as: 'officeInfo' },
        { model: EmployeeStatutory, as: 'statutoryInfo' },
        { model: EmployeeFamily, as: 'familyInfo' }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Flatten the nested objects so the frontend form receives flat data
    const flattenedEmployees = employees.map(emp => {
      const plainEmp = emp.get({ plain: true });
      return {
        ...plainEmp,
        ...(plainEmp.officeInfo || {}),
        ...(plainEmp.statutoryInfo || {}),
        ...(plainEmp.familyInfo || {})
      };
    });

    res.status(200).json(flattenedEmployees);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

// Create a new employee across all 4 tables
exports.createEmployee = async (req, res) => {
  try {
    const data = req.body;

    // 1. Create Core Employee
    const newEmployee = await Employee.create(data);

    // 2. Create nested records using the new employee's ID
    await EmployeeOffice.create({ ...data, employeeId: newEmployee.id });
    await EmployeeStatutory.create({ ...data, employeeId: newEmployee.id });
    await EmployeeFamily.create({ ...data, employeeId: newEmployee.id });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

// Update an employee across all 4 tables
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Update Core
    await Employee.update(data, { where: { id } });
    
    // Update or Create sub-records
    await EmployeeOffice.upsert({ ...data, employeeId: id }, { where: { employeeId: id } });
    await EmployeeStatutory.upsert({ ...data, employeeId: id }, { where: { employeeId: id } });
    await EmployeeFamily.upsert({ ...data, employeeId: id }, { where: { employeeId: id } });

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

// SOFT DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.update({ isActive: false }, { where: { id } });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};