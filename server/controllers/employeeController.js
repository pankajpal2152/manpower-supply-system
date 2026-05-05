// controllers/employeeController.js
const { Employee, Document } = require('../models');

// Fetch ONLY active employees AND Profile Picture Document
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { isActive: true },
      include: [
        { model: Document, as: 'documents', required: false, where: { documentType: 'Profile Picture' } }
      ],
      order: [['createdAt', 'DESC']]
    });

    const flattenedEmployees = employees.map(emp => {
      const plainEmp = emp.get({ plain: true });
      
      let ProfilePictureBase64 = '';
      if (plainEmp.documents && plainEmp.documents.length > 0) {
          ProfilePictureBase64 = plainEmp.documents[0].documentData;
      }

      const { documents, ...coreEmployee } = plainEmp;

      return {
        ...coreEmployee,
        ProfilePictureBase64
      };
    });

    res.status(200).json(flattenedEmployees);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

// Create a new employee with an Auto-Generated Employee ID (AcctId)
exports.createEmployee = async (req, res) => {
  try {
    const data = req.body;

    // 1. Create Core Employee 
    const newEmployee = await Employee.create(data);

    // 2. Auto-Generate AcctId (Employee ID) based on the database primary key
    // This will generate an ID like "EMP0001", "EMP0002", etc.
    const generatedAcctId = `EMP${String(newEmployee.id).padStart(4, '0')}`;
    
    // 3. Handle Profile Image Document Storage
    let docName = null;
    if (data.ProfilePictureBase64 && data.ProfilePictureBase64.startsWith('data:image')) {
      docName = `EMP_${newEmployee.id}_${data.AcctName}_Profile`;
      
      await Document.create({
        documentName: docName,
        documentType: 'Profile Picture',
        documentData: data.ProfilePictureBase64,
        employeeId: newEmployee.id
      });
    }

    // 4. Update the newly created row with the generated AcctId and Document name
    await newEmployee.update({ 
      AcctId: generatedAcctId, 
      ProfilePicture: docName 
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const empId = parseInt(req.params.id, 10);
    const data = req.body;

    // Handle Profile Image Updates/Deletions
    if (data.ProfilePictureBase64 !== undefined) {
      if (data.ProfilePictureBase64 === '') {
        await Document.destroy({ where: { employeeId: empId, documentType: 'Profile Picture' } });
        data.ProfilePicture = null;
      } else if (data.ProfilePictureBase64.startsWith('data:image')) {
        const docName = `EMP_${empId}_${data.AcctName}_Profile`;
        
        const existingDoc = await Document.findOne({ where: { employeeId: empId, documentType: 'Profile Picture' }});
        if (existingDoc) {
            await existingDoc.update({ documentData: data.ProfilePictureBase64, documentName: docName });
        } else {
            await Document.create({ documentName: docName, documentType: 'Profile Picture', documentData: data.ProfilePictureBase64, employeeId: empId });
        }
        data.ProfilePicture = docName;
      }
    }

    // Protect AcctId from being overwritten by a blank form value during an update
    delete data.AcctId;

    await Employee.update(data, { where: { id: empId } });
    
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