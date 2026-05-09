// src/pages/PayrollDashboard.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { PlayCircle, FileText, CheckCircle, AlertCircle, Calendar, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js'; // <-- NEW IMPORT

// Shadcn UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import our new Template
import PayslipTemplate from '../components/PayslipTemplate'; 

const PayrollDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
  
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // NEW: State to hold the currently selected payslip for PDF generation
  const [pdfData, setPdfData] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const token = localStorage.getItem('token');

  const months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' },
    { value: 3, label: 'March' }, { value: 4, label: 'April' },
    { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' },
    { value: 9, label: 'September' }, { value: 10, label: 'October' },
    { value: 11, label: 'November' }, { value: 12, label: 'December' }
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const handleGeneratePayroll = async () => {
    setLoading(true);
    setError(null);
    setPayrolls([]); 

    try {
      const response = await axios.post(
        '/api/payroll/generate', 
        { month: selectedMonth, year: selectedYear },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setPayrolls(response.data.data);
      alert(response.data.message); 

    } catch (err) {
      console.error('Error generating payroll:', err);
      setError(err.response?.data?.message || 'An error occurred while generating payroll.');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PDF GENERATION LOGIC
  // ==========================================
  const handleDownloadPDF = (payrollRow) => {
    // 1. Set the data into the hidden template
    setPdfData(payrollRow);
    setIsGeneratingPdf(true);

    // 2. We use setTimeout to give React a few milliseconds to render the hidden template
    setTimeout(() => {
      const element = document.getElementById('payslip-document');
      
      const opt = {
        margin:       0.5,
        filename:     `Payslip_${payrollRow.Employee?.AcctName || payrollRow.employeeId}_${selectedMonth}_${selectedYear}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true }, // scale: 2 gives high resolution
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      // 3. Generate the PDF and save it
      html2pdf().set(opt).from(element).save().then(() => {
        // 4. Clean up state after download
        setPdfData(null);
        setIsGeneratingPdf(false);
      });
    }, 500); 
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen relative">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payroll Processing</h1>
        <p className="text-slate-500">Generate, review, and manage monthly employee salaries.</p>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-white border-b pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-blue-600" />
            Payroll Generation Engine
          </CardTitle>
          <CardDescription>Select the billing month and year to auto-calculate salaries based on attendance.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 flex flex-col md:flex-row items-end gap-4 bg-slate-50/50">
          
          <div className="space-y-2 w-full md:w-48">
            <label className="text-sm font-medium text-slate-700">Select Month</label>
            <Select value={selectedMonth.toString()} onValueChange={(val) => setSelectedMonth(parseInt(val))}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(m => (
                  <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 w-full md:w-32">
            <label className="text-sm font-medium text-slate-700">Select Year</label>
            <Select value={selectedYear.toString()} onValueChange={(val) => setSelectedYear(parseInt(val))}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleGeneratePayroll} 
            disabled={loading || isGeneratingPdf} 
            className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto h-10"
          >
            {loading ? "Processing Engine..." : <><PlayCircle className="mr-2 h-4 w-4" /> Run Payroll Generator</>}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md flex items-center gap-2">
          <AlertCircle className="h-5 w-5" /> {error}
        </div>
      )}

      {payrolls.length > 0 && (
        <Card className="shadow-sm border-slate-200 animation-fade-in">
          <CardHeader className="bg-white border-b">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>Generated Payslips ({months.find(m => m.value === selectedMonth)?.label} {selectedYear})</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="mr-1 h-3 w-3" /> Processed</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Emp ID</TableHead>
                  <TableHead className="text-center">Payable Days</TableHead>
                  <TableHead className="text-right">Gross Earned</TableHead>
                  <TableHead className="text-right">PF + ESI (Ded.)</TableHead>
                  <TableHead className="text-right text-blue-700 font-bold">Net Payable</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrolls.map((pay) => (
                  <TableRow key={pay.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-700">
                      {pay.Employee?.AcctId || `EMP-${pay.employeeId}`}
                    </TableCell>
                    <TableCell className="text-center">{pay.payableDays} / {pay.totalDays}</TableCell>
                    <TableCell className="text-right">{formatCurrency(pay.grossEarned)}</TableCell>
                    <TableCell className="text-right text-red-600">
                      - {formatCurrency(parseFloat(pay.pfDeduction) + parseFloat(pay.esiDeduction))}
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-700 text-lg">
                      {formatCurrency(pay.netPayable)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="border-yellow-400 text-yellow-700">{pay.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      
                      {/* UPDATED: PDF Download Button */}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50" 
                        onClick={() => handleDownloadPDF(pay)}
                        disabled={isGeneratingPdf}
                      >
                        {isGeneratingPdf && pdfData?.id === pay.id ? (
                           "Generating..."
                        ) : (
                          <><Download className="mr-1 h-4 w-4" /> PDF Payslip</>
                        )}
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 
        HIDDEN RENDER AREA FOR PDF GENERATION 
        This is visually hidden off-screen so the user never sees it, 
        but html2pdf can still capture it!
      */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        {pdfData && (
          <PayslipTemplate 
            payroll={pdfData} 
            month={selectedMonth} 
            year={selectedYear} 
          />
        )}
      </div>

    </div>
  );
};

export default PayrollDashboard;