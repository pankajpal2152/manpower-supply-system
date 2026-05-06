import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; // <-- Import the new CSS file

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
    // Bulletproof Safety check: Ensure user exists and permissions is actually an array
    if (!user || !Array.isArray(user.permissions)) return false; 
    
    // Check if their exact permission array contains the required permission for this menu
    return user.permissions.includes(item.requiredPermission);
  });

  return (
    <div className="sidebar-container">
      {/* FIXED: Added inline style to reduce font size and prevent wrapping 
        whiteSpace: 'nowrap' forces the text to stay on one line
      */}
      <h2 className="sidebar-title" style={{ fontSize: '1.4rem', whiteSpace: 'nowrap' }}>
        Manpower System
      </h2>
      
      {/* Added overflowY: auto so if menu items get too long, they scroll nicely inside the sidebar */}
      <nav className="sidebar-nav">
        {visibleMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              // Accessibility enhancement: Tells screen readers this is the current page
              aria-current={isActive ? 'page' : undefined}
              // We use string interpolation to assign classes dynamically based on the active state
              className={`sidebar-link ${isActive ? 'active' : 'inactive'}`}
            >
              {/* Accessibility enhancement: Hides the emoji from screen readers to prevent clutter */}
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