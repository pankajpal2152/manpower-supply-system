import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import our newly built pages and components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import UserManagement from './pages/UserManagement';
import EmployeeManagement from './pages/EmployeeManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route - Accessible without logging in */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes - Everything inside here uses the Layout component 
            and checks for authentication before rendering! */}
        <Route element={<Layout />}>
          {/* Default redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Our active feature modules */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeManagement />} /> 
          <Route path="/users" element={<UserManagement />} /> 
          
          {/* Placeholders for future modules - added slight padding for better appearance */}
          <Route path="/clients" element={<div style={{ padding: '20px' }}><h2>Client Management</h2><p>Coming soon...</p></div>} />
          <Route path="/jobs" element={<div style={{ padding: '20px' }}><h2>Job Management</h2><p>Coming soon...</p></div>} />
          <Route path="/payroll" element={<div style={{ padding: '20px' }}><h2>Payroll System</h2><p>Coming soon...</p></div>} />
          <Route path="/invoices" element={<div style={{ padding: '20px' }}><h2>Invoice System</h2><p>Coming soon...</p></div>} />
          <Route path="/reports" element={<div style={{ padding: '20px' }}><h2>Reports</h2><p>Coming soon...</p></div>} />
        </Route>

        {/* Catch-all 404 Route - Triggers if the user types an unknown URL */}
        <Route path="*" element={
          // FIX: Applied the same absolute positioning here to fix layout breaks on the 404 page
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0, backgroundColor: '#f1f5f9' }}>
            <h1 style={{ fontSize: '3rem', color: '#0f172a', marginBottom: '10px' }}>404</h1>
            <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '20px' }}>Oops! The page you are looking for doesn't exist.</p>
            <a href="/dashboard" style={{ padding: '10px 20px', backgroundColor: '#0ea5e9', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
              Go back to Dashboard
            </a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;