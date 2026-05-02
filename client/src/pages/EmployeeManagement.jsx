import React, { useState, useEffect } from 'react';
import api from '../api/axios'; 
import "bootstrap/dist/css/bootstrap.min.css";
import {
  User, Users, MapPin, Building, Map, Hash,
  Mail, Phone, IdCard, CreditCard, Heart,
  Landmark, Wallet, Fingerprint, Plus, Pencil,
  Trash2, X, Briefcase, Network, Shield, FileBadge, FileText, Component
} from 'lucide-react';

const emptyEmployeeForm = {
  // Personal
  firstName: '', middleName: '', lastName: '', fathersName: '', mothersName: '', 
  relation: 'Father', dob: '', sex: 'M', spouseName: '', maritalStatus: 'Single',
  
  // Contact & Address
  city: '', state: '', district: '', pinCode: '', email: '', phoneNo: '',
  localAddress: '', permanentAddress: '',
  
  // Identity & Bank
  panNo: '', aadharNo: '', voterId: '', bankName: '', bankBranchName: '', 
  ifscCode: '', accountNo: '', bankAddress: '', 
  
  // Job & Office Fields
  department: 'General', position: 'Staff', status: 'Available', baseSalary: 0,
  officeName: '', officeRegLocation: '', officeWorkingAddress: '',
  officeRegNo: '', officeRegYear: '', officeEmail: '', officePhoneNo: '', headOfficeId: '',
  organizationName: '', siteName: '', rank: '', doj: '', tktNo: '', officerName: '', officerNo: '',
  
  // Toggles & Associated Fields
  hasBranch: false,
  branchName: '', branchWorkingAddress: '', branchRegNo: '', branchRegYear: '',
  branchEmail: '', branchPhoneNo: '', branchHeadOfficeId: '', branchId: '',

  hasStatutoryInfo: false,
  pfNo: '', noPf: false, esicNo: '', notEligibleEsic: false,

  hasLicenses: false,
  policeVerification: 'No', gunFitnessCertificate: 'No', drivingLicense: '', dlValidUpto: '',
  gunLicense: '', gunValidUpto: '', qualification: '', educationalCertificate: '',

  hasNominee: false,
  nomineeRelation: '', nomineeDob: '', familyDetails: '', familyRelation: '', familyMemberDob: '',

  hasAdditionalInfo: false,
  forNaps: '', remarks: '', uniformDetails: '', deductionDetails: ''
};

