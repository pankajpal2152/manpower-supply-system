const { Attendance, Employee } = require('../models');

// Fetch all employees with their attendance for a specific date
exports.getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.query; // Expecting YYYY-MM-DD
        
        // FIXED: Removed 'department' from the attributes array to prevent the MySQL crash
        const employees = await Employee.findAll({
            attributes: ['id', 'AcctId', 'AcctName'] 
        });

        // Fetch attendance records for these employees on the specific date
        const attendanceRecords = await Attendance.findAll({
            where: { date: date }
        });

        res.status(200).json({ employees, attendanceRecords });
    } catch (error) {
        console.error("Error in getAttendanceByDate:", error);
        res.status(500).json({ message: "Error fetching attendance data" });
    }
};

// Bulk Save or Update Attendance
exports.saveAttendance = async (req, res) => {
    try {
        const { date, attendanceData } = req.body; 

        for (let record of attendanceData) {
            await Attendance.upsert({
                employeeId: record.employeeId,
                date: date,
                status: record.status,
                checkIn: record.checkIn || null,
                checkOut: record.checkOut || null,
                overtimeHours: record.overtimeHours || 0.00
            });
        }

        res.status(200).json({ message: "Attendance saved successfully" });
    } catch (error) {
        console.error("Error in saveAttendance:", error);
        res.status(500).json({ message: "Error saving attendance" });
    }
};