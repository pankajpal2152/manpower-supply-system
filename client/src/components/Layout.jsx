import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const navigate = useNavigate();
  // Get the logged-in user
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // If no user is logged in, kick them back to the login page securely!
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar on the Left */}
      <Sidebar user={user} />

      {/* Main Content Area on the Right */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header */}
        <header style={{ 
          height: '60px', 
          backgroundColor: '#ffffff', 
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontWeight: 'bold' }}>{user.firstName} {user.lastName} ({user.role})</span>
            <button 
              onClick={handleLogout}
              style={{ padding: '8px 15px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content goes here (this makes it dynamic!) */}
        <main style={{ flex: 1, padding: '20px', backgroundColor: '#f1f5f9', overflowY: 'auto' }}>
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default Layout;