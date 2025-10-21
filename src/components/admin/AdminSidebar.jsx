import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCog,
  FaChartLine
} from 'react-icons/fa';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/admin',
      icon: FaTachometerAlt,
      label: 'Dashboard',
      exact: true
    },
    {
      path: '/admin/bookings',
      icon: FaCalendarAlt,
      label: 'Bookings'
    },
    {
      path: '/admin/clients',
      icon: FaUsers,
      label: 'Clients'
    },
    {
      path: '/admin/services',
      icon: FaChartLine,
      label: 'Services'
    },
    {
      path: '/admin/settings',
      icon: FaCog,
      label: 'Settings'
    }
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="admin-sidebar bg-dark text-white"
      style={{
        width: '250px',
        minHeight: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000
      }}
    >
      <div className="p-3">
        <h4 className="text-center mb-4">TheraPilates</h4>
        <h6 className="text-muted mb-4">Admin Panel</h6>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);

            return (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path}
                  className={`btn btn-link text-white text-decoration-none d-block w-100 text-start mb-2 ${
                    active ? 'bg-primary' : ''
                  }`}
                  style={{
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}
                >
                  <Icon className="me-3" />
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            width: 100% !important;
            position: relative !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;