// controllers/salaryController.js
const { SalaryStructure } = require('../models');

// Save or Update an Employee's Salary Configuration
exports.saveSalaryStructure = async (req, res) => {
  try {
    const { employeeId, ...salaryData } = req.body;

    if (!employeeId) {
      return res.status(400).json({ message: 'Employee ID is required.' });
    }

    // Upsert acts as an "Update if exists, otherwise Create"
    // Since employeeId is unique in this table, it will perfectly overwrite the old config
    const [structure, created] = await SalaryStructure.upsert({
      employeeId,
      // Parse empty strings to 0.00 for the database
      basicPay: salaryData.basicPay || 0.00,
      dearnessAllowance: salaryData.dearnessAllowance || 0.00,
      houseRentAllowance: salaryData.houseRentAllowance || 0.00,
      incentives: salaryData.incentives || 0.00,
      attendanceBonus: salaryData.attendanceBonus || 0.00,
      cityCompensatoryAllowance: salaryData.cityCompensatoryAllowance || 0.00,
      mealAllowance: salaryData.mealAllowance || 0.00,
      uniformAllowance: salaryData.uniformAllowance || 0.00,
      specialAllowance: salaryData.specialAllowance || 0.00,
      
      // Auto-calculated fields sent from frontend
      grossSalary: salaryData.grossSalary || 0.00,
      pfContribution: salaryData.pfContribution || 0.00,
      esiContribution: salaryData.esiContribution || 0.00,
      
      // Manual Deductions
      tdsDeduction: salaryData.tdsDeduction || 0.00,
      otherDeductions: salaryData.otherDeductions || 0.00,
      netSalary: salaryData.netSalary || 0.00
    });

    res.status(200).json({ message: 'Salary structure saved successfully', structure });
  } catch (error) {
    console.error('Error saving salary structure:', error);
    res.status(500).json({ message: 'Error saving salary structure', error: error.message });
  }
};

// Fetch an existing salary configuration
exports.getSalaryStructure = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const structure = await SalaryStructure.findOne({ where: { employeeId } });
    
    // If no structure exists yet, return an empty object (200 OK, not an error)
    res.status(200).json(structure || {});
  } catch (error) {
    console.error('Error fetching salary structure:', error);
    res.status(500).json({ message: 'Error fetching salary structure', error: error.message });
  }
};