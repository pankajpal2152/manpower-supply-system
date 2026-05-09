// controllers/payrollController.js
const { Payroll, Employee, SalaryStructure, Attendance } = require('../models');
const { Op } = require('sequelize');

exports.generateMonthlyPayroll = async (req, res) => {
  try {
    const { month, year } = req.body; // e.g., month: 5, year: 2026

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required." });
    }

    // 1. Calculate total days in the requested month
    // JavaScript dates: Day 0 of the *next* month gives the last day of the *current* month.
    const totalDaysInMonth = new Date(year, month, 0).getDate();

    // 2. Fetch all active employees WITH their Salary Structure
    const employees = await Employee.findAll({
      where: { isActive: true },
      include: [{ model: SalaryStructure, as: 'salaryStructure' }]
    });

    const generatedRecords = [];

    // 3. Process each employee
    for (let emp of employees) {
      if (!emp.salaryStructure) continue; // Skip if salary isn't set up yet

      const structure = emp.salaryStructure;

      // 4. Calculate Attendance (Find how many days they were explicitly "Absent")
      // Formatting dates to match YYYY-MM-DD
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const endDate = `${year}-${String(month).padStart(2, '0')}-${totalDaysInMonth}`;

      const absentDaysCount = await Attendance.count({
        where: {
          employeeId: emp.id,
          status: 'Absent',
          date: { [Op.between]: [startDate, endDate] }
        }
      });

      // Payable Days = Total Days - Absent Days (This naturally pays for Weekends/Approved Leaves)
      const payableDays = totalDaysInMonth - absentDaysCount;

      // 5. Calculate Pro-Rata Multiplier
      const proRataMultiplier = payableDays / totalDaysInMonth;

      // 6. Calculate Earned Earnings
      const earnedBasic = parseFloat(structure.basicPay) * proRataMultiplier;
      
      const totalFixedAllowances = 
        parseFloat(structure.dearnessAllowance) + 
        parseFloat(structure.houseRentAllowance) + 
        parseFloat(structure.incentives) + 
        parseFloat(structure.attendanceBonus) + 
        parseFloat(structure.cityCompensatoryAllowance) + 
        parseFloat(structure.mealAllowance) + 
        parseFloat(structure.uniformAllowance) + 
        parseFloat(structure.specialAllowance);
        
      const earnedAllowances = totalFixedAllowances * proRataMultiplier;
      const grossEarned = earnedBasic + earnedAllowances;

      // 7. Auto-Calculate Industry Standard Deductions on ACTUAL Earned amounts
      // PF: Usually 12% of Earned Basic (and sometimes DA)
      const earnedDA = parseFloat(structure.dearnessAllowance) * proRataMultiplier;
      const pfDeduction = (earnedBasic + earnedDA) * 0.12;

      // ESI: 0.75% of Gross, usually only if Gross is <= 21000
      let esiDeduction = 0;
      if (grossEarned <= 21000) {
        esiDeduction = grossEarned * 0.0075;
      }

      const tdsDeduction = parseFloat(structure.tdsDeduction); // Usually fixed monthly
      const otherDeductions = parseFloat(structure.otherDeductions); // Usually fixed monthly

      // 8. Calculate Final Net Pay
      const totalDeductions = pfDeduction + esiDeduction + tdsDeduction + otherDeductions;
      const netPayable = grossEarned - totalDeductions;

      // 9. Save Snapshot to Database (Upsert prevents duplicates if generated twice)
      const [payrollRecord] = await Payroll.upsert({
        employeeId: emp.id,
        month,
        year,
        totalDays: totalDaysInMonth,
        payableDays,
        earnedBasic,
        earnedAllowances,
        grossEarned,
        pfDeduction,
        esiDeduction,
        tdsDeduction,
        otherDeductions,
        netPayable,
        status: 'Draft' // Requires Admin approval later
      });

      // ==========================================
      // NEW: ATTACH EMPLOYEE DATA FOR THE FRONTEND
      // ==========================================
      // Convert the Sequelize object to a plain JSON object so we can safely mutate it
      const plainRecord = payrollRecord.toJSON();
      
      // Attach the core employee details that the PDF Template needs
      plainRecord.Employee = {
        id: emp.id,
        AcctName: emp.AcctName,
        AcctId: emp.AcctId,
        BankName: emp.BankName,
        AcctNo: emp.AcctNo,
        PanNo: emp.PanNo
      };

      // Push the enriched record into our response array
      generatedRecords.push(plainRecord);
    }

    res.status(200).json({ 
      message: `Successfully generated payroll for ${generatedRecords.length} employees.`,
      data: generatedRecords 
    });

  } catch (error) {
    console.error('Payroll Generation Error:', error);
    res.status(500).json({ message: 'Error generating payroll.', error: error.message });
  }
};