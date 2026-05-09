// src/components/PayslipTemplate.jsx
import React from 'react';
import { format } from 'date-fns';

const PayslipTemplate = ({ payroll, month, year }) => {
  if (!payroll) return null;

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  // Month names for the header
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[month - 1];

  return (
    <div id="payslip-document" className="bg-white p-8 w-[800px] mx-auto text-slate-800 font-sans" style={{ minHeight: '1056px' }}>
      
      {/* COMPANY HEADER */}
      <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-wider">MANPOWER SUPPLY CO.</h1>
        <p className="text-sm text-slate-500 mt-1">123 Enterprise Avenue, Tech District, City - 400001</p>
        <p className="text-sm text-slate-500">Email: hr@manpowersupply.com | Phone: +91-9876543210</p>
        <h2 className="text-xl font-semibold mt-4 text-blue-800 uppercase tracking-widest">
          Payslip for {monthName} {year}
        </h2>
      </div>

      {/* EMPLOYEE DETAILS GRID */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8 text-sm">
        <div className="flex justify-between border-b border-slate-200 pb-1">
          <span className="font-semibold text-slate-600">Employee Name:</span>
          {/* We safely access Employee data if your backend joined it, otherwise fallback to ID */}
          <span className="font-bold">{payroll.Employee?.AcctName || `Employee #${payroll.employeeId}`}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-1">
          <span className="font-semibold text-slate-600">Employee ID:</span>
          <span>{payroll.Employee?.AcctId || `EMP-${payroll.employeeId}`}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-1">
          <span className="font-semibold text-slate-600">Payable Days:</span>
          <span>{payroll.payableDays} / {payroll.totalDays}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-1">
          <span className="font-semibold text-slate-600">Bank Name:</span>
          <span>{payroll.Employee?.BankName || "-"}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-1">
          <span className="font-semibold text-slate-600">Bank Account No:</span>
          <span>{payroll.Employee?.AcctNo || "-"}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-1">
          <span className="font-semibold text-slate-600">PAN Number:</span>
          <span>{payroll.Employee?.PanNo || "-"}</span>
        </div>
      </div>

      {/* EARNINGS & DEDUCTIONS TABLE */}
      <div className="flex w-full border-2 border-slate-800 mb-6">
        
        {/* EARNINGS COLUMN */}
        <div className="w-1/2 border-r-2 border-slate-800">
          <div className="bg-slate-100 font-bold text-center py-2 border-b-2 border-slate-800">EARNINGS</div>
          <div className="p-4 space-y-3 text-sm min-h-[200px]">
            <div className="flex justify-between">
              <span>Basic Pay (Pro-Rata)</span>
              <span>{formatCurrency(payroll.earnedBasic)}</span>
            </div>
            <div className="flex justify-between">
              <span>Allowances (Pro-Rata)</span>
              <span>{formatCurrency(payroll.earnedAllowances)}</span>
            </div>
            {/* You can add more specific breakdown here if your Payroll model stores it */}
          </div>
          <div className="flex justify-between font-bold bg-slate-50 p-3 border-t-2 border-slate-800">
            <span>Gross Earnings</span>
            <span>{formatCurrency(payroll.grossEarned)}</span>
          </div>
        </div>

        {/* DEDUCTIONS COLUMN */}
        <div className="w-1/2">
          <div className="bg-slate-100 font-bold text-center py-2 border-b-2 border-slate-800">DEDUCTIONS</div>
          <div className="p-4 space-y-3 text-sm min-h-[200px]">
            <div className="flex justify-between">
              <span>Provident Fund (PF)</span>
              <span>{formatCurrency(payroll.pfDeduction)}</span>
            </div>
            <div className="flex justify-between">
              <span>ESI</span>
              <span>{formatCurrency(payroll.esiDeduction)}</span>
            </div>
            <div className="flex justify-between">
              <span>TDS (Income Tax)</span>
              <span>{formatCurrency(payroll.tdsDeduction)}</span>
            </div>
            <div className="flex justify-between">
              <span>Other Deductions</span>
              <span>{formatCurrency(payroll.otherDeductions)}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold bg-slate-50 p-3 border-t-2 border-slate-800">
            <span>Total Deductions</span>
            <span>{formatCurrency(
              parseFloat(payroll.pfDeduction) + 
              parseFloat(payroll.esiDeduction) + 
              parseFloat(payroll.tdsDeduction) + 
              parseFloat(payroll.otherDeductions)
            )}</span>
          </div>
        </div>
      </div>

      {/* NET PAY HIGHLIGHT */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md flex justify-between items-center mb-8">
        <span className="font-bold text-blue-900 text-lg">NET PAYABLE SALARY</span>
        <span className="font-bold text-blue-900 text-2xl tracking-wider">{formatCurrency(payroll.netPayable)}</span>
      </div>

      {/* FOOTER / SIGNATURES */}
      <div className="mt-16 flex justify-between px-8 text-sm font-semibold text-slate-600">
        <div className="text-center">
          <div className="border-b border-slate-400 w-40 mb-2"></div>
          Employer Signature
        </div>
        <div className="text-center">
          <div className="border-b border-slate-400 w-40 mb-2"></div>
          Employee Signature
        </div>
      </div>
      <div className="text-center mt-12 text-xs text-slate-400 italic">
        This is a computer-generated document and does not require a physical signature.
      </div>
    </div>
  );
};

export default PayslipTemplate;