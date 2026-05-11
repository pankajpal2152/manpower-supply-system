import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Save, Search, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Assuming your backend runs on port 5000. Adjust if necessary.
const API_BASE_URL = 'http://localhost:5000/api/attendance'; 

const AttendanceManagement = () => {
  const [date, setDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  
  // State is now an object holding status, checkIn, and checkOut for each employee
  const [attendanceData, setAttendanceData] = useState({}); 
  const [loading, setLoading] = useState(false);

  // 1. Fetch Data from Database on Load or Date Change
  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); // Get auth token
        const formattedDate = format(date, 'yyyy-MM-dd');
        
        const response = await axios.get(`${API_BASE_URL}?date=${formattedDate}`, {
          headers: { Authorization: `Bearer ${token}` } // Secure request
        });

        setEmployees(response.data.employees);

        // Map existing database records into our React state
        const initialData = {};
        response.data.attendanceRecords.forEach(record => {
          initialData[record.employeeId] = {
            status: record.status,
            checkIn: record.checkIn || '',
            checkOut: record.checkOut || ''
          };
        });
        
        setAttendanceData(initialData);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        // Optional: Add a toast notification here for errors
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [date]); // Re-run whenever the calendar date changes

  // 2. Handle changes for Status dropdown
  const handleStatusChange = (empId, newStatus) => {
    setAttendanceData(prev => ({
      ...prev,
      [empId]: { ...prev[empId], status: newStatus }
    }));
  };

  // 3. Handle changes for Time Inputs
  const handleTimeChange = (empId, field, value) => {
    setAttendanceData(prev => ({
      ...prev,
      [empId]: { ...prev[empId], [field]: value }
    }));
  };

  // Helper for UI badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present': return <Badge className="bg-green-500">Present</Badge>;
      case 'Absent': return <Badge variant="destructive">Absent</Badge>;
      case 'Late': return <Badge className="bg-yellow-500 text-black">Late</Badge>;
      case 'On Leave': return <Badge variant="outline" className="border-blue-500 text-blue-500">On Leave</Badge>;
      default: return <Badge variant="secondary">Not Marked</Badge>;
    }
  };

  // 4. Save Data Back to Database
  const saveAttendance = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Transform state object into the array format expected by backend
      const payload = employees.map(emp => ({
        employeeId: emp.id,
        status: attendanceData[emp.id]?.status || 'Present', // Default to Present if untouched
        checkIn: attendanceData[emp.id]?.checkIn || null,
        checkOut: attendanceData[emp.id]?.checkOut || null
      }));

      await axios.post(`${API_BASE_URL}/save`, {
        date: format(date, 'yyyy-MM-dd'),
        attendanceData: payload
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Attendance saved successfully!");
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert("Failed to save attendance. Ensure you have Admin permissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Daily Attendance</h1>
          <p className="text-slate-500">Manage and track employee presence, check-ins, and check-outs.</p>
        </div>

        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          
          <Button onClick={saveAttendance} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            {loading ? "Processing..." : <><Save className="mr-2 h-4 w-4" /> Save Attendance</>}
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <Card className="border-none shadow-md">
        <CardHeader className="bg-white border-b">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-blue-600" />
            Employee Attendance List - {format(date, 'dd MMM yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[120px]">Employee ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead className="w-[180px]">Set Status</TableHead>
                <TableHead className="text-right">Current Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    {loading ? "Loading employees..." : "No active employees found."}
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp) => {
                  // Safely extract values to prevent undefined errors during render
                  const currentData = attendanceData[emp.id] || {};
                  
                  return (
                    <TableRow key={emp.id} className="hover:bg-slate-50 transition-colors">
                      <TableCell className="font-mono text-sm font-bold">{emp.AcctId}</TableCell>
                      <TableCell className="font-medium">{emp.AcctName}</TableCell>
                      
                      {/* Check-In Time Input */}
                      <TableCell>
                        <input 
                          type="time" 
                          className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                          value={currentData.checkIn || ''}
                          onChange={(e) => handleTimeChange(emp.id, 'checkIn', e.target.value)}
                        />
                      </TableCell>
                      
                      {/* Check-Out Time Input */}
                      <TableCell>
                        <input 
                          type="time" 
                          className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                          value={currentData.checkOut || ''}
                          onChange={(e) => handleTimeChange(emp.id, 'checkOut', e.target.value)}
                        />
                      </TableCell>

                      {/* Status Dropdown */}
                      <TableCell>
                        <Select 
                          value={currentData.status || ''} 
                          onValueChange={(val) => handleStatusChange(emp.id, val)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Set Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Present">Present</SelectItem>
                            <SelectItem value="Absent">Absent</SelectItem>
                            <SelectItem value="Late">Late</SelectItem>
                            <SelectItem value="On Leave">On Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      
                      <TableCell className="text-right">
                        {getStatusBadge(currentData.status)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagement;