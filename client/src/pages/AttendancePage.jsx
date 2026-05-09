import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Save, Search, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const AttendanceManagement = () => {
  const [date, setDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({}); // Stores status by employeeId
  const [loading, setLoading] = useState(false);

  // Mock fetching employees - Replace with your API call: axios.get('/api/employees')
  useEffect(() => {
    const fetchEmployees = async () => {
      // simulate API
      const mockData = [
        { id: 1, AcctName: 'Amit Singh', AcctId: 'BB-1027', department: 'Operations' },
        { id: 2, AcctName: 'Priya Sharma', AcctId: 'BB-1028', department: 'HR' },
      ];
      setEmployees(mockData);
    };
    fetchEmployees();
  }, []);

  const handleStatusChange = (empId, status) => {
    setAttendance(prev => ({ ...prev, [empId]: status }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present': return <Badge className="bg-green-500">Present</Badge>;
      case 'Absent': return <Badge variant="destructive">Absent</Badge>;
      case 'Late': return <Badge className="bg-yellow-500 text-black">Late</Badge>;
      case 'On Leave': return <Badge variant="outline" className="border-blue-500 text-blue-500">On Leave</Badge>;
      default: return <Badge variant="secondary">Not Marked</Badge>;
    }
  };

  const saveAttendance = async () => {
    setLoading(true);
    // Logic: Send attendance object and date to backend
    console.log("Saving for date:", format(date, 'yyyy-MM-dd'), attendance);
    setTimeout(() => {
      setLoading(false);
      alert("Attendance saved successfully!");
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Daily Attendance</h1>
          <p className="text-slate-500">Manage and track employee presence for your workforce.</p>
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
            {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Attendance</>}
          </Button>
        </div>
      </div>

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
                <TableHead className="w-[150px]">Employee ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="w-[200px]">Status</TableHead>
                <TableHead className="text-right">Current Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-mono text-sm font-bold">{emp.AcctId}</TableCell>
                  <TableCell className="font-medium">{emp.AcctName}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>
                    <Select onValueChange={(val) => handleStatusChange(emp.id, val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
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
                    {getStatusBadge(attendance[emp.id])}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagement;