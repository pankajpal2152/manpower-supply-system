// controllers/salaryController.js
const { SalaryStructure, Employee } = require('../models');

exports.saveSalaryStructure = async (req, res) => {
  try {
    const { employeeId, basicPay, dearnessAllowance, houseRentAllowance, incentives, 
            attendanceBonus, cityCompensatoryAllowance, mealAllowance, uniformAllowance, 
            specialAllowance, tdsDeduction, otherDeductions } = req.body;

    // 1. Ensure numbers (default to 0 if empty)
    const basic = parseFloat(basicPay || 0);
    const da = parseFloat(dearnessAllowance || 0);
    const hra = parseFloat(houseRentAllowance || 0);
    const inc = parseFloat(incentives || 0);
    const att = parseFloat(attendanceBonus || 0);
    const cca = parseFloat(cityCompensatoryAllowance || 0);
    const meal = parseFloat(mealAllowance || 0);
    const uniform = parseFloat(uniformAllowance || 0);
    const special = parseFloat(specialAllowance || 0);
    const tds = parseFloat(tdsDeduction || 0);
    const otherDed = parseFloat(otherDeductions || 0);

    // 2. Calculate Gross Salary (Sum of all earnings based on your image)
    const grossSalary = basic + da + hra + inc + att + cca + meal + uniform + special;

    // 3. Auto-Calculate PF (Example: 12% of Basic + DA)
    const pfContribution = (basic + da) * 0.12;

    // 4. Auto-Calculate ESI (Example: 0.75% of Gross if Gross <= 21000)
    let esiContribution = 0;
    if (grossSalary <= 21000) {
        esiContribution = grossSalary * 0.0075;
    }

    // 5. Calculate Net Salary
    const totalDeductions = pfContribution + esiContribution + tds + otherDed;
    const netSalary = grossSalary - totalDeductions;

    // 6. Save or Update in Database
    const [structure, created] = await SalaryStructure.upsert({
      employeeId, basicPay: basic, dearnessAllowance: da, houseRentAllowance: hra,
      incentives: inc, attendanceBonus: att, cityCompensatoryAllowance: cca,
      mealAllowance: meal, uniformAllowance: uniform, specialAllowance: special,
      grossSalary, pfContribution, esiContribution, tdsDeduction: tds, 
      otherDeductions: otherDed, netSalary
    });

    res.status(200).json({ message: 'Salary structure saved successfully', data: structure });
  } catch (error) {
    console.error('Salary Save Error:', error);
    res.status(500).json({ message: 'Error saving salary structure.', error: error.message });
  }
};