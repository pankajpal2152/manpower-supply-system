// controllers/leaveController.js
const { Leave, Employee } = require('../models');

// 1. Employee: Apply for Leave
exports.applyLeave = async (req, res) => {
  try {
    const { employeeId, type, startDate, endDate, reason } = req.body;

    // Validate input
    if (!employeeId || !type || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: 'All fields are required to apply for leave.' });
    }

    // Create the leave record
    const newLeave = await Leave.create({
      employeeId,
      leaveType: type,
      startDate,
      endDate,
      reason
    });

    res.status(201).json({ message: 'Leave application submitted successfully.', leave: newLeave });
  } catch (error) {
    console.error('Leave Application Error:', error);
    res.status(500).json({ message: 'Error submitting leave application.', error: error.message });
  }
};

// 2. Admin: Get all Leave Requests (with Employee details)
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      include: [{ 
        model: Employee, 
        attributes: ['id', 'AcctName', 'AcctId', 'department'] // Fetching core employee details
      }],
      order: [['createdAt', 'DESC']] // Newest first
    });

    res.status(200).json(leaves);
  } catch (error) {
    console.error('Fetch Leaves Error:', error);
    res.status(500).json({ message: 'Error fetching leave requests.', error: error.message });
  }
};

// 3. Admin: Update Leave Status (Approve/Reject)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Ensure valid status
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status update.' });
    }

    const leave = await Leave.findByPk(id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found.' });
    }

    // Update the database
    await leave.update({ status });

    res.status(200).json({ message: `Leave request has been ${status.toLowerCase()}.` });
  } catch (error) {
    console.error('Update Leave Error:', error);
    res.status(500).json({ message: 'Error updating leave status.', error: error.message });
  }
};