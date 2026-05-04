// import React, { useState, useEffect } from 'react';
// import api from '../api/axios'; 
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   User, Users, MapPin, Building, Map, Hash,
//   Mail, Phone, IdCard, CreditCard, Heart,
//   Landmark, Wallet, Fingerprint, Plus, Pencil,
//   Trash2, X, Briefcase, Network, Shield, FileBadge, 
//   FileText, Component, ChevronRight, ChevronLeft
// } from 'lucide-react';

// const emptyEmployeeForm = {
//   // Personal
//   firstName: '', middleName: '', lastName: '', fathersName: '', mothersName: '', 
//   relation: 'Father', dob: '', sex: 'M', spouseName: '', maritalStatus: 'Single',
  
//   // Contact & Address
//   city: '', state: '', district: '', pinCode: '', email: '', phoneNo: '',
//   localAddress: '', permanentAddress: '',
  
//   // Identity & Bank
//   panNo: '', aadharNo: '', voterId: '', bankName: '', bankBranchName: '', 
//   ifscCode: '', accountNo: '', bankAddress: '', 
  
//   // Job & Office Fields
//   department: 'General', position: 'Staff', status: 'Available', baseSalary: 0,
//   officeName: '', officeRegLocation: '', officeWorkingAddress: '',
//   officeRegNo: '', officeRegYear: '', officeEmail: '', officePhoneNo: '', headOfficeId: '',
//   organizationName: '', siteName: '', rank: '', doj: '', tktNo: '', officerName: '', officerNo: '',
  
//   // Toggles & Associated Fields
//   hasBranch: false,
//   branchName: '', branchWorkingAddress: '', branchRegNo: '', branchRegYear: '',
//   branchEmail: '', branchPhoneNo: '', branchHeadOfficeId: '', branchId: '',

//   hasStatutoryInfo: false,
//   pfNo: '', noPf: false, esicNo: '', notEligibleEsic: false,

//   hasLicenses: false,
//   policeVerification: 'No', gunFitnessCertificate: 'No', drivingLicense: '', dlValidUpto: '',
//   gunLicense: '', gunValidUpto: '', qualification: '', educationalCertificate: '',

//   hasNominee: false,
//   nomineeRelation: '', nomineeDob: '', familyDetails: '', familyRelation: '', familyMemberDob: '',

//   hasAdditionalInfo: false,
//   forNaps: '', remarks: '', uniformDetails: '', deductionDetails: ''
// };

// // Reusable Section Header
// const SectionHeader = ({ title, Icon, color, bgColor }) => (
//   <div className="col-12 mt-2 mb-3">
//     <h5
//       className="text-start fw-bold p-3 mb-0 rounded d-flex align-items-center gap-2 modern-section-header"
//       style={{ '--section-color': color, '--section-bg': bgColor }}
//     >
//       {Icon && <Icon size={22} strokeWidth={2.4} />}
//       {title}
//     </h5>
//   </div>
// );

// const EmployeeManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState(emptyEmployeeForm);
  
//   // NEW: State to manage the active tab in our new UI
//   const [activeTab, setActiveTab] = useState(0);

//   // Define our main category tabs
//   const tabs = [
//     { id: 0, label: 'Basic Details', icon: User },
//     { id: 1, label: 'Corporate & Branch', icon: Briefcase },
//     { id: 2, label: 'Financial & Statutory', icon: Landmark },
//     { id: 3, label: 'Identity & Licenses', icon: IdCard },
//     { id: 4, label: 'Family & Extras', icon: Users }
//   ];

//   const fetchEmployees = async () => {
//     try {
//       const response = await api.get('/employees');
//       setEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ 
//       ...formData, 
//       [name]: type === 'checkbox' ? checked : value 
//     });
//   };

//   const handleAddNew = () => {
//     setEditingId(null);
//     setFormData(emptyEmployeeForm);
//     setActiveTab(0); // Always start on the first tab
//     setIsModalOpen(true);
//   };

//   const handleEdit = (employee) => {
//     setEditingId(employee.id);
//     setFormData({ ...emptyEmployeeForm, ...employee });
//     setActiveTab(0); // Always start on the first tab
//     setIsModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await api.put(`/employees/${editingId}`, formData);
//       } else {
//         await api.post('/employees', formData);
//       }
//       setIsModalOpen(false);
//       fetchEmployees();
//     } catch (error) {
//       console.error('Error saving employee:', error);
//       alert(error.response?.data?.message || 'Error saving employee');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this employee?')) {
//       try {
//         await api.delete(`/employees/${id}`);
//         fetchEmployees();
//       } catch (error) {
//         console.error('Error deleting employee:', error);
//       }
//     }
//   };

//   // Helper functions for Wizard Navigation
//   const nextTab = () => { if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1); };
//   const prevTab = () => { if (activeTab > 0) setActiveTab(activeTab - 1); };

//   return (
//     <div className="enterprise-wrapper">
//       <style>
//         {`
//           .enterprise-wrapper {
//             --ink: #0f172a; --muted: #64748b; --line: #dbe3ef;
//             --surface: #ffffff; --surface-soft: #f8fafc;
//             --brand: #0ea5e9; --brand-dark: #0369a1; --danger: #dc2626;
//             padding: 20px; min-height: 100vh; color: var(--ink);
//             font-family: Inter, "Segoe UI", system-ui, -apple-system, sans-serif;
//             background: linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(248, 250, 252, 0) 34%),
//                         linear-gradient(315deg, rgba(245, 158, 11, 0.10) 0%, rgba(248, 250, 252, 0) 38%), #f8fafc;
//           }
          
//           /* Form Layout Styles */
//           .custom-form-row { --bs-gutter-x: 2rem; --bs-gutter-y: 1.5rem; }
//           .modern-form-group { display: flex; align-items: center; width: 100%; overflow: hidden; }
//           .modern-label { flex: 0 0 130px; text-align: left; margin-right: 10px; font-size: 0.78rem; font-weight: 800; color: #334155; margin-bottom: 0; display: inline-flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.45px; }
//           .modern-input, .modern-select { flex: 1 1 auto; width: 100%; border: 1px solid #cbd5e1 !important; border-radius: 8px !important; padding: 10px 14px !important; color: #0f172a; font-size: 0.92rem; font-weight: 600; background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%); transition: border-color 0.2s ease, box-shadow 0.2s ease; }
//           .modern-input:focus, .modern-select:focus { border-color: #0ea5e9 !important; background: #ffffff; outline: none !important; box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.16) !important; }
//           .modern-radio { cursor: pointer; width: 1.14rem; height: 1.14rem; accent-color: #8b5cf6; }
//           .modern-checkbox { width: 1.3rem; height: 1.3rem; accent-color: #0ea5e9; cursor: pointer; }
          
//           /* Buttons and Tables */
//           .btn-gradient-primary { background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 42%, #0369a1 100%) !important; border: 0 !important; color: #ffffff !important; box-shadow: 0 12px 24px rgba(14, 165, 233, 0.28) !important; }
//           .btn-elegant-light { background: #ffffff !important; border: 1px solid #cbd5e1 !important; color: #475569 !important; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04) !important; }
//           .enterprise-table-container { background: rgba(255, 255, 255, 0.86); border-radius: 16px; border: 1px solid rgba(203, 213, 225, 0.9); box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08); overflow-x: auto; }
//           .enterprise-table { width: 100%; min-width: 760px; border-collapse: collapse; text-align: left; }
//           .enterprise-table th { background: linear-gradient(180deg, #f8fafc 0%, #eef4fb 100%); padding: 15px 16px; color: #475569; font-weight: 800; text-transform: uppercase; font-size: 0.76rem; border-bottom: 1px solid #dbe3ef; }
//           .enterprise-table td { padding: 15px 16px; border-bottom: 1px solid #eef2f7; vertical-align: middle; }
          
//           /* Modal and New Tab Styles */
//           .modal-backdrop-glass { position: fixed; inset: 0; background: linear-gradient(135deg, rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.58)); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; z-index: 1050; padding: 20px; }
//           .modal-card-elegant { width: 100%; max-width: 1200px; height: 95vh; display: flex; flex-direction: column; overflow: hidden; border-radius: 18px; background: #f8fafc; box-shadow: 0 36px 80px rgba(2, 6, 23, 0.34); }
//           .modal-header-gradient { background: linear-gradient(135deg, #0f172a 0%, #16324a 52%, #075985 100%); border-bottom: 4px solid #38bdf8; padding: 18px 24px; flex-shrink: 0; }
//           .modal-close-button { width: 38px; height: 38px; border: 1px solid rgba(255, 255, 255, 0.22); border-radius: 999px; color: #ffffff; background: rgba(255, 255, 255, 0.08); display: inline-flex; align-items: center; justify-content: center; }
          
//           /* Tab Navigation Bar */
//           .form-tabs-container { display: flex; background: #ffffff; border-bottom: 1px solid #e2e8f0; overflow-x: auto; flex-shrink: 0; padding: 0 10px; }
//           .form-tab-btn { display: flex; align-items: center; gap: 8px; padding: 16px 20px; border: none; background: transparent; color: #64748b; font-weight: 700; font-size: 0.9rem; border-bottom: 3px solid transparent; transition: all 0.2s ease; white-space: nowrap; }
//           .form-tab-btn:hover { color: #0ea5e9; background: #f0f9ff; }
//           .form-tab-btn.active { color: #0ea5e9; border-bottom-color: #0ea5e9; background: #f0f9ff; }
          
//           /* Form Body Scrolling Area */
//           .form-body-scroll { flex: 1; overflow-y: auto; padding: 30px; background: #ffffff; }
//           .form-footer-sticky { flex-shrink: 0; background: #ffffff; border-top: 1px solid #e2e8f0; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 -4px 12px rgba(0,0,0,0.03); }
          
//           .modern-section-header { color: var(--section-color); background: linear-gradient(90deg, var(--section-bg) 0%, #ffffff 82%); border-left: 6px solid var(--section-color); border-radius: 8px !important; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9); }
          
//           /* Highlight Container for Checkbox Toggle Sections */
//           .toggle-section-card { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px; margin-top: 15px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
//         `}
//       </style>

//       {/* Header and Table remain unchanged visually */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold mb-0" style={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
//           Employee Management
//         </h2>
//         <button onClick={handleAddNew} className="btn btn-gradient-primary fw-bold px-4 py-2 rounded-pill d-flex align-items-center gap-2">
//           <Plus size={18} /> Add New Employee
//         </button>
//       </div>

//       <div className="enterprise-table-container">
//         <table className="enterprise-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length === 0 ? (
//               <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontWeight: '600' }}>No employees found.</td></tr>
//             ) : (
//               employees.map((emp) => (
//                 <tr key={emp.id}>
//                   <td style={{ fontWeight: '700', color: '#0f172a' }}>{emp.firstName} {emp.lastName}</td>
//                   <td style={{ color: '#64748b', fontWeight: '500' }}>{emp.email}</td>
//                   <td style={{ color: '#64748b', fontWeight: '500' }}>{emp.phoneNo}</td>
//                   <td>
//                     <span className={`badge rounded-pill px-3 py-2 ${emp.status === 'Available' ? 'bg-success text-white' : 'bg-warning text-dark'}`}>{emp.status}</span>
//                   </td>
//                   <td style={{ display: 'flex', gap: '10px' }}>
//                     <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-elegant-light px-3 rounded-pill fw-bold d-flex align-items-center gap-1"><Pencil size={14} /> Edit</button>
//                     <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger px-3 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-1"><Trash2 size={14} /> Delete</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <div className="modal-backdrop-glass" role="dialog">
//           <div className="modal-card-elegant">
            
//             {/* Modal Header */}
//             <div className="modal-header-gradient d-flex justify-content-between align-items-center">
//               <h4 className="mb-0 fw-bold text-white py-1 d-flex align-items-center gap-2">
//                 <Users size={24} color="#38bdf8" />
//                 {editingId ? 'Edit Employee Data' : 'New Employee Registration'}
//               </h4>
//               <button type="button" className="modal-close-button" onClick={() => setIsModalOpen(false)}>
//                 <X size={18} />
//               </button>
//             </div>

//             {/* NEW: Tab Navigation Bar */}
//             <div className="form-tabs-container">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     className={`form-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
//                     onClick={() => setActiveTab(tab.id)}
//                   >
//                     <Icon size={18} />
//                     {tab.label}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Scrollable Form Body */}
//             <div className="form-body-scroll">
//               <form id="employeeForm" onSubmit={handleSubmit}>
                
//                 {/* TAB 0: BASIC DETAILS */}
//                 {activeTab === 0 && (
//                   <div className="row custom-form-row">
//                     <SectionHeader title="Personal Information" Icon={User} color="#0ea5e9" bgColor="#f0f9ff" />
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">First Name</label><input type="text" className="modern-input" name="firstName" value={formData.firstName} onChange={handleChange} required /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Middle Name</label><input type="text" className="modern-input" name="middleName" value={formData.middleName} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Last Name</label><input type="text" className="modern-input" name="lastName" value={formData.lastName} onChange={handleChange} required /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Father's Name</label><input type="text" className="modern-input" name="fathersName" value={formData.fathersName} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Mother's Name</label><input type="text" className="modern-input" name="mothersName" value={formData.mothersName} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Relation</label>
//                       <select name="relation" value={formData.relation} onChange={handleChange} className="modern-select">
//                         <option value="Father">Father</option><option value="Husband">Husband</option>
//                       </select>
//                     </div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">DOB</label><input type="date" className="modern-input" name="dob" value={formData.dob} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Sex</label>
//                       <select name="sex" value={formData.sex} onChange={handleChange} className="modern-select">
//                         <option value="M">Male</option><option value="F">Female</option><option value="Other">Other</option>
//                       </select>
//                     </div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Spouse Name</label><input type="text" className="modern-input" name="spouseName" value={formData.spouseName} onChange={handleChange} /></div></div>

//                     <SectionHeader title="Contact & Address" Icon={MapPin} color="#10b981" bgColor="#ecfdf5" />
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Phone No</label><input type="text" className="modern-input" name="phoneNo" value={formData.phoneNo} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Email</label><input type="email" className="modern-input" name="email" value={formData.email} onChange={handleChange} required /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">City</label><input type="text" className="modern-input" name="city" value={formData.city} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">State</label>
//                       <select name="state" value={formData.state} onChange={handleChange} className="modern-select">
//                         <option value="">Choose...</option><option value="Delhi">Delhi</option><option value="Maharashtra">Maharashtra</option><option value="Karnataka">Karnataka</option><option value="West Bengal">West Bengal</option>
//                       </select>
//                     </div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">District</label><input type="text" className="modern-input" name="district" value={formData.district} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Pincode</label><input type="text" className="modern-input" name="pinCode" value={formData.pinCode} onChange={handleChange} /></div></div>
//                     <div className="col-md-6"><div className="modern-form-group"><label className="modern-label">Local Addr.</label><input type="text" className="modern-input" name="localAddress" value={formData.localAddress} onChange={handleChange} /></div></div>
//                     <div className="col-md-6"><div className="modern-form-group"><label className="modern-label">Perm. Addr.</label><input type="text" className="modern-input" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} /></div></div>
//                   </div>
//                 )}

//                 {/* TAB 1: CORPORATE & BRANCH */}
//                 {activeTab === 1 && (
//                   <div className="row custom-form-row">
//                     <SectionHeader title="Corporate Assignment" Icon={Briefcase} color="#f43f5e" bgColor="#fff1f2" />
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Org. Name</label><input type="text" className="modern-input" name="organizationName" value={formData.organizationName} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Site Name</label><input type="text" className="modern-input" name="siteName" value={formData.siteName} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Rank</label><input type="text" className="modern-input" name="rank" value={formData.rank} onChange={handleChange} /></div></div>
//                     <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">DOJ</label><input type="date" className="modern-input" name="doj" value={formData.doj} onChange={handleChange} /></div></div>
//                     <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">TKT No</label><input type="text" className="modern-input" name="tktNo" value={formData.tktNo} onChange={handleChange} /></div></div>
//                     <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Officer Name</label><input type="text" className="modern-input" name="officerName" value={formData.officerName} onChange={handleChange} /></div></div>
//                     <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Officer No</label><input type="text" className="modern-input" name="officerNo" value={formData.officerNo} onChange={handleChange} /></div></div>
                    
//                     <div className="col-12"><hr className="text-muted opacity-25" /></div>

//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Office Name</label><input type="text" className="modern-input" name="officeName" value={formData.officeName} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg Location</label><input type="text" className="modern-input" name="officeRegLocation" value={formData.officeRegLocation} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Working Addr.</label><input type="text" className="modern-input" name="officeWorkingAddress" value={formData.officeWorkingAddress} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg No</label><input type="text" className="modern-input" name="officeRegNo" value={formData.officeRegNo} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg Year</label><input type="text" className="modern-input" name="officeRegYear" value={formData.officeRegYear} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Head Office ID</label><input type="text" className="modern-input" name="headOfficeId" value={formData.headOfficeId} onChange={handleChange} /></div></div>
//                     <div className="col-md-6"><div className="modern-form-group"><label className="modern-label">Office Email</label><input type="email" className="modern-input" name="officeEmail" value={formData.officeEmail} onChange={handleChange} /></div></div>
//                     <div className="col-md-6"><div className="modern-form-group"><label className="modern-label">Office Phone</label><input type="text" className="modern-input" name="officePhoneNo" value={formData.officePhoneNo} onChange={handleChange} /></div></div>

//                     {/* NEW Main Category Section via Toggle */}
//                     <div className="col-12 mt-4">
//                       <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#e0f2fe', border: '1px solid #bae6fd' }}>
//                         <input type="checkbox" id="hasBranch" name="hasBranch" checked={formData.hasBranch} onChange={handleChange} className="modern-checkbox" />
//                         <label htmlFor="hasBranch" className="fw-bold mb-0" style={{ color: '#0369a1', cursor: 'pointer', fontSize: '1.05rem' }}>
//                           <Network size={20} className="me-2" /> Enable Local Branch Configuration
//                         </label>
//                       </div>
                      
//                       {formData.hasBranch && (
//                         <div className="row custom-form-row toggle-section-card mx-0">
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Branch Name</label><input type="text" className="modern-input" name="branchName" value={formData.branchName} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Branch ID</label><input type="text" className="modern-input" name="branchId" value={formData.branchId} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Working Addr.</label><input type="text" className="modern-input" name="branchWorkingAddress" value={formData.branchWorkingAddress} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg No</label><input type="text" className="modern-input" name="branchRegNo" value={formData.branchRegNo} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg Year</label><input type="text" className="modern-input" name="branchRegYear" value={formData.branchRegYear} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Head Office ID</label><input type="text" className="modern-input" name="branchHeadOfficeId" value={formData.branchHeadOfficeId} onChange={handleChange} /></div></div>
//                           <div className="col-md-6"><div className="modern-form-group"><label className="modern-label">Branch Email</label><input type="email" className="modern-input" name="branchEmail" value={formData.branchEmail} onChange={handleChange} /></div></div>
//                           <div className="col-md-6"><div className="modern-form-group"><label className="modern-label">Branch Phone</label><input type="text" className="modern-input" name="branchPhoneNo" value={formData.branchPhoneNo} onChange={handleChange} /></div></div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* TAB 2: FINANCIAL & STATUTORY */}
//                 {activeTab === 2 && (
//                   <div className="row custom-form-row">
//                     <SectionHeader title="Banking Details" Icon={Landmark} color="#f59e0b" bgColor="#fffbeb" />
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Bank Name</label><input type="text" className="modern-input" name="bankName" value={formData.bankName} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Branch Name</label><input type="text" className="modern-input" name="bankBranchName" value={formData.bankBranchName} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">IFSC Code</label><input type="text" className="modern-input" name="ifscCode" value={formData.ifscCode} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Account No</label><input type="text" className="modern-input" name="accountNo" value={formData.accountNo} onChange={handleChange} /></div></div>
                    
//                     {/* Main Category Section via Toggle */}
//                     <div className="col-12 mt-4">
//                       <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
//                         <input type="checkbox" id="hasStatutoryInfo" name="hasStatutoryInfo" checked={formData.hasStatutoryInfo} onChange={handleChange} className="modern-checkbox" />
//                         <label htmlFor="hasStatutoryInfo" className="fw-bold mb-0" style={{ color: '#d97706', cursor: 'pointer', fontSize: '1.05rem' }}>
//                           <Shield size={20} className="me-2" /> Enable Statutory Compliance (PF & ESIC)
//                         </label>
//                       </div>
                      
//                       {formData.hasStatutoryInfo && (
//                         <div className="row custom-form-row toggle-section-card mx-0" style={{ borderColor: '#fde68a' }}>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">PF No</label><input type="text" className="modern-input" name="pfNo" value={formData.pfNo} onChange={handleChange} /></div></div>
//                           <div className="col-lg-2 col-md-6 d-flex align-items-center"><input type="checkbox" name="noPf" checked={formData.noPf} onChange={handleChange} className="modern-checkbox me-2" /><label className="mb-0 fw-bold text-muted">No PF</label></div>
                          
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">ESIC No</label><input type="text" className="modern-input" name="esicNo" value={formData.esicNo} onChange={handleChange} /></div></div>
//                           <div className="col-lg-2 col-md-6 d-flex align-items-center"><input type="checkbox" name="notEligibleEsic" checked={formData.notEligibleEsic} onChange={handleChange} className="modern-checkbox me-2" /><label className="mb-0 fw-bold text-muted">No ESIC</label></div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* TAB 3: IDENTITY & LICENSES */}
//                 {activeTab === 3 && (
//                   <div className="row custom-form-row">
//                     <SectionHeader title="National Identity" Icon={IdCard} color="#8b5cf6" bgColor="#f5f3ff" />
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">PAN No</label><input type="text" className="modern-input" name="panNo" value={formData.panNo} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Aadhar No</label><input type="text" className="modern-input" name="aadharNo" value={formData.aadharNo} onChange={handleChange} /></div></div>
//                     <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Voter ID</label><input type="text" className="modern-input" name="voterId" value={formData.voterId} onChange={handleChange} /></div></div>

//                     {/* Main Category Section via Toggle */}
//                     <div className="col-12 mt-4">
//                       <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#ede9fe', border: '1px solid #ddd6fe' }}>
//                         <input type="checkbox" id="hasLicenses" name="hasLicenses" checked={formData.hasLicenses} onChange={handleChange} className="modern-checkbox" />
//                         <label htmlFor="hasLicenses" className="fw-bold mb-0" style={{ color: '#7c3aed', cursor: 'pointer', fontSize: '1.05rem' }}>
//                           <FileBadge size={20} className="me-2" /> Enable Licenses & Certifications
//                         </label>
//                       </div>
                      
//                       {formData.hasLicenses && (
//                         <div className="row custom-form-row toggle-section-card mx-0" style={{ borderColor: '#ddd6fe' }}>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Police Verif.</label>
//                             <select name="policeVerification" value={formData.policeVerification} onChange={handleChange} className="modern-select">
//                               <option value="No">No</option><option value="Yes">Yes</option><option value="Pending">Pending</option>
//                             </select>
//                           </div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Qualification</label><input type="text" className="modern-input" name="qualification" value={formData.qualification} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Edu. Cert.</label><input type="text" className="modern-input" name="educationalCertificate" value={formData.educationalCertificate} onChange={handleChange} /></div></div>
                          
//                           <div className="col-12"><hr className="text-muted opacity-25 my-1" /></div>

//                           <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Driving License</label><input type="text" className="modern-input" name="drivingLicense" value={formData.drivingLicense} onChange={handleChange} /></div></div>
//                           <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">DL Valid Upto</label><input type="date" className="modern-input" name="dlValidUpto" value={formData.dlValidUpto} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Gun License</label><input type="text" className="modern-input" name="gunLicense" value={formData.gunLicense} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Gun Valid Upto</label><input type="date" className="modern-input" name="gunValidUpto" value={formData.gunValidUpto} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Gun Fitness</label>
//                             <select name="gunFitnessCertificate" value={formData.gunFitnessCertificate} onChange={handleChange} className="modern-select">
//                               <option value="No">No</option><option value="Yes">Yes</option>
//                             </select>
//                           </div></div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* TAB 4: FAMILY & EXTRAS */}
//                 {activeTab === 4 && (
//                   <div className="row custom-form-row">
//                     {/* Family & Nominee Toggle Category */}
//                     <div className="col-12">
//                       <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#fdf2f8', border: '1px solid #fbcfe8' }}>
//                         <input type="checkbox" id="hasNominee" name="hasNominee" checked={formData.hasNominee} onChange={handleChange} className="modern-checkbox" />
//                         <label htmlFor="hasNominee" className="fw-bold mb-0" style={{ color: '#db2777', cursor: 'pointer', fontSize: '1.05rem' }}>
//                           <Heart size={20} className="me-2" /> Enable Family & Nominee Register
//                         </label>
//                       </div>
                      
//                       {formData.hasNominee && (
//                         <div className="row custom-form-row toggle-section-card mx-0" style={{ borderColor: '#fbcfe8' }}>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Family Details</label><input type="text" className="modern-input" name="familyDetails" value={formData.familyDetails} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Relation (Emp)</label><input type="text" className="modern-input" name="familyRelation" value={formData.familyRelation} onChange={handleChange} /></div></div>
//                           <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Fam. M. DOB</label><input type="date" className="modern-input" name="familyMemberDob" value={formData.familyMemberDob} onChange={handleChange} /></div></div>
//                           <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Nominee Relation</label><input type="text" className="modern-input" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} /></div></div>
//                           <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Nominee DOB</label><input type="date" className="modern-input" name="nomineeDob" value={formData.nomineeDob} onChange={handleChange} /></div></div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Additional Info Toggle Category */}
//                     <div className="col-12 mt-4">
//                       <div className="p-3 rounded d-flex align-items-center gap-3" style={{ background: '#f1f5f9', border: '1px solid #cbd5e1' }}>
//                         <input type="checkbox" id="hasAdditionalInfo" name="hasAdditionalInfo" checked={formData.hasAdditionalInfo} onChange={handleChange} className="modern-checkbox" />
//                         <label htmlFor="hasAdditionalInfo" className="fw-bold mb-0" style={{ color: '#475569', cursor: 'pointer', fontSize: '1.05rem' }}>
//                           <Component size={20} className="me-2" /> Enable Extra Operational Info
//                         </label>
//                       </div>
                      
//                       {formData.hasAdditionalInfo && (
//                         <div className="row custom-form-row toggle-section-card mx-0" style={{ borderColor: '#cbd5e1' }}>
//                           <div className="col-lg-6"><div className="modern-form-group"><label className="modern-label">For NAPS</label><input type="text" className="modern-input" name="forNaps" value={formData.forNaps} onChange={handleChange} /></div></div>
//                           <div className="col-lg-6"><div className="modern-form-group"><label className="modern-label">Uniform Details</label><input type="text" className="modern-input" name="uniformDetails" value={formData.uniformDetails} onChange={handleChange} /></div></div>
//                           <div className="col-lg-6"><div className="modern-form-group"><label className="modern-label">Deductions</label><input type="text" className="modern-input" name="deductionDetails" value={formData.deductionDetails} onChange={handleChange} /></div></div>
//                           <div className="col-lg-6"><div className="modern-form-group"><label className="modern-label">Remarks</label><input type="text" className="modern-input" name="remarks" value={formData.remarks} onChange={handleChange} /></div></div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </form>
//             </div>

//             {/* NEW: Sticky Footer with Next/Prev and Submit Actions */}
//             <div className="form-footer-sticky">
//               <div className="d-flex gap-2">
//                 <button type="button" className="btn btn-elegant-light px-4 py-2 rounded-pill fw-bold" onClick={() => setIsModalOpen(false)}>Cancel</button>
//               </div>
              
//               <div className="d-flex gap-3 align-items-center">
//                 {activeTab > 0 && (
//                   <button type="button" className="btn btn-elegant-light px-4 py-2 rounded-pill fw-bold d-flex align-items-center gap-1" onClick={prevTab}>
//                     <ChevronLeft size={18} /> Previous
//                   </button>
//                 )}
                
//                 {activeTab < tabs.length - 1 ? (
//                   <button type="button" className="btn btn-gradient-primary px-4 py-2 rounded-pill fw-bold d-flex align-items-center gap-1" onClick={nextTab}>
//                     Next Step <ChevronRight size={18} />
//                   </button>
//                 ) : (
//                   <button type="submit" form="employeeForm" className="btn btn-gradient-primary px-5 py-2 rounded-pill fw-bold d-flex align-items-center gap-2">
//                     <FileText size={18} /> Save Complete Profile
//                   </button>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeManagement;




// import React, { useState, useEffect } from 'react';
// import api from '../api/axios';
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   User, Users, MapPin, Building, Map, Hash,
//   Mail, Phone, IdCard, CreditCard, Heart,
//   Landmark, Wallet, Fingerprint, Plus, Pencil,
//   Trash2, X, Briefcase, Network, Shield, FileBadge, 
//   FileText, Component, Calculator, FileCheck
// } from 'lucide-react';

// const emptyEmployeeForm = {
//   // 1. Personal
//   firstName: '', middleName: '', lastName: '', fathersName: '', mothersName: '', 
//   relation: 'Father', dob: '', sex: 'M', spouseName: '', maritalStatus: 'Single',
  
//   // 2. Contact & Address
//   city: '', state: '', district: '', pinCode: '', email: '', phoneNo: '',
//   localAddress: '', permanentAddress: '',
  
//   // 3. Office & Branch
//   organizationName: '', siteName: '', rank: '', doj: '', tktNo: '', officerName: '', officerNo: '',
//   department: 'General', position: 'Staff', status: 'Available',
//   officeName: '', officeRegLocation: '', officeWorkingAddress: '',
//   officeRegNo: '', officeRegYear: '', officeEmail: '', officePhoneNo: '', headOfficeId: '',
//   branchName: '', branchWorkingAddress: '', branchRegNo: '', branchRegYear: '',
//   branchEmail: '', branchPhoneNo: '', branchHeadOfficeId: '', branchId: '',
  
//   // 4. Identity & Bank
//   panNo: '', aadharNo: '', voterId: '', bankName: '', bankBranchName: '', 
//   ifscCode: '', accountNo: '', bankAddress: '', 
  
//   // 5. Statutory & Taxes
//   pfNo: '', noPf: false, esicNo: '', notEligibleEsic: false, taxDeductionTds: 'No',
  
//   // 6. Salary & Payroll
//   baseSalary: 0, allowances: 0, deductions: 0, netSalary: 0,

//   // 7. Licenses & Certifications
//   policeVerification: 'No', gunFitnessCertificate: 'No', drivingLicense: '', dlValidUpto: '',
//   gunLicense: '', gunValidUpto: '', qualification: '', educationalCertificate: '',

//   // 8. Family & Nominee
//   familyDetails: '', familyRelation: '', familyMemberDob: '',
//   nomineeRelation: '', nomineeDob: '',

//   // 9. Additional Info
//   forNaps: '', remarks: '', uniformDetails: '', deductionDetails: ''
// };

// const EmployeeManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState(emptyEmployeeForm);
  
//   // State for Sidebar Tabs
//   const [activeTab, setActiveTab] = useState('Personal');

//   const fetchEmployees = async () => {
//     try {
//       const response = await api.get('/employees');
//       setEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // Calculate Net Salary automatically
//   useEffect(() => {
//     const basic = parseFloat(formData.baseSalary) || 0;
//     const allow = parseFloat(formData.allowances) || 0;
//     const deduct = parseFloat(formData.deductions) || 0;
//     setFormData(prev => ({ ...prev, netSalary: (basic + allow) - deduct }));
//   }, [formData.baseSalary, formData.allowances, formData.deductions]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ 
//       ...formData, 
//       [name]: type === 'checkbox' ? checked : value 
//     });
//   };

//   const handleAddNew = () => {
//     setEditingId(null);
//     setFormData(emptyEmployeeForm);
//     setActiveTab('Personal');
//     setIsModalOpen(true);
//   };

//   const handleEdit = (employee) => {
//     setEditingId(employee.id);
//     setFormData({ ...emptyEmployeeForm, ...employee });
//     setActiveTab('Personal');
//     setIsModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await api.put(`/employees/${editingId}`, formData);
//       } else {
//         await api.post('/employees', formData);
//       }
//       setIsModalOpen(false);
//       fetchEmployees();
//     } catch (error) {
//       console.error('Error saving employee:', error);
//       alert(error.response?.data?.message || 'Error saving employee');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this employee?')) {
//       try {
//         await api.delete(`/employees/${id}`);
//         fetchEmployees();
//       } catch (error) {
//         console.error('Error deleting employee:', error);
//       }
//     }
//   };

//   // Define Tabs Data
//   const tabs = [
//     { id: 'Personal', label: 'Personal Info', icon: User, color: '#0ea5e9' },
//     { id: 'Contact', label: 'Contact & Address', icon: MapPin, color: '#10b981' },
//     { id: 'Office', label: 'Office & Branch', icon: Briefcase, color: '#f43f5e' },
//     { id: 'Identity', label: 'Identity & Bank', icon: IdCard, color: '#8b5cf6' },
//     { id: 'Statutory', label: 'Statutory & Tax', icon: Shield, color: '#f59e0b' },
//     { id: 'Salary', label: 'Salary Setup', icon: Calculator, color: '#14b8a6' },
//     { id: 'Licenses', label: 'Licenses & Certs', icon: FileBadge, color: '#6366f1' },
//     { id: 'Family', label: 'Family & Nominee', icon: Users, color: '#ec4899' },
//     { id: 'Additional', label: 'Additional Info', icon: Component, color: '#64748b' }
//   ];

//   return (
//     <div className="enterprise-wrapper">
//       <style>
//         {`
//           .enterprise-wrapper {
//             --ink: #0f172a; --muted: #64748b; --line: #dbe3ef;
//             --surface: #ffffff; --surface-soft: #f8fafc;
//             --brand: #0ea5e9; --brand-dark: #0369a1; --danger: #dc2626;
//             padding: 20px; min-height: 100vh; color: var(--ink);
//             font-family: Inter, "Segoe UI", system-ui, -apple-system, sans-serif;
//             background: linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(248, 250, 252, 0) 34%),
//                         linear-gradient(315deg, rgba(245, 158, 11, 0.10) 0%, rgba(248, 250, 252, 0) 38%), #f8fafc;
//           }
          
//           /* Table Styles */
//           .enterprise-table-container { background: rgba(255, 255, 255, 0.86); border-radius: 16px; border: 1px solid rgba(203, 213, 225, 0.9); box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08); overflow-x: auto; }
//           .enterprise-table { width: 100%; min-width: 760px; border-collapse: collapse; text-align: left; }
//           .enterprise-table th { background: linear-gradient(180deg, #f8fafc 0%, #eef4fb 100%); padding: 15px 16px; color: #475569; font-weight: 800; text-transform: uppercase; font-size: 0.76rem; border-bottom: 1px solid #dbe3ef; }
//           .enterprise-table td { padding: 15px 16px; border-bottom: 1px solid #eef2f7; vertical-align: middle; }
          
//           /* Modal & Layout Styles */
//           .modal-backdrop-glass { position: fixed; inset: 0; background: linear-gradient(135deg, rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.58)); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; z-index: 1050; padding: 20px; }
//           .modal-card-elegant { width: 100%; max-width: 1300px; height: 90vh; display: flex; flex-direction: column; border-radius: 18px; background: #ffffff; box-shadow: 0 36px 80px rgba(2, 6, 23, 0.34); overflow: hidden; }
//           .modal-header-gradient { background: linear-gradient(135deg, #0f172a 0%, #16324a 52%, #075985 100%); border-bottom: 4px solid #38bdf8; padding: 18px 24px; flex-shrink: 0; }
//           .modal-close-button { width: 38px; height: 38px; border: 1px solid rgba(255, 255, 255, 0.22); border-radius: 999px; color: #ffffff; background: rgba(255, 255, 255, 0.08); display: inline-flex; align-items: center; justify-content: center; }
          
//           /* TAB LAYOUT */
//           .modal-body-layout { display: flex; flex: 1; overflow: hidden; }
//           .tab-sidebar { width: 260px; background: #f8fafc; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; padding: 20px 10px; overflow-y: auto; flex-shrink: 0; }
//           .tab-content-area { flex: 1; padding: 30px 40px; overflow-y: auto; background: #ffffff; }
          
//           .tab-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; margin-bottom: 8px; cursor: pointer; color: #475569; font-weight: 600; font-size: 0.95rem; transition: all 0.2s ease; border: 1px solid transparent; }
//           .tab-item:hover { background: #f1f5f9; color: #0f172a; }
//           .tab-item.active { background: #ffffff; color: #0ea5e9; border-color: #e2e8f0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05); font-weight: 700; position: relative; }
//           .tab-item.active::before { content: ''; position: absolute; left: -10px; top: 15%; bottom: 15%; width: 4px; background: #0ea5e9; border-radius: 0 4px 4px 0; }
          
//           /* Form Elements */
//           .custom-form-row { --bs-gutter-x: 2rem; --bs-gutter-y: 1.5rem; }
//           .modern-form-group { display: flex; flex-direction: column; width: 100%; margin-bottom: 1.2rem; }
//           .modern-label { text-align: left; font-size: 0.78rem; font-weight: 800; color: #334155; margin-bottom: 6px; display: inline-flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
//           .modern-input, .modern-select { width: 100%; border: 1px solid #cbd5e1 !important; border-radius: 8px !important; padding: 10px 14px !important; color: #0f172a; font-size: 0.92rem; font-weight: 600; background: #f8fafc; transition: all 0.2s ease; }
//           .modern-input:focus, .modern-select:focus { border-color: #0ea5e9 !important; background: #ffffff; outline: none !important; box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.16) !important; }
          
//           .section-title { font-size: 1.3rem; font-weight: 800; color: #0f172a; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #e2e8f0; display: flex; align-items: center; gap: 10px; }
//           .modern-checkbox { width: 1.2rem; height: 1.2rem; accent-color: #0ea5e9; cursor: pointer; }

//           /* Buttons */
//           .btn-gradient-primary { background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 42%, #0369a1 100%) !important; border: 0 !important; color: #ffffff !important; box-shadow: 0 8px 16px rgba(14, 165, 233, 0.2) !important; }
//           .btn-elegant-light { background: #ffffff !important; border: 1px solid #cbd5e1 !important; color: #475569 !important; box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04) !important; }

//           /* Mobile Responsiveness */
//           @media (max-width: 992px) {
//             .modal-body-layout { flex-direction: column; }
//             .tab-sidebar { width: 100%; flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid #e2e8f0; padding: 10px 15px; }
//             .tab-item { white-space: nowrap; margin-bottom: 0; margin-right: 10px; }
//             .tab-item.active::before { display: none; }
//             .tab-item.active { border-bottom: 3px solid #0ea5e9; border-radius: 8px 8px 0 0; }
//             .tab-content-area { padding: 20px; }
//           }
//         `}
//       </style>

