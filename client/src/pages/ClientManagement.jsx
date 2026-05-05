import React, { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pencil, Trash2, CalendarDays } from "lucide-react";
import "./EmployeeManagement.css"; // We reuse the exact same CSS file!

const emptyClientForm = {
  OrganizationName: "",
  Abbreviation: "",
  Address: "",
  NoOfBranch: "",
  Location: "",
  State: "",
  BillingAddress: "",
  BillingState: "",
  ContactPerson: "",
  ContactNumber: "",
  GSTNo: "",
  EmailId: "",
  AgreementType: "",
  PrincipalEmp: "",
  PECNo: "",
  ValidUpto: "",
  DateOfWorkOrder: "",
  EffectiveFrom: "",
  SecurityLicence: ""
};

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyClientForm);
  const formTopRef = useRef(null);

  const fetchClients = async () => {
    try {
      const response = await api.get("/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (client) => {
    setEditingId(client.id);
    setFormData(client);
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormData(emptyClientForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/clients/${editingId}`, formData);
      } else {
        await api.post("/clients", formData);
      }
      handleResetForm();
      fetchClients();
    } catch (error) {
      console.error("Error saving client:", error);
      alert(error.response?.data?.message || "Error saving client");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await api.delete(`/clients/${id}`);
        fetchClients();
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  return (
    <div className="emp-wrapper p-4">
      <style>{`
        .modern-date-input::-webkit-calendar-picker-indicator {
          background: transparent; bottom: 0; color: transparent; cursor: pointer;
          height: auto; left: 0; position: absolute; right: 0; top: 0; width: auto;
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-4" ref={formTopRef}>
        <div>
          <h2 className="fw-bold mb-0 text-dark">Client Management</h2>
          <p className="text-muted mb-0">Manage Contracts, Billing, and Sites</p>
        </div>
      </div>

      {/* --- FORM VIEW (ALWAYS VISIBLE AT TOP) --- */}
      <div className="emp-form-view mb-5">
        <div className="emp-card shadow-sm rounded border-0">
          <div className="emp-card-header rounded-top">
            <h5 className="mb-0 fw-bold">
              {editingId ? "Edit Client Data" : "Client Registration Form"}
            </h5>
          </div>

          <div className="emp-card-body p-4 bg-white">
            <form id="clientForm" onSubmit={handleSubmit} className="row g-3">
              
              {/* --- 1. BASIC INFORMATION --- */}
              <div className="col-12">
                <p className="PerInfo m-0 rounded">1. Basic Information</p>
              </div>

              <div className="col-md-8">
                <label className="emp-label">Organization Name *</label>
                <input type="text" className="form-control form-control-sm" name="OrganizationName" value={formData.OrganizationName} onChange={handleChange} required placeholder="Organization Name" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Abbreviation</label>
                <input type="text" className="form-control form-control-sm" name="Abbreviation" value={formData.Abbreviation} onChange={handleChange} placeholder="Abbreviation" />
              </div>

              <div className="col-md-12">
                <label className="emp-label">Address</label>
                <input type="text" className="form-control form-control-sm" name="Address" value={formData.Address} onChange={handleChange} placeholder="Full Address" />
              </div>

              <div className="col-md-4">
                <label className="emp-label">No. of Branches</label>
                <input type="number" className="form-control form-control-sm" name="NoOfBranch" value={formData.NoOfBranch} onChange={handleChange} placeholder="e.g., 5" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Location</label>
                <input type="text" className="form-control form-control-sm" name="Location" value={formData.Location} onChange={handleChange} placeholder="Location" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">State</label>
                <select name="State" value={formData.State} onChange={handleChange} className="form-select form-select-sm">
                  <option value="">Choose...</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>

              {/* --- 2. BILLING & CONTACT --- */}
              <div className="col-12 mt-4">
                <p className="PerInfo m-0 rounded">2. Billing & Contact Info</p>
              </div>

              <div className="col-md-8">
                <label className="emp-label">Billing Address</label>
                <input type="text" className="form-control form-control-sm" name="BillingAddress" value={formData.BillingAddress} onChange={handleChange} placeholder="Billing Address" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Billing State</label>
                <select name="BillingState" value={formData.BillingState} onChange={handleChange} className="form-select form-select-sm">
                  <option value="">Choose...</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="emp-label">Contact Person</label>
                <input type="text" className="form-control form-control-sm" name="ContactPerson" value={formData.ContactPerson} onChange={handleChange} placeholder="Contact Person Name" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">Contact Number</label>
                <input type="text" className="form-control form-control-sm" name="ContactNumber" value={formData.ContactNumber} onChange={handleChange} placeholder="Contact Number" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">Email ID</label>
                <input type="email" className="form-control form-control-sm" name="EmailId" value={formData.EmailId} onChange={handleChange} placeholder="Email Address" />
              </div>
              <div className="col-md-6">
                <label className="emp-label">GST No.</label>
                <input type="text" className="form-control form-control-sm" name="GSTNo" value={formData.GSTNo} onChange={handleChange} placeholder="GST Number" />
              </div>

              {/* --- 3. COMPLIANCE & AGREEMENT --- */}
              <div className="col-12 mt-4">
                <p className="PerInfo m-0 rounded">3. Compliance & Agreement Details</p>
              </div>

              <div className="col-md-4">
                <label className="emp-label">Agreement Type</label>
                <input type="text" className="form-control form-control-sm" name="AgreementType" value={formData.AgreementType} onChange={handleChange} placeholder="e.g., Annual, Temporary" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">Principal Employer</label>
                <input type="text" className="form-control form-control-sm" name="PrincipalEmp" value={formData.PrincipalEmp} onChange={handleChange} placeholder="Principal Emp" />
              </div>
              <div className="col-md-4">
                <label className="emp-label">P.E.C. No</label>
                <input type="text" className="form-control form-control-sm" name="PECNo" value={formData.PECNo} onChange={handleChange} placeholder="P.E.C. No" />
              </div>

              <div className="col-md-4">
                <label className="emp-label">Date of Work Order</label>
                <div className="position-relative">
                  <input type="date" className="form-control form-control-sm modern-date-input" name="DateOfWorkOrder" value={formData.DateOfWorkOrder} onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} style={{ cursor: "pointer", zIndex: 1, position: "relative", backgroundColor: "transparent" }} />
                  <CalendarDays size={16} className="position-absolute text-muted" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0 }} />
                </div>
              </div>
              <div className="col-md-4">
                <label className="emp-label">Effective From</label>
                <div className="position-relative">
                  <input type="date" className="form-control form-control-sm modern-date-input" name="EffectiveFrom" value={formData.EffectiveFrom} onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} style={{ cursor: "pointer", zIndex: 1, position: "relative", backgroundColor: "transparent" }} />
                  <CalendarDays size={16} className="position-absolute text-muted" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0 }} />
                </div>
              </div>
              <div className="col-md-4">
                <label className="emp-label">Valid Upto</label>
                <div className="position-relative">
                  <input type="date" className="form-control form-control-sm modern-date-input" name="ValidUpto" value={formData.ValidUpto} onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} style={{ cursor: "pointer", zIndex: 1, position: "relative", backgroundColor: "transparent" }} />
                  <CalendarDays size={16} className="position-absolute text-muted" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0 }} />
                </div>
              </div>

              <div className="col-md-12">
                <label className="emp-label">Security Licence</label>
                <input type="text" className="form-control form-control-sm" name="SecurityLicence" value={formData.SecurityLicence} onChange={handleChange} placeholder="Security Licence Details" />
              </div>

            </form>
          </div>

          {/* Form Footer */}
          <div className="emp-card-footer rounded-bottom bg-light border-top p-3 d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary px-4 shadow-sm" onClick={handleResetForm}>
              {editingId ? "Cancel Edit" : "Clear Form"}
            </button>
            <button type="submit" form="clientForm" className="btn btn-primary px-5 shadow-sm fw-bold">
              {editingId ? "Update Client" : "Submit Registration"}
            </button>
          </div>
        </div>
      </div>

      {/* --- TABLE VIEW --- */}
      <div className="emp-list-view">
        <h4 className="fw-bold text-dark mb-3">Registered Clients Directory</h4>
        <div className="card shadow-sm border-0">
          <div className="card-body p-0 table-responsive">
            <table className="table table-hover align-middle mb-0 bg-white">
              <thead className="table-light text-uppercase" style={{ fontSize: "0.85rem" }}>
                <tr>
                  <th className="py-3 ps-4">Organization Name</th>
                  <th className="py-3">Contact Person</th>
                  <th className="py-3">Location</th>
                  <th className="py-3">Effective From</th>
                  <th className="py-3 text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted fw-bold">
                      No active clients found. Please register a client above.
                    </td>
                  </tr>
                ) : (
                  clients.map((client) => (
                    <tr key={client.id}>
                      <td className="ps-4 fw-bold text-dark">{client.OrganizationName}</td>
                      <td className="text-muted">{client.ContactPerson || "N/A"}</td>
                      <td className="text-muted">{client.Location || "N/A"}</td>
                      <td className="text-muted">{client.EffectiveFrom || "N/A"}</td>
                      <td className="text-end pe-4">
                        <button onClick={() => handleEdit(client)} className="btn btn-sm btn-outline-secondary me-2">
                          <Pencil size={14} className="me-1" /> Edit
                        </button>
                        <button onClick={() => handleDelete(client.id)} className="btn btn-sm btn-outline-danger">
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
      </div>
    </div>
  );
};

export default ClientManagement;