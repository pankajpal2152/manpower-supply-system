// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// function EmployeeManagement() {
//   return (
//     <div className="container" style={{ marginTop: "50px" }}>
//       <div class="btn-group d-flex" role="group">
//         <button type="button" class="btn btn-primary btn-lg btn-block">
//           Employee Registration Form
//         </button>
//       </div>

//       <form class="row g-3">
//         <div className="col-md-4">
//           <label for="inputFirstName" class="form-label">
//             First Name
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="FirstName"
//             placeholder="First Name"
//           />
//         </div>
//         <div className="col-md-4">
//           <label for="inputMiddleName" class="form-label">
//             Middle Name
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="MiddleName"
//             placeholder="Middle Name"
//           />
//         </div>
//         <div className="col-md-4">
//           <label for="inputLastName" class="form-label">
//             Last Name
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="LastName"
//             placeholder="Last Name"
//           />
//         </div>

//         <div class="col-6">
//           <label for="FathersName" class="form-label">
//             Father's Name
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="FathersName"
//             placeholder="Father's Name"
//           />
//         </div>
//         <div class="col-6">
//           <label for="inputMothersName" class="form-label">
//             Mother's Name
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="MothersName"
//             placeholder="Mother's Name"
//           />
//         </div>
//         <div className="col-md-4">
//           <label for="inputCity" class="form-label">
//             City
//           </label>
//           <input type="text" className="form-control" id="inputCity" />
//         </div>
//         <div className="col-md-4">
//           <label for="inputState" class="form-label">
//             State
//           </label>
//           <select id="inputState" className="form-select">
//             <option selected>Choose...</option>
//             <option>...</option>
//           </select>
//         </div>
//         <div className="col-md-4">
//           <label for="inputDistrict" class="form-label">
//             District
//           </label>
//           <select id="inputDistrict" className="form-select">
//             <option selected>Choose...</option>
//             <option>...</option>
//           </select>
//         </div>

//         <div className="col-md-6">
//           <label for="inputPincode" className="form-label">
//             Pincode
//           </label>
//           <input type="text" 
//                 class="form-control form-control-sm" 
//                 id="PinCode" placeholder="Pincode" />
//         </div>

//         <div className="col-md-6">
//           <label for="inputEmail" class="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             class="form-control form-control-sm"
//             id="inputEmail"
//             placeholder="Email"
//           />
//         </div>
//         <div className="col-md-6">
//           <label for="inputPhoneNo" class="form-label">
//             Phone No
//           </label>
//           <input type="text" className="form-control form-control-sm" id="PhoneNo" />
//         </div>

//         <div className="col-6">
//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="gridCheck"
//             />
//             <label className="form-check-label" htmlFor="gridCheck">
//               Check me out
//             </label>
//           </div>
//         </div>
//         <div className="col-6">
//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="gridCheck"
//             />
//             <label className="form-check-label" htmlFor="gridCheck">
//               Check me out
//             </label>
//           </div>
//         </div>

