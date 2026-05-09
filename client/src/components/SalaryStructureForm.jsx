// src/components/SalaryStructureForm.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Save } from 'lucide-react';

const SalaryStructureForm = ({ employeeId }) => {
  const [formData, setFormData] = useState({
    basicPay: 0, dearnessAllowance: 0, houseRentAllowance: 0, incentives: 0,
    attendanceBonus: 0, cityCompensatoryAllowance: 0, mealAllowance: 0,
    uniformAllowance: 0, specialAllowance: 0, tdsDeduction: 0, otherDeductions: 0
  });

  const [preview, setPreview] = useState({ gross: 0, pf: 0, esi: 0, net: 0 });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  // Real-time Preview Calculation
  useEffect(() => {
    const gross = formData.basicPay + formData.dearnessAllowance + formData.houseRentAllowance + 
                  formData.incentives + formData.attendanceBonus + formData.cityCompensatoryAllowance + 
                  formData.mealAllowance + formData.uniformAllowance + formData.specialAllowance;
    
    const pf = (formData.basicPay + formData.dearnessAllowance) * 0.12;
    const esi = gross <= 21000 ? gross * 0.0075 : 0;
    const deductions = pf + esi + formData.tdsDeduction + formData.otherDeductions;
    const net = gross - deductions;

    setPreview({ gross, pf, esi, net });
  }, [formData]);

  const handleSave = async () => {
    console.log("Saving payload to backend:", { employeeId, ...formData });
    // axios.post('/api/salary/save', { employeeId, ...formData })
  };

  return (
    <Card className="max-w-4xl shadow-sm border-slate-200">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" /> Salary Structure Configuration
        </CardTitle>
        <CardDescription>Define earnings and standard deductions. PF and ESI are auto-calculated.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* EARNINGS COLUMN */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 border-b pb-2">Earnings (Applicable to ESI)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-xs text-slate-500">Basic Pay *</label><Input type="number" name="basicPay" onChange={handleChange} /></div>
              <div className="space-y-1"><label className="text-xs text-slate-500">Dearness Allowance (DA)</label><Input type="number" name="dearnessAllowance" onChange={handleChange} /></div>
              <div className="space-y-1"><label className="text-xs text-slate-500">House Rent (HRA)</label><Input type="number" name="houseRentAllowance" onChange={handleChange} /></div>
              <div className="space-y-1"><label className="text-xs text-slate-500">Incentives</label><Input type="number" name="incentives" onChange={handleChange} /></div>
              <div className="space-y-1"><label className="text-xs text-slate-500">Attendance Bonus</label><Input type="number" name="attendanceBonus" onChange={handleChange} /></div>
              <div className="space-y-1"><label className="text-xs text-slate-500">City Compensatory (CCA)</label><Input type="number" name="cityCompensatoryAllowance" onChange={handleChange} /></div>
              <div className="space-y-1"><label className="text-xs text-slate-500">Meal Allowance</label><Input type="number" name="mealAllowance" onChange={handleChange} /></div>
              <div className="space-y-1"><label className="text-xs text-slate-500">Uniform Allowance</label><Input type="number" name="uniformAllowance" onChange={handleChange} /></div>
              <div className="space-y-1"><label className="text-xs text-slate-500">Special Allowance</label><Input type="number" name="specialAllowance" onChange={handleChange} /></div>
            </div>
          </div>

          {/* DEDUCTIONS & PREVIEW COLUMN */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 border-b pb-2">Manual Deductions</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-xs text-slate-500">TDS (Income Tax)</label><Input type="number" name="tdsDeduction" onChange={handleChange} /></div>
                <div className="space-y-1"><label className="text-xs text-slate-500">Other Deductions</label><Input type="number" name="otherDeductions" onChange={handleChange} /></div>
              </div>
            </div>

            {/* LIVE PREVIEW WIDGET */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-blue-900 text-sm">Real-time Calculation Preview</h3>
              <div className="flex justify-between text-sm"><span className="text-slate-600">Gross Salary:</span> <span className="font-medium">₹{preview.gross.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-600">Est. PF (12% of Basic+DA):</span> <span className="font-medium text-red-600">- ₹{preview.pf.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-600">Est. ESI (0.75% of Gross):</span> <span className="font-medium text-red-600">- ₹{preview.esi.toFixed(2)}</span></div>
              <div className="border-t border-blue-200 pt-2 flex justify-between items-center">
                <span className="font-bold text-blue-900">Final Net Salary:</span>
                <span className="font-bold text-xl text-green-600">₹{preview.net.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" /> Save Salary Structure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryStructureForm;