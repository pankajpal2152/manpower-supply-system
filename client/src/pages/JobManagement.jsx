import React, { useState, useEffect, useRef, useMemo } from "react";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
// ✅ Added ChevronLeft and ChevronRight for the pagination controls
import { Plus, Pencil, Trash2, Search, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import "./EmployeeManagement.css"; 

const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

const emptyJobForm = {
  ProfilePicture: "",
  ProfilePictureBase64: "", 
  AccountName: "",
  CityVillage: "",
  Landmark: "",
  State: "",
  District: "",
  PostOffice: "",
  PolicStation: "",
  PinCode: "",
  BankName: "",
  BankAddress: "",
  IFSCode: "",
  AcctNo: "",
  status: "Available"
};

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyJobForm);

  // States for Dropdowns
  const [dbStates, setDbStates] = useState([]);
  const [dbDistricts, setDbDistricts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can adjust this to 10 or 20 if needed
  
  const fileInputRef = useRef(null);
  const formTopRef = useRef(null);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) { console.error("Error fetching jobs:", error); }
  };

  useEffect(() => {
    fetchJobs();
    const fetchStates = async () => {
        try {
            const res = await api.get("/jobs/data/states");
            setDbStates(res.data);
        } catch (error) { console.error("Error fetching states:", error); }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.State) {
        const matchedState = dbStates.find(s => s.StateName === formData.State);
        if (matchedState) {
            const fetchDistricts = async () => {
                try {
                    const res = await api.get(`/jobs/data/districts/${matchedState.StateId}`);
                    setDbDistricts(res.data);
                } catch (error) { console.error("Error fetching districts:", error); }
            };
            fetchDistricts();
        } else { setDbDistricts([]); }
    } else { setDbDistricts([]); }
  }, [formData.State, dbStates]);

  useEffect(() => {
    // ✅ Reset to page 1 whenever the search term changes
    setCurrentPage(1);
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = jobs.filter((job) => {
      const { ProfilePictureBase64, ProfilePicture, id, createdAt, updatedAt, ...searchableData } = job;
      return Object.values(searchableData).some((value) => 
        value !== null && value !== undefined && value.toString().toLowerCase().includes(lowercasedSearch)
      );
    });
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; }
    setSortConfig({ key, direction });
  };

  const sortedJobs = useMemo(() => {
    let sortableItems = [...filteredJobs];
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
  }, [filteredJobs, sortConfig]);

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <ArrowUpDown size={14} className="ms-1 text-muted opacity-50" />;
    if (sortConfig.direction === 'ascending') return <ArrowUp size={14} className="ms-1 text-primary" />;
    return <ArrowDown size={14} className="ms-1 text-primary" />;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "AccountName") value = value.replace(/[^a-zA-Z\s.&-]/g, "");
    if (name === "PinCode") value = value.replace(/\D/g, "").slice(0, 6);
    if (name === "IFSCode") value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11);
    if (name === "AcctNo") value = value.replace(/\D/g, "").slice(0, 18);

    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      if (name === "State") { updatedData.District = ""; }
      return updatedData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800000) { alert("Image size exceeds 800KB limit."); return; }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, ProfilePictureBase64: reader.result, ProfilePicture: URL.createObjectURL(file) }));
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
      imageWindow.document.write(`<iframe width='100%' height='100%' style='border:none; margin:0; padding:0;' src='${imageSrc}'></iframe>`);
    } else {
      alert("Pop-up blocked! Please allow pop-ups to view the image.");
    }
  };

  const handleEdit = (job) => {
    setEditingId(job.id);
    setFormData({ ...emptyJobForm, ...job });
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormData(emptyJobForm);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/jobs/${editingId}`, formData);
      } else {
        await api.post("/jobs", formData);
      }
      handleResetForm(); 
      fetchJobs();
    } catch (error) {
      console.error("Error saving job:", error);
      alert(error.response?.data?.message || "Error saving job");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await api.delete(`/jobs/${id}`);
        fetchJobs();
      } catch (error) { console.error("Error deleting job:", error); }
    }
  };

  return (
    // ✅ Applied enterprise-font wrapper
    <div className="emp-wrapper p-4 enterprise-font">
      <div className="d-flex justify-content-between align-items-center mb-4" ref={formTopRef}>
        <div>
          <h2 className="fw-bold mb-0 text-dark">Job Management</h2>
          <p className="text-muted mb-0">Branch Office & Site Configuration</p>
        </div>
      </div>

      <div className="emp-form-view mb-5">
        <div className="emp-card shadow-sm rounded border-0">
          <div className="emp-card-header rounded-top">
            <h5 className="mb-0 fw-bold">{editingId ? "Edit Branch Office" : "Branch Office Registration"}</h5>
          </div>

          <div className="emp-card-body p-4 bg-white">
            <form id="jobForm" onSubmit={handleSubmit} className="row g-3">
              
              <div className="col-12"><p className="PerInfo m-0 rounded">Branch Office</p></div>
              
              <div className="col-12 mb-3 d-flex align-items-center gap-4">
                <div className="emp-profile-img-container shadow-sm">
                  <img src={formData.ProfilePictureBase64 || formData.ProfilePicture || DEFAULT_AVATAR} alt="Logo" className="emp-profile-img" />
                </div>
                <div>
                  <label htmlFor="profileUpload" className="btn btn-sm btn-outline-primary me-2 shadow-sm cursor-pointer">
                    <Plus size={16} className="me-1"/> {formData.ProfilePicture || formData.ProfilePictureBase64 ? 'Change Logo' : 'Upload Logo'}
                  </label>
                  <input type="file" id="profileUpload" ref={fileInputRef} accept="image/png, image/jpeg, image/jpg" style={{ display: 'none' }} onChange={handleImageChange} />
                  {(formData.ProfilePicture || formData.ProfilePictureBase64) && (
                    <>
                      <button type="button" className="btn btn-sm btn-outline-info me-2 shadow-sm" onClick={handleViewImage}>👁️ View</button>
                      <button type="button" className="btn btn-sm btn-outline-danger shadow-sm" onClick={handleRemoveImage}>Remove</button>
                    </>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <label className="emp-label">Account Name *</label>
                <input type="text" className="form-control form-control-sm" name="AccountName" value={formData.AccountName} onChange={handleChange} required placeholder="Branch / Account Name" />
              </div>

              <div className="col-12 mt-4"><p className="PerInfo m-0 rounded">Address</p></div>

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
                <input type="text" className="form-control form-control-sm" name="PinCode" value={formData.PinCode} onChange={handleChange} placeholder="Pin Code" pattern="^[1-9][0-9]{5}$" title="PIN code must be exactly 6 digits and cannot start with 0" />
              </div>

              <div className="col-12 mt-4"><p className="PerInfo m-0 rounded">Bank Information</p></div>
              
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
                <input type="text" className="form-control form-control-sm" name="IFSCode" value={formData.IFSCode} onChange={handleChange} placeholder="IFS Code" pattern="^[A-Z]{4}0[A-Z0-9]{6}$" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">Account Number</label>
                <input type="text" className="form-control form-control-sm" name="AcctNo" value={formData.AcctNo} onChange={handleChange} placeholder="Account Number" pattern="^\d{9,18}$" />
              </div>

            </form>
          </div>

          <div className="emp-card-footer rounded-bottom bg-light border-top p-3 d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary px-4 shadow-sm" onClick={handleResetForm}>
              {editingId ? "Cancel Edit" : "Clear Form"}
            </button>
            <button type="submit" form="jobForm" className="btn btn-primary px-5 shadow-sm fw-bold">
              {editingId ? "Update Job" : "Submit Registration"}
            </button>
          </div>
        </div>
      </div>

      {/* --- TABLE VIEW --- */}
      <div className="emp-list-view">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-dark mb-0">Registered Branches Directory</h4>
          {/* ✅ Applied enterprise search bar styling */}
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
        
        {/* ✅ Applied Enterprise Table Card Styling */}
        <div className="card shadow-sm border-0 enterprise-table-card">
          <div className="card-body p-0 table-responsive custom-scrollbar">
            <table className="table table-hover align-middle mb-0 bg-white enterprise-table">
              <thead className="table-light text-uppercase">
                <tr>
                  {/* ✅ Added sticky-col-left */}
                  <th className="py-3 ps-4 sticky-col-left">Logo</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('AcctId')}>
                    Job ID {renderSortIcon('AcctId')}
                  </th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('AccountName')}>
                    Account Name {renderSortIcon('AccountName')}
                  </th>
                  
                  {/* ✅ Expanded columns to include all form fields */}
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('CityVillage')}>City/Village {renderSortIcon('CityVillage')}</th>
                  <th className="py-3">Landmark</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('State')}>State {renderSortIcon('State')}</th>
                  <th className="py-3 cursor-pointer sortable-header" onClick={() => handleSort('District')}>District {renderSortIcon('District')}</th>
                  <th className="py-3">Post Office</th>
                  <th className="py-3">Police Station</th>
                  <th className="py-3">PIN Code</th>
                  <th className="py-3">Bank Name</th>
                  <th className="py-3">IFS Code</th>
                  <th className="py-3">Account No</th>

                  {/* ✅ Added sticky-col-right */}
                  <th className="py-3 text-end pe-4 sticky-col-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="14" className="text-center py-5 text-muted fw-bold">
                      {searchTerm ? "No records match your search criteria." : "No active records found. Please register above."}
                    </td>
                  </tr>
                ) : (
                  currentItems.map((job) => (
                    <tr key={job.id}>
                      <td className="ps-4 sticky-col-left bg-white">
                        <img 
                          src={job.ProfilePictureBase64 || DEFAULT_AVATAR} 
                          alt="logo" 
                          className="enterprise-table-avatar"
                        />
                      </td>
                      <td className="text-primary fw-bold">{job.AcctId || "N/A"}</td>
                      <td className="fw-bold text-dark">{job.AccountName || "-"}</td>
                      <td>{job.CityVillage || "-"}</td>
                      <td>{job.Landmark || "-"}</td>
                      <td>{job.State || "-"}</td>
                      <td>{job.District || "-"}</td>
                      <td>{job.PostOffice || "-"}</td>
                      <td>{job.PolicStation || "-"}</td>
                      <td>{job.PinCode || "-"}</td>
                      <td>{job.BankName || "-"}</td>
                      <td>{job.IFSCode || "-"}</td>
                      <td>{job.AcctNo || "-"}</td>

                      <td className="text-end pe-4 sticky-col-right bg-white">
                        <div className="d-flex justify-content-end gap-2">
                          <button onClick={() => handleEdit(job)} className="btn btn-sm btn-outline-secondary enterprise-btn">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDelete(job.id)} className="btn btn-sm btn-outline-danger enterprise-btn">
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

          {/* --- PAGINATION CONTROLS --- */}
          {sortedJobs.length > 0 && (
            <div className="card-footer bg-white border-top py-3 d-flex justify-content-between align-items-center">
              <span className="text-muted small fw-medium">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedJobs.length)} of {sortedJobs.length} entries
              </span>
              <div className="enterprise-pagination d-flex gap-1">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-light border d-flex align-items-center"
                >
                  <ChevronLeft size={16} />
                </button>
                
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

export default JobManagement;