//         <div class="col-md-6">
//           <label for="inputEmail" class="form-label">
//             Pan No
//           </label>
//           <input
//             type="email"
//             class="form-control form-control-sm"
//             id="inputEmail"
//             placeholder="Pan No"
//           />
//         </div>
//         <div class="col-md-6">
//           <label for="inputPanno" class="form-label">
//             Addhar No
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="inputPanno"
//             placeholder="Addhar No"
//           />
//         </div>
//         <div class="col-12">
//   <label for="inputAddress" class="form-label">
//             Marital Status
//           </label>
//           <div class="container d-flex mt-4 p-4">
//             <div class="form-check form-check-inline m->">
//                 <input class="form-check-input" 
//                        type="radio" 
//                        name="options" 
//                        id="defaultRadioSwitch" 
//                        autocomplete="off"/>
//                 <label class="form-check-label" 
//                        for="defaultRadioSwitch">
//                     Default Radio
//                 </label>
//             </div>
//             <div class="form-check form-check-inline m->">
//                 <input class="form-check-input" 
//                        type="radio" 
//                        name="options" 
//                        id="checkedRadioSwitch" 
//                        autocomplete="off" 
//                        checked/>
//                 <label class="form-check-label" 
//                        for="checkedRadioSwitch">
//                     Checked Radio
//                 </label>
//             </div>
//             <div class="form-check form-check-inline m->">
//                 <input class="form-check-input" 
//                        type="radio" 
//                        name="option" 
//                        id="disabledRadioSwitch" 
//                        />
//                 <label class="form-check-label" 
//                        for="disabledRadioSwitch">
//                     Disabled Radio
//                   </label>
//             </div>
//             <div class="form-check form-check-inline m->">
//                 <input class="form-check-input" 
//                        type="radio" 
//                        name="option" 
//                        id="checkedDisabledRadioSwitch" 
//                        checked
//                        disabled/>
//                 <label class="form-check-label" 
//                        for="checkedDisabledRadioSwitch">
//                     Checked and Disabled Radio
//                   </label>
//             </div>
//         </div>
// </div>


//         <div class="col-md-6">
//           <label for="inputCity" class="form-label">
//             Bank Name
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="inputCity"
//           />
//         </div>
//         <div class="col-md-3">
//           <label for="inputCity" class="form-label">
//             IFS Code
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="inputCity"
//           />
//         </div>
//         <div class="col-md-3">
//           <label for="inputZip" class="form-label">
//             Account No
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="inputZip"
//           />
//         </div>
//         <div class="col-12">
//           <label for="inputAddress2" class="form-label">
//             Bank Address
//           </label>
//           <input
//             type="text"
//             class="form-control form-control-sm"
//             id="inputAddress2"
//             placeholder="Apartment, studio, or floor"
//           />
//         </div>
//         <div class="col-12">
//           <div class="form-check form-check-inline">
//             <input
//               class="form-check-input"
//               type="checkbox"
//               id="inlineCheckbox1"
//               value="option1"
//             />
//             <label class="form-check-label" for="inlineCheckbox1">
//               address1
//             </label>
//           </div>
//           <div class="form-check form-check-inline">
//             <input
//               class="form-check-input"
//               type="checkbox"
//               id="inlineCheckbox2"
//               value="option2"
//             />
//             <label class="form-check-label" for="inlineCheckbox2">
//               2
//             </label>
//           </div>
//           <div class="form-check form-check-inline">
//             <input
//               class="form-check-input"
//               type="checkbox"
//               id="inlineCheckbox3"
//               value="option3"
//             />
//             <label class="form-check-label" for="inlineCheckbox3">
//               address3
//             </label>
//           </div>
//         </div>

//         <div class="d-flex bd-highlight">
//             <div class="p-2 flex-fill bd-highlight">Flex item with a lot of content
//                  <div class="form-check">
//               <label class="radio-inline">
//                 <input type="radio" name="status" /> Single
//               </label>
//             </div>
//             </div>
//   <div class="p-2 flex-fill bd-highlight">Flex item with a lot of content
//      <div class="form-check">
//               <label class="radio-inline">
//                 <input type="radio" name="status" /> Single
//               </label>
//             </div>
//   </div>
//   <div class="p-2 flex-fill bd-highlight">Flex item
//      <div class="form-check">
//               <label class="radio-inline">
//                 <input type="radio" name="status" /> Single
//               </label>
//             </div>
//   </div>
//   <div class="p-2 flex-fill bd-highlight">Flex item
//      <div class="form-check">
//               <label class="radio-inline">
//                 <input type="radio" name="status" /> Single
//               </label>
//             </div>
//   </div>
// </div>

//         <div class="col-4"></div>
//         <div class="col-4">
//           <button type="button" class="btn btn-primary">
//             Submit
//           </button>
//         </div>
//         <div class="col-4"></div>
//       </form>
//     </div>
//   );
// }

