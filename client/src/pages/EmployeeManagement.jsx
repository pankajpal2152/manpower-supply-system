import React, { useState, useEffect, useRef, useMemo } from "react";
import api from "../api/axios"; 
import "bootstrap/dist/css/bootstrap.min.css";
// Consolidated Lucide Imports
import { Plus, Pencil, Trash2, CalendarDays, Search, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, IndianRupee, Eye } from "lucide-react";
import "./EmployeeManagement.css";

// Shadcn UI and Custom Component Imports
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; 
import SalaryStructureForm from "../components/SalaryStructureForm"; 

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
  BloodGroup: "",

  // 2. Personal Address
  CityVillage: "",
  Landmark: "",
  State: "",
  District: "",
  PostOffice: "",
  PolicStation: "",
  PinCode: "",

  // 3. Identity & Licenses
  PanNo: "",
  AadharNo: "",
  VoterNo: "",
  DrivingLicense: "",
  DrivingLicenseExpiry: "",
  GunLicense: "",
  GunLicenseExpiry: "",
  IdentificationMark: "",

  // 4. Academic Information
  HighestQualification: "",
  InstitutionName: "",
  PassingYear: "",

  // 5. Employment & Statutory
  DateOfJoining: "",
  Designation: "",
  DeploymentLocation: "",
  PFNumber: "",
  ESINumber: "",

  // 6. Bank Information
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
  const [itemsPerPage] = useState(5); 

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
    setCurrentPage(1); 
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

    if (["AcctName", "FathersName", "IdentificationMark", "InstitutionName", "Designation", "DeploymentLocation"].includes(name)) {
      value = value.replace(/[^a-zA-Z\s.]/g, "");
    }
    if (name === "PinCode") {
      value = value.replace(/\D/g, "").slice(0, 6);
    }
    if (name === "AadharNo") {
      value = value.replace(/\D/g, "").slice(0, 12);
    }
    if (name === "PassingYear") {
      value = value.replace(/\D/g, "").slice(0, 4); 
    }
    if (["PanNo", "VoterNo", "DrivingLicense", "GunLicense", "PFNumber", "ESINumber"].includes(name)) {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20);
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
              <div className="col-md-4">
                <label className="emp-label">Account Name *</label>
                <input type="text" className="form-control form-control-sm" name="AcctName" value={formData.AcctName} onChange={handleChange} required placeholder="Full Name" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Father's Name</label>
                <input type="text" className="form-control form-control-sm" name="FathersName" value={formData.FathersName} onChange={handleChange} placeholder="Father's Name" />
              </div>
              <div className="col-md-2">
                <label className="emp-label">Gender</label>
                <select name="Gender" value={formData.Gender} onChange={handleChange} className="form-select form-select-sm">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="emp-label">Blood Group</label>
                <select name="BloodGroup" value={formData.BloodGroup} onChange={handleChange} className="form-select form-select-sm">
                  <option value="">Select...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
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

              <div className="col-md-4">
                <label className="emp-label">Identification Mark</label>
                <input type="text" className="form-control form-control-sm" name="IdentificationMark" value={formData.IdentificationMark} onChange={handleChange} placeholder="Visible physical mark" />
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
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
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

              {/* --- 3. IDENTITY & LICENSES --- */}
              <div className="col-12 mt-4">
                <p className="PerInfo m-0 rounded">Identity & Licenses</p>
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

              {/* License Fields with Expiry dates side-by-side */}
              <div className="col-md-3">
                <label className="emp-label">Driving License</label>
                <input type="text" className="form-control form-control-sm" name="DrivingLicense" value={formData.DrivingLicense} onChange={handleChange} placeholder="DL Number" />
              </div>
              <div className="col-md-3">
                <label className="emp-label">DL Expiry Date</label>
                <div className="position-relative">
                  <input type="date" className="form-control form-control-sm modern-date-input" name="DrivingLicenseExpiry" value={formData.DrivingLicenseExpiry} onChange={handleChange} />
                  <CalendarDays size={16} className="position-absolute text-muted" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0 }} />
                </div>
              </div>
              
              <div className="col-md-3">
                <label className="emp-label">Gun License</label>
                <input type="text" className="form-control form-control-sm" name="GunLicense" value={formData.GunLicense} onChange={handleChange} placeholder="Gun License Number" />
              </div>
              <div className="col-md-3">
                <label className="emp-label">Gun Expiry Date</label>
                <div className="position-relative">
                  <input type="date" className="form-control form-control-sm modern-date-input" name="GunLicenseExpiry" value={formData.GunLicenseExpiry} onChange={handleChange} />
                  <CalendarDays size={16} className="position-absolute text-muted" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0 }} />
                </div>
              </div>

              {/* --- 4. ACADEMIC INFORMATION --- */}
              <div className="col-12 mt-4">
                <p className="PerInfo m-0 rounded">Academic Information</p>
              </div>
              <div className="col-md-4">
                <label className="emp-label">Highest Qualification</label>
                <input type="text" className="form-control form-control-sm" name="HighestQualification" value={formData.HighestQualification} onChange={handleChange} placeholder="e.g. B.A., 12th Pass" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Name of Institution</label>
                <input type="text" className="form-control form-control-sm" name="InstitutionName" value={formData.InstitutionName} onChange={handleChange} placeholder="School/College Name" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Passing Year</label>
                <input type="text" className="form-control form-control-sm" name="PassingYear" value={formData.PassingYear} onChange={handleChange} placeholder="YYYY" />
              </div>

              {/* --- 5. EMPLOYMENT & STATUTORY --- */}
              <div className="col-12 mt-4">
                <p className="PerInfo m-0 rounded">Employment & Statutory</p>
              </div>
              <div className="col-md-4">
                <label className="emp-label">Date of Joining</label>
                <div className="position-relative">
                  <input type="date" className="form-control form-control-sm modern-date-input" name="DateOfJoining" value={formData.DateOfJoining} onChange={handleChange} />
                  <CalendarDays size={16} className="position-absolute text-muted" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0 }} />
                </div>
              </div>
              <div className="col-md-4">
                <label className="emp-label">Designation</label>
                <input type="text" className="form-control form-control-sm" name="Designation" value={formData.Designation} onChange={handleChange} placeholder="e.g. Security Guard" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Deployment Location</label>
                <input type="text" className="form-control form-control-sm" name="DeploymentLocation" value={formData.DeploymentLocation} onChange={handleChange} placeholder="Site Name / Location" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">PF Number</label>
                <input type="text" className="form-control form-control-sm" name="PFNumber" value={formData.PFNumber} onChange={handleChange} placeholder="Provident Fund No." />
              </div>
              <div className="col-md-6">
                <label className="emp-label">ESI Number</label>
                <input type="text" className="form-control form-control-sm" name="ESINumber" value={formData.ESINumber} onChange={handleChange} placeholder="ESI Insurance No." />
              </div>

              {/* --- 6. BANK INFORMATION --- */}
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
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('Designation')}>Designation {renderSortIcon('Designation')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('DateOfJoining')}>DOJ {renderSortIcon('DateOfJoining')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('DeploymentLocation')}>Location {renderSortIcon('DeploymentLocation')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('Gender')}>Gender {renderSortIcon('Gender')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('BloodGroup')}>Blood Group {renderSortIcon('BloodGroup')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('FathersName')}>Father's Name {renderSortIcon('FathersName')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('DOB')}>DOB {renderSortIcon('DOB')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('MaritalStatus')}>Marital Status {renderSortIcon('MaritalStatus')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('IdentificationMark')}>Ident. Mark {renderSortIcon('IdentificationMark')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('CityVillage')}>City/Village {renderSortIcon('CityVillage')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('State')}>State {renderSortIcon('State')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('District')}>District {renderSortIcon('District')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('PinCode')}>PIN {renderSortIcon('PinCode')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('PanNo')}>PAN No {renderSortIcon('PanNo')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('AadharNo')}>Aadhar No {renderSortIcon('AadharNo')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('VoterNo')}>Voter No {renderSortIcon('VoterNo')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('DrivingLicense')}>Driving Lic. {renderSortIcon('DrivingLicense')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('DrivingLicenseExpiry')}>DL Expiry {renderSortIcon('DrivingLicenseExpiry')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('GunLicense')}>Gun Lic. {renderSortIcon('GunLicense')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('GunLicenseExpiry')}>Gun Expiry {renderSortIcon('GunLicenseExpiry')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('HighestQualification')}>Highest Qual. {renderSortIcon('HighestQualification')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('InstitutionName')}>Institution {renderSortIcon('InstitutionName')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('PassingYear')}>Pass Year {renderSortIcon('PassingYear')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('PFNumber')}>PF No {renderSortIcon('PFNumber')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('ESINumber')}>ESI No {renderSortIcon('ESINumber')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('BankName')}>Bank Name {renderSortIcon('BankName')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('IFSCode')}>IFS Code {renderSortIcon('IFSCode')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('AcctNo')}>Account No {renderSortIcon('AcctNo')}</th>
                  <th className="py-3 text-end pe-4 sticky-col-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="32" className="text-center py-5 text-muted fw-bold">
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
                      <td className="fw-bold text-secondary">{emp.Designation || "-"}</td>
                      <td>{emp.DateOfJoining || "-"}</td>
                      <td>{emp.DeploymentLocation || "-"}</td>
                      <td>{emp.Gender === 'M' ? 'Male' : emp.Gender === 'F' ? 'Female' : "-"}</td>
                      <td>{emp.BloodGroup || "-"}</td>
                      <td>{emp.FathersName || "-"}</td>
                      <td>{emp.DOB || "-"}</td>
                      <td>{emp.MaritalStatus || "-"}</td>
                      <td>{emp.IdentificationMark || "-"}</td>
                      <td>{emp.CityVillage || "-"}</td>
                      <td>{emp.State || "-"}</td>
                      <td>{emp.District || "-"}</td>
                      <td>{emp.PinCode || "-"}</td>
                      <td>{emp.PanNo || "-"}</td>
                      <td>{emp.AadharNo || "-"}</td>
                      <td>{emp.VoterNo || "-"}</td>
                      <td>{emp.DrivingLicense || "-"}</td>
                      <td>{emp.DrivingLicenseExpiry || "-"}</td>
                      <td>{emp.GunLicense || "-"}</td>
                      <td>{emp.GunLicenseExpiry || "-"}</td>
                      <td>{emp.HighestQualification || "-"}</td>
                      <td>{emp.InstitutionName || "-"}</td>
                      <td>{emp.PassingYear || "-"}</td>
                      <td>{emp.PFNumber || "-"}</td>
                      <td>{emp.ESINumber || "-"}</td>
                      <td>{emp.BankName || "-"}</td>
                      <td>{emp.IFSCode || "-"}</td>
                      <td>{emp.AcctNo || "-"}</td>
                      <td className="text-end pe-4 sticky-col-right bg-white">
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          
                          {/* Salary Setup Modal (Fixed Transparency) */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 px-2 py-1 h-auto">
                                <IndianRupee size={14} className="mr-1" /> Setup Salary
                              </Button>
                            </DialogTrigger>
                            
                            {/* Updated Enterprise Full-Screen Modal Classes */}
                            <DialogContent className="!max-w-[100vw] !w-screen !h-screen !m-0 !p-4 sm:!p-8 bg-slate-50 border-0 rounded-none z-[99999] overflow-y-auto flex flex-col">
                              <div className="container mx-auto flex-grow flex justify-center items-start">
                                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 w-full max-w-5xl h-auto min-h-[80vh]">
                                  <SalaryStructureForm employeeId={emp.id} /> 
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* New View Button */}
                          <button onClick={() => alert(`View details feature for ${emp.AcctName} coming soon.`)} className="btn btn-sm btn-outline-info enterprise-btn" title="View Profile">
                            <Eye size={14} />
                          </button>

                          {/* Existing Edit and Delete Buttons */}
                          <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-outline-secondary enterprise-btn" title="Edit Record">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-outline-danger enterprise-btn" title="Delete Record">
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