import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calculator, Save } from 'lucide-react';

const SalaryStructureForm = ({ employeeId }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Initial State matching your database columns
  const [formData, setFormData] = useState({
    basicPay: '', dearnessAllowance: '', houseRentAllowance: '',
    incentives: '', attendanceBonus: '', cityCompensatoryAllowance: '',
    mealAllowance: '', uniformAllowance: '', specialAllowance: '',
    tdsDeduction: '', otherDeductions: ''
  });

  // Fetch existing salary structure if it exists
  useEffect(() => {
    const fetchExistingSalary = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/salary/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data && response.data.id) {
          // Populate form with existing data
          setFormData({
            basicPay: response.data.basicPay || '',
            dearnessAllowance: response.data.dearnessAllowance || '',
            houseRentAllowance: response.data.houseRentAllowance || '',
            incentives: response.data.incentives || '',
            attendanceBonus: response.data.attendanceBonus || '',
            cityCompensatoryAllowance: response.data.cityCompensatoryAllowance || '',
            mealAllowance: response.data.mealAllowance || '',
            uniformAllowance: response.data.uniformAllowance || '',
            specialAllowance: response.data.specialAllowance || '',
            tdsDeduction: response.data.tdsDeduction || '',
            otherDeductions: response.data.otherDeductions || ''
          });
        }
      } catch (error) {
        console.error('Error fetching salary structure:', error);
      } finally {
        setFetching(false);
      }
    };
    fetchExistingSalary();
  }, [employeeId]);

  const handleChange = (e) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setFormData({ ...formData, [e.target.name]: value });
  };

  // --- REAL-TIME CALCULATIONS (Enterprise Grade) ---
  const parseNum = (val) => parseFloat(val) || 0;

  const basic = parseNum(formData.basicPay);
  const da = parseNum(formData.dearnessAllowance);
  const hra = parseNum(formData.houseRentAllowance);
  const incentives = parseNum(formData.incentives);
  const attBonus = parseNum(formData.attendanceBonus);
  const cca = parseNum(formData.cityCompensatoryAllowance);
  const meal = parseNum(formData.mealAllowance);
  const uniform = parseNum(formData.uniformAllowance);
  const special = parseNum(formData.specialAllowance);

  const tds = parseNum(formData.tdsDeduction);
  const otherDed = parseNum(formData.otherDeductions);

  // Core Math
  const grossSalary = basic + da + hra + incentives + attBonus + cca + meal + uniform + special;
  
  // PF is usually 12% of Basic + DA
  const estPF = basic > 0 ? (basic + da) * 0.12 : 0;
  
  // ESI is usually 0.75% of Gross Salary
  const estESI = grossSalary > 0 ? grossSalary * 0.0075 : 0;

  const netSalary = grossSalary - estPF - estESI - tds - otherDed;

  // --- SAVE HANDLER ---
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        employeeId,
        ...formData,
        grossSalary: grossSalary.toFixed(2),
        pfContribution: estPF.toFixed(2),
        esiContribution: estESI.toFixed(2),
        netSalary: netSalary.toFixed(2)
      };

      await axios.post('/api/salary/save', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('✅ Salary Structure Saved Successfully!');
    } catch (error) {
      console.error('Error saving salary:', error);
      alert('❌ Failed to save salary structure. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-center text-slate-500">Loading Salary Data...</div>;

  return (
    <div className="bg-white text-slate-800 font-sans">
      {/* Header */}
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
          <Calculator className="text-blue-600 h-5 w-5" />
          Salary Structure Configuration
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Define earnings and standard deductions. PF and ESI are auto-calculated.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Earnings */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-lg font-semibold border-b border-slate-200 pb-2">Earnings (Applicable to ESI)</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Basic Pay *</label>
              <input type="text" name="basicPay" value={formData.basicPay} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Dearness Allowance (DA)</label>
              <input type="text" name="dearnessAllowance" value={formData.dearnessAllowance} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">House Rent (HRA)</label>
              <input type="text" name="houseRentAllowance" value={formData.houseRentAllowance} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Incentives</label>
              <input type="text" name="incentives" value={formData.incentives} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Attendance Bonus</label>
              <input type="text" name="attendanceBonus" value={formData.attendanceBonus} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">City Compensatory (CCA)</label>
              <input type="text" name="cityCompensatoryAllowance" value={formData.cityCompensatoryAllowance} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Meal Allowance</label>
              <input type="text" name="mealAllowance" value={formData.mealAllowance} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Uniform Allowance</label>
              <input type="text" name="uniformAllowance" value={formData.uniformAllowance} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Special Allowance</label>
              <input type="text" name="specialAllowance" value={formData.specialAllowance} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
            </div>
          </div>
        </div>

        {/* Right Column: Deductions & Preview */}
        <div className="md:col-span-5 space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-slate-200 pb-2">Manual Deductions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">TDS (Income Tax)</label>
                <input type="text" name="tdsDeduction" value={formData.tdsDeduction} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Other Deductions</label>
                <input type="text" name="otherDeductions" value={formData.otherDeductions} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0" />
              </div>
            </div>
          </div>

          {/* Real Time Preview Box */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Real-time Calculation<br/>Preview</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between font-medium">
                <span className="text-slate-600">Gross Salary:</span>
                <span className="text-slate-900">₹{grossSalary.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Est. PF (12% of Basic+DA):</span>
                <span className="text-red-600">- ₹{estPF.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Est. ESI (0.75% of Gross):</span>
                <span className="text-red-600">- ₹{estESI.toFixed(2)}</span>
              </div>
              {tds > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600">TDS Deduction:</span>
                  <span className="text-red-600">- ₹{tds.toFixed(2)}</span>
                </div>
              )}
              {otherDed > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Other Deductions:</span>
                  <span className="text-red-600">- ₹{otherDed.toFixed(2)}</span>
                </div>
              )}
              
              <div className="pt-3 mt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="font-bold text-blue-700">Final Net Salary:</span>
                <span className="text-xl font-bold text-green-600">₹{netSalary.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 pt-4">
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Save className="h-5 w-5" />
          {loading ? 'Saving to Database...' : 'Save Salary Structure'}
        </button>
      </div>

    </div>
  );
};

export default SalaryStructureForm;