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
import {
  User, Users, MapPin, Building, Map, Hash,
  Mail, Phone, IdCard, CreditCard, Heart,
  Landmark, Wallet, Fingerprint, Plus, Pencil,
  Trash2, X
} from 'lucide-react';

const emptyEmployeeForm = {
  firstName: '',
  middleName: '',
  lastName: '',
  fathersName: '',
  mothersName: '',
  city: '',
  state: '',
  district: '',
  pinCode: '',
  email: '',
  phoneNo: '',
  panNo: '',
  aadharNo: '',
  maritalStatus: 'Single',
  bankName: '',
  ifscCode: '',
  accountNo: '',
  bankAddress: '',
  department: 'General',
  position: 'Staff',
  status: 'Available',
  baseSalary: 0
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            --ink: #0f172a;
            --muted: #64748b;
            --line: #dbe3ef;
            --surface: #ffffff;
            --surface-soft: #f8fafc;
            --brand: #0ea5e9;
            --brand-dark: #0369a1;
            --danger: #dc2626;

            padding: 20px;
            min-height: 100vh;
            color: var(--ink);
            font-family: Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
            background:
              linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(248, 250, 252, 0) 34%),
              linear-gradient(315deg, rgba(245, 158, 11, 0.10) 0%, rgba(248, 250, 252, 0) 38%),
              #f8fafc;
          }

          .custom-form-row {
            --bs-gutter-x: 4rem;
            --bs-gutter-y: 1.5rem;
          }

          .modern-form-group {
            display: flex;
            align-items: center;
            width: 100%;
          }

          .modern-label {
            text-align: left;
            margin-right: 15px;
            white-space: nowrap;
            font-size: 0.78rem;
            font-weight: 800;
            color: #334155;
            margin-bottom: 0;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-transform: uppercase;
            letter-spacing: 0.45px;
          }

          .modern-input,
          .modern-select {
            flex: 1;
            min-width: 0;
            border: 1px solid #cbd5e1 !important;
            border-radius: 10px !important;
            padding: 10px 14px !important;
            color: #0f172a;
            font-size: 0.92rem;
            font-weight: 600;
            background:
              linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
            box-shadow:
              inset 0 1px 2px rgba(15, 23, 42, 0.04),
              0 1px 0 rgba(255, 255, 255, 0.9);
            transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background 0.2s ease;
          }

          .modern-input::placeholder {
            color: #94a3b8;
            font-weight: 500;
          }

          .modern-input:hover,
          .modern-select:hover {
            border-color: #94a3b8 !important;
            background: #ffffff;
          }

          .modern-input:focus,
          .modern-select:focus {
            border-color: #0ea5e9 !important;
            background: #ffffff;
            outline: none !important;
            box-shadow:
              0 0 0 4px rgba(14, 165, 233, 0.16),
              0 10px 24px rgba(14, 165, 233, 0.08) !important;
          }

          .modern-radio {
            cursor: pointer;
            width: 1.14rem;
            height: 1.14rem;
            margin-top: 0.1rem;
            accent-color: #8b5cf6;
          }

          .modern-radio:focus-visible {
            outline: 3px solid rgba(139, 92, 246, 0.25);
            outline-offset: 2px;
          }

          .btn-gradient-primary {
            background:
              linear-gradient(135deg, #38bdf8 0%, #0ea5e9 42%, #0369a1 100%) !important;
            border: 0 !important;
            color: #ffffff !important;
            transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease !important;
            box-shadow:
              0 12px 24px rgba(14, 165, 233, 0.28),
              inset 0 1px 0 rgba(255, 255, 255, 0.35) !important;
          }

          .btn-gradient-primary:hover {
            transform: translateY(-2px);
            filter: saturate(1.08);
            box-shadow:
              0 18px 34px rgba(14, 165, 233, 0.34),
              inset 0 1px 0 rgba(255, 255, 255, 0.35) !important;
          }

          .btn-elegant-light {
            background: #ffffff !important;
            border: 1px solid #cbd5e1 !important;
            color: #475569 !important;
            transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease !important;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04) !important;
          }

          .btn-elegant-light:hover {
            background: #f8fafc !important;
            color: #0f172a !important;
            border-color: #94a3b8 !important;
            transform: translateY(-1px);
          }

          .enterprise-table-container {
            background: rgba(255, 255, 255, 0.86);
            border-radius: 16px;
            border: 1px solid rgba(203, 213, 225, 0.9);
            box-shadow:
              0 24px 60px rgba(15, 23, 42, 0.08),
              0 2px 8px rgba(15, 23, 42, 0.04);
            overflow-x: auto;
            backdrop-filter: blur(14px);
          }

          .enterprise-table {
            width: 100%;
            min-width: 760px;
            border-collapse: collapse;
            text-align: left;
          }

          .enterprise-table th {
            background:
              linear-gradient(180deg, #f8fafc 0%, #eef4fb 100%);
            padding: 15px 16px;
            color: #475569;
            font-weight: 800;
            text-transform: uppercase;
            font-size: 0.76rem;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #dbe3ef;
          }

          .enterprise-table td {
            padding: 15px 16px;
            border-bottom: 1px solid #eef2f7;
            vertical-align: middle;
            transition: background-color 0.2s ease;
          }

          .enterprise-table tbody tr:hover td {
            background-color: #f8fafc;
          }

          .enterprise-table tbody tr:last-child td {
            border-bottom: 0;
          }

          .modal-backdrop-glass {
            position: fixed;
            inset: 0;
            background:
              linear-gradient(135deg, rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.58));
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1050;
            padding: 20px;
            animation: fadeIn 0.25s ease-out;
          }

          .modal-card-elegant {
            width: 100%;
            max-width: 1200px;
            max-height: 95vh;
            overflow-y: auto;
            border-radius: 18px;
            background: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.88);
            box-shadow:
              0 36px 80px rgba(2, 6, 23, 0.34),
              0 0 0 1px rgba(148, 163, 184, 0.16);
            animation: slideUp 0.32s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .modal-header-gradient {
            background:
              linear-gradient(135deg, #0f172a 0%, #16324a 52%, #075985 100%);
            border-bottom: 4px solid #38bdf8;
            padding: 18px 24px;
          }

          .modal-close-button {
            width: 38px;
            height: 38px;
            border: 1px solid rgba(255, 255, 255, 0.22);
            border-radius: 999px;
            color: #ffffff;
            background: rgba(255, 255, 255, 0.08);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease, transform 0.2s ease;
          }

          .modal-close-button:hover {
            background: rgba(255, 255, 255, 0.18);
            transform: rotate(90deg);
          }

          .modern-section-header {
            color: var(--section-color);
            background:
              linear-gradient(90deg, var(--section-bg) 0%, #ffffff 82%);
            border-left: 6px solid var(--section-color);
            border-radius: 10px !important;
            box-shadow:
              0 1px 0 rgba(255, 255, 255, 0.9),
              0 10px 24px rgba(15, 23, 42, 0.045);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .modern-section-header:hover {
            transform: translateX(4px);
            box-shadow:
              0 1px 0 rgba(255, 255, 255, 0.9),
              0 14px 30px rgba(15, 23, 42, 0.07);
          }

          .modal-card-elegant::-webkit-scrollbar {
            width: 8px;
          }

          .modal-card-elegant::-webkit-scrollbar-track {
            background: #f1f5f9;
          }

          .modal-card-elegant::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 999px;
          }

          .modal-card-elegant::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(18px) scale(0.985);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @media (max-width: 768px) {
            .enterprise-wrapper {
              padding: 14px;
            }

            .custom-form-row {
              --bs-gutter-x: 1.4rem;
              --bs-gutter-y: 1.15rem;
            }

            .modal-backdrop-glass {
              padding: 10px;
              align-items: stretch;
            }

            .modal-card-elegant {
              max-height: calc(100vh - 20px);
              border-radius: 14px;
            }

            .modal-header-gradient {
              padding: 16px;
            }

            .modern-label {
              font-size: 0.72rem;
              margin-right: 10px;
              gap: 6px;
            }

            .modern-input,
            .modern-select {
              padding: 9px 11px !important;
              font-size: 0.88rem;
            }
          }

          @media (max-width: 480px) {
            .enterprise-wrapper .d-flex.justify-content-between {
              align-items: flex-start !important;
              gap: 12px;
              flex-direction: column;
            }

            .custom-form-row {
              --bs-gutter-x: 1rem;
            }

            .modern-label {
              white-space: normal;
              line-height: 1.15;
            }

            .modern-form-group {
              align-items: center;
            }

            .modal-card-elegant .card-body {
              padding: 20px !important;
            }

            .modern-section-header {
              font-size: 0.95rem;
              padding: 12px !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0" style={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
          Employee Management
        </h2>

        <button
          onClick={handleAddNew}
          className="btn btn-gradient-primary fw-bold px-4 py-2 rounded-pill d-flex align-items-center gap-2"
        >
          <Plus size={18} />
          Add New Employee
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
                <td
                  colSpan="5"
                  style={{
                    padding: '30px',
                    textAlign: 'center',
                    color: '#64748b',
                    fontWeight: '600'
                  }}
                >
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td style={{ fontWeight: '700', color: '#0f172a' }}>
                    {emp.firstName} {emp.lastName}
                  </td>

                  <td style={{ color: '#64748b', fontWeight: '500' }}>
                    {emp.email}
                  </td>

                  <td style={{ color: '#64748b', fontWeight: '500' }}>
                    {emp.phoneNo}
                  </td>

                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 ${
                        emp.status === 'Available'
                          ? 'bg-success text-white'
                          : 'bg-warning text-dark'
                      }`}
                      style={{ fontWeight: '700', letterSpacing: '0.4px' }}
                    >
                      {emp.status}
                    </span>
                  </td>

                  <td style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEdit(emp)}
                      className="btn btn-sm btn-elegant-light px-3 rounded-pill fw-bold d-flex align-items-center gap-1"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="btn btn-sm btn-outline-danger px-3 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop-glass" role="dialog" aria-modal="true">
          <div className="modal-card-elegant">
            <div
              className="card-header text-white d-flex justify-content-between align-items-center position-sticky top-0 modal-header-gradient"
              style={{ zIndex: 10 }}
            >
              <h4 className="mb-0 fw-bold py-1 d-flex align-items-center gap-2">
                <Users size={24} color="#38bdf8" />
                {editingId ? 'Edit Employee Registration' : 'Employee Registration Form'}
              </h4>

              <button
                type="button"
                className="modal-close-button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="card-body bg-white p-4 p-md-5">
              <form className="row custom-form-row" onSubmit={handleSubmit}>
                <SectionHeader title="Personal Information" Icon={User} color="#0ea5e9" bgColor="#f0f9ff" />

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="firstName" className="modern-label">
                      <User size={16} color="#0ea5e9" /> First Name
                    </label>
                    <input id="firstName" type="text" className="modern-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="middleName" className="modern-label">
                      <User size={16} color="#0ea5e9" /> Middle Name
                    </label>
                    <input id="middleName" type="text" className="modern-input" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="lastName" className="modern-label">
                      <User size={16} color="#0ea5e9" /> Last Name
                    </label>
                    <input id="lastName" type="text" className="modern-input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="fathersName" className="modern-label">
                      <Users size={16} color="#0ea5e9" /> Father's Name
                    </label>
                    <input id="fathersName" type="text" className="modern-input" name="fathersName" value={formData.fathersName} onChange={handleChange} placeholder="Father's Name" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="mothersName" className="modern-label">
                      <Users size={16} color="#0ea5e9" /> Mother's Name
                    </label>
                    <input id="mothersName" type="text" className="modern-input" name="mothersName" value={formData.mothersName} onChange={handleChange} placeholder="Mother's Name" />
                  </div>
                </div>

                <SectionHeader title="Contact & Address" Icon={MapPin} color="#10b981" bgColor="#ecfdf5" />

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="city" className="modern-label">
                      <Building size={16} color="#10b981" /> City
                    </label>
                    <input id="city" type="text" className="modern-input" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="state" className="modern-label">
                      <Map size={16} color="#10b981" /> State
                    </label>
                    <select id="state" name="state" value={formData.state} onChange={handleChange} className="modern-select">
                      <option value="">Choose...</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="district" className="modern-label">
                      <MapPin size={16} color="#10b981" /> District
                    </label>
                    <input id="district" type="text" className="modern-input" name="district" value={formData.district} onChange={handleChange} placeholder="District" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="pinCode" className="modern-label">
                      <Hash size={16} color="#10b981" /> Pincode
                    </label>
                    <input id="pinCode" type="text" className="modern-input" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pincode" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="email" className="modern-label">
                      <Mail size={16} color="#10b981" /> Email
                    </label>
                    <input id="email" type="email" className="modern-input" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="phoneNo" className="modern-label">
                      <Phone size={16} color="#10b981" /> Phone No
                    </label>
                    <input id="phoneNo" type="text" className="modern-input" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Phone Number" />
                  </div>
                </div>

                <div className="col-md-6"></div>

                <SectionHeader title="Identity & Status" Icon={IdCard} color="#8b5cf6" bgColor="#f5f3ff" />

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="panNo" className="modern-label">
                      <CreditCard size={16} color="#8b5cf6" /> PAN No
                    </label>
                    <input id="panNo" type="text" className="modern-input" name="panNo" value={formData.panNo} onChange={handleChange} placeholder="PAN No" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="aadharNo" className="modern-label">
                      <Fingerprint size={16} color="#8b5cf6" /> Aadhar No
                    </label>
                    <input id="aadharNo" type="text" className="modern-input" name="aadharNo" value={formData.aadharNo} onChange={handleChange} placeholder="Aadhar No" />
                  </div>
                </div>

                <div className="col-12">
                  <div className="modern-form-group">
                    <label className="modern-label">
                      <Heart size={16} color="#8b5cf6" /> Marital Status
                    </label>

                    <div className="d-flex flex-grow-1 gap-4 align-items-center flex-wrap">
                      <div className="form-check m-0 d-flex align-items-center">
                        <input className="form-check-input modern-radio" type="radio" name="maritalStatus" value="Single" checked={formData.maritalStatus === 'Single'} onChange={handleChange} id="radioSingle" />
                        <label className="form-check-label ps-2 fw-semibold" htmlFor="radioSingle" style={{ cursor: 'pointer', color: '#475569', fontSize: '0.95rem' }}>Single</label>
                      </div>

                      <div className="form-check m-0 d-flex align-items-center">
                        <input className="form-check-input modern-radio" type="radio" name="maritalStatus" value="Married" checked={formData.maritalStatus === 'Married'} onChange={handleChange} id="radioMarried" />
                        <label className="form-check-label ps-2 fw-semibold" htmlFor="radioMarried" style={{ cursor: 'pointer', color: '#475569', fontSize: '0.95rem' }}>Married</label>
                      </div>

                      <div className="form-check m-0 d-flex align-items-center">
                        <input className="form-check-input modern-radio" type="radio" name="maritalStatus" value="Other" checked={formData.maritalStatus === 'Other'} onChange={handleChange} id="radioOther" />
                        <label className="form-check-label ps-2 fw-semibold" htmlFor="radioOther" style={{ cursor: 'pointer', color: '#475569', fontSize: '0.95rem' }}>Other</label>
                      </div>
                    </div>
                  </div>
                </div>

                <SectionHeader title="Bank Details" Icon={Landmark} color="#f59e0b" bgColor="#fffbeb" />

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="bankName" className="modern-label">
                      <Landmark size={16} color="#f59e0b" /> Bank Name
                    </label>
                    <input id="bankName" type="text" className="modern-input" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="ifscCode" className="modern-label">
                      <Hash size={16} color="#f59e0b" /> IFSC Code
                    </label>
                    <input id="ifscCode" type="text" className="modern-input" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="modern-form-group">
                    <label htmlFor="accountNo" className="modern-label">
                      <Wallet size={16} color="#f59e0b" /> Account No
                    </label>
                    <input id="accountNo" type="text" className="modern-input" name="accountNo" value={formData.accountNo} onChange={handleChange} placeholder="Account No" />
                  </div>
                </div>

                <div className="col-12">
                  <div className="modern-form-group">
                    <label htmlFor="bankAddress" className="modern-label">
                      <Building size={16} color="#f59e0b" /> Bank Address
                    </label>
                    <input id="bankAddress" type="text" className="modern-input" name="bankAddress" value={formData.bankAddress} onChange={handleChange} placeholder="Branch Location / Apartment, studio, or floor" />
                  </div>
                </div>

                <div className="col-12 mt-5 pt-4 mb-2 d-flex justify-content-end gap-3 border-top">
                  <button type="button" className="btn btn-elegant-light px-5 py-2 rounded-pill fw-bold" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-gradient-primary px-5 py-2 rounded-pill fw-bold">
                    Submit Employee
                  </button>
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
