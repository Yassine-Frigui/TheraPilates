import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  return (
    <div className="admin-layout d-flex">
      <AdminSidebar />
      <div className="admin-content flex-grow-1">
        <main
          className="admin-main p-4"
          style={{
            marginLeft: '250px',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa'
          }}
        >
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-main {
            margin-left: 0 !important;
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .admin-layout {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminLayout