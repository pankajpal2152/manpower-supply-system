// import React, { useState, useEffect, useRef } from 'react';
// import api from '../api/axios';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Plus, Pencil, Trash2, X } from 'lucide-react';
// import './EmployeeManagement.css'; // <-- Importing the new CSS file

// const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

// const emptyEmployeeForm = {
//   // Image
//   profileImage: '',
//   profileImageBase64: '',

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
//   forNaps: '', remarks: '', uniformDetails: '', deductionDetails: '',

//   // Toggles
//   hasBranch: false, hasStatutoryInfo: false, hasLicenses: false, hasNominee: false, hasAdditionalInfo: false
// };

// const EmployeeManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState(emptyEmployeeForm);
//   const fileInputRef = useRef(null);

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

//   // --- IMAGE UPLOAD LOGIC ---
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 800000) { // Limit size to ~800KB
//         alert("Image size exceeds 800KB limit. Please choose a smaller file.");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData(prev => ({ 
//             ...prev, 
//             profileImageBase64: reader.result,
//             profileImage: URL.createObjectURL(file) // temporary local display
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setFormData(prev => ({ ...prev, profileImage: '', profileImageBase64: '' }));
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleViewImage = () => {
//     const imageSrc = formData.profileImageBase64 || formData.profileImage;
//     if (!imageSrc) return;

//     // Use iframe writing for Base64 to bypass URL length limits in browsers
//     const imageWindow = window.open("");
//     if (imageWindow) {
//       imageWindow.document.write(`
//         <iframe 
//           width='100%' 
//           height='100%' 
//           style='border:none; margin:0; padding:0;' 
//           src='${imageSrc}'>
//         </iframe>
//       `);
//     } else {
//       alert("Pop-up blocked! Please allow pop-ups to view the image.");
//     }
//   };
//   // --------------------------

//   const handleAddNew = () => {
//     setEditingId(null);
//     setFormData(emptyEmployeeForm);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (employee) => {
//     setEditingId(employee.id);
//     setFormData({ ...emptyEmployeeForm, ...employee });
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

//   return (
//     <div className="emp-wrapper">
      
//       {!isModalOpen ? (
//         <div className="emp-list-view">
//           {/* HEADER SECTION */}
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div>
//               <h2 className="fw-bold mb-0 text-dark">Employee Management</h2>
//               <p className="text-muted mb-0">Enterprise HR & Payroll Configuration</p>
//             </div>
//             <button onClick={handleAddNew} className="btn btn-primary d-flex align-items-center gap-2 shadow-sm">
//               <Plus size={18} /> Add Employee
//             </button>
//           </div>

//           {/* DATA TABLE */}
//           <div className="card shadow-sm border-0">
//             <div className="card-body p-0 table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light text-uppercase" style={{ fontSize: '0.85rem' }}>
//                   <tr>
//                     <th className="py-3 ps-4">Profile</th>
//                     <th className="py-3">Name</th>
//                     <th className="py-3">Department</th>
//                     <th className="py-3">Phone</th>
//                     <th className="py-3">Status</th>
//                     <th className="py-3 text-end pe-4">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employees.length === 0 ? (
//                     <tr>
//                       <td colSpan="6" className="text-center py-5 text-muted fw-bold">
//                         No active employees found.
//                       </td>
//                     </tr>
//                   ) : (
//                     employees.map((emp) => (
//                       <tr key={emp.id}>
//                         <td className="ps-4">
//                           <img 
//                             src={emp.profileImageBase64 || DEFAULT_AVATAR} 
//                             alt="avatar" 
//                             style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #dee2e6' }}
//                           />
//                         </td>
//                         <td className="fw-bold text-dark">{emp.firstName} {emp.lastName}</td>
//                         <td className="text-muted">{emp.department || 'N/A'}</td>
//                         <td className="text-muted">{emp.phoneNo || 'N/A'}</td>
//                         <td>
//                           <span className={`badge ${emp.status === 'Available' ? 'bg-success' : 'bg-warning text-dark'}`}>
//                             {emp.status}
//                           </span>
//                         </td>
//                         <td className="text-end pe-4">
//                           <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-outline-secondary me-2">
//                             <Pencil size={14} className="me-1" /> Edit
//                           </button>
//                           <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger">
//                             <Trash2 size={14} className="me-1" /> Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* IN-PAGE FORM VIEW */
//         <div className="emp-form-view">
//           <div className="emp-card">
            
//             {/* Form Header */}
//             <div className="emp-card-header">
//               <h5 className="mb-0 fw-bold">
//                 {editingId ? 'Edit Employee Data' : 'Employee Registration Form'}
//               </h5>
//               <button type="button" className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
//             </div>

//             {/* Form Body */}
//             <div className="emp-card-body bg-white">
//               <form id="employeeForm" onSubmit={handleSubmit} className="row g-3">
                
//                 {/* --- 1. PERSONAL INFORMATION --- */}
//                 <div className="col-12 mt-0">
//                   <h5 className="emp-section-title first-section">Personal Information</h5>
//                 </div>

//                 {/* --- PROFILE PICTURE UPLOADER --- */}
//                 <div className="col-12 mb-4 d-flex align-items-center gap-4">
//                   <div className="emp-profile-img-container shadow-sm">
//                     <img
//                       src={formData.profileImageBase64 || formData.profileImage || DEFAULT_AVATAR}
//                       alt="Profile"
//                       className="emp-profile-img"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="profileUpload" className="btn btn-sm btn-outline-primary me-2 shadow-sm cursor-pointer">
//                       <Plus size={16} className="me-1"/> {formData.profileImage || formData.profileImageBase64 ? 'Change Photo' : 'Upload Photo'}
//                     </label>
//                     <input
//                       type="file"
//                       id="profileUpload"
//                       ref={fileInputRef}
//                       accept="image/png, image/jpeg, image/jpg"
//                       style={{ display: 'none' }}
//                       onChange={handleImageChange}
//                     />
                    
//                     {(formData.profileImage || formData.profileImageBase64) && (
//                       <>
//                         <button type="button" className="btn btn-sm btn-outline-info me-2 shadow-sm" onClick={handleViewImage}>
//                           👁️ View
//                         </button>
//                         <button type="button" className="btn btn-sm btn-outline-danger shadow-sm" onClick={handleRemoveImage}>
//                           Remove
//                         </button>
//                       </>
//                     )}
//                     <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.8rem' }}>Allowed JPG, PNG. Standard passport format.</p>
//                   </div>
//                 </div>

//                 <div className="col-md-4">
//                   <label className="emp-label">First Name *</label>
//                   <input type="text" className="form-control form-control-sm" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Middle Name</label>
//                   <input type="text" className="form-control form-control-sm" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Last Name *</label>
//                   <input type="text" className="form-control form-control-sm" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label">Father's Name</label>
//                   <input type="text" className="form-control form-control-sm" name="fathersName" value={formData.fathersName} onChange={handleChange} placeholder="Father's Name" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Mother's Name</label>
//                   <input type="text" className="form-control form-control-sm" name="mothersName" value={formData.mothersName} onChange={handleChange} placeholder="Mother's Name" />
//                 </div>

//                 <div className="col-md-4">
//                   <label className="emp-label">Relation</label>
//                   <select name="relation" value={formData.relation} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="Father">Father</option>
//                     <option value="Husband">Husband</option>
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Date of Birth</label>
//                   <input type="date" className="form-control form-control-sm" name="dob" value={formData.dob} onChange={handleChange} />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Gender</label>
//                   <select name="sex" value={formData.sex} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="M">Male</option>
//                     <option value="F">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div className="col-md-4">
//                   <label className="emp-label">Marital Status</label>
//                   <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="Single">Single</option>
//                     <option value="Married">Married</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div className="col-md-8">
//                   <label className="emp-label">Spouse Name</label>
//                   <input type="text" className="form-control form-control-sm" name="spouseName" value={formData.spouseName} onChange={handleChange} placeholder="Spouse Name" />
//                 </div>


//                 {/* --- 2. CONTACT & ADDRESS --- */}
//                 <div className="col-12 mt-5">
//                   <h5 className="emp-section-title">Contact & Address</h5>
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Email Address *</label>
//                   <input type="email" className="form-control form-control-sm" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Phone Number</label>
//                   <input type="text" className="form-control form-control-sm" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Phone Number" />
//                 </div>

//                 <div className="col-md-3">
//                   <label className="emp-label">City</label>
//                   <input type="text" className="form-control form-control-sm" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">State</label>
//                   <select name="state" value={formData.state} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="">Choose...</option>
//                     <option value="Delhi">Delhi</option>
//                     <option value="Maharashtra">Maharashtra</option>
//                     <option value="Karnataka">Karnataka</option>
//                     <option value="West Bengal">West Bengal</option>
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">District</label>
//                   <input type="text" className="form-control form-control-sm" name="district" value={formData.district} onChange={handleChange} placeholder="District" />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">Pincode</label>
//                   <input type="text" className="form-control form-control-sm" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pincode" />
//                 </div>

//                 <div className="col-12">
//                   <label className="emp-label">Local Address</label>
//                   <textarea className="form-control form-control-sm" name="localAddress" value={formData.localAddress} onChange={handleChange} rows="2" placeholder="Local Address" />
//                 </div>
//                 <div className="col-12">
//                   <label className="emp-label">Permanent Address</label>
//                   <textarea className="form-control form-control-sm" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} rows="2" placeholder="Permanent Address" />
//                 </div>


//                 {/* --- 3. ORGANIZATIONAL HIERARCHY --- */}
//                 <div className="col-12 mt-5">
//                   <h5 className="emp-section-title">Organizational Hierarchy</h5>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Organization Name</label>
//                   <input type="text" className="form-control form-control-sm" name="organizationName" value={formData.organizationName} onChange={handleChange} placeholder="Organization Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Site Name</label>
//                   <input type="text" className="form-control form-control-sm" name="siteName" value={formData.siteName} onChange={handleChange} placeholder="Site Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Department</label>
//                   <input type="text" className="form-control form-control-sm" name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
//                 </div>

//                 <div className="col-md-3">
//                   <label className="emp-label">Job Designation (Rank)</label>
//                   <select name="rank" value={formData.rank} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="">Select Designation...</option>
//                     <option value="ARM GUARD">ARM GUARD</option>
//                     <option value="GUARD">GUARD</option>
//                     <option value="KST">KST</option>
//                     <option value="SG">SG</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">Status</label>
//                   <select name="status" value={formData.status} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="Available">Available</option>
//                     <option value="Assigned">Assigned</option>
//                     <option value="On Leave">On Leave</option>
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">Date of Join (DOJ)</label>
//                   <input type="date" className="form-control form-control-sm" name="doj" value={formData.doj} onChange={handleChange} />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">TKT No</label>
//                   <input type="text" className="form-control form-control-sm" name="tktNo" value={formData.tktNo} onChange={handleChange} placeholder="TKT No" />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label">Reporting Officer Name</label>
//                   <input type="text" className="form-control form-control-sm" name="officerName" value={formData.officerName} onChange={handleChange} placeholder="Officer Name" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Officer Contact No.</label>
//                   <input type="text" className="form-control form-control-sm" name="officerNo" value={formData.officerNo} onChange={handleChange} placeholder="Officer Contact No" />
//                 </div>


//                 {/* --- OFFICE DETAILS --- */}
//                 <div className="col-12 mt-4">
//                   <h6 className="emp-sub-section-title">Office Details</h6>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Office Name</label>
//                   <input type="text" className="form-control form-control-sm" name="officeName" value={formData.officeName} onChange={handleChange} placeholder="Office Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label text-start d-block fw-semibold">Reg Location</label>
//                   <input type="text" className="form-control form-control-sm" name="officeRegLocation" value={formData.officeRegLocation} onChange={handleChange} placeholder="Reg Location" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label text-start d-block fw-semibold">Working Addr.</label>
//                   <input type="text" className="form-control form-control-sm" name="officeWorkingAddress" value={formData.officeWorkingAddress} onChange={handleChange} placeholder="Working Address" />
//                 </div>
                
//                 <div className="col-md-3">
//                   <label className="form-label text-start d-block fw-semibold">Reg No</label>
//                   <input type="text" className="form-control form-control-sm" name="officeRegNo" value={formData.officeRegNo} onChange={handleChange} placeholder="Reg No" />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label text-start d-block fw-semibold">Reg Year</label>
//                   <input type="text" className="form-control form-control-sm" name="officeRegYear" value={formData.officeRegYear} onChange={handleChange} placeholder="Reg Year" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label text-start d-block fw-semibold">Office Mail / Phone</label>
//                   <input type="text" className="form-control form-control-sm" name="officeEmail" value={formData.officeEmail} onChange={handleChange} placeholder="Email or Phone" />
//                 </div>

//                 {/* --- BRANCH DETAILS (TOGGLE) --- */}
//                 <div className="col-12 mt-4">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasBranch" name="hasBranch" checked={formData.hasBranch} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasBranch">
//                       Include Branch Information
//                     </label>
//                   </div>
//                 </div>
                
//                 {formData.hasBranch && (
//                   <>
//                     <div className="col-md-4">
//                       <label className="form-label text-start d-block fw-semibold">Branch Name</label>
//                       <input type="text" className="form-control form-control-sm" name="branchName" value={formData.branchName} onChange={handleChange} placeholder="Branch Name" />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="form-label text-start d-block fw-semibold">Working Addr.</label>
//                       <input type="text" className="form-control form-control-sm" name="branchWorkingAddress" value={formData.branchWorkingAddress} onChange={handleChange} placeholder="Branch Working Address" />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="form-label text-start d-block fw-semibold">Branch ID</label>
//                       <input type="text" className="form-control form-control-sm" name="branchId" value={formData.branchId} onChange={handleChange} placeholder="Branch ID" />
//                     </div>
//                   </>
//                 )}


//                 {/* --- 4. IDENTITY & BANKING --- */}
//                 <div className="col-12 mt-5">
//                   <h5 className="emp-section-title">Identity & Banking</h5>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">PAN No</label>
//                   <input type="text" className="form-control form-control-sm" name="panNo" value={formData.panNo} onChange={handleChange} placeholder="PAN No" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Aadhar No</label>
//                   <input type="text" className="form-control form-control-sm" name="aadharNo" value={formData.aadharNo} onChange={handleChange} placeholder="Aadhar No" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Voter ID</label>
//                   <input type="text" className="form-control form-control-sm" name="voterId" value={formData.voterId} onChange={handleChange} placeholder="Voter ID" />
//                 </div>

//                 <div className="col-12 mt-3">
//                   <h6 className="emp-sub-section-title">Bank Account Information</h6>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Bank Name</label>
//                   <input type="text" className="form-control form-control-sm" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Branch Name</label>
//                   <input type="text" className="form-control form-control-sm" name="bankBranchName" value={formData.bankBranchName} onChange={handleChange} placeholder="Branch Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">IFSC Code</label>
//                   <input type="text" className="form-control form-control-sm" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label">Account Number</label>
//                   <input type="text" className="form-control form-control-sm" name="accountNo" value={formData.accountNo} onChange={handleChange} placeholder="Account Number" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Bank Address</label>
//                   <input type="text" className="form-control form-control-sm" name="bankAddress" value={formData.bankAddress} onChange={handleChange} placeholder="Bank Address" />
//                 </div>


//                 {/* --- 5. STATUTORY & TAXES --- */}
//                 <div className="col-12 mt-5">
//                   <h5 className="emp-section-title">PF, ESIC & Taxes</h5>
//                 </div>
//                 <div className="col-12 mb-2">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasStatutoryInfo" name="hasStatutoryInfo" checked={formData.hasStatutoryInfo} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasStatutoryInfo">
//                       Enable Statutory Compliance Details
//                     </label>
//                   </div>
//                 </div>

//                 {formData.hasStatutoryInfo && (
//                   <>
//                     <div className="col-md-6">
//                       <label className="emp-label">PF Number</label>
//                       <input type="text" className="form-control form-control-sm" name="pfNo" value={formData.pfNo} onChange={handleChange} placeholder="PF Number" />
//                     </div>
//                     <div className="col-md-6 d-flex align-items-center mt-4">
//                       <div className="form-check">
//                         <input className="form-check-input" type="checkbox" id="noPf" name="noPf" checked={formData.noPf} onChange={handleChange} />
//                         <label className="form-check-label text-muted fw-bold" htmlFor="noPf">Employee Not Eligible for PF</label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <label className="emp-label">ESIC Number</label>
//                       <input type="text" className="form-control form-control-sm" name="esicNo" value={formData.esicNo} onChange={handleChange} placeholder="ESIC Number" />
//                     </div>
//                     <div className="col-md-6 d-flex align-items-center mt-4">
//                       <div className="form-check">
//                         <input className="form-check-input" type="checkbox" id="notEligibleEsic" name="notEligibleEsic" checked={formData.notEligibleEsic} onChange={handleChange} />
//                         <label className="form-check-label text-muted fw-bold" htmlFor="notEligibleEsic">Employee Not Eligible for ESIC</label>
//                       </div>
//                     </div>

//                     <div className="col-md-6 mt-3">
//                       <label className="emp-label">Tax Deduction (TDS) Applicable</label>
//                       <select name="taxDeductionTds" value={formData.taxDeductionTds} onChange={handleChange} className="form-select form-select-sm">
//                         <option value="No">No</option>
//                         <option value="Yes">Yes</option>
//                       </select>
//                     </div>
//                   </>
//                 )}


//                 {/* --- 6. SALARY & PAYROLL --- */}
//                 <div className="col-12 mt-5">
//                   <h5 className="emp-section-title">Salary Calculation Setup</h5>
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label text-primary">Basic Salary (Monthly)</label>
//                   <input type="number" className="form-control form-control-sm" name="baseSalary" value={formData.baseSalary} onChange={handleChange} placeholder="0.00" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label text-success">Total Allowances (HRA, TA, etc.)</label>
//                   <input type="number" className="form-control form-control-sm" name="allowances" value={formData.allowances} onChange={handleChange} placeholder="0.00" />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label text-danger">Fixed Deductions (Advances, etc.)</label>
//                   <input type="number" className="form-control form-control-sm" name="deductions" value={formData.deductions} onChange={handleChange} placeholder="0.00" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Calculated Net Salary</label>
//                   <input type="number" className="form-control form-control-sm bg-light text-success fw-bold" name="netSalary" value={formData.netSalary} readOnly />
//                 </div>


//                 {/* --- 7. LICENSES & CERTIFICATIONS --- */}
//                 <div className="col-12 mt-5">
//                   <h5 className="emp-section-title">Certifications & Licenses</h5>
//                 </div>
//                 <div className="col-12 mb-2">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasLicenses" name="hasLicenses" checked={formData.hasLicenses} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasLicenses">
//                       Enable Licenses & Certifications
//                     </label>
//                   </div>
//                 </div>

//                 {formData.hasLicenses && (
//                   <>
//                     <div className="col-md-6">
//                       <label className="emp-label">Police Verification</label>
//                       <select name="policeVerification" value={formData.policeVerification} onChange={handleChange} className="form-select form-select-sm">
//                         <option value="No">No</option><option value="Yes">Yes</option><option value="Pending">Pending</option>
//                       </select>
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Educational Qualification</label>
//                       <input type="text" className="form-control form-control-sm" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" />
//                     </div>

//                     <div className="col-md-6">
//                       <label className="emp-label">Driving License No.</label>
//                       <input type="text" className="form-control form-control-sm" name="drivingLicense" value={formData.drivingLicense} onChange={handleChange} placeholder="Driving License" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">DL Valid Upto</label>
//                       <input type="date" className="form-control form-control-sm" name="dlValidUpto" value={formData.dlValidUpto} onChange={handleChange} />
//                     </div>

//                     <div className="col-md-4">
//                       <label className="emp-label">Gun License No.</label>
//                       <input type="text" className="form-control form-control-sm" name="gunLicense" value={formData.gunLicense} onChange={handleChange} placeholder="Gun License" />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="emp-label">Gun Valid Upto</label>
//                       <input type="date" className="form-control form-control-sm" name="gunValidUpto" value={formData.gunValidUpto} onChange={handleChange} />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="emp-label">Gun Fitness Cert.</label>
//                       <select name="gunFitnessCertificate" value={formData.gunFitnessCertificate} onChange={handleChange} className="form-select form-select-sm">
//                         <option value="No">No</option><option value="Yes">Yes</option>
//                       </select>
//                     </div>
//                   </>
//                 )}


//                 {/* --- 8. FAMILY & NOMINEE --- */}
//                 <div className="col-12 mt-5">
//                   <h5 className="emp-section-title">Family & Beneficiary Details</h5>
//                 </div>
//                 <div className="col-12 mb-2">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasNominee" name="hasNominee" checked={formData.hasNominee} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasNominee">
//                       Enable Family & Nominee Register
//                     </label>
//                   </div>
//                 </div>

//                 {formData.hasNominee && (
//                   <>
//                     <div className="col-12">
//                       <label className="emp-label">Family Details Overview</label>
//                       <textarea className="form-control form-control-sm" name="familyDetails" value={formData.familyDetails} onChange={handleChange} rows="2" placeholder="Family Details" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Emergency Contact Relation</label>
//                       <input type="text" className="form-control form-control-sm" name="familyRelation" value={formData.familyRelation} onChange={handleChange} placeholder="Family Relation" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Family Member DOB</label>
//                       <input type="date" className="form-control form-control-sm" name="familyMemberDob" value={formData.familyMemberDob} onChange={handleChange} />
//                     </div>

//                     <div className="col-12 mt-3"><h6 className="emp-sub-section-title">PF/Insurance Nominee</h6></div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Nominee Relation</label>
//                       <input type="text" className="form-control form-control-sm" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} placeholder="Nominee Relation" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Nominee DOB</label>
//                       <input type="date" className="form-control form-control-sm" name="nomineeDob" value={formData.nomineeDob} onChange={handleChange} />
//                     </div>
//                   </>
//                 )}


//                 {/* --- 9. ADDITIONAL INFO --- */}
//                 <div className="col-12 mt-5">
//                   <h5 className="emp-section-title">Additional Configurations</h5>
//                 </div>
//                 <div className="col-12 mb-2">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasAdditionalInfo" name="hasAdditionalInfo" checked={formData.hasAdditionalInfo} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasAdditionalInfo">
//                       Enable Extra Operational Info
//                     </label>
//                   </div>
//                 </div>

//                 {formData.hasAdditionalInfo && (
//                   <>
//                     <div className="col-md-6">
//                       <label className="emp-label">NAPS Details</label>
//                       <input type="text" className="form-control form-control-sm" name="forNaps" value={formData.forNaps} onChange={handleChange} placeholder="NAPS Details" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Uniform Allocation</label>
//                       <input type="text" className="form-control form-control-sm" name="uniformDetails" value={formData.uniformDetails} onChange={handleChange} placeholder="Uniform Allocation" />
//                     </div>
//                     <div className="col-12">
//                       <label className="emp-label">Specific Deduction Notes</label>
//                       <input type="text" className="form-control form-control-sm" name="deductionDetails" value={formData.deductionDetails} onChange={handleChange} placeholder="Deduction Notes" />
//                     </div>
//                     <div className="col-12">
//                       <label className="emp-label">General Remarks</label>
//                       <textarea className="form-control form-control-sm" name="remarks" value={formData.remarks} onChange={handleChange} rows="3" placeholder="Remarks" />
//                     </div>
//                   </>
//                 )}

//               </form>
//             </div>

//             {/* Form Footer */}
//             <div className="emp-card-footer">
//               <button type="button" className="btn btn-secondary px-4 shadow-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
//               <button type="submit" form="employeeForm" className="btn btn-primary px-5 shadow-sm fw-bold">
//                 {editingId ? 'Update Employee' : 'Submit Registration'}
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeManagement;









// import React, { useState, useEffect, useRef } from "react";
// import api from "../api/axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Plus, Pencil, Trash2, X } from "lucide-react";
// import "./EmployeeManagement.css";

// const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

// const emptyEmployeeForm = {
//   // Image
//   profileImage: '',
//   profileImageBase64: '',

//   // 1. Personal
//   firstName: "", middleName: "", lastName: "", fathersName: "", mothersName: "",
//   relation: "Father", dob: "", sex: "M", spouseName: "", maritalStatus: "Single",

//   // 2. Contact & Address
//   city: "", state: "", district: "", pinCode: "", email: "", phoneNo: "",
//   localAddress: "", permanentAddress: "",

//   // 3. Office & Branch
//   organizationName: "", siteName: "", rank: "", doj: "", tktNo: "", officerName: "", officerNo: "",
//   department: "General", position: "Staff", status: "Available",
//   officeName: "", officeRegLocation: "", officeWorkingAddress: "",
//   officeRegNo: "", officeRegYear: "", officeEmail: "", officePhoneNo: "", headOfficeId: "",
//   branchName: "", branchWorkingAddress: "", branchRegNo: "", branchRegYear: "",
//   branchEmail: "", branchPhoneNo: "", branchHeadOfficeId: "", branchId: "",

//   // 4. Identity & Bank
//   panNo: "", aadharNo: "", voterId: "", bankName: "", bankBranchName: "",
//   ifscCode: "", accountNo: "", bankAddress: "",

//   // 5. Statutory & Taxes
//   pfNo: "", noPf: false, esicNo: "", notEligibleEsic: false, taxDeductionTds: "No",

//   // 6. Salary & Payroll
//   baseSalary: 0, allowances: 0, deductions: 0, netSalary: 0,

//   // 7. Licenses & Certifications
//   policeVerification: "No", gunFitnessCertificate: "No", drivingLicense: "", dlValidUpto: "",
//   gunLicense: "", gunValidUpto: "", qualification: "", educationalCertificate: "",

//   // 8. Family & Nominee
//   familyDetails: "", familyRelation: "", familyMemberDob: "",
//   nomineeRelation: "", nomineeDob: "",

//   // 9. Additional Info
//   forNaps: "", remarks: "", uniformDetails: "", deductionDetails: "",

//   // Toggles
//   hasBranch: false, hasStatutoryInfo: false, hasLicenses: false, hasNominee: false, hasAdditionalInfo: false,
// };

// const EmployeeManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState(emptyEmployeeForm);
//   const fileInputRef = useRef(null);

//   const fetchEmployees = async () => {
//     try {
//       const response = await api.get("/employees");
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // Auto-Calculate Net Salary
//   useEffect(() => {
//     const basic = parseFloat(formData.baseSalary) || 0;
//     const allow = parseFloat(formData.allowances) || 0;
//     const deduct = parseFloat(formData.deductions) || 0;
//     setFormData((prev) => ({ ...prev, netSalary: basic + allow - deduct }));
//   }, [formData.baseSalary, formData.allowances, formData.deductions]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // --- IMAGE UPLOAD LOGIC ---
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 800000) { // Limit size to ~800KB
//         alert("Image size exceeds 800KB limit. Please choose a smaller file.");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData(prev => ({ 
//             ...prev, 
//             profileImageBase64: reader.result,
//             profileImage: URL.createObjectURL(file) 
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setFormData(prev => ({ ...prev, profileImage: '', profileImageBase64: '' }));
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleViewImage = () => {
//     const imageSrc = formData.profileImageBase64 || formData.profileImage;
//     if (!imageSrc) return;
//     const imageWindow = window.open("");
//     if (imageWindow) {
//       imageWindow.document.write(`
//         <iframe width='100%' height='100%' style='border:none; margin:0; padding:0;' src='${imageSrc}'></iframe>
//       `);
//     } else {
//       alert("Pop-up blocked! Please allow pop-ups to view the image.");
//     }
//   };
//   // --------------------------

//   const handleAddNew = () => {
//     setEditingId(null);
//     setFormData(emptyEmployeeForm);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (employee) => {
//     setEditingId(employee.id);
//     setFormData({ ...emptyEmployeeForm, ...employee });
//     setIsModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await api.put(`/employees/${editingId}`, formData);
//       } else {
//         await api.post("/employees", formData);
//       }
//       setIsModalOpen(false);
//       fetchEmployees();
//     } catch (error) {
//       console.error("Error saving employee:", error);
//       alert(error.response?.data?.message || "Error saving employee");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       try {
//         await api.delete(`/employees/${id}`);
//         fetchEmployees();
//       } catch (error) {
//         console.error("Error deleting employee:", error);
//       }
//     }
//   };

//   return (
//     <div className="emp-wrapper">
//       {!isModalOpen ? (
//         <div className="emp-list-view">
//           {/* HEADER SECTION */}
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div>
//               <h2 className="fw-bold mb-0 text-dark">Employee Management</h2>
//               <p className="text-muted mb-0">
//                 Enterprise HR & Payroll Configuration
//               </p>
//             </div>
//             <button onClick={handleAddNew} className="btn btn-primary d-flex align-items-center gap-2 shadow-sm">
//               <Plus size={18} /> Add Employee
//             </button>
//           </div>

//           {/* DATA TABLE */}
//           <div className="card shadow-sm border-0">
//             <div className="card-body p-0 table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light text-uppercase" style={{ fontSize: "0.85rem" }}>
//                   <tr>
//                     <th className="py-3 ps-4">Profile</th>
//                     <th className="py-3">Name</th>
//                     <th className="py-3">Department</th>
//                     <th className="py-3">Phone</th>
//                     <th className="py-3">Status</th>
//                     <th className="py-3 text-end pe-4">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employees.length === 0 ? (
//                     <tr>
//                       <td colSpan="6" className="text-center py-5 text-muted fw-bold">
//                         No active employees found.
//                       </td>
//                     </tr>
//                   ) : (
//                     employees.map((emp) => (
//                       <tr key={emp.id}>
//                         <td className="ps-4">
//                           <img 
//                             src={emp.profileImageBase64 || DEFAULT_AVATAR} 
//                             alt="avatar" 
//                             style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #dee2e6' }}
//                           />
//                         </td>
//                         <td className="fw-bold text-dark">{emp.firstName} {emp.lastName}</td>
//                         <td className="text-muted">{emp.department || "N/A"}</td>
//                         <td className="text-muted">{emp.phoneNo || "N/A"}</td>
//                         <td>
//                           <span className={`badge ${emp.status === "Available" ? "bg-success" : "bg-warning text-dark"}`}>
//                             {emp.status}
//                           </span>
//                         </td>
//                         <td className="text-end pe-4">
//                           <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-outline-secondary me-2">
//                             <Pencil size={14} className="me-1" /> Edit
//                           </button>
//                           <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger">
//                             <Trash2 size={14} className="me-1" /> Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* IN-PAGE FORM VIEW (Client's Full Layout) */
//         <div className="emp-form-view">
//           <div className="emp-card">
            
//             {/* Form Header */}
//             <div className="emp-card-header">
//               <h5 className="mb-0 fw-bold">
//                 {editingId ? "Edit Employee Data" : "Employee Registration Form"}
//               </h5>
//               <button type="button" className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
//             </div>

//             {/* Form Body */}
//             <div className="emp-card-body">
//               <form id="employeeForm" onSubmit={handleSubmit} className="row g-3">
                
//                 {/* --- 1. PERSONAL INFORMATION --- */}
//                 <div className="col-12">
//                   <p className="PerInfo">Personal Information</p>
//                 </div>

//                 {/* Profile Image Uploader */}
//                 <div className="col-12 mb-3 d-flex align-items-center gap-4">
//                   <div className="emp-profile-img-container shadow-sm">
//                     <img src={formData.profileImageBase64 || formData.profileImage || DEFAULT_AVATAR} alt="Profile" className="emp-profile-img" />
//                   </div>
//                   <div>
//                     <label htmlFor="profileUpload" className="btn btn-sm btn-outline-primary me-2 shadow-sm cursor-pointer">
//                       <Plus size={16} className="me-1"/> {formData.profileImage || formData.profileImageBase64 ? 'Change Photo' : 'Upload Photo'}
//                     </label>
//                     <input type="file" id="profileUpload" ref={fileInputRef} accept="image/png, image/jpeg, image/jpg" style={{ display: 'none' }} onChange={handleImageChange} />
                    
//                     {(formData.profileImage || formData.profileImageBase64) && (
//                       <>
//                         <button type="button" className="btn btn-sm btn-outline-info me-2 shadow-sm" onClick={handleViewImage}>👁️ View</button>
//                         <button type="button" className="btn btn-sm btn-outline-danger shadow-sm" onClick={handleRemoveImage}>Remove</button>
//                       </>
//                     )}
//                     <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.8rem' }}>Allowed JPG, PNG. Standard passport format.</p>
//                   </div>
//                 </div>

//                 <div className="col-md-4">
//                   <label className="emp-label">First Name *</label>
//                   <input type="text" className="form-control form-control-sm" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Middle Name</label>
//                   <input type="text" className="form-control form-control-sm" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Last Name *</label>
//                   <input type="text" className="form-control form-control-sm" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label">Father's Name</label>
//                   <input type="text" className="form-control form-control-sm" name="fathersName" value={formData.fathersName} onChange={handleChange} placeholder="Father's Name" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Mother's Name</label>
//                   <input type="text" className="form-control form-control-sm" name="mothersName" value={formData.mothersName} onChange={handleChange} placeholder="Mother's Name" />
//                 </div>

//                 <div className="col-md-4">
//                   <label className="emp-label">Relation</label>
//                   <select name="relation" value={formData.relation} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="Father">Father</option>
//                     <option value="Husband">Husband</option>
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Date of Birth</label>
//                   <input type="date" className="form-control form-control-sm" name="dob" value={formData.dob} onChange={handleChange} />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Gender</label>
//                   <select name="sex" value={formData.sex} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="M">Male</option>
//                     <option value="F">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div className="col-md-4">
//                   <label className="emp-label">Marital Status</label>
//                   <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="Single">Single</option>
//                     <option value="Married">Married</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div className="col-md-8">
//                   <label className="emp-label">Spouse Name</label>
//                   <input type="text" className="form-control form-control-sm" name="spouseName" value={formData.spouseName} onChange={handleChange} placeholder="Spouse Name" />
//                 </div>

//                 {/* --- 2. CONTACT & ADDRESS --- */}
//                 <div className="col-12 mt-4">
//                   <p className="AddInfo">Address Information</p>
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label">City/Village</label>
//                   <input type="text" className="form-control form-control-sm" name="city" value={formData.city} onChange={handleChange} placeholder="City/Village" />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">Post Office</label>
//                   <input type="text" className="form-control form-control-sm" name="localAddress" value={formData.localAddress} onChange={handleChange} placeholder="Post Office" />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">Police Station</label>
//                   <input type="text" className="form-control form-control-sm" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Police Station" />
//                 </div>

//                 <div className="col-md-3">
//                   <label className="emp-label">State</label>
//                   <select name="state" value={formData.state} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="">Choose...</option>
//                     <option value="Delhi">Delhi</option>
//                     <option value="Maharashtra">Maharashtra</option>
//                     <option value="Karnataka">Karnataka</option>
//                     <option value="West Bengal">West Bengal</option>
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">District</label>
//                   <input type="text" className="form-control form-control-sm" name="district" value={formData.district} onChange={handleChange} placeholder="District" />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">Pincode</label>
//                   <input type="text" className="form-control form-control-sm" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pincode" />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label">Email Address *</label>
//                   <input type="email" className="form-control form-control-sm" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Phone Number</label>
//                   <input type="text" className="form-control form-control-sm" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Phone Number" />
//                 </div>

//                 {/* --- 4. IDENTITY --- */}
//                 <div className="col-12 mt-4">
//                   <p className="AddInfo">Identity Information</p>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">PAN No</label>
//                   <input type="text" className="form-control form-control-sm" name="panNo" value={formData.panNo} onChange={handleChange} placeholder="PAN No" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Aadhar No</label>
//                   <input type="text" className="form-control form-control-sm" name="aadharNo" value={formData.aadharNo} onChange={handleChange} placeholder="Aadhar No" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Voter ID</label>
//                   <input type="text" className="form-control form-control-sm" name="voterId" value={formData.voterId} onChange={handleChange} placeholder="Voter ID" />
//                 </div>

//                 {/* --- BANK ACCOUNT INFO --- */}
//                 <div className="col-12 mt-4">
//                   <p className="AddInfo">Bank Account Information</p>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Bank Name</label>
//                   <input type="text" className="form-control form-control-sm" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Branch Name</label>
//                   <input type="text" className="form-control form-control-sm" name="bankBranchName" value={formData.bankBranchName} onChange={handleChange} placeholder="Branch Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">IFSC Code</label>
//                   <input type="text" className="form-control form-control-sm" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label">Account Number</label>
//                   <input type="text" className="form-control form-control-sm" name="accountNo" value={formData.accountNo} onChange={handleChange} placeholder="Account Number" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Bank Address</label>
//                   <input type="text" className="form-control form-control-sm" name="bankAddress" value={formData.bankAddress} onChange={handleChange} placeholder="Bank Address" />
//                 </div>

//                 {/* --- 3. ORGANIZATIONAL HIERARCHY --- */}
//                 <div className="col-12 mt-4">
//                   <p className="d">Organizational Hierarchy</p>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Organization Name</label>
//                   <input type="text" className="form-control form-control-sm" name="organizationName" value={formData.organizationName} onChange={handleChange} placeholder="Organization Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Site Name</label>
//                   <input type="text" className="form-control form-control-sm" name="siteName" value={formData.siteName} onChange={handleChange} placeholder="Site Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Department</label>
//                   <input type="text" className="form-control form-control-sm" name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
//                 </div>

//                 <div className="col-md-3">
//                   <label className="emp-label">Job Designation (Rank)</label>
//                   <select name="rank" value={formData.rank} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="">Select Designation...</option>
//                     <option value="ARM GUARD">ARM GUARD</option>
//                     <option value="GUARD">GUARD</option>
//                     <option value="KST">KST</option>
//                     <option value="SG">SG</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">Status</label>
//                   <select name="status" value={formData.status} onChange={handleChange} className="form-select form-select-sm">
//                     <option value="Available">Available</option>
//                     <option value="Assigned">Assigned</option>
//                     <option value="On Leave">On Leave</option>
//                   </select>
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">Date of Join (DOJ)</label>
//                   <input type="date" className="form-control form-control-sm" name="doj" value={formData.doj} onChange={handleChange} />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">TKT No</label>
//                   <input type="text" className="form-control form-control-sm" name="tktNo" value={formData.tktNo} onChange={handleChange} placeholder="TKT No" />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label">Reporting Officer Name</label>
//                   <input type="text" className="form-control form-control-sm" name="officerName" value={formData.officerName} onChange={handleChange} placeholder="Officer Name" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Officer Contact No.</label>
//                   <input type="text" className="form-control form-control-sm" name="officerNo" value={formData.officerNo} onChange={handleChange} placeholder="Officer Contact No" />
//                 </div>

//                 {/* --- OFFICE DETAILS --- */}
//                 <div className="col-md-4">
//                   <label className="emp-label">Office Name</label>
//                   <input type="text" className="form-control form-control-sm" name="officeName" value={formData.officeName} onChange={handleChange} placeholder="Office Name" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Reg Location</label>
//                   <input type="text" className="form-control form-control-sm" name="officeRegLocation" value={formData.officeRegLocation} onChange={handleChange} placeholder="Reg Location" />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="emp-label">Working Addr.</label>
//                   <input type="text" className="form-control form-control-sm" name="officeWorkingAddress" value={formData.officeWorkingAddress} onChange={handleChange} placeholder="Working Address" />
//                 </div>

//                 <div className="col-md-3">
//                   <label className="emp-label">Reg No</label>
//                   <input type="text" className="form-control form-control-sm" name="officeRegNo" value={formData.officeRegNo} onChange={handleChange} placeholder="Reg No" />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="emp-label">Reg Year</label>
//                   <input type="text" className="form-control form-control-sm" name="officeRegYear" value={formData.officeRegYear} onChange={handleChange} placeholder="Reg Year" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Office Mail / Phone</label>
//                   <input type="text" className="form-control form-control-sm" name="officeEmail" value={formData.officeEmail} onChange={handleChange} placeholder="Email or Phone" />
//                 </div>

//                 {/* --- BRANCH DETAILS (TOGGLE) --- */}
//                 <div className="col-12 mt-2">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasBranch" name="hasBranch" checked={formData.hasBranch} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasBranch">
//                       Include Branch Information
//                     </label>
//                   </div>
//                 </div>

//                 {formData.hasBranch && (
//                   <>
//                     <div className="col-md-4">
//                       <label className="emp-label">Branch Name</label>
//                       <input type="text" className="form-control form-control-sm" name="branchName" value={formData.branchName} onChange={handleChange} placeholder="Branch Name" />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="emp-label">Working Addr.</label>
//                       <input type="text" className="form-control form-control-sm" name="branchWorkingAddress" value={formData.branchWorkingAddress} onChange={handleChange} placeholder="Branch Working Address" />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="emp-label">Branch ID</label>
//                       <input type="text" className="form-control form-control-sm" name="branchId" value={formData.branchId} onChange={handleChange} placeholder="Branch ID" />
//                     </div>
//                   </>
//                 )}

//                 {/* --- 5. STATUTORY & TAXES --- */}
//                 <div className="col-12 mt-4">
//                   <p className="e">PF, ESIC & Taxes</p>
//                 </div>
//                 <div className="col-12 mb-2">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasStatutoryInfo" name="hasStatutoryInfo" checked={formData.hasStatutoryInfo} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasStatutoryInfo">
//                       Enable Statutory Compliance Details
//                     </label>
//                   </div>
//                 </div>

//                 {formData.hasStatutoryInfo && (
//                   <>
//                     <div className="col-md-6">
//                       <label className="emp-label">PF Number</label>
//                       <input type="text" className="form-control form-control-sm" name="pfNo" value={formData.pfNo} onChange={handleChange} placeholder="PF Number" />
//                     </div>
//                     <div className="col-md-6 d-flex align-items-center mt-4">
//                       <div className="form-check">
//                         <input className="form-check-input" type="checkbox" id="noPf" name="noPf" checked={formData.noPf} onChange={handleChange} />
//                         <label className="form-check-label text-muted fw-bold" htmlFor="noPf">Employee Not Eligible for PF</label>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <label className="emp-label">ESIC Number</label>
//                       <input type="text" className="form-control form-control-sm" name="esicNo" value={formData.esicNo} onChange={handleChange} placeholder="ESIC Number" />
//                     </div>
//                     <div className="col-md-6 d-flex align-items-center mt-4">
//                       <div className="form-check">
//                         <input className="form-check-input" type="checkbox" id="notEligibleEsic" name="notEligibleEsic" checked={formData.notEligibleEsic} onChange={handleChange} />
//                         <label className="form-check-label text-muted fw-bold" htmlFor="notEligibleEsic">Employee Not Eligible for ESIC</label>
//                       </div>
//                     </div>

//                     <div className="col-md-6 mt-3">
//                       <label className="emp-label">Tax Deduction (TDS) Applicable</label>
//                       <select name="taxDeductionTds" value={formData.taxDeductionTds} onChange={handleChange} className="form-select form-select-sm">
//                         <option value="No">No</option>
//                         <option value="Yes">Yes</option>
//                       </select>
//                     </div>
//                   </>
//                 )}

//                 {/* --- 6. SALARY & PAYROLL --- */}
//                 <div className="col-12 mt-4">
//                   <p className="f">Salary Calculation Setup</p>
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label text-primary">Basic Salary (Monthly)</label>
//                   <input type="number" className="form-control form-control-sm" name="baseSalary" value={formData.baseSalary} onChange={handleChange} placeholder="0.00" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label text-success">Total Allowances (HRA, TA, etc.)</label>
//                   <input type="number" className="form-control form-control-sm" name="allowances" value={formData.allowances} onChange={handleChange} placeholder="0.00" />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="emp-label text-danger">Fixed Deductions (Advances, etc.)</label>
//                   <input type="number" className="form-control form-control-sm" name="deductions" value={formData.deductions} onChange={handleChange} placeholder="0.00" />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="emp-label">Calculated Net Salary</label>
//                   <input type="number" className="form-control form-control-sm bg-light text-success fw-bold" name="netSalary" value={formData.netSalary} readOnly />
//                 </div>

//                 {/* --- 7. LICENSES & CERTIFICATIONS --- */}
//                 <div className="col-12 mt-4">
//                   <p className="g">Certifications & Licenses</p>
//                 </div>
//                 <div className="col-12 mb-2">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasLicenses" name="hasLicenses" checked={formData.hasLicenses} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasLicenses">
//                       Enable Licenses & Certifications
//                     </label>
//                   </div>
//                 </div>

//                 {formData.hasLicenses && (
//                   <>
//                     <div className="col-md-6">
//                       <label className="emp-label">Police Verification</label>
//                       <select name="policeVerification" value={formData.policeVerification} onChange={handleChange} className="form-select form-select-sm">
//                         <option value="No">No</option><option value="Yes">Yes</option><option value="Pending">Pending</option>
//                       </select>
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Educational Qualification</label>
//                       <input type="text" className="form-control form-control-sm" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" />
//                     </div>

//                     <div className="col-md-6">
//                       <label className="emp-label">Driving License No.</label>
//                       <input type="text" className="form-control form-control-sm" name="drivingLicense" value={formData.drivingLicense} onChange={handleChange} placeholder="Driving License" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">DL Valid Upto</label>
//                       <input type="date" className="form-control form-control-sm" name="dlValidUpto" value={formData.dlValidUpto} onChange={handleChange} />
//                     </div>

//                     <div className="col-md-4">
//                       <label className="emp-label">Gun License No.</label>
//                       <input type="text" className="form-control form-control-sm" name="gunLicense" value={formData.gunLicense} onChange={handleChange} placeholder="Gun License" />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="emp-label">Gun Valid Upto</label>
//                       <input type="date" className="form-control form-control-sm" name="gunValidUpto" value={formData.gunValidUpto} onChange={handleChange} />
//                     </div>
//                     <div className="col-md-4">
//                       <label className="emp-label">Gun Fitness Cert.</label>
//                       <select name="gunFitnessCertificate" value={formData.gunFitnessCertificate} onChange={handleChange} className="form-select form-select-sm">
//                         <option value="No">No</option><option value="Yes">Yes</option>
//                       </select>
//                     </div>
//                   </>
//                 )}

//                 {/* --- 8. FAMILY & NOMINEE --- */}
//                 <div className="col-12 mt-4">
//                   <p className="h">Family & Beneficiary Details</p>
//                 </div>
//                 <div className="col-12 mb-2">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasNominee" name="hasNominee" checked={formData.hasNominee} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasNominee">
//                       Enable Family & Nominee Register
//                     </label>
//                   </div>
//                 </div>

//                 {formData.hasNominee && (
//                   <>
//                     <div className="col-12">
//                       <label className="emp-label">Family Details Overview</label>
//                       <textarea className="form-control form-control-sm" name="familyDetails" value={formData.familyDetails} onChange={handleChange} rows="2" placeholder="Family Details" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Emergency Contact Relation</label>
//                       <input type="text" className="form-control form-control-sm" name="familyRelation" value={formData.familyRelation} onChange={handleChange} placeholder="Family Relation" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Family Member DOB</label>
//                       <input type="date" className="form-control form-control-sm" name="familyMemberDob" value={formData.familyMemberDob} onChange={handleChange} />
//                     </div>

//                     <div className="col-md-6">
//                       <label className="emp-label">Nominee Relation</label>
//                       <input type="text" className="form-control form-control-sm" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} placeholder="Nominee Relation" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Nominee DOB</label>
//                       <input type="date" className="form-control form-control-sm" name="nomineeDob" value={formData.nomineeDob} onChange={handleChange} />
//                     </div>
//                   </>
//                 )}

//                 {/* --- 9. ADDITIONAL INFO --- */}
//                 <div className="col-12 mt-4">
//                   <p className="c">Additional Configurations</p>
//                 </div>
//                 <div className="col-12 mb-2">
//                   <div className="emp-toggle-box form-check">
//                     <input className="form-check-input ms-1" type="checkbox" id="hasAdditionalInfo" name="hasAdditionalInfo" checked={formData.hasAdditionalInfo} onChange={handleChange} />
//                     <label className="form-check-label fw-bold text-primary ms-2" htmlFor="hasAdditionalInfo">
//                       Enable Extra Operational Info
//                     </label>
//                   </div>
//                 </div>

//                 {formData.hasAdditionalInfo && (
//                   <>
//                     <div className="col-md-6">
//                       <label className="emp-label">NAPS Details</label>
//                       <input type="text" className="form-control form-control-sm" name="forNaps" value={formData.forNaps} onChange={handleChange} placeholder="NAPS Details" />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="emp-label">Uniform Allocation</label>
//                       <input type="text" className="form-control form-control-sm" name="uniformDetails" value={formData.uniformDetails} onChange={handleChange} placeholder="Uniform Allocation" />
//                     </div>
//                     <div className="col-12">
//                       <label className="emp-label">Specific Deduction Notes</label>
//                       <input type="text" className="form-control form-control-sm" name="deductionDetails" value={formData.deductionDetails} onChange={handleChange} placeholder="Deduction Notes" />
//                     </div>
//                     <div className="col-12">
//                       <label className="emp-label">General Remarks</label>
//                       <textarea className="form-control form-control-sm" name="remarks" value={formData.remarks} onChange={handleChange} rows="3" placeholder="Remarks" />
//                     </div>
//                   </>
//                 )}

//               </form>
//             </div>

//             {/* Form Footer */}
//             <div className="emp-card-footer">
//               <button type="button" className="btn btn-secondary px-4 shadow-sm" onClick={() => setIsModalOpen(false)}>
//                 Cancel
//               </button>
//               <button type="submit" form="employeeForm" className="btn btn-primary px-5 shadow-sm fw-bold">
//                 {editingId ? "Update Employee" : "Submit Registration"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeManagement;



import React, { useState, useEffect, useRef, useMemo } from "react";
import api from "../api/axios"; // Adjust this based on your actual path
import "bootstrap/dist/css/bootstrap.min.css";
import { Plus, Pencil, Trash2, CalendarDays, Search, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import "./EmployeeManagement.css";

const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

const emptyEmployeeForm = {
  // 1. Personal Information
  ProfilePicture: "",
  ProfilePictureBase64: "", 
  AcctName: "",
  FathersName: "",
  Gender: "M",
  DOB: "",
  MaritalStatus: "Single",

  // 2. Personal Address
  CityVillage: "",
  Landmark: "",
  State: "",
  District: "",
  PostOffice: "",
  PolicStation: "",
  PinCode: "",

  // 3. Identity
  PanNo: "",
  AadharNo: "",
  VoterNo: "",

  // 4. Bank Information
  BankName: "",
  BankAddress: "",
  IFSCode: "",
  AcctNo: "",
  
  // Base Status for tracking
  status: "Available"
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyEmployeeForm);
  
  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can adjust this to 10 or 20

  // Dropdown States
  const [dbStates, setDbStates] = useState([]);
  const [dbDistricts, setDbDistricts] = useState([]);

  // Sorting State
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  const fileInputRef = useRef(null);
  const formTopRef = useRef(null);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    
    const fetchStates = async () => {
        try {
            const res = await api.get("/employees/data/states");
            setDbStates(res.data);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.State) {
        const matchedState = dbStates.find(s => s.StateName === formData.State);
        if (matchedState) {
            const fetchDistricts = async () => {
                try {
                    const res = await api.get(`/employees/data/districts/${matchedState.StateId}`);
                    setDbDistricts(res.data);
                } catch (error) {
                    console.error("Error fetching districts:", error);
                }
            };
            fetchDistricts();
        } else {
            setDbDistricts([]);
        }
    } else {
        setDbDistricts([]);
    }
  }, [formData.State, dbStates]);

  // --- SEARCH LOGIC ---
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 whenever search changes
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    
    const filtered = employees.filter((emp) => {
      const { ProfilePictureBase64, ProfilePicture, id, createdAt, updatedAt, ...searchableData } = emp;

      return Object.values(searchableData).some((value) => 
        value !== null && 
        value !== undefined && 
        value.toString().toLowerCase().includes(lowercasedSearch)
      );
    });

    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  // --- SORTING LOGIC ---
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = useMemo(() => {
    let sortableItems = [...filteredEmployees];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key] || "";
        const valB = b[sortConfig.key] || "";
        
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredEmployees, sortConfig]);

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <ArrowUpDown size={14} className="ms-1 text-muted opacity-50" />;
    if (sortConfig.direction === 'ascending') return <ArrowUp size={14} className="ms-1 text-primary" />;
    return <ArrowDown size={14} className="ms-1 text-primary" />;
  };

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    if (["AcctName", "FathersName"].includes(name)) {
      value = value.replace(/[^a-zA-Z\s.]/g, "");
    }
    if (name === "PinCode") {
      value = value.replace(/\D/g, "").slice(0, 6);
    }
    if (name === "AadharNo") {
      value = value.replace(/\D/g, "").slice(0, 12);
    }
    if (name === "PanNo") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    }
    if (name === "VoterNo") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    }
    if (name === "IFSCode") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11);
    }
    if (name === "AcctNo") {
      value = value.replace(/\D/g, "").slice(0, 18);
    }

    setFormData(prev => {
      const updatedData = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "State") {
          updatedData.District = "";
      }
      return updatedData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800000) {
        alert("Image size exceeds 800KB limit. Please choose a smaller file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
            ...prev, 
            ProfilePictureBase64: reader.result,
            ProfilePicture: URL.createObjectURL(file) 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, ProfilePicture: '', ProfilePictureBase64: '' }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleViewImage = () => {
    const imageSrc = formData.ProfilePictureBase64 || formData.ProfilePicture;
    if (!imageSrc) return;
    const imageWindow = window.open("");
    if (imageWindow) {
      imageWindow.document.write(`
        <iframe width='100%' height='100%' style='border:none; margin:0; padding:0;' src='${imageSrc}'></iframe>
      `);
    } else {
      alert("Pop-up blocked! Please allow pop-ups to view the image.");
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setFormData({ ...emptyEmployeeForm, ...employee });
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormData(emptyEmployeeForm);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, formData);
      } else {
        await api.post("/employees", formData);
      }
      handleResetForm(); 
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
      alert(error.response?.data?.message || "Error saving employee");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="emp-wrapper p-4 enterprise-font">
      <style>{`
        .modern-date-input::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-4" ref={formTopRef}>
        <div>
          <h2 className="fw-bold mb-0 text-dark">Employee Management</h2>
          <p className="text-muted mb-0">Enterprise HR & Payroll Configuration</p>
        </div>
      </div>

      {/* --- FORM VIEW (ALWAYS VISIBLE AT TOP) --- */}
      <div className="emp-form-view mb-5">
        <div className="emp-card shadow-sm rounded border-0">
          <div className="emp-card-header rounded-top">
            <h5 className="mb-0 fw-bold">
              {editingId ? "Edit Employee Data" : "Employee Registration Form"}
            </h5>
          </div>

          <div className="emp-card-body p-4 bg-white">
            <form id="employeeForm" onSubmit={handleSubmit} className="row g-3">
              {/* --- 1. PERSONAL INFORMATION --- */}
              <div className="col-12">
                <p className="PerInfo m-0 rounded">Personal Information</p>
              </div>

              <div className="col-12 mb-3 d-flex align-items-center gap-4">
                <div className="emp-profile-img-container shadow-sm">
                  <img src={formData.ProfilePictureBase64 || formData.ProfilePicture || DEFAULT_AVATAR} alt="Profile" className="emp-profile-img" />
                </div>
                <div>
                  <label htmlFor="profileUpload" className="btn btn-sm btn-outline-primary me-2 shadow-sm cursor-pointer">
                    <Plus size={16} className="me-1"/> {formData.ProfilePicture || formData.ProfilePictureBase64 ? 'Change Photo' : 'Upload Photo'}
                  </label>
                  <input type="file" id="profileUpload" ref={fileInputRef} accept="image/png, image/jpeg, image/jpg" style={{ display: 'none' }} onChange={handleImageChange} />
                  
                  {(formData.ProfilePicture || formData.ProfilePictureBase64) && (
                    <>
                      <button type="button" className="btn btn-sm btn-outline-info me-2 shadow-sm" onClick={handleViewImage}>👁️ View</button>
                      <button type="button" className="btn btn-sm btn-outline-danger shadow-sm" onClick={handleRemoveImage}>Remove</button>
                    </>
                  )}
                  <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.8rem' }}>Allowed JPG, PNG. Standard passport format.</p>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="col-md-6">
                <label className="emp-label">Account Name *</label>
                <input type="text" className="form-control form-control-sm" name="AcctName" value={formData.AcctName} onChange={handleChange} required placeholder="Full Name" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">Father's Name</label>
                <input type="text" className="form-control form-control-sm" name="FathersName" value={formData.FathersName} onChange={handleChange} placeholder="Father's Name" />
              </div>

              <div className="col-md-4">
                <label className="emp-label">Gender</label>
                <select name="Gender" value={formData.Gender} onChange={handleChange} className="form-select form-select-sm">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="emp-label">Date of Birth</label>
                <div className="position-relative">
                  <input type="date" className="form-control form-control-sm modern-date-input" name="DOB" value={formData.DOB} onChange={handleChange} />
                  <CalendarDays size={16} className="position-absolute text-muted" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0 }} />
                </div>
              </div>

              <div className="col-md-4">
                <label className="emp-label">Marital Status</label>
                <select name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange} className="form-select form-select-sm">
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>

              {/* --- 2. PERSONAL ADDRESS --- */}
              <div className="col-12 mt-4">
                <p className="PerInfo m-0 rounded">Personal Address</p>
              </div>

              <div className="col-md-6">
                <label className="emp-label">City/Village</label>
                <input type="text" className="form-control form-control-sm" name="CityVillage" value={formData.CityVillage} onChange={handleChange} placeholder="City or Village" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">Landmark</label>
                <input type="text" className="form-control form-control-sm" name="Landmark" value={formData.Landmark} onChange={handleChange} placeholder="Landmark" />
              </div>

              <div className="col-md">
                <label className="emp-label">State</label>
                <select name="State" value={formData.State} onChange={handleChange} className="form-select form-select-sm">
                  <option value="">Select State...</option>
                  {dbStates.map((state) => (
                    <option key={state.StateId} value={state.StateName}>{state.StateName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md">
                <label className="emp-label">District</label>
                <select name="District" value={formData.District} onChange={handleChange} className="form-select form-select-sm" disabled={!formData.State}>
                  <option value="">Select District...</option>
                  {dbDistricts.map((dist) => (
                    <option key={dist.DistId} value={dist.DistName}>{dist.DistName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md">
                <label className="emp-label">Post Office</label>
                <input type="text" className="form-control form-control-sm" name="PostOffice" value={formData.PostOffice} onChange={handleChange} placeholder="Post Office" />
              </div>
              <div className="col-md">
                <label className="emp-label">Police Station</label>
                <input type="text" className="form-control form-control-sm" name="PolicStation" value={formData.PolicStation} onChange={handleChange} placeholder="Police Station" />
              </div>
              <div className="col-md">
                <label className="emp-label">Pin Code</label>
                <input type="text" className="form-control form-control-sm" name="PinCode" value={formData.PinCode} onChange={handleChange} placeholder="Pin Code" />
              </div>

              {/* --- 3. IDENTITY --- */}
              <div className="col-12 mt-4">
                <p className="PerInfo m-0 rounded">Identity</p>
              </div>
              <div className="col-md-4">
                <label className="emp-label">PAN No</label>
                <input type="text" className="form-control form-control-sm" name="PanNo" value={formData.PanNo} onChange={handleChange} placeholder="PAN No" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Aadhar No</label>
                <input type="text" className="form-control form-control-sm" name="AadharNo" value={formData.AadharNo} onChange={handleChange} placeholder="Aadhar No" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Voter No</label>
                <input type="text" className="form-control form-control-sm" name="VoterNo" value={formData.VoterNo} onChange={handleChange} placeholder="Voter No" />
              </div>

              {/* --- 4. BANK INFORMATION --- */}
              <div className="col-12 mt-4">
                <p className="PerInfo m-0 rounded">Bank Information</p>
              </div>
              <div className="col-md-6">
                <label className="emp-label">Bank Name</label>
                <input type="text" className="form-control form-control-sm" name="BankName" value={formData.BankName} onChange={handleChange} placeholder="Bank Name" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">Bank Address</label>
                <input type="text" className="form-control form-control-sm" name="BankAddress" value={formData.BankAddress} onChange={handleChange} placeholder="Bank Address" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">IFS Code</label>
                <input type="text" className="form-control form-control-sm" name="IFSCode" value={formData.IFSCode} onChange={handleChange} placeholder="IFS Code" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">Account Number</label>
                <input type="text" className="form-control form-control-sm" name="AcctNo" value={formData.AcctNo} onChange={handleChange} placeholder="Account Number" />
              </div>

            </form>
          </div>

          <div className="emp-card-footer rounded-bottom bg-light border-top p-3 d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary px-4 shadow-sm" onClick={handleResetForm}>
              {editingId ? "Cancel Edit" : "Clear Form"}
            </button>
            <button type="submit" form="employeeForm" className="btn btn-primary px-5 shadow-sm fw-bold">
              {editingId ? "Update Employee" : "Submit Registration"}
            </button>
          </div>
        </div>
      </div>

      {/* --- TABLE VIEW (ALWAYS VISIBLE AT BOTTOM) --- */}
      <div className="emp-list-view">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-dark mb-0">Registered Employees Directory</h4>
          <div className="position-relative enterprise-search-box" style={{ width: '320px' }}>
            <Search size={18} className="position-absolute text-muted" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-control form-control-sm ps-5 enterprise-search"
              placeholder="Search across all fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="card shadow-sm border-0 enterprise-table-card">
          <div className="card-body p-0 table-responsive custom-scrollbar">
            <table className="table table-hover align-middle mb-0 bg-white enterprise-table">
              <thead className="table-light text-uppercase">
                <tr>
                  <th className="py-3 ps-4 sticky-col-left">Profile</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('AcctId')}>Emp ID {renderSortIcon('AcctId')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('AcctName')}>Name {renderSortIcon('AcctName')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('FathersName')}>Father's Name {renderSortIcon('FathersName')}</th>
                  <th className="py-3">Gender</th>
                  <th className="py-3">DOB</th>
                  <th className="py-3">Marital Status</th>
                  <th className="py-3">City/Village</th>
                  <th className="py-3">State</th>
                  <th className="py-3">District</th>
                  <th className="py-3">PIN</th>
                  <th className="py-3">PAN No</th>
                  <th className="py-3">Aadhar No</th>
                  <th className="py-3">Voter No</th>
                  <th className="py-3">Bank Name</th>
                  <th className="py-3">IFS Code</th>
                  <th className="py-3">Account No</th>
                  <th className="py-3 text-end pe-4 sticky-col-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="18" className="text-center py-5 text-muted fw-bold">
                      {searchTerm ? "No employees match your search criteria." : "No active employees found. Please register an employee above."}
                    </td>
                  </tr>
                ) : (
                  currentItems.map((emp) => (
                    <tr key={emp.id}>
                      <td className="ps-4 sticky-col-left bg-white">
                        <img 
                          src={emp.ProfilePictureBase64 || DEFAULT_AVATAR} 
                          alt="avatar" 
                          className="enterprise-table-avatar"
                        />
                      </td>
                      <td className="text-primary fw-bold">{emp.AcctId || "N/A"}</td>
                      <td className="fw-bold text-dark">{emp.AcctName || "-"}</td>
                      <td>{emp.FathersName || "-"}</td>
                      <td>{emp.Gender === 'M' ? 'Male' : emp.Gender === 'F' ? 'Female' : "-"}</td>
                      <td>{emp.DOB || "-"}</td>
                      <td>{emp.MaritalStatus || "-"}</td>
                      <td>{emp.CityVillage || "-"}</td>
                      <td>{emp.State || "-"}</td>
                      <td>{emp.District || "-"}</td>
                      <td>{emp.PinCode || "-"}</td>
                      <td>{emp.PanNo || "-"}</td>
                      <td>{emp.AadharNo || "-"}</td>
                      <td>{emp.VoterNo || "-"}</td>
                      <td>{emp.BankName || "-"}</td>
                      <td>{emp.IFSCode || "-"}</td>
                      <td>{emp.AcctNo || "-"}</td>
                      <td className="text-end pe-4 sticky-col-right bg-white">
                        <div className="d-flex justify-content-end gap-2">
                          <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-outline-secondary enterprise-btn">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger enterprise-btn">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION FOOTER --- */}
          {sortedEmployees.length > 0 && (
            <div className="card-footer bg-white border-top py-3 d-flex justify-content-between align-items-center">
              <span className="text-muted small fw-medium">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedEmployees.length)} of {sortedEmployees.length} entries
              </span>
              <div className="enterprise-pagination d-flex gap-1">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-light border d-flex align-items-center"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                  <button 
                    key={index} 
                    onClick={() => paginate(index + 1)}
                    className={`btn btn-sm border fw-bold ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}
                    style={{ minWidth: '32px' }}
                  >
                    {index + 1}
                  </button>
                ))}

                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-light border d-flex align-items-center"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;