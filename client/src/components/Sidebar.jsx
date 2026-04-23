import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const location = useLocation();

  // Map each menu to the specific permission name from our database
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', requiredPermission: 'VIEW_DASHBOARD' },
    { name: 'Employee Management', path: '/employees', icon: '👥', requiredPermission: 'MANAGE_EMPLOYEES' },
    { name: 'Client Management', path: '/clients', icon: '🏢', requiredPermission: 'MANAGE_CLIENTS' },
    { name: 'Job Management', path: '/jobs', icon: '💼', requiredPermission: 'MANAGE_JOBS' },
    { name: 'Payroll System', path: '/payroll', icon: '💰', requiredPermission: 'MANAGE_PAYROLL' },
    { name: 'Invoice System', path: '/invoices', icon: '🧾', requiredPermission: 'MANAGE_INVOICES' },
    { name: 'Reports', path: '/reports', icon: '📈', requiredPermission: 'VIEW_REPORTS' },
    { name: 'User Management', path: '/users', icon: '⚙️', requiredPermission: 'MANAGE_USERS' }
  ];

  // The Magic Filter: Only show the menu if the user's permission array includes the required permission!
  const visibleMenuItems = menuItems.filter(item => {
    // If the user has no permissions loaded yet, hide everything
    if (!user || !user.permissions) return false; 
    
    // Check if their exact permission array contains the required permission for this menu
    return user.permissions.includes(item.requiredPermission);
  });

  return (
    <div style={{
      width: '250px',
      backgroundColor: '#1e293b',
      color: 'white',
      height: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#38bdf8' }}>
        Manpower System
      </h2>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {visibleMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              style={{
                color: isActive ? '#38bdf8' : '#cbd5e1',
                textDecoration: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                backgroundColor: isActive ? '#334155' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background 0.2s'
              }}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;