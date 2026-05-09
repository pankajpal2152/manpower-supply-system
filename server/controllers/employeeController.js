const { Employee, Document, EmpCode } = require('../models');
const { sequelize } = require('../config/database');

/**
 * GET /api/employees
 * Fetches all active employees and flattens the Profile Picture into the object.
 */
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { isActive: true },
      include: [
        { 
          model: Document, 
          as: 'documents', 
          required: false, 
          where: { documentType: 'Profile Picture' } 
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const flattenedEmployees = employees.map(emp => {
      const plainEmp = emp.get({ plain: true });
      
      let ProfilePictureBase64 = '';
      if (plainEmp.documents && plainEmp.documents.length > 0) {
          ProfilePictureBase64 = plainEmp.documents[0].documentData;
      }

      // Remove the documents array to keep the object clean for the UI
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

/**
 * POST /api/employees
 * Creates a new employee with a custom Auto-Generated ID (e.g., BB-1027)
 */
exports.createEmployee = async (req, res) => {
  // Start a transaction to ensure atomic updates to the ID counter
  const t = await sequelize.transaction();

  try {
    const data = req.body;

    // 1. Fetch current ID configuration (Prefix, Separator, Last Number)
    let config = await EmpCode.findOne({ transaction: t });

    // 2. Initial Setup: If table is empty, create the starting point
    if (!config) {
      config = await EmpCode.create({ 
        prefix: 'BB', 
        separator: '-', 
        lastNumber: 1026 
      }, { transaction: t });
    }

    // 3. Generate the Custom ID (e.g., BB-1027)
    const nextNumber = config.lastNumber + 1;
    const generatedAcctId = `${config.prefix}${config.separator}${nextNumber}`;

    // 4. Create Core Employee with the generated ID
    data.AcctId = generatedAcctId;
    const newEmployee = await Employee.create(data, { transaction: t });

    // 5. Handle Profile Image Document Storage
    let docName = null;
    if (data.ProfilePictureBase64 && data.ProfilePictureBase64.startsWith('data:image')) {
      docName = `EMP_${newEmployee.id}_${data.AcctName}_Profile`;
      
      await Document.create({
        documentName: docName,
        documentType: 'Profile Picture',
        documentData: data.ProfilePictureBase64,
        employeeId: newEmployee.id
      }, { transaction: t });
    }

    // 6. Final Updates: Update Employee with profile picture name & Update ID Counter
    await newEmployee.update({ ProfilePicture: docName }, { transaction: t });
    await config.update({ lastNumber: nextNumber }, { transaction: t });

    // Commit all changes to the database
    await t.commit();

    res.status(201).json(newEmployee);
  } catch (error) {
    // If any step fails, undo everything to prevent inconsistent IDs
    await t.rollback();
    console.error('Create Error:', error);
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

/**
 * PUT /api/employees/:id
 * Updates employee details and manages profile picture updates
 */
exports.updateEmployee = async (req, res) => {
  try {
    const empId = parseInt(req.params.id, 10);
    const data = req.body;

    // Handle Image Logic
    if (data.ProfilePictureBase64 !== undefined) {
      if (data.ProfilePictureBase64 === '') {
        // Remove image if string is empty
        await Document.destroy({ where: { employeeId: empId, documentType: 'Profile Picture' } });
        data.ProfilePicture = null;
      } else if (data.ProfilePictureBase64.startsWith('data:image')) {
        const docName = `EMP_${empId}_${data.AcctName}_Profile`;
        
        const existingDoc = await Document.findOne({ where: { employeeId: empId, documentType: 'Profile Picture' }});
        if (existingDoc) {
            await existingDoc.update({ documentData: data.ProfilePictureBase64, documentName: docName });
        } else {
            await Document.create({ 
              documentName: docName, 
              documentType: 'Profile Picture', 
              documentData: data.ProfilePictureBase64, 
              employeeId: empId 
            });
        }
        data.ProfilePicture = docName;
      }
    }

    // Ensure the Custom ID is never changed via a standard update
    delete data.AcctId;

    await Employee.update(data, { where: { id: empId } });
    
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

/**
 * DELETE /api/employees/:id
 * Performs a soft delete by setting isActive to false
 */
exports.deleteEmployee = async (req, res) => {
  try {
    const empId = parseInt(req.params.id, 10);
    await Employee.update({ isActive: false }, { where: { id: empId } });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};

/**
 * GET /api/employees/data/states
 * Fetches active states for dropdowns
 */
exports.getStates = async (req, res) => {
  try {
      const [results] = await sequelize.query('SELECT StateId, StateName FROM stateinfo WHERE IsActive = 1');
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching states', error: error.message });
  }
};

/**
 * GET /api/employees/data/districts/:stateId
 * Fetches active districts based on state selection
 */
exports.getDistricts = async (req, res) => {
  try {
      const stateId = req.params.stateId;
      const [results] = await sequelize.query('SELECT DistId, DistName FROM distinfo WHERE StateId = ? AND IsActiv = 1', {
          replacements: [stateId]
      });
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching districts', error: error.message });
  }
};