// export default EmployeeManagement;


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

  const SectionHeader = ({ title }) => (
    <div className="col-12 mt-4 mb-3">
      <h5 className="text-start text-primary fw-bold p-2 mb-0 rounded shadow-sm"
        style={{ backgroundColor: '#f0f9ff', borderLeft: '6px solid #0ea5e9' }}>
        {title}
      </h5>
    </div>
  );

  return (
    <div>
      {/* --- Custom Enterprise CSS --- */}
      <style>
        {`
          /* Custom row class to INCREASE the gap between different fields */
          .custom-form-row {
            --bs-gutter-x: 4rem; /* Massive horizontal gap between columns */
            --bs-gutter-y: 1.5rem; /* Vertical gap between rows */
          }

          .modern-form-group {
            display: flex;
            align-items: center;
            width: 100%;
          }
          
          /* FIXED: Removed fixed flex width. The label now sizes to its text, 
             and margin-right enforces a STRICT, identical gap to the input box. */
          .modern-label {
            text-align: left;
            margin-right: 15px; /* Strict fixed gap between label and input */
            white-space: nowrap;
            font-size: 0.85rem;
            font-weight: 600;
            color: #475569;
            margin-bottom: 0;
          }
          
          .modern-input, .modern-select {
            flex: 1; /* Fills the rest of the column perfectly without overflowing */
            border: 1px solid #cbd5e1 !important;
            border-radius: 6px !important;
            padding: 8px 12px !important;
            transition: all 0.2s ease-in-out;
            background-color: #f8fafc;
            color: #0f172a;
            min-width: 0; /* Prevents flexbox overflow issues */
          }
          
          .modern-input:focus, .modern-select:focus {
            border-color: #0ea5e9 !important;
            box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.2) !important;
            outline: none !important;
            background-color: #ffffff;
          }

          .modern-radio {
            cursor: pointer;
            width: 1.1rem;
            height: 1.1rem;
            margin-top: 0.15rem;
          }
          .modern-radio:focus {
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2) !important;
          }
        `}
      </style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Employee Management</h1>
        <button onClick={handleAddNew} className="btn btn-primary fw-bold shadow-sm px-4" style={{ backgroundColor: '#0ea5e9', border: 'none' }}>
          + Add New Employee
        </button>
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', color: '#475569' }}>Name</th>
              <th style={{ padding: '12px', color: '#475569' }}>Email</th>
              <th style={{ padding: '12px', color: '#475569' }}>Phone</th>
              <th style={{ padding: '12px', color: '#475569' }}>Status</th>
              <th style={{ padding: '12px', color: '#475569' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No employees found.</td></tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{emp.firstName} {emp.lastName}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{emp.email}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{emp.phoneNo}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`badge ${emp.status === 'Available' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-light border shadow-sm">Edit</button>
                    <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger shadow-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050, padding: '20px' }}>

          <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '1200px', maxHeight: '95vh', overflowY: 'auto', borderRadius: '12px' }}>

            <div className="card-header text-white d-flex justify-content-between align-items-center position-sticky top-0" style={{ zIndex: 10, backgroundColor: '#0f172a', borderBottom: '4px solid #0ea5e9' }}>
              <h4 className="mb-0 fw-bold py-1">{editingId ? 'Edit Employee Registration' : 'Employee Registration Form'}</h4>
              <button type="button" className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
            </div>

            <div className="card-body bg-white p-4">
              <form className="row custom-form-row" onSubmit={handleSubmit}>

                {/* --- Personal Information --- */}
                <SectionHeader title="Personal Information" />

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="firstName" className="modern-label">First Name</label>
                    <input type="text" className="modern-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="middleName" className="modern-label">Middle Name</label>
                    <input type="text" className="modern-input" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="lastName" className="modern-label">Last Name</label>
                    <input type="text" className="modern-input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="fathersName" className="modern-label">Father's Name</label>
                    <input type="text" className="modern-input" name="fathersName" value={formData.fathersName} onChange={handleChange} placeholder="Father's Name" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="mothersName" className="modern-label">Mother's Name</label>
                    <input type="text" className="modern-input" name="mothersName" value={formData.mothersName} onChange={handleChange} placeholder="Mother's Name" />
                  </div>
                </div>

                {/* --- Contact & Address --- */}
                <SectionHeader title="Contact & Address" />

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="city" className="modern-label">City</label>
                    <input type="text" className="modern-input" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="state" className="modern-label">State</label>
                    <select name="state" value={formData.state} onChange={handleChange} className="modern-select">
                      <option value="">Choose...</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="district" className="modern-label">District</label>
                    <input type="text" className="modern-input" name="district" value={formData.district} onChange={handleChange} placeholder="District" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="pinCode" className="modern-label">Pincode</label>
                    <input type="text" className="modern-input" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pincode" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="email" className="modern-label">Email</label>
                    <input type="email" className="modern-input" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="phoneNo" className="modern-label">Phone No</label>
                    <input type="text" className="modern-input" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Phone Number" />
                  </div>
                </div>
                <div className="col-md-6"></div>

                {/* --- Identity & Status --- */}
                <SectionHeader title="Identity & Status" />

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="panNo" className="modern-label">PAN No</label>
                    <input type="text" className="modern-input" name="panNo" value={formData.panNo} onChange={handleChange} placeholder="PAN No" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="aadharNo" className="modern-label">Aadhar No</label>
                    <input type="text" className="modern-input" name="aadharNo" value={formData.aadharNo} onChange={handleChange} placeholder="Aadhar No" />
                  </div>
                </div>

                <div className="col-12">
                  <div className="modern-form-group">
                    <label className="modern-label">Marital Status :-</label>
                    <div className="d-flex flex-grow-1 gap-4 align-items-center">
                      <div className="form-check m-0">
                        <input className="form-check-input modern-radio" type="radio" name="maritalStatus" value="Single" checked={formData.maritalStatus === 'Single'} onChange={handleChange} id="radioSingle" />
                        <label className="form-check-label ps-1" htmlFor="radioSingle" style={{ cursor: 'pointer', color: '#475569' }}>Single</label>
                      </div>
                      <div className="form-check m-0">
                        <input className="form-check-input modern-radio" type="radio" name="maritalStatus" value="Married" checked={formData.maritalStatus === 'Married'} onChange={handleChange} id="radioMarried" />
                        <label className="form-check-label ps-1" htmlFor="radioMarried" style={{ cursor: 'pointer', color: '#475569' }}>Married</label>
                      </div>
                      <div className="form-check m-0">
                        <input className="form-check-input modern-radio" type="radio" name="maritalStatus" value="Other" checked={formData.maritalStatus === 'Other'} onChange={handleChange} id="radioOther" />
                        <label className="form-check-label ps-1" htmlFor="radioOther" style={{ cursor: 'pointer', color: '#475569' }}>Other</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Bank Details --- */}
                <SectionHeader title="Bank Details" />

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="bankName" className="modern-label">Bank Name</label>
                    <input type="text" className="modern-input" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="ifscCode" className="modern-label">IFSC Code</label>
                    <input type="text" className="modern-input" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="accountNo" className="modern-label">Account No</label>
                    <input type="text" className="modern-input" name="accountNo" value={formData.accountNo} onChange={handleChange} placeholder="Account No" />
                  </div>
                </div>

                <div className="col-12">
                  <div className="modern-form-group">
                    <label htmlFor="bankAddress" className="modern-label">Bank Address</label>
                    <input type="text" className="modern-input" name="bankAddress" value={formData.bankAddress} onChange={handleChange} placeholder="Branch Location / Apartment, studio, or floor" />
                  </div>
                </div>

                {/* --- Action Buttons --- */}
                <div className="col-12 mt-5 pt-4 mb-2 d-flex justify-content-end gap-3 border-top">
                  <button type="button" className="btn btn-light px-5 fw-bold shadow-sm border text-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-5 fw-bold shadow-sm" style={{ backgroundColor: '#0ea5e9', borderColor: '#0ea5e9' }}>Submit Employee</button>
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