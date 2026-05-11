import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// Page & Component Imports
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import UserManagement from './pages/UserManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import ClientManagement from './pages/ClientManagement';
import JobManagement from './pages/JobManagement';
import AttendanceManagement from './pages/AttendancePage.jsx';
import LeaveManagement from './pages/LeaveManagement.jsx';
import PayrollDashboard from './pages/PayrollDashboard.jsx';
import InvoiceManagement from './pages/InvoiceManagement.jsx'; // New
import ReportsPage from './pages/ReportsPage.jsx'; // New

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/clients" element={<ClientManagement />} />
          <Route path="/jobs" element={<JobManagement />} />
          <Route path="/attendance" element={<AttendanceManagement />} />
          <Route path="/leaves" element={<LeaveManagement />} />
          <Route path="/payroll" element={<PayrollDashboard />} />
          
          {/* ✅ Now properly linked to actual components */}
          <Route path="/invoices" element={<InvoiceManagement />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        <Route path="*" element={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', backgroundColor: '#f1f5f9' }}>
            <h1 style={{ fontSize: '3.3rem', color: '#0f172a' }}>404</h1>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>Page not found.</p>
            <Link to="/dashboard" style={{ padding: '10px 20px', backgroundColor: '#0ea5e9', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
              Go back to Dashboard
            </Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;