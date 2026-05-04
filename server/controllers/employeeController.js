// controllers/employeeController.js
const { Employee, EmployeeOffice, EmployeeStatutory, EmployeeFamily, Document } = require('../models');

// Helper function to strip out table-specific IDs so they don't overwrite the main Employee ID
const sanitizeNested = (nestedObj) => {
    if (!nestedObj) return {};
    const { id, employeeId, createdAt, updatedAt, ...rest } = nestedObj;
    return rest;
};

// Fetch ONLY active employees with ALL nested data AND Profile Picture Document
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { isActive: true },
      include: [
        { model: EmployeeOffice, as: 'officeInfo' },
        { model: EmployeeStatutory, as: 'statutoryInfo' },
        { model: EmployeeFamily, as: 'familyInfo' },
        { model: Document, as: 'documents', required: false, where: { documentType: 'Profile Picture' } }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Flatten the nested objects so the frontend form receives flat data
    const flattenedEmployees = employees.map(emp => {
      const plainEmp = emp.get({ plain: true });
      
      let profileImageBase64 = '';
      if (plainEmp.documents && plainEmp.documents.length > 0) {
          profileImageBase64 = plainEmp.documents[0].documentData;
      }

      // Destructure out the nested objects so we can merge them safely
      const { officeInfo, statutoryInfo, familyInfo, documents, ...coreEmployee } = plainEmp;

      return {
        ...coreEmployee,
        ...sanitizeNested(officeInfo),      // Safely merge without overwriting `id`
        ...sanitizeNested(statutoryInfo),
        ...sanitizeNested(familyInfo),
        profileImageBase64
      };
    });

    res.status(200).json(flattenedEmployees);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

// Create a new employee across all tables + Document table
exports.createEmployee = async (req, res) => {
  try {
    const data = req.body;

    // 1. Create Core Employee 
    const newEmployee = await Employee.create(data);

    // 2. Handle Profile Image Document Storage
    if (data.profileImageBase64 && data.profileImageBase64.startsWith('data:image')) {
      const docName = `EMP_${newEmployee.id}_${data.firstName}_${data.lastName}_Profile`;
      
      await Document.create({
        documentName: docName,
        documentType: 'Profile Picture',
        documentData: data.profileImageBase64,
        employeeId: newEmployee.id
      });

      // Update the core employee table with just the reference name
      await newEmployee.update({ profileImage: docName });
    }

    // 3. Create nested records (Sanitized to prevent accidental ID insertion)
    const safeData = sanitizeNested(data);

    await EmployeeOffice.create({ ...safeData, employeeId: newEmployee.id });
    await EmployeeStatutory.create({ ...safeData, employeeId: newEmployee.id });
    await EmployeeFamily.create({ ...safeData, employeeId: newEmployee.id });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

// Update an employee across all tables + Document table
exports.updateEmployee = async (req, res) => {
  try {
    const empId = parseInt(req.params.id, 10);
    const data = req.body;

    // Remove primary keys from the incoming payload so Sequelize doesn't try to update them
    const safeUpdateData = sanitizeNested(data);

    // Handle Profile Image Updates/Deletions
    if (data.profileImageBase64 !== undefined) {
      if (data.profileImageBase64 === '') {
        // User removed the image - delete from Document table and nullify reference
        await Document.destroy({ where: { employeeId: empId, documentType: 'Profile Picture' } });
        safeUpdateData.profileImage = null;
      } else if (data.profileImageBase64.startsWith('data:image')) {
        // User uploaded a NEW image
        const docName = `EMP_${empId}_${data.firstName}_${data.lastName}_Profile`;
        
        const existingDoc = await Document.findOne({ where: { employeeId: empId, documentType: 'Profile Picture' }});
        if (existingDoc) {
            await existingDoc.update({ documentData: data.profileImageBase64, documentName: docName });
        } else {
            await Document.create({ documentName: docName, documentType: 'Profile Picture', documentData: data.profileImageBase64, employeeId: empId });
        }
        safeUpdateData.profileImage = docName;
      }
    }

    // Update Core Employee
    await Employee.update(safeUpdateData, { where: { id: empId } });
    
    // Update or Create sub-records (Using findOne + update is much safer than upsert here)
    const office = await EmployeeOffice.findOne({ where: { employeeId: empId } });
    if (office) await office.update(safeUpdateData);
    else await EmployeeOffice.create({ ...safeUpdateData, employeeId: empId });

    const statutory = await EmployeeStatutory.findOne({ where: { employeeId: empId } });
    if (statutory) await statutory.update(safeUpdateData);
    else await EmployeeStatutory.create({ ...safeUpdateData, employeeId: empId });

    const family = await EmployeeFamily.findOne({ where: { employeeId: empId } });
    if (family) await family.update(safeUpdateData);
    else await EmployeeFamily.create({ ...safeUpdateData, employeeId: empId });

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

// SOFT DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    const empId = parseInt(req.params.id, 10);
    await Employee.update({ isActive: false }, { where: { id: empId } });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};