//       {/* HEADER SECTION */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="fw-bold mb-0" style={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
//             Employee Management
//           </h2>
//           <p className="text-muted mb-0" style={{fontSize: '0.9rem', fontWeight: '500'}}>Enterprise HR & Payroll Configuration</p>
//         </div>
//         <button onClick={handleAddNew} className="btn btn-gradient-primary fw-bold px-4 py-2 rounded-pill d-flex align-items-center gap-2">
//           <Plus size={18} /> Add Employee
//         </button>
//       </div>

//       {/* TABLE SECTION */}
//       <div className="enterprise-table-container">
//         <table className="enterprise-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Department</th>
//               <th>Phone</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length === 0 ? (
//               <tr>
//                 <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontWeight: '600' }}>
//                   No active employees found.
//                 </td>
//               </tr>
//             ) : (
//               employees.map((emp) => (
//                 <tr key={emp.id}>
//                   <td style={{ fontWeight: '700', color: '#0f172a' }}>{emp.firstName} {emp.lastName}</td>
//                   <td style={{ color: '#64748b', fontWeight: '600' }}>{emp.department || 'N/A'}</td>
//                   <td style={{ color: '#64748b', fontWeight: '500' }}>{emp.phoneNo || 'N/A'}</td>
//                   <td>
//                     <span className={`badge rounded-pill px-3 py-2 ${emp.status === 'Available' ? 'bg-success text-white' : 'bg-warning text-dark'}`}>
//                       {emp.status}
//                     </span>
//                   </td>
//                   <td style={{ display: 'flex', gap: '10px' }}>
//                     <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-elegant-light px-3 rounded-pill fw-bold d-flex align-items-center gap-1">
//                       <Pencil size={14} /> Edit
//                     </button>
//                     <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger px-3 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-1">
//                       <Trash2 size={14} /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL SECTION */}
//       {isModalOpen && (
//         <div className="modal-backdrop-glass" role="dialog">
//           <div className="modal-card-elegant">
            
//             <div className="card-header text-white d-flex justify-content-between align-items-center modal-header-gradient">
//               <h4 className="mb-0 fw-bold py-1 d-flex align-items-center gap-2">
//                 <Users size={24} color="#38bdf8" />
//                 {editingId ? 'Edit Employee Profile' : 'New Employee Onboarding'}
//               </h4>
//               <button type="button" className="modal-close-button" onClick={() => setIsModalOpen(false)}>
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="modal-body-layout">
//               {/* LEFT SIDEBAR TABS */}
//               <div className="tab-sidebar">
//                 {tabs.map(tab => {
//                   const Icon = tab.icon;
//                   return (
//                     <div 
//                       key={tab.id}
//                       className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
//                       onClick={() => setActiveTab(tab.id)}
//                     >
//                       <Icon size={18} color={activeTab === tab.id ? tab.color : '#64748b'} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
//                       {tab.label}
//                     </div>
//                   )
//                 })}
//               </div>

//               {/* RIGHT CONTENT AREA */}
//               <div className="tab-content-area">
//                 <form id="employeeForm" onSubmit={handleSubmit} className="row custom-form-row">
                  
//                   {/* TAB 1: PERSONAL INFO */}
//                   {activeTab === 'Personal' && (
//                     <>
//                       <h4 className="section-title"><User color="#0ea5e9"/> Personal Information</h4>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">First Name *</label><input type="text" className="modern-input" name="firstName" value={formData.firstName} onChange={handleChange} required /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Middle Name</label><input type="text" className="modern-input" name="middleName" value={formData.middleName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Last Name *</label><input type="text" className="modern-input" name="lastName" value={formData.lastName} onChange={handleChange} required /></div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Father's Name</label><input type="text" className="modern-input" name="fathersName" value={formData.fathersName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Mother's Name</label><input type="text" className="modern-input" name="mothersName" value={formData.mothersName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Relation</label>
//                         <select name="relation" value={formData.relation} onChange={handleChange} className="modern-select">
//                           <option value="Father">Father</option><option value="Husband">Husband</option>
//                         </select>
//                       </div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Date of Birth</label><input type="date" className="modern-input" name="dob" value={formData.dob} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Gender</label>
//                         <select name="sex" value={formData.sex} onChange={handleChange} className="modern-select">
//                           <option value="M">Male</option><option value="F">Female</option><option value="Other">Other</option>
//                         </select>
//                       </div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Marital Status</label>
//                         <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="modern-select">
//                           <option value="Single">Single</option><option value="Married">Married</option><option value="Other">Other</option>
//                         </select>
//                       </div></div>
//                       <div className="col-lg-8 col-md-6"><div className="modern-form-group"><label className="modern-label">Spouse Name</label><input type="text" className="modern-input" name="spouseName" value={formData.spouseName} onChange={handleChange} /></div></div>
//                     </>
//                   )}

//                   {/* TAB 2: CONTACT & ADDRESS */}
//                   {activeTab === 'Contact' && (
//                     <>
//                       <h4 className="section-title"><MapPin color="#10b981"/> Contact & Address</h4>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Email Address *</label><input type="email" className="modern-input" name="email" value={formData.email} onChange={handleChange} required /></div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Phone Number</label><input type="text" className="modern-input" name="phoneNo" value={formData.phoneNo} onChange={handleChange} /></div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">City</label><input type="text" className="modern-input" name="city" value={formData.city} onChange={handleChange} /></div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">State</label>
//                         <select name="state" value={formData.state} onChange={handleChange} className="modern-select">
//                           <option value="">Choose...</option><option value="Delhi">Delhi</option><option value="Maharashtra">Maharashtra</option><option value="Karnataka">Karnataka</option><option value="West Bengal">West Bengal</option>
//                         </select>
//                       </div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">District</label><input type="text" className="modern-input" name="district" value={formData.district} onChange={handleChange} /></div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Pincode</label><input type="text" className="modern-input" name="pinCode" value={formData.pinCode} onChange={handleChange} /></div></div>
//                       <div className="col-12"><div className="modern-form-group"><label className="modern-label">Local Address</label><textarea className="modern-input" name="localAddress" value={formData.localAddress} onChange={handleChange} rows="2" /></div></div>
//                       <div className="col-12"><div className="modern-form-group"><label className="modern-label">Permanent Address</label><textarea className="modern-input" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} rows="2" /></div></div>
//                     </>
//                   )}

//                   {/* TAB 3: OFFICE & BRANCH */}
//                   {activeTab === 'Office' && (
//                     <>
//                       <h4 className="section-title"><Briefcase color="#f43f5e"/> Organizational Hierarchy</h4>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Organization Name</label><input type="text" className="modern-input" name="organizationName" value={formData.organizationName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Site Name</label><input type="text" className="modern-input" name="siteName" value={formData.siteName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Department</label><input type="text" className="modern-input" name="department" value={formData.department} onChange={handleChange} /></div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Position / Rank</label><input type="text" className="modern-input" name="rank" value={formData.rank} onChange={handleChange} /></div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Status</label>
//                         <select name="status" value={formData.status} onChange={handleChange} className="modern-select">
//                           <option value="Available">Available</option><option value="Assigned">Assigned</option><option value="On Leave">On Leave</option>
//                         </select>
//                       </div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Date of Join (DOJ)</label><input type="date" className="modern-input" name="doj" value={formData.doj} onChange={handleChange} /></div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">TKT No</label><input type="text" className="modern-input" name="tktNo" value={formData.tktNo} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Reporting Officer</label><input type="text" className="modern-input" name="officerName" value={formData.officerName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Officer Contact No.</label><input type="text" className="modern-input" name="officerNo" value={formData.officerNo} onChange={handleChange} /></div></div>

//                       <h5 className="mt-4 fw-bold text-muted w-100 border-bottom pb-2">Office Details</h5>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Office Name</label><input type="text" className="modern-input" name="officeName" value={formData.officeName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg Location</label><input type="text" className="modern-input" name="officeRegLocation" value={formData.officeRegLocation} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Working Addr.</label><input type="text" className="modern-input" name="officeWorkingAddress" value={formData.officeWorkingAddress} onChange={handleChange} /></div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg No</label><input type="text" className="modern-input" name="officeRegNo" value={formData.officeRegNo} onChange={handleChange} /></div></div>
//                       <div className="col-lg-3 col-md-6"><div className="modern-form-group"><label className="modern-label">Reg Year</label><input type="text" className="modern-input" name="officeRegYear" value={formData.officeRegYear} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-12"><div className="modern-form-group"><label className="modern-label">Office Mail / Phone</label><input type="text" className="modern-input" name="officeEmail" value={formData.officeEmail} placeholder="Email or Phone" onChange={handleChange} /></div></div>
                      
//                       <h5 className="mt-4 fw-bold text-muted w-100 border-bottom pb-2">Branch Details</h5>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Branch Name</label><input type="text" className="modern-input" name="branchName" value={formData.branchName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Working Addr.</label><input type="text" className="modern-input" name="branchWorkingAddress" value={formData.branchWorkingAddress} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Branch ID</label><input type="text" className="modern-input" name="branchId" value={formData.branchId} onChange={handleChange} /></div></div>
//                     </>
//                   )}

//                   {/* TAB 4: IDENTITY & BANK */}
//                   {activeTab === 'Identity' && (
//                     <>
//                       <h4 className="section-title"><IdCard color="#8b5cf6"/> Identity & Banking</h4>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">PAN No</label><input type="text" className="modern-input" name="panNo" value={formData.panNo} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Aadhar No</label><input type="text" className="modern-input" name="aadharNo" value={formData.aadharNo} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Voter ID</label><input type="text" className="modern-input" name="voterId" value={formData.voterId} onChange={handleChange} /></div></div>
                      
