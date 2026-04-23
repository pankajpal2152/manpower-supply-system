import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import "bootstrap/dist/css/bootstrap.min.css"; 

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', fathersName: '', mothersName: '',
    city: '', state: '', district: '', pinCode: '', email: '', phoneNo: '',
    panNo: '', aadharNo: '', maritalStatus: 'Single', bankName: '', ifscCode: '', 
    accountNo: '', bankAddress: '', department: 'General', position: 'Staff', status: 'Available', baseSalary: 0
  });

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      firstName: '', middleName: '', lastName: '', fathersName: '', mothersName: '',
      city: '', state: '', district: '', pinCode: '', email: '', phoneNo: '',
      panNo: '', aadharNo: '', maritalStatus: 'Single', bankName: '', ifscCode: '', 
      accountNo: '', bankAddress: '', department: 'General', position: 'Staff', status: 'Available', baseSalary: 0
    });
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setFormData(employee);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, formData);
      } else {
        await api.post('/employees', formData);
      }
      setIsModalOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
      alert(error.response?.data?.message || 'Error saving employee');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  // Modernized Section Header
  const SectionHeader = ({ title }) => (
    <div className="col-12 mt-4 mb-3">
      <h5 className="text-start text-primary fw-bold p-2 mb-0 rounded" 
          style={{ backgroundColor: '#f0f9ff', borderLeft: '6px solid #0284c7' }}>
        {title}
      </h5>
    </div>
  );

  return (
    <div>
      {/* --- Custom Styles for Modern Form --- */}
      <style>
        {`
          .modern-input {
            border: 1px solid #cbd5e1 !important;
            border-radius: 6px !important;
            padding: 8px 12px !important;
            transition: all 0.2s ease-in-out;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
          }
          .modern-input:focus {
            border-color: #0284c7 !important;
            box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.15) !important;
            outline: none !important;
          }
          .modern-label {
            white-space: nowrap;
            min-width: 110px;
            text-align: right;
            padding-right: 15px;
            font-size: 0.85rem;
            color: #475569;
          }
        `}
      </style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Employee Management</h1>
        <button onClick={handleAddNew} className="btn btn-primary fw-bold shadow-sm px-4">
          + Add New Employee
        </button>
      </div>

      {/* Employees Table */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Phone</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>No employees found.</td></tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px' }}>{emp.firstName} {emp.lastName}</td>
                  <td style={{ padding: '12px' }}>{emp.email}</td>
                  <td style={{ padding: '12px' }}>{emp.phoneNo}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`badge ${emp.status === 'Available' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-outline-secondary">Edit</button>
                    <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* HORIZONTAL FORM MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050, padding: '20px' }}>
          
          <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '1150px', maxHeight: '95vh', overflowY: 'auto', borderRadius: '12px' }}>
            
            <div className="card-header text-white d-flex justify-content-between align-items-center position-sticky top-0" style={{ zIndex: 10, backgroundColor: '#0f172a', borderBottom: '3px solid #0284c7' }}>
              <h4 className="mb-0 fw-bold">{editingId ? 'Edit Employee Registration' : 'Employee Registration Form'}</h4>
              <button type="button" className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
            </div>

            <div className="card-body bg-white p-4">
              <form className="row g-4" onSubmit={handleSubmit}>
                
                {/* --- Personal Information --- */}
                <SectionHeader title="Personal Information" />
                
                {/* 3 Columns Row */}
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <label htmlFor="firstName" className="fw-bold modern-label">First Name</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <label htmlFor="middleName" className="fw-bold modern-label">Middle Name</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <label htmlFor="lastName" className="fw-bold modern-label">Last Name</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                  </div>
                </div>

                {/* 2 Columns Row */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label htmlFor="fathersName" className="fw-bold modern-label">Father's Name</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="fathersName" value={formData.fathersName} onChange={handleChange} placeholder="Father's Name" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label htmlFor="mothersName" className="fw-bold modern-label">Mother's Name</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="mothersName" value={formData.mothersName} onChange={handleChange} placeholder="Mother's Name" />
                  </div>
                </div>

                {/* --- Contact & Address --- */}
                <SectionHeader title="Contact & Address" />
                
                {/* 3 Columns Row */}
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <label htmlFor="city" className="fw-bold modern-label">City</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <label htmlFor="state" className="fw-bold modern-label">State</label>
                    <select name="state" value={formData.state} onChange={handleChange} className="form-select form-select-sm modern-input flex-grow-1">
                      <option value="">Choose...</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <label htmlFor="district" className="fw-bold modern-label">District</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="district" value={formData.district} onChange={handleChange} placeholder="District" />
                  </div>
                </div>

                {/* 2 Columns Row */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label htmlFor="pinCode" className="fw-bold modern-label">Pincode</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pincode" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label htmlFor="email" className="fw-bold modern-label">Email</label>
                    <input type="email" className="form-control form-control-sm modern-input flex-grow-1" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                  </div>
                </div>
                
                {/* 2 Columns Row */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label htmlFor="phoneNo" className="fw-bold modern-label">Phone No</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Phone Number" />
                  </div>
                </div>
                <div className="col-md-6"></div> {/* Spacer to keep layout balanced */}


                {/* --- Identity & Status --- */}
                <SectionHeader title="Identity & Status" />

                {/* 2 Columns Row */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label htmlFor="panNo" className="fw-bold modern-label">PAN No</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="panNo" value={formData.panNo} onChange={handleChange} placeholder="PAN No" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label htmlFor="aadharNo" className="fw-bold modern-label">Aadhar No</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="aadharNo" value={formData.aadharNo} onChange={handleChange} placeholder="Aadhar No" />
                  </div>
                </div>

                {/* Full Width Row for Radios - Cleaned up styling */}
                <div className="col-12 mt-4">
                  <div className="d-flex align-items-center">
                    <label className="fw-bold modern-label">Marital Status</label>
                    <div className="d-flex flex-grow-1 gap-4 ps-2">
                      <div className="form-check">
                        <input className="form-check-input shadow-sm" type="radio" name="maritalStatus" value="Single" checked={formData.maritalStatus === 'Single'} onChange={handleChange} id="radioSingle" style={{cursor: 'pointer'}} />
                        <label className="form-check-label" htmlFor="radioSingle" style={{cursor: 'pointer'}}>Single</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input shadow-sm" type="radio" name="maritalStatus" value="Married" checked={formData.maritalStatus === 'Married'} onChange={handleChange} id="radioMarried" style={{cursor: 'pointer'}} />
                        <label className="form-check-label" htmlFor="radioMarried" style={{cursor: 'pointer'}}>Married</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input shadow-sm" type="radio" name="maritalStatus" value="Other" checked={formData.maritalStatus === 'Other'} onChange={handleChange} id="radioOther" style={{cursor: 'pointer'}} />
                        <label className="form-check-label" htmlFor="radioOther" style={{cursor: 'pointer'}}>Other</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Bank Details --- */}
                <SectionHeader title="Bank Details" />

                {/* Mixed Columns Row (6, 3, 3) */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <label htmlFor="bankName" className="fw-bold modern-label">Bank Name</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <label htmlFor="ifscCode" className="fw-bold modern-label" style={{ minWidth: '80px' }}>IFSC</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <label htmlFor="accountNo" className="fw-bold modern-label" style={{ minWidth: '80px' }}>Acc No</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="accountNo" value={formData.accountNo} onChange={handleChange} placeholder="Account No" />
                  </div>
                </div>

                {/* Full Width Row */}
                <div className="col-12">
                  <div className="d-flex align-items-center">
                    <label htmlFor="bankAddress" className="fw-bold modern-label">Bank Address</label>
                    <input type="text" className="form-control form-control-sm modern-input flex-grow-1" name="bankAddress" value={formData.bankAddress} onChange={handleChange} placeholder="Branch Location / Apartment, studio, or floor" />
                  </div>
                </div>

                {/* --- Action Buttons --- */}
                <div className="col-12 mt-5 pt-3 mb-2 d-flex justify-content-end gap-3 border-top">
                  <button type="button" className="btn btn-light px-5 fw-bold shadow-sm border" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success px-5 fw-bold shadow-sm" style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}>Submit Employee</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;