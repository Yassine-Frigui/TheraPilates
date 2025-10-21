import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCog,
  FaChartLine
} from 'react-icons/fa';
import AdminStatistics from './AdminStatistics';
import AdminBookings from './AdminBookings';
import AdminClients from './AdminClients';
import AdminServices from './AdminServices';
import AdminSettings from './AdminSettings';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'bookings', label: 'Bookings', icon: FaCalendarAlt },
    { id: 'clients', label: 'Clients', icon: FaUsers },
    { id: 'services', label: 'Services', icon: FaChartLine },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminStatistics />;
      case 'bookings':
        return <AdminBookings />;
      case 'clients':
        return <AdminClients />;
      case 'services':
        return <AdminServices />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminStatistics />;
    }
  };

  return (
    <div className="admin-dashboard d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
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
              return (
                <motion.button
                  key={item.id}
                  className={`btn btn-link text-white text-decoration-none d-block w-100 text-start mb-2 ${
                    activeSection === item.id ? 'bg-primary' : ''
                  }`}
                  onClick={() => setActiveSection(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}
                >
                  <Icon className="me-3" />
                  {item.label}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="admin-main flex-grow-1"
        style={{
          marginLeft: '250px',
          backgroundColor: '#f8f9fa',
          minHeight: '100vh'
        }}
      >
        <div className="container-fluid p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            width: 100% !important;
            position: relative !important;
          }
          .admin-main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;