//                       <h5 className="mt-4 fw-bold text-muted w-100 border-bottom pb-2">Bank Account Information</h5>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Bank Name</label><input type="text" className="modern-input" name="bankName" value={formData.bankName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Branch Name</label><input type="text" className="modern-input" name="bankBranchName" value={formData.bankBranchName} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">IFSC Code</label><input type="text" className="modern-input" name="ifscCode" value={formData.ifscCode} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Account Number</label><input type="text" className="modern-input" name="accountNo" value={formData.accountNo} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-12"><div className="modern-form-group"><label className="modern-label">Bank Address</label><input type="text" className="modern-input" name="bankAddress" value={formData.bankAddress} onChange={handleChange} /></div></div>
//                     </>
//                   )}

//                   {/* TAB 5: STATUTORY & TAXES */}
//                   {activeTab === 'Statutory' && (
//                     <>
//                       <h4 className="section-title"><Shield color="#f59e0b"/> PF, ESIC & Taxes</h4>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">PF Number</label><input type="text" className="modern-input" name="pfNo" value={formData.pfNo} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-6 d-flex align-items-center">
//                         <input type="checkbox" name="noPf" id="noPf" checked={formData.noPf} onChange={handleChange} className="modern-checkbox me-2" />
//                         <label htmlFor="noPf" className="mb-0 fw-bold" style={{color: '#475569'}}>Employee Not Eligible for PF</label>
//                       </div>
                      
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">ESIC Number</label><input type="text" className="modern-input" name="esicNo" value={formData.esicNo} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-6 d-flex align-items-center">
//                         <input type="checkbox" name="notEligibleEsic" id="noEsic" checked={formData.notEligibleEsic} onChange={handleChange} className="modern-checkbox me-2" />
//                         <label htmlFor="noEsic" className="mb-0 fw-bold" style={{color: '#475569'}}>Employee Not Eligible for ESIC</label>
//                       </div>

//                       <div className="col-lg-6 col-md-6 mt-4"><div className="modern-form-group"><label className="modern-label">Tax Deduction (TDS) Applicable</label>
//                         <select name="taxDeductionTds" value={formData.taxDeductionTds} onChange={handleChange} className="modern-select">
//                           <option value="No">No</option><option value="Yes">Yes</option>
//                         </select>
//                       </div></div>
//                     </>
//                   )}

//                   {/* TAB 6: SALARY & PAYROLL */}
//                   {activeTab === 'Salary' && (
//                     <>
//                       <h4 className="section-title"><Calculator color="#14b8a6"/> Salary Calculation Setup</h4>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group">
//                         <label className="modern-label text-primary">Basic Salary (Monthly)</label>
//                         <input type="number" className="modern-input" name="baseSalary" value={formData.baseSalary} onChange={handleChange} placeholder="0.00" />
//                       </div></div>
                      
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group">
//                         <label className="modern-label text-success">Total Allowances (HRA, TA, etc.)</label>
//                         <input type="number" className="modern-input" name="allowances" value={formData.allowances} onChange={handleChange} placeholder="0.00" />
//                       </div></div>

//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group">
//                         <label className="modern-label text-danger">Fixed Deductions (Advances, etc.)</label>
//                         <input type="number" className="modern-input" name="deductions" value={formData.deductions} onChange={handleChange} placeholder="0.00" />
//                       </div></div>

//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group">
//                         <label className="modern-label" style={{color: '#0f172a'}}>Calculated Net Salary</label>
//                         <input type="number" className="modern-input bg-light" name="netSalary" value={formData.netSalary} readOnly style={{border: '2px solid #10b981', fontWeight: '800', color: '#10b981'}} />
//                       </div></div>

//                       <div className="col-12 mt-3">
//                         <div className="p-3 bg-light rounded border border-info d-flex align-items-start gap-2">
//                           <FileCheck size={20} color="#0ea5e9" className="mt-1" />
//                           <p className="mb-0 text-muted" style={{fontSize: '0.85rem'}}>
//                             <strong>Payroll Note:</strong> The "Net Salary" displayed here is a base estimation. Final monthly payroll processing will automatically factor in Attendance (Present/Absent days), Leave calculations, Overtime rules, and dynamic PF/ESIC/TDS deductions.
//                           </p>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   {/* TAB 7: LICENSES */}
//                   {activeTab === 'Licenses' && (
//                     <>
//                       <h4 className="section-title"><FileBadge color="#6366f1"/> Certifications & Licenses</h4>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Police Verification</label>
//                         <select name="policeVerification" value={formData.policeVerification} onChange={handleChange} className="modern-select">
//                           <option value="No">No</option><option value="Yes">Yes</option><option value="Pending">Pending</option>
//                         </select>
//                       </div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Educational Qualification</label><input type="text" className="modern-input" name="qualification" value={formData.qualification} onChange={handleChange} /></div></div>
                      
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Driving License No.</label><input type="text" className="modern-input" name="drivingLicense" value={formData.drivingLicense} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">DL Valid Upto</label><input type="date" className="modern-input" name="dlValidUpto" value={formData.dlValidUpto} onChange={handleChange} /></div></div>
                      
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Gun License No.</label><input type="text" className="modern-input" name="gunLicense" value={formData.gunLicense} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Gun Valid Upto</label><input type="date" className="modern-input" name="gunValidUpto" value={formData.gunValidUpto} onChange={handleChange} /></div></div>
//                       <div className="col-lg-4 col-md-6"><div className="modern-form-group"><label className="modern-label">Gun Fitness Cert.</label>
//                         <select name="gunFitnessCertificate" value={formData.gunFitnessCertificate} onChange={handleChange} className="modern-select">
//                           <option value="No">No</option><option value="Yes">Yes</option>
//                         </select>
//                       </div></div>
//                     </>
//                   )}

//                   {/* TAB 8: FAMILY & NOMINEE */}
//                   {activeTab === 'Family' && (
//                     <>
//                       <h4 className="section-title"><Users color="#ec4899"/> Family & Beneficiary Details</h4>
//                       <div className="col-12"><div className="modern-form-group"><label className="modern-label">Family Details Overview</label><textarea className="modern-input" name="familyDetails" value={formData.familyDetails} onChange={handleChange} rows="2" /></div></div>
                      
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Emergency Contact Relation</label><input type="text" className="modern-input" name="familyRelation" value={formData.familyRelation} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Family Member DOB</label><input type="date" className="modern-input" name="familyMemberDob" value={formData.familyMemberDob} onChange={handleChange} /></div></div>
                      
//                       <h5 className="mt-4 fw-bold text-muted w-100 border-bottom pb-2">PF/Insurance Nominee</h5>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Nominee Relation</label><input type="text" className="modern-input" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-6"><div className="modern-form-group"><label className="modern-label">Nominee DOB</label><input type="date" className="modern-input" name="nomineeDob" value={formData.nomineeDob} onChange={handleChange} /></div></div>
//                     </>
//                   )}

//                   {/* TAB 9: ADDITIONAL */}
//                   {activeTab === 'Additional' && (
//                     <>
//                       <h4 className="section-title"><Component color="#64748b"/> Additional Configurations</h4>
//                       <div className="col-lg-6 col-md-12"><div className="modern-form-group"><label className="modern-label">NAPS Details</label><input type="text" className="modern-input" name="forNaps" value={formData.forNaps} onChange={handleChange} /></div></div>
//                       <div className="col-lg-6 col-md-12"><div className="modern-form-group"><label className="modern-label">Uniform Allocation</label><input type="text" className="modern-input" name="uniformDetails" value={formData.uniformDetails} onChange={handleChange} /></div></div>
//                       <div className="col-lg-12"><div className="modern-form-group"><label className="modern-label">Specific Deduction Notes</label><input type="text" className="modern-input" name="deductionDetails" value={formData.deductionDetails} onChange={handleChange} /></div></div>
//                       <div className="col-lg-12"><div className="modern-form-group"><label className="modern-label">General Remarks</label><textarea className="modern-input" name="remarks" value={formData.remarks} onChange={handleChange} rows="3" /></div></div>
//                     </>
//                   )}

//                 </form>
//               </div>
//             </div>

//             {/* MODAL FOOTER */}
//             <div className="p-3 border-top d-flex justify-content-end gap-3" style={{ background: '#f8fafc', flexShrink: 0 }}>
//               <button type="button" className="btn btn-elegant-light px-5 py-2 rounded-pill fw-bold" onClick={() => setIsModalOpen(false)}>Cancel</button>
//               <button type="submit" form="employeeForm" className="btn btn-gradient-primary px-5 py-2 rounded-pill fw-bold">
//                 {editingId ? 'Update Employee' : 'Save Employee'}
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeManagement;


