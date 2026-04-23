import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import UserManagement from './pages/UserManagement'; // <-- Add this import
import EmployeeManagement from './pages/EmployeeManagement'; // <-- Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Update this line to use the real component! */}
          <Route path="/employees" element={<EmployeeManagement />} /> 
          
          {/* ... keeping the rest of the placeholders ... */}
          <Route path="/clients" element={<div><h1>Client Management</h1><p>Coming soon...</p></div>} />
          <Route path="/jobs" element={<div><h1>Job Management</h1><p>Coming soon...</p></div>} />
          <Route path="/payroll" element={<div><h1>Payroll System</h1><p>Coming soon...</p></div>} />
          <Route path="/invoices" element={<div><h1>Invoice System</h1><p>Coming soon...</p></div>} />
          <Route path="/reports" element={<div><h1>Reports</h1><p>Coming soon...</p></div>} />
          
          <Route path="/users" element={<UserManagement />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;