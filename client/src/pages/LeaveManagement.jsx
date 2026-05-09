import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar as CalendarIcon, CheckCircle, XCircle, Send, Clock } from 'lucide-react';
import { format } from 'date-fns';

// Shadcn UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const LeaveManagement = () => {
  const [loading, setLoading] = useState(false);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  
  // Get the logged-in user's token (assuming you store it in localStorage after login)
  const token = localStorage.getItem('token'); 
  // Get the logged-in user's data
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};

  // Form State for "Apply Leave"
  const [leaveData, setLeaveData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // ==========================================
  // API CALL: Fetch all leaves on component mount
  // ==========================================
  const fetchLeaves = async () => {
    try {
      // Pass the token in the headers for security
      const response = await axios.get('/api/leaves', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      // Optional: Add a toast notification here in the future
    }
  };

  useEffect(() => {
    fetchLeaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==========================================
  // API CALL: Handle Form Submission (Apply)
  // ==========================================
  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // We attach the logged-in user's ID as the employee applying.
      // Note: In a real system, you might map the User.id to an Employee.id
      const payload = {
        employeeId: currentUser.id || 1, // Fallback to 1 for testing if user ID isn't linked
        ...leaveData
      };

      await axios.post('/api/leaves/apply', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Leave Request Submitted Successfully!");
      setLeaveData({ type: '', startDate: '', endDate: '', reason: '' }); // Reset form
      fetchLeaves(); // Refresh the admin table
      
    } catch (error) {
      console.error('Error applying for leave:', error);
      alert(error.response?.data?.message || "Failed to submit leave request.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // API CALL: Handle Admin Approvals
  // ==========================================
  const updateLeaveStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/leaves/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update UI optimistically or fetch again
      setPendingLeaves(prev => prev.map(leave => 
        leave.id === id ? { ...leave, status: newStatus } : leave
      ));
      
    } catch (error) {
      console.error('Error updating status:', error);
      alert("Failed to update leave status. You may not have permission.");
    }
  };

  // Helper for UI badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      case 'Rejected': return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">Pending</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Leave Management</h1>
        <p className="text-slate-500">Apply for time off and manage employee leave requests.</p>
      </div>

      <Tabs defaultValue="apply" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="apply">Apply for Leave</TabsTrigger>
          <TabsTrigger value="approval">Admin Approval Panel</TabsTrigger>
        </TabsList>

        {/* TAB 1: APPLY LEAVE FORM */}
        <TabsContent value="apply">
          <Card className="max-w-2xl shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle>Leave Application Form</CardTitle>
              <CardDescription>Submit your request for time off. It will be sent to HR for approval.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApplyLeave} className="space-y-4">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Leave Type</label>
                  <Select onValueChange={(val) => setLeaveData({...leaveData, type: val})} value={leaveData.type} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                      <SelectItem value="Earned Leave">Earned Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input 
                      type="date" 
                      value={leaveData.startDate} 
                      onChange={(e) => setLeaveData({...leaveData, startDate: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input 
                      type="date" 
                      value={leaveData.endDate} 
                      onChange={(e) => setLeaveData({...leaveData, endDate: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Reason for Leave</label>
                  <Textarea 
                    placeholder="Briefly explain your reason for requesting time off..." 
                    className="min-h-[100px]"
                    value={leaveData.reason}
                    onChange={(e) => setLeaveData({...leaveData, reason: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  {loading ? "Submitting..." : <><Send className="mr-2 h-4 w-4" /> Submit Request</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: ADMIN APPROVAL PANEL */}
        <TabsContent value="approval">
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Employee Leave Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingLeaves.map((leave) => (
                    <TableRow key={leave.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="font-medium">{leave.Employee?.AcctName || 'Unknown'}</div>
                        <div className="text-xs text-slate-500">{leave.Employee?.AcctId || `ID: ${leave.employeeId}`}</div>
                      </TableCell>
                      <TableCell className="font-medium">{leave.leaveType}</TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd')}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={leave.reason}>
                        {leave.reason}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(leave.status)}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {leave.status === 'Pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => updateLeaveStatus(leave.id, 'Approved')}
                            >
                              <CheckCircle className="mr-1 h-4 w-4" /> Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => updateLeaveStatus(leave.id, 'Rejected')}
                            >
                              <XCircle className="mr-1 h-4 w-4" /> Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendingLeaves.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-slate-500">
                        No leave requests found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
      </Tabs>
    </div>
  );
};

export default LeaveManagement;