import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const emptyEmployeeForm = {
  // 1. Personal
  firstName: '', middleName: '', lastName: '', fathersName: '', mothersName: '', 
  relation: 'Father', dob: '', sex: 'M', spouseName: '', maritalStatus: 'Single',
  
  // 2. Contact & Address
  city: '', state: '', district: '', pinCode: '', email: '', phoneNo: '',
  localAddress: '', permanentAddress: '',
  
  // 3. Office & Branch
  organizationName: '', siteName: '', rank: '', doj: '', tktNo: '', officerName: '', officerNo: '',
  department: 'General', position: 'Staff', status: 'Available',
  officeName: '', officeRegLocation: '', officeWorkingAddress: '',
  officeRegNo: '', officeRegYear: '', officeEmail: '', officePhoneNo: '', headOfficeId: '',
  branchName: '', branchWorkingAddress: '', branchRegNo: '', branchRegYear: '',
  branchEmail: '', branchPhoneNo: '', branchHeadOfficeId: '', branchId: '',
  
  // 4. Identity & Bank
  panNo: '', aadharNo: '', voterId: '', bankName: '', bankBranchName: '', 
  ifscCode: '', accountNo: '', bankAddress: '', 
  
  // 5. Statutory & Taxes
  pfNo: '', noPf: false, esicNo: '', notEligibleEsic: false, taxDeductionTds: 'No',
  
  // 6. Salary & Payroll
  baseSalary: 0, allowances: 0, deductions: 0, netSalary: 0,

  // 7. Licenses & Certifications
  policeVerification: 'No', gunFitnessCertificate: 'No', drivingLicense: '', dlValidUpto: '',
  gunLicense: '', gunValidUpto: '', qualification: '', educationalCertificate: '',

  // 8. Family & Nominee
  familyDetails: '', familyRelation: '', familyMemberDob: '',
  nomineeRelation: '', nomineeDob: '',

  // 9. Additional Info
  forNaps: '', remarks: '', uniformDetails: '', deductionDetails: '',

  // Toggles
  hasBranch: false, hasStatutoryInfo: false, hasLicenses: false, hasNominee: false, hasAdditionalInfo: false
};

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

  // Calculate Net Salary automatically
  useEffect(() => {
    const basic = parseFloat(formData.baseSalary) || 0;
    const allow = parseFloat(formData.allowances) || 0;
    const deduct = parseFloat(formData.deductions) || 0;
    setFormData(prev => ({ ...prev, netSalary: (basic + allow) - deduct }));
  }, [formData.baseSalary, formData.allowances, formData.deductions]);

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
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0 text-dark">Employee Management</h2>
          <p className="text-muted mb-0">Enterprise HR & Payroll Configuration</p>
        </div>
        <button onClick={handleAddNew} className="btn btn-primary d-flex align-items-center gap-2 shadow-sm">
          <Plus size={18} /> Add Employee
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0 table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-uppercase" style={{ fontSize: '0.85rem' }}>
              <tr>
                <th className="py-3 ps-4">Name</th>
                <th className="py-3">Department</th>
                <th className="py-3">Phone</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted fw-bold">
                    No active employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="ps-4 fw-bold text-dark">{emp.firstName} {emp.lastName}</td>
                    <td className="text-muted">{emp.department || 'N/A'}</td>
                    <td className="text-muted">{emp.phoneNo || 'N/A'}</td>
                    <td>
                      <span className={`badge ${emp.status === 'Available' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-outline-secondary me-2">
                        <Pencil size={14} className="me-1" /> Edit
                      </button>
                      <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger">
                        <Trash2 size={14} className="me-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL-SCREEN MODAL FORM */}
      {isModalOpen && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              
              {/* Modal Header */}
              <div className="modal-header bg-primary text-white py-3">
                <h5 className="modal-title fw-bold">
                  {editingId ? 'Edit Employee Data' : 'Employee Registration Form'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body bg-light p-4 p-md-5">
                <div className="container bg-white p-4 shadow-sm rounded-3">
                  <form id="employeeForm" onSubmit={handleSubmit} className="row g-3">
                    
                    {/* --- 1. PERSONAL INFORMATION --- */}
                    <div className="col-12 mt-0">
                      <h5 className="text-primary border-bottom pb-2 fw-bold">Personal Information</h5>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">First Name *</label>
                      <input type="text" className="form-control form-control-sm" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Middle Name</label>
                      <input type="text" className="form-control form-control-sm" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Last Name *</label>
                      <input type="text" className="form-control form-control-sm" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Father's Name</label>
                      <input type="text" className="form-control form-control-sm" name="fathersName" value={formData.fathersName} onChange={handleChange} placeholder="Father's Name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Mother's Name</label>
                      <input type="text" className="form-control form-control-sm" name="mothersName" value={formData.mothersName} onChange={handleChange} placeholder="Mother's Name" />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Relation</label>
                      <select name="relation" value={formData.relation} onChange={handleChange} className="form-select form-select-sm">
                        <option value="Father">Father</option>
                        <option value="Husband">Husband</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Date of Birth</label>
                      <input type="date" className="form-control form-control-sm" name="dob" value={formData.dob} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Gender</label>
                      <select name="sex" value={formData.sex} onChange={handleChange} className="form-select form-select-sm">
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Marital Status</label>
                      <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="form-select form-select-sm">
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-8">
                      <label className="form-label text-start d-block fw-semibold">Spouse Name</label>
                      <input type="text" className="form-control form-control-sm" name="spouseName" value={formData.spouseName} onChange={handleChange} placeholder="Spouse Name" />
                    </div>


                    {/* --- 2. CONTACT & ADDRESS --- */}
                    <div className="col-12 mt-5">
                      <h5 className="text-primary border-bottom pb-2 fw-bold">Contact & Address</h5>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Email Address *</label>
                      <input type="email" className="form-control form-control-sm" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Phone Number</label>
                      <input type="text" className="form-control form-control-sm" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Phone Number" />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">City</label>
                      <input type="text" className="form-control form-control-sm" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">State</label>
                      <select name="state" value={formData.state} onChange={handleChange} className="form-select form-select-sm">
                        <option value="">Choose...</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">District</label>
                      <input type="text" className="form-control form-control-sm" name="district" value={formData.district} onChange={handleChange} placeholder="District" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">Pincode</label>
                      <input type="text" className="form-control form-control-sm" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pincode" />
                    </div>

                    <div className="col-12">
                      <label className="form-label text-start d-block fw-semibold">Local Address</label>
                      <textarea className="form-control form-control-sm" name="localAddress" value={formData.localAddress} onChange={handleChange} rows="2" placeholder="Local Address" />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-start d-block fw-semibold">Permanent Address</label>
                      <textarea className="form-control form-control-sm" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} rows="2" placeholder="Permanent Address" />
                    </div>


                    {/* --- 3. ORGANIZATIONAL HIERARCHY --- */}
                    <div className="col-12 mt-5">
                      <h5 className="text-primary border-bottom pb-2 fw-bold">Organizational Hierarchy</h5>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Organization Name</label>
                      <input type="text" className="form-control form-control-sm" name="organizationName" value={formData.organizationName} onChange={handleChange} placeholder="Organization Name" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Site Name</label>
                      <input type="text" className="form-control form-control-sm" name="siteName" value={formData.siteName} onChange={handleChange} placeholder="Site Name" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Department</label>
                      <input type="text" className="form-control form-control-sm" name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">Job Designation (Rank)</label>
                      <select name="rank" value={formData.rank} onChange={handleChange} className="form-select form-select-sm">
                        <option value="">Select Designation...</option>
                        <option value="ARM GUARD">ARM GUARD</option>
                        <option value="GUARD">GUARD</option>
                        <option value="KST">KST</option>
                        <option value="SG">SG</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">Status</label>
                      <select name="status" value={formData.status} onChange={handleChange} className="form-select form-select-sm">
                        <option value="Available">Available</option>
                        <option value="Assigned">Assigned</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">Date of Join (DOJ)</label>
                      <input type="date" className="form-control form-control-sm" name="doj" value={formData.doj} onChange={handleChange} />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">TKT No</label>
                      <input type="text" className="form-control form-control-sm" name="tktNo" value={formData.tktNo} onChange={handleChange} placeholder="TKT No" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Reporting Officer Name</label>
                      <input type="text" className="form-control form-control-sm" name="officerName" value={formData.officerName} onChange={handleChange} placeholder="Officer Name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Officer Contact No.</label>
                      <input type="text" className="form-control form-control-sm" name="officerNo" value={formData.officerNo} onChange={handleChange} placeholder="Officer Contact No" />
                    </div>


                    {/* --- OFFICE DETAILS --- */}
                    <div className="col-12 mt-4">
                      <h6 className="text-secondary fw-bold">Office Details</h6>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Office Name</label>
                      <input type="text" className="form-control form-control-sm" name="officeName" value={formData.officeName} onChange={handleChange} placeholder="Office Name" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Reg Location</label>
                      <input type="text" className="form-control form-control-sm" name="officeRegLocation" value={formData.officeRegLocation} onChange={handleChange} placeholder="Reg Location" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Working Addr.</label>
                      <input type="text" className="form-control form-control-sm" name="officeWorkingAddress" value={formData.officeWorkingAddress} onChange={handleChange} placeholder="Working Address" />
                    </div>
                    
                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">Reg No</label>
                      <input type="text" className="form-control form-control-sm" name="officeRegNo" value={formData.officeRegNo} onChange={handleChange} placeholder="Reg No" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-start d-block fw-semibold">Reg Year</label>
                      <input type="text" className="form-control form-control-sm" name="officeRegYear" value={formData.officeRegYear} onChange={handleChange} placeholder="Reg Year" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Office Mail / Phone</label>
                      <input type="text" className="form-control form-control-sm" name="officeEmail" value={formData.officeEmail} onChange={handleChange} placeholder="Email or Phone" />
                    </div>

                    {/* --- BRANCH DETAILS (TOGGLE) --- */}
                    <div className="col-12 mt-4">
                      <div className="form-check p-3 bg-light border rounded">
                        <input className="form-check-input ms-1" type="checkbox" id="hasBranch" name="hasBranch" checked={formData.hasBranch} onChange={handleChange} />
                        <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasBranch">
                          Include Branch Information
                        </label>
                      </div>
                    </div>
                    
                    {formData.hasBranch && (
                      <>
                        <div className="col-md-4">
                          <label className="form-label text-start d-block fw-semibold">Branch Name</label>
                          <input type="text" className="form-control form-control-sm" name="branchName" value={formData.branchName} onChange={handleChange} placeholder="Branch Name" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label text-start d-block fw-semibold">Working Addr.</label>
                          <input type="text" className="form-control form-control-sm" name="branchWorkingAddress" value={formData.branchWorkingAddress} onChange={handleChange} placeholder="Branch Working Address" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label text-start d-block fw-semibold">Branch ID</label>
                          <input type="text" className="form-control form-control-sm" name="branchId" value={formData.branchId} onChange={handleChange} placeholder="Branch ID" />
                        </div>
                      </>
                    )}


                    {/* --- 4. IDENTITY & BANKING --- */}
                    <div className="col-12 mt-5">
                      <h5 className="text-primary border-bottom pb-2 fw-bold">Identity & Banking</h5>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">PAN No</label>
                      <input type="text" className="form-control form-control-sm" name="panNo" value={formData.panNo} onChange={handleChange} placeholder="PAN No" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Aadhar No</label>
                      <input type="text" className="form-control form-control-sm" name="aadharNo" value={formData.aadharNo} onChange={handleChange} placeholder="Aadhar No" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Voter ID</label>
                      <input type="text" className="form-control form-control-sm" name="voterId" value={formData.voterId} onChange={handleChange} placeholder="Voter ID" />
                    </div>

                    <div className="col-12 mt-3">
                      <h6 className="text-secondary fw-bold">Bank Account Information</h6>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Bank Name</label>
                      <input type="text" className="form-control form-control-sm" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">Branch Name</label>
                      <input type="text" className="form-control form-control-sm" name="bankBranchName" value={formData.bankBranchName} onChange={handleChange} placeholder="Branch Name" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-start d-block fw-semibold">IFSC Code</label>
                      <input type="text" className="form-control form-control-sm" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Account Number</label>
                      <input type="text" className="form-control form-control-sm" name="accountNo" value={formData.accountNo} onChange={handleChange} placeholder="Account Number" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Bank Address</label>
                      <input type="text" className="form-control form-control-sm" name="bankAddress" value={formData.bankAddress} onChange={handleChange} placeholder="Bank Address" />
                    </div>


                    {/* --- 5. STATUTORY & TAXES --- */}
                    <div className="col-12 mt-5">
                      <h5 className="text-primary border-bottom pb-2 fw-bold">PF, ESIC & Taxes</h5>
                    </div>
                    <div className="col-12 mb-2">
                      <div className="form-check p-3 bg-light border rounded">
                        <input className="form-check-input ms-1" type="checkbox" id="hasStatutoryInfo" name="hasStatutoryInfo" checked={formData.hasStatutoryInfo} onChange={handleChange} />
                        <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasStatutoryInfo">
                          Enable Statutory Compliance Details
                        </label>
                      </div>
                    </div>

                    {formData.hasStatutoryInfo && (
                      <>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">PF Number</label>
                          <input type="text" className="form-control form-control-sm" name="pfNo" value={formData.pfNo} onChange={handleChange} placeholder="PF Number" />
                        </div>
                        <div className="col-md-6 d-flex align-items-center mt-4">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="noPf" name="noPf" checked={formData.noPf} onChange={handleChange} />
                            <label className="form-check-label text-muted fw-bold" htmlFor="noPf">Employee Not Eligible for PF</label>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">ESIC Number</label>
                          <input type="text" className="form-control form-control-sm" name="esicNo" value={formData.esicNo} onChange={handleChange} placeholder="ESIC Number" />
                        </div>
                        <div className="col-md-6 d-flex align-items-center mt-4">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="notEligibleEsic" name="notEligibleEsic" checked={formData.notEligibleEsic} onChange={handleChange} />
                            <label className="form-check-label text-muted fw-bold" htmlFor="notEligibleEsic">Employee Not Eligible for ESIC</label>
                          </div>
                        </div>

                        <div className="col-md-6 mt-3">
                          <label className="form-label text-start d-block fw-semibold">Tax Deduction (TDS) Applicable</label>
                          <select name="taxDeductionTds" value={formData.taxDeductionTds} onChange={handleChange} className="form-select form-select-sm">
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                      </>
                    )}


                    {/* --- 6. SALARY & PAYROLL --- */}
                    <div className="col-12 mt-5">
                      <h5 className="text-primary border-bottom pb-2 fw-bold">Salary Calculation Setup</h5>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold text-primary">Basic Salary (Monthly)</label>
                      <input type="number" className="form-control form-control-sm" name="baseSalary" value={formData.baseSalary} onChange={handleChange} placeholder="0.00" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold text-success">Total Allowances (HRA, TA, etc.)</label>
                      <input type="number" className="form-control form-control-sm" name="allowances" value={formData.allowances} onChange={handleChange} placeholder="0.00" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold text-danger">Fixed Deductions (Advances, etc.)</label>
                      <input type="number" className="form-control form-control-sm" name="deductions" value={formData.deductions} onChange={handleChange} placeholder="0.00" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-start d-block fw-semibold">Calculated Net Salary</label>
                      <input type="number" className="form-control form-control-sm bg-light text-success fw-bold" name="netSalary" value={formData.netSalary} readOnly />
                    </div>


                    {/* --- 7. LICENSES & CERTIFICATIONS --- */}
                    <div className="col-12 mt-5">
                      <h5 className="text-primary border-bottom pb-2 fw-bold">Certifications & Licenses</h5>
                    </div>
                    <div className="col-12 mb-2">
                      <div className="form-check p-3 bg-light border rounded">
                        <input className="form-check-input ms-1" type="checkbox" id="hasLicenses" name="hasLicenses" checked={formData.hasLicenses} onChange={handleChange} />
                        <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasLicenses">
                          Enable Licenses & Certifications
                        </label>
                      </div>
                    </div>

                    {formData.hasLicenses && (
                      <>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">Police Verification</label>
                          <select name="policeVerification" value={formData.policeVerification} onChange={handleChange} className="form-select form-select-sm">
                            <option value="No">No</option><option value="Yes">Yes</option><option value="Pending">Pending</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">Educational Qualification</label>
                          <input type="text" className="form-control form-control-sm" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">Driving License No.</label>
                          <input type="text" className="form-control form-control-sm" name="drivingLicense" value={formData.drivingLicense} onChange={handleChange} placeholder="Driving License" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">DL Valid Upto</label>
                          <input type="date" className="form-control form-control-sm" name="dlValidUpto" value={formData.dlValidUpto} onChange={handleChange} />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label text-start d-block fw-semibold">Gun License No.</label>
                          <input type="text" className="form-control form-control-sm" name="gunLicense" value={formData.gunLicense} onChange={handleChange} placeholder="Gun License" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label text-start d-block fw-semibold">Gun Valid Upto</label>
                          <input type="date" className="form-control form-control-sm" name="gunValidUpto" value={formData.gunValidUpto} onChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label text-start d-block fw-semibold">Gun Fitness Cert.</label>
                          <select name="gunFitnessCertificate" value={formData.gunFitnessCertificate} onChange={handleChange} className="form-select form-select-sm">
                            <option value="No">No</option><option value="Yes">Yes</option>
                          </select>
                        </div>
                      </>
                    )}


                    {/* --- 8. FAMILY & NOMINEE --- */}
                    <div className="col-12 mt-5">
                      <h5 className="text-primary border-bottom pb-2 fw-bold">Family & Beneficiary Details</h5>
                    </div>
                    <div className="col-12 mb-2">
                      <div className="form-check p-3 bg-light border rounded">
                        <input className="form-check-input ms-1" type="checkbox" id="hasNominee" name="hasNominee" checked={formData.hasNominee} onChange={handleChange} />
                        <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasNominee">
                          Enable Family & Nominee Register
                        </label>
                      </div>
                    </div>

                    {formData.hasNominee && (
                      <>
                        <div className="col-12">
                          <label className="form-label text-start d-block fw-semibold">Family Details Overview</label>
                          <textarea className="form-control form-control-sm" name="familyDetails" value={formData.familyDetails} onChange={handleChange} rows="2" placeholder="Family Details" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">Emergency Contact Relation</label>
                          <input type="text" className="form-control form-control-sm" name="familyRelation" value={formData.familyRelation} onChange={handleChange} placeholder="Family Relation" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">Family Member DOB</label>
                          <input type="date" className="form-control form-control-sm" name="familyMemberDob" value={formData.familyMemberDob} onChange={handleChange} />
                        </div>

                        <div className="col-12 mt-3"><h6 className="text-secondary fw-bold">PF/Insurance Nominee</h6></div>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">Nominee Relation</label>
                          <input type="text" className="form-control form-control-sm" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} placeholder="Nominee Relation" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">Nominee DOB</label>
                          <input type="date" className="form-control form-control-sm" name="nomineeDob" value={formData.nomineeDob} onChange={handleChange} />
                        </div>
                      </>
                    )}


                    {/* --- 9. ADDITIONAL INFO --- */}
                    <div className="col-12 mt-5">
                      <h5 className="text-primary border-bottom pb-2 fw-bold">Additional Configurations</h5>
                    </div>
                    <div className="col-12 mb-2">
                      <div className="form-check p-3 bg-light border rounded">
                        <input className="form-check-input ms-1" type="checkbox" id="hasAdditionalInfo" name="hasAdditionalInfo" checked={formData.hasAdditionalInfo} onChange={handleChange} />
                        <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasAdditionalInfo">
                          Enable Extra Operational Info
                        </label>
                      </div>
                    </div>

                    {formData.hasAdditionalInfo && (
                      <>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">NAPS Details</label>
                          <input type="text" className="form-control form-control-sm" name="forNaps" value={formData.forNaps} onChange={handleChange} placeholder="NAPS Details" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-start d-block fw-semibold">Uniform Allocation</label>
                          <input type="text" className="form-control form-control-sm" name="uniformDetails" value={formData.uniformDetails} onChange={handleChange} placeholder="Uniform Allocation" />
                        </div>
                        <div className="col-12">
                          <label className="form-label text-start d-block fw-semibold">Specific Deduction Notes</label>
                          <input type="text" className="form-control form-control-sm" name="deductionDetails" value={formData.deductionDetails} onChange={handleChange} placeholder="Deduction Notes" />
                        </div>
                        <div className="col-12">
                          <label className="form-label text-start d-block fw-semibold">General Remarks</label>
                          <textarea className="form-control form-control-sm" name="remarks" value={formData.remarks} onChange={handleChange} rows="3" placeholder="Remarks" />
                        </div>
                      </>
                    )}

                  </form>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-secondary px-4 shadow-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" form="employeeForm" className="btn btn-primary px-5 shadow-sm fw-bold">
                  {editingId ? 'Update Employee' : 'Submit Registration'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;