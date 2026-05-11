import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ user }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', requiredPermission: 'VIEW_DASHBOARD' },
    { name: 'Employee Management', path: '/employees', icon: '👥', requiredPermission: 'MANAGE_EMPLOYEES' },
    { name: 'Client Management', path: '/clients', icon: '🏢', requiredPermission: 'MANAGE_CLIENTS' },
    { name: 'Job Management', path: '/jobs', icon: '💼', requiredPermission: 'MANAGE_JOBS' },
    { name: 'Attendance', path: '/attendance', icon: '📅', requiredPermission: 'MANAGE_ATTENDANCE' },
    { name: 'Leave Management', path: '/leaves', icon: '🏖️', requiredPermission: 'MANAGE_LEAVES' },
    { name: 'Payroll System', path: '/payroll', icon: '💰', requiredPermission: 'MANAGE_PAYROLL' },
    { name: 'Invoice System', path: '/invoices', icon: '🧾', requiredPermission: 'MANAGE_INVOICES' },
    { name: 'Reports', path: '/reports', icon: '📈', requiredPermission: 'VIEW_REPORTS' },
    { name: 'User Management', path: '/users', icon: '⚙️', requiredPermission: 'MANAGE_USERS' }
  ];

  const visibleMenuItems = menuItems.filter(item => {
    if (!user || !Array.isArray(user.permissions)) return false; 
    return user.permissions.includes(item.requiredPermission);
  });

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title" style={{ fontSize: '1.4rem', whiteSpace: 'nowrap' }}>
        Manpower System
      </h2>
      
      <nav className="sidebar-nav" style={{ overflowY: 'auto' }}>
        {visibleMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : 'inactive'}`}
            >
              <span aria-hidden="true" className="sidebar-icon">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;