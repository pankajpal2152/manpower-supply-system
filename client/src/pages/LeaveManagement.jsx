import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  Calendar as CalendarIcon, CheckCircle, XCircle, Send, Clock, 
  Search, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, History 
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

// Shadcn UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LeaveManagement = () => {
  const [loading, setLoading] = useState(false);
  
  // Data States
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  
  // Table Controls
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const token = localStorage.getItem('token'); 

  // Form State
  const [leaveData, setLeaveData] = useState({
    employeeId: '',
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // ==========================================
  // INITIAL DATA FETCHING
  // ==========================================
  const fetchData = async () => {
    try {
      // Fetch Leaves
      const leaveRes = await axios.get('/api/leaves', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeaves(leaveRes.data);
      setFilteredLeaves(leaveRes.data);

      // Fetch Employees for the dropdown
      const empRes = await axios.get('/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(empRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ==========================================
  // SEARCH & FILTER LOGIC
  // ==========================================
  useEffect(() => {
    setCurrentPage(1); 
    if (!searchTerm.trim()) {
      setFilteredLeaves(leaves);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = leaves.filter((leave) => {
      const empName = leave.Employee?.AcctName || "";
      const empId = leave.Employee?.AcctId || "";
      return (
        empName.toLowerCase().includes(lowercasedSearch) ||
        empId.toLowerCase().includes(lowercasedSearch) ||
        leave.leaveType.toLowerCase().includes(lowercasedSearch) ||
        leave.status.toLowerCase().includes(lowercasedSearch) ||
        leave.reason.toLowerCase().includes(lowercasedSearch)
      );
    });

    setFilteredLeaves(filtered);
  }, [searchTerm, leaves]);

  // ==========================================
  // SORTING LOGIC
  // ==========================================
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedLeaves = useMemo(() => {
    let sortableItems = [...filteredLeaves];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Handle nested employee relations for sorting
        if (sortConfig.key === 'AcctName' || sortConfig.key === 'AcctId') {
          valA = a.Employee ? a.Employee[sortConfig.key] : "";
          valB = b.Employee ? b.Employee[sortConfig.key] : "";
        }

        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredLeaves, sortConfig]);

  // ==========================================
  // PAGINATION LOGIC
  // ==========================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedLeaves.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedLeaves.length / itemsPerPage);

  const renderSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <ArrowUpDown size={14} className="ml-1 text-slate-400 opacity-50 inline" />;
    if (sortConfig.direction === 'ascending') return <ArrowUp size={14} className="ml-1 text-blue-600 inline" />;
    return <ArrowDown size={14} className="ml-1 text-blue-600 inline" />;
  };

  // ==========================================
  // API CALLS: APPLY & APPROVE
  // ==========================================
  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('/api/leaves/apply', leaveData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Leave Request Submitted Successfully!");
      setLeaveData({ employeeId: '', type: '', startDate: '', endDate: '', reason: '' }); 
      fetchData(); 
    } catch (error) {
      console.error('Error applying for leave:', error);
      alert(error.response?.data?.message || "❌ Failed to submit leave request.");
    } finally {
      setLoading(false);
    }
  };

  const updateLeaveStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/leaves/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setLeaves(prev => prev.map(leave => 
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
      case 'Approved': return <Badge className="bg-green-500 hover:bg-green-600 text-white">Approved</Badge>;
      case 'Rejected': return <Badge variant="destructive" className="bg-red-500 text-white">Rejected</Badge>;
      default: return <Badge variant="outline" className="border-yellow-500 text-yellow-600 bg-yellow-50">Pending</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
            Leave Management
          </h1>
          <p className="text-slate-500 mt-1">Apply for time off and manage employee leave histories.</p>
        </div>
      </div>

      <Tabs defaultValue="approval" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-white border border-slate-200 shadow-sm p-1 rounded-lg">
          <TabsTrigger value="approval" className="rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Admin & History Panel</TabsTrigger>
          <TabsTrigger value="apply" className="rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Apply for Leave</TabsTrigger>
        </TabsList>

        {/* TAB 1: ADMIN APPROVAL & HISTORY PANEL */}
        <TabsContent value="approval" className="space-y-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <History className="h-5 w-5 text-slate-500" />
              Leave History & Approvals
            </h3>
            <div className="relative w-full sm:w-80">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                className="w-full border border-slate-300 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Search by name, ID, reason, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-200">
                  <TableRow className="hover:bg-slate-50">
                    <TableHead className="cursor-pointer font-semibold text-slate-600 select-none py-4" onClick={() => handleSort('AcctId')}>
                      Emp ID {renderSortIcon('AcctId')}
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold text-slate-600 select-none" onClick={() => handleSort('AcctName')}>
                      Employee Name {renderSortIcon('AcctName')}
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold text-slate-600 select-none" onClick={() => handleSort('leaveType')}>
                      Leave Type {renderSortIcon('leaveType')}
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold text-slate-600 select-none" onClick={() => handleSort('startDate')}>
                      Duration {renderSortIcon('startDate')}
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600">Reason</TableHead>
                    <TableHead className="cursor-pointer font-semibold text-slate-600 select-none" onClick={() => handleSort('status')}>
                      Status {renderSortIcon('status')}
                    </TableHead>
                    <TableHead className="text-right font-semibold text-slate-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-slate-500">
                        {searchTerm ? "No leave records match your search." : "No leave history found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentItems.map((leave) => (
                      <TableRow key={leave.id} className="hover:bg-slate-50 border-b border-slate-100 transition-colors">
                        <TableCell className="font-mono text-sm font-medium text-slate-600">
                          {leave.Employee?.AcctId || `ID: ${leave.employeeId}`}
                        </TableCell>
                        <TableCell className="font-bold text-slate-800">
                          {leave.Employee?.AcctName || 'Unknown'}
                        </TableCell>
                        <TableCell>
                          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-semibold">
                            {leave.leaveType}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600 whitespace-nowrap">
                          {format(new Date(leave.startDate), 'dd MMM yyyy')} - {format(new Date(leave.endDate), 'dd MMM yyyy')}
                          <div className="text-xs text-slate-400 mt-0.5">
                            ({differenceInDays(new Date(leave.endDate), new Date(leave.startDate)) + 1} Days)
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-sm text-slate-600" title={leave.reason}>
                          {leave.reason}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(leave.status)}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {leave.status === 'Pending' ? (
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors h-8 px-2"
                                onClick={() => updateLeaveStatus(leave.id, 'Approved')}
                              >
                                <CheckCircle className="mr-1 h-3.5 w-3.5" /> Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 transition-colors h-8 px-2"
                                onClick={() => updateLeaveStatus(leave.id, 'Rejected')}
                              >
                                <XCircle className="mr-1 h-3.5 w-3.5" /> Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium italic">Action Completed</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination Footer */}
            {sortedLeaves.length > 0 && (
              <div className="bg-slate-50 border-t border-slate-200 p-4 d-flex flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm text-slate-500 font-medium">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedLeaves.length)} of {sortedLeaves.length} entries
                </span>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="h-8 w-8 p-0">
                    <ChevronLeft size={16} />
                  </Button>
                  {[...Array(totalPages)].map((_, index) => (
                    <Button 
                      key={index} 
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setCurrentPage(index + 1)}
                      className={`h-8 w-8 p-0 ${currentPage === index + 1 ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="h-8 w-8 p-0">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* TAB 2: APPLY LEAVE FORM */}
        <TabsContent value="apply">
          <Card className="max-w-3xl shadow-sm border-slate-200 rounded-xl overflow-hidden mx-auto">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
              <CardTitle className="text-xl text-slate-800">New Leave Application</CardTitle>
              <CardDescription>Fill out the details below to submit a formal time-off request.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleApplyLeave} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Select Employee (Admin capability) */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Select Employee *</label>
                    <select 
                      className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      value={leaveData.employeeId} 
                      onChange={(e) => setLeaveData({...leaveData, employeeId: e.target.value})} 
                      required
                    >
                      <option value="">-- Choose an Employee --</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.AcctId} - {emp.AcctName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Leave Type *</label>
                    <select 
                      className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      value={leaveData.type} 
                      onChange={(e) => setLeaveData({...leaveData, type: e.target.value})} 
                      required
                    >
                      <option value="">-- Select Category --</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Casual Leave">Casual Leave</option>
                      <option value="Earned Leave">Earned Leave</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Start Date *</label>
                    <input 
                      type="date" 
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={leaveData.startDate} 
                      onChange={(e) => setLeaveData({...leaveData, startDate: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">End Date *</label>
                    <input 
                      type="date" 
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={leaveData.endDate} 
                      onChange={(e) => setLeaveData({...leaveData, endDate: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Reason / Description *</label>
                  <textarea 
                    placeholder="Briefly explain the reason for requesting time off..." 
                    className="w-full border border-slate-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y"
                    value={leaveData.reason}
                    onChange={(e) => setLeaveData({...leaveData, reason: e.target.value})}
                    required
                  ></textarea>
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 shadow-md transition-all">
                    {loading ? "Processing Submission..." : <><Send className="mr-2 h-5 w-5" /> Submit Formal Leave Request</>}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
      </Tabs>
    </div>
  );
};

export default LeaveManagement;