const SectionHeader = ({ title, Icon, color, bgColor }) => (
  <div className="col-12 mt-4 mb-3">
    <h5
      className="text-start fw-bold p-3 mb-0 rounded d-flex align-items-center gap-2 modern-section-header"
      style={{ '--section-color': color, '--section-bg': bgColor }}
    >
      {Icon && <Icon size={22} strokeWidth={2.4} />}
      {title}
    </h5>
  </div>
);

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyEmployeeForm);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData(emptyEmployeeForm);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setFormData({ ...emptyEmployeeForm, ...employee });
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

  return (
    <div className="enterprise-wrapper">
      <style>
        {`
          .enterprise-wrapper {
            --ink: #0f172a; --muted: #64748b; --line: #dbe3ef;
            --surface: #ffffff; --surface-soft: #f8fafc;
            --brand: #0ea5e9; --brand-dark: #0369a1; --danger: #dc2626;
            padding: 20px; min-height: 100vh; color: var(--ink);
            font-family: Inter, "Segoe UI", system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(248, 250, 252, 0) 34%),
                        linear-gradient(315deg, rgba(245, 158, 11, 0.10) 0%, rgba(248, 250, 252, 0) 38%), #f8fafc;
          }
          .custom-form-row { --bs-gutter-x: 4rem; --bs-gutter-y: 1.5rem; }
          .modern-form-group { display: flex; align-items: center; width: 100%; overflow: hidden; }
          .modern-label { flex: 0 0 auto; text-align: left; margin-right: 15px; white-space: nowrap; font-size: 0.78rem; font-weight: 800; color: #334155; margin-bottom: 0; display: inline-flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.45px; }
          .modern-input, .modern-select { flex: 1 1 auto; width: 100%; min-width: 0; border: 1px solid #cbd5e1 !important; border-radius: 10px !important; padding: 10px 14px !important; color: #0f172a; font-size: 0.92rem; font-weight: 600; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%); transition: border-color 0.2s ease, box-shadow 0.2s ease; }
          .modern-input:focus, .modern-select:focus { border-color: #0ea5e9 !important; background: #ffffff; outline: none !important; box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.16) !important; }
          .modern-radio { cursor: pointer; width: 1.14rem; height: 1.14rem; accent-color: #8b5cf6; }
          .modern-checkbox { width: 1.3rem; height: 1.3rem; accent-color: #0ea5e9; cursor: pointer; }
          .btn-gradient-primary { background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 42%, #0369a1 100%) !important; border: 0 !important; color: #ffffff !important; box-shadow: 0 12px 24px rgba(14, 165, 233, 0.28) !important; }
          .btn-elegant-light { background: #ffffff !important; border: 1px solid #cbd5e1 !important; color: #475569 !important; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04) !important; }
          .enterprise-table-container { background: rgba(255, 255, 255, 0.86); border-radius: 16px; border: 1px solid rgba(203, 213, 225, 0.9); box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08); overflow-x: auto; }
          .enterprise-table { width: 100%; min-width: 760px; border-collapse: collapse; text-align: left; }
          .enterprise-table th { background: linear-gradient(180deg, #f8fafc 0%, #eef4fb 100%); padding: 15px 16px; color: #475569; font-weight: 800; text-transform: uppercase; font-size: 0.76rem; border-bottom: 1px solid #dbe3ef; }
          .enterprise-table td { padding: 15px 16px; border-bottom: 1px solid #eef2f7; vertical-align: middle; }
          .modal-backdrop-glass { position: fixed; inset: 0; background: linear-gradient(135deg, rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.58)); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; z-index: 1050; padding: 20px; }
          .modal-card-elegant { width: 100%; max-width: 1200px; max-height: 95vh; overflow-y: auto; border-radius: 18px; background: #ffffff; box-shadow: 0 36px 80px rgba(2, 6, 23, 0.34); }
          .modal-header-gradient { background: linear-gradient(135deg, #0f172a 0%, #16324a 52%, #075985 100%); border-bottom: 4px solid #38bdf8; padding: 18px 24px; }
          .modal-close-button { width: 38px; height: 38px; border: 1px solid rgba(255, 255, 255, 0.22); border-radius: 999px; color: #ffffff; background: rgba(255, 255, 255, 0.08); display: inline-flex; align-items: center; justify-content: center; }
          .modern-section-header { color: var(--section-color); background: linear-gradient(90deg, var(--section-bg) 0%, #ffffff 82%); border-left: 6px solid var(--section-color); border-radius: 10px !important; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9); }
        `}
      </style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0" style={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
          Employee Management
        </h2>
        <button onClick={handleAddNew} className="btn btn-gradient-primary fw-bold px-4 py-2 rounded-pill d-flex align-items-center gap-2">
          <Plus size={18} /> Add New Employee
        </button>
      </div>

      <div className="enterprise-table-container">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontWeight: '600' }}>
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td style={{ fontWeight: '700', color: '#0f172a' }}>{emp.firstName} {emp.lastName}</td>
                  <td style={{ color: '#64748b', fontWeight: '500' }}>{emp.email}</td>
                  <td style={{ color: '#64748b', fontWeight: '500' }}>{emp.phoneNo}</td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 ${emp.status === 'Available' ? 'bg-success text-white' : 'bg-warning text-dark'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-elegant-light px-3 rounded-pill fw-bold d-flex align-items-center gap-1">
                      <Pencil size={14} /> Edit
                    </button>
                    <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger px-3 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-1">
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop-glass" role="dialog">
          <div className="modal-card-elegant">
            <div className="card-header text-white d-flex justify-content-between align-items-center position-sticky top-0 modal-header-gradient" style={{ zIndex: 10 }}>
              <h4 className="mb-0 fw-bold py-1 d-flex align-items-center gap-2">
                <Users size={24} color="#38bdf8" />
                {editingId ? 'Edit Employee Registration' : 'Employee Registration Form'}
              </h4>
              <button type="button" className="modal-close-button" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="card-body bg-white p-4 p-md-5">
              <form className="row custom-form-row" onSubmit={handleSubmit}>
                
                {/* 1. PERSONAL INFORMATION */}
                <SectionHeader title="Personal Information" Icon={User} color="#0ea5e9" bgColor="#f0f9ff" />
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label"><User size={16} color="#0ea5e9" /> First Name</label><input type="text" className="modern-input" name="firstName" value={formData.firstName} onChange={handleChange} required /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label"><User size={16} color="#0ea5e9" /> Middle Name</label><input type="text" className="modern-input" name="middleName" value={formData.middleName} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label"><User size={16} color="#0ea5e9" /> Last Name</label><input type="text" className="modern-input" name="lastName" value={formData.lastName} onChange={handleChange} required /></div></div>
                <div className="col-md-6"><div className="modern-form-group"><label className="modern-label"><Users size={16} color="#0ea5e9" /> Father's Name</label><input type="text" className="modern-input" name="fathersName" value={formData.fathersName} onChange={handleChange} /></div></div>
                <div className="col-md-6"><div className="modern-form-group"><label className="modern-label"><Users size={16} color="#0ea5e9" /> Mother's Name</label><input type="text" className="modern-input" name="mothersName" value={formData.mothersName} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Relation</label>
                  <select name="relation" value={formData.relation} onChange={handleChange} className="modern-select">
                    <option value="Father">Father</option><option value="Husband">Husband</option>
                  </select>
                </div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">DOB</label><input type="date" className="modern-input" name="dob" value={formData.dob} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Sex</label>
                  <select name="sex" value={formData.sex} onChange={handleChange} className="modern-select">
                    <option value="M">Male</option><option value="F">Female</option><option value="Other">Other</option>
                  </select>
                </div></div>
                <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Spouse Name</label><input type="text" className="modern-input" name="spouseName" value={formData.spouseName} onChange={handleChange} /></div></div>

                {/* 2. CONTACT & ADDRESS */}
                <SectionHeader title="Contact & Address" Icon={MapPin} color="#10b981" bgColor="#ecfdf5" />
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label"><Building size={16} color="#10b981" /> City</label><input type="text" className="modern-input" name="city" value={formData.city} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label"><Map size={16} color="#10b981" /> State</label>
                  <select name="state" value={formData.state} onChange={handleChange} className="modern-select">
                    <option value="">Choose...</option><option value="Delhi">Delhi</option><option value="Maharashtra">Maharashtra</option><option value="Karnataka">Karnataka</option><option value="West Bengal">West Bengal</option>
                  </select>
                </div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label"><MapPin size={16} color="#10b981" /> District</label><input type="text" className="modern-input" name="district" value={formData.district} onChange={handleChange} /></div></div>
                <div className="col-md-6"><div className="modern-form-group"><label className="modern-label"><Hash size={16} color="#10b981" /> Pincode</label><input type="text" className="modern-input" name="pinCode" value={formData.pinCode} onChange={handleChange} /></div></div>
                <div className="col-md-6"><div className="modern-form-group"><label className="modern-label"><Mail size={16} color="#10b981" /> Email</label><input type="email" className="modern-input" name="email" value={formData.email} onChange={handleChange} required /></div></div>
                <div className="col-md-6"><div className="modern-form-group"><label className="modern-label"><Phone size={16} color="#10b981" /> Phone No</label><input type="text" className="modern-input" name="phoneNo" value={formData.phoneNo} onChange={handleChange} /></div></div>
                <div className="col-md-6"><div className="modern-form-group"><label className="modern-label">Local Address</label><input type="text" className="modern-input" name="localAddress" value={formData.localAddress} onChange={handleChange} /></div></div>
                <div className="col-md-12"><div className="modern-form-group"><label className="modern-label">Permanent Addr.</label><input type="text" className="modern-input" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} /></div></div>

                {/* 3. OFFICE INFORMATION */}
                <SectionHeader title="Office Information" Icon={Briefcase} color="#f43f5e" bgColor="#fff1f2" />
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Org. Name</label><input type="text" className="modern-input" name="organizationName" value={formData.organizationName} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Site Name</label><input type="text" className="modern-input" name="siteName" value={formData.siteName} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Rank</label><input type="text" className="modern-input" name="rank" value={formData.rank} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">DOJ</label><input type="date" className="modern-input" name="doj" value={formData.doj} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">TKT No</label><input type="text" className="modern-input" name="tktNo" value={formData.tktNo} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Officer Name</label><input type="text" className="modern-input" name="officerName" value={formData.officerName} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Officer No</label><input type="text" className="modern-input" name="officerNo" value={formData.officerNo} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Office Name</label><input type="text" className="modern-input" name="officeName" value={formData.officeName} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg Location</label><input type="text" className="modern-input" name="officeRegLocation" value={formData.officeRegLocation} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Working Addr.</label><input type="text" className="modern-input" name="officeWorkingAddress" value={formData.officeWorkingAddress} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg No</label><input type="text" className="modern-input" name="officeRegNo" value={formData.officeRegNo} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg Year</label><input type="text" className="modern-input" name="officeRegYear" value={formData.officeRegYear} onChange={handleChange} /></div></div>
                <div className="col-lg-6 col-md-12"><div className="modern-form-group"><label className="modern-label">Office Mail ID</label><input type="email" className="modern-input" name="officeEmail" value={formData.officeEmail} onChange={handleChange} /></div></div>

                {/* 4. BRANCH INFORMATION (CONDITIONAL) */}
                <div className="col-12 mt-4 mb-2">
                  <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <input type="checkbox" id="hasBranch" name="hasBranch" checked={formData.hasBranch} onChange={handleChange} className="modern-checkbox" />
                    <label htmlFor="hasBranch" className="fw-bold mb-0" style={{ color: '#0ea5e9', cursor: 'pointer' }}>
                      <Network size={18} className="me-2" /> Include Branch Information
                    </label>
                  </div>
                </div>
                {formData.hasBranch && (
                  <>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Branch Name</label><input type="text" className="modern-input" name="branchName" value={formData.branchName} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Working Addr.</label><input type="text" className="modern-input" name="branchWorkingAddress" value={formData.branchWorkingAddress} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Branch ID</label><input type="text" className="modern-input" name="branchId" value={formData.branchId} onChange={handleChange} /></div></div>
                    <div className="col-lg-3 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Reg No</label><input type="text" className="modern-input" name="branchRegNo" value={formData.branchRegNo} onChange={handleChange} /></div></div>
                    <div className="col-lg-3 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Reg Year</label><input type="text" className="modern-input" name="branchRegYear" value={formData.branchRegYear} onChange={handleChange} /></div></div>
                    <div className="col-lg-6 col-md-12 mt-3"><div className="modern-form-group"><label className="modern-label">Branch Mail ID</label><input type="email" className="modern-input" name="branchEmail" value={formData.branchEmail} onChange={handleChange} /></div></div>
                  </>
                )}

                {/* 5. IDENTITY & BANKING */}
                <SectionHeader title="Identity & Bank Details" Icon={IdCard} color="#8b5cf6" bgColor="#f5f3ff" />
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label"><CreditCard size={16} color="#8b5cf6" /> PAN No</label><input type="text" className="modern-input" name="panNo" value={formData.panNo} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label"><Fingerprint size={16} color="#8b5cf6" /> Aadhar No</label><input type="text" className="modern-input" name="aadharNo" value={formData.aadharNo} onChange={handleChange} /></div></div>
                <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Voter ID</label><input type="text" className="modern-input" name="voterId" value={formData.voterId} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label"><Landmark size={16} color="#8b5cf6" /> Bank Name</label><input type="text" className="modern-input" name="bankName" value={formData.bankName} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Branch Name</label><input type="text" className="modern-input" name="bankBranchName" value={formData.bankBranchName} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label"><Hash size={16} color="#8b5cf6" /> IFSC Code</label><input type="text" className="modern-input" name="ifscCode" value={formData.ifscCode} onChange={handleChange} /></div></div>
                <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label"><Wallet size={16} color="#8b5cf6" /> Account No</label><input type="text" className="modern-input" name="accountNo" value={formData.accountNo} onChange={handleChange} /></div></div>

                {/* 6. STATUTORY INFORMATION (CONDITIONAL) */}
                <div className="col-12 mt-4 mb-2">
                  <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <input type="checkbox" id="hasStatutoryInfo" name="hasStatutoryInfo" checked={formData.hasStatutoryInfo} onChange={handleChange} className="modern-checkbox" />
                    <label htmlFor="hasStatutoryInfo" className="fw-bold mb-0" style={{ color: '#0ea5e9', cursor: 'pointer' }}>
                      <Shield size={18} className="me-2" /> Include Statutory Information (PF, ESIC)
                    </label>
                  </div>
                </div>
                {formData.hasStatutoryInfo && (
                  <>
                    <div className="col-lg-3 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">PF No</label><input type="text" className="modern-input" name="pfNo" value={formData.pfNo} onChange={handleChange} /></div></div>
                    <div className="col-lg-3 col-md-6 mt-3 d-flex align-items-center"><input type="checkbox" name="noPf" checked={formData.noPf} onChange={handleChange} className="modern-checkbox me-2" /><label className="mb-0 fw-semibold" style={{fontSize:'0.85rem'}}>No PF</label></div>
                    <div className="col-lg-3 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">ESIC No</label><input type="text" className="modern-input" name="esicNo" value={formData.esicNo} onChange={handleChange} /></div></div>
                    <div className="col-lg-3 col-md-6 mt-3 d-flex align-items-center"><input type="checkbox" name="notEligibleEsic" checked={formData.notEligibleEsic} onChange={handleChange} className="modern-checkbox me-2" /><label className="mb-0 fw-semibold" style={{fontSize:'0.85rem'}}>Not Eligible ESIC</label></div>
                  </>
                )}

                {/* 7. LICENSES & CERTIFICATIONS (CONDITIONAL) */}
                <div className="col-12 mt-4 mb-2">
                  <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <input type="checkbox" id="hasLicenses" name="hasLicenses" checked={formData.hasLicenses} onChange={handleChange} className="modern-checkbox" />
                    <label htmlFor="hasLicenses" className="fw-bold mb-0" style={{ color: '#0ea5e9', cursor: 'pointer' }}>
                      <FileBadge size={18} className="me-2" /> Include Licenses & Certifications
                    </label>
                  </div>
                </div>
                {formData.hasLicenses && (
                  <>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Police Verif.</label>
                      <select name="policeVerification" value={formData.policeVerification} onChange={handleChange} className="modern-select">
                        <option value="No">No</option><option value="Yes">Yes</option><option value="Pending">Pending</option>
                      </select>
                    </div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Qualification</label><input type="text" className="modern-input" name="qualification" value={formData.qualification} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Edu. Cert.</label><input type="text" className="modern-input" name="educationalCertificate" value={formData.educationalCertificate} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Driving License</label><input type="text" className="modern-input" name="drivingLicense" value={formData.drivingLicense} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">DL Valid Upto</label><input type="date" className="modern-input" name="dlValidUpto" value={formData.dlValidUpto} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Gun License</label><input type="text" className="modern-input" name="gunLicense" value={formData.gunLicense} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Gun Valid Upto</label><input type="date" className="modern-input" name="gunValidUpto" value={formData.gunValidUpto} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Gun Fitness</label>
                      <select name="gunFitnessCertificate" value={formData.gunFitnessCertificate} onChange={handleChange} className="modern-select">
                        <option value="No">No</option><option value="Yes">Yes</option>
                      </select>
                    </div></div>
                  </>
                )}

                {/* 8. FAMILY & NOMINEE (CONDITIONAL) */}
                <div className="col-12 mt-4 mb-2">
                  <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <input type="checkbox" id="hasNominee" name="hasNominee" checked={formData.hasNominee} onChange={handleChange} className="modern-checkbox" />
                    <label htmlFor="hasNominee" className="fw-bold mb-0" style={{ color: '#0ea5e9', cursor: 'pointer' }}>
                      <Users size={18} className="me-2" /> Include Family & Nominee Details
                    </label>
                  </div>
                </div>
                {formData.hasNominee && (
                  <>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Family Details</label><input type="text" className="modern-input" name="familyDetails" value={formData.familyDetails} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Relation (Emp)</label><input type="text" className="modern-input" name="familyRelation" value={formData.familyRelation} onChange={handleChange} /></div></div>
                    <div className="col-lg-4 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Family M. DOB</label><input type="date" className="modern-input" name="familyMemberDob" value={formData.familyMemberDob} onChange={handleChange} /></div></div>
                    <div className="col-lg-6 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Nominee Relation</label><input type="text" className="modern-input" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} /></div></div>
                    <div className="col-lg-6 col-md-6 mt-3"><div className="modern-form-group"><label className="modern-label">Nominee DOB</label><input type="date" className="modern-input" name="nomineeDob" value={formData.nomineeDob} onChange={handleChange} /></div></div>
                  </>
                )}

                {/* 9. ADDITIONAL INFO (CONDITIONAL) */}
                <div className="col-12 mt-4 mb-2">
                  <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <input type="checkbox" id="hasAdditionalInfo" name="hasAdditionalInfo" checked={formData.hasAdditionalInfo} onChange={handleChange} className="modern-checkbox" />
                    <label htmlFor="hasAdditionalInfo" className="fw-bold mb-0" style={{ color: '#0ea5e9', cursor: 'pointer' }}>
                      <Component size={18} className="me-2" /> Include Additional Information
                    </label>
                  </div>
                </div>
                {formData.hasAdditionalInfo && (
                  <>
                    <div className="col-lg-6 col-md-12 mt-3"><div className="modern-form-group"><label className="modern-label">For NAPS</label><input type="text" className="modern-input" name="forNaps" value={formData.forNaps} onChange={handleChange} /></div></div>
                    <div className="col-lg-6 col-md-12 mt-3"><div className="modern-form-group"><label className="modern-label">Uniform Details</label><input type="text" className="modern-input" name="uniformDetails" value={formData.uniformDetails} onChange={handleChange} /></div></div>
                    <div className="col-lg-6 col-md-12 mt-3"><div className="modern-form-group"><label className="modern-label">Deduction Info</label><input type="text" className="modern-input" name="deductionDetails" value={formData.deductionDetails} onChange={handleChange} /></div></div>
                    <div className="col-lg-6 col-md-12 mt-3"><div className="modern-form-group"><label className="modern-label">Remarks</label><input type="text" className="modern-input" name="remarks" value={formData.remarks} onChange={handleChange} /></div></div>
                  </>
                )}

                <div className="col-12 mt-5 pt-4 mb-2 d-flex justify-content-end gap-3 border-top">
                  <button type="button" className="btn btn-elegant-light px-5 py-2 rounded-pill fw-bold" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gradient-primary px-5 py-2 rounded-pill fw-bold">Submit Employee</button>
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