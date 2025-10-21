import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarCheck, FaUsers, FaMoneyBill, FaChartLine } from "react-icons/fa";

export default function AdminStatistics() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalClients: 0,
    totalRevenue: 0,
    activeServices: 0
  });

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("therapilates_bookings") || "[]");
    const clients = JSON.parse(localStorage.getItem("therapilates_clients") || "[]");
    const services = JSON.parse(localStorage.getItem("therapilates_services") || "[]");

    setStats({
      totalBookings: bookings.length,
      totalClients: clients.length,
      totalRevenue: bookings.length * 85,
      activeServices: services.length
    });
  }, []);

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: FaCalendarCheck,
      color: "primary",
      description: "All time bookings"
    },
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: FaUsers,
      color: "success",
      description: "Registered clients"
    },
    {
      title: "Total Revenue",
      value: `TND ${stats.totalRevenue}`,
      icon: FaMoneyBill,
      color: "warning",
      description: "Revenue generated"
    },
    {
      title: "Active Services",
      value: stats.activeServices,
      icon: FaChartLine,
      color: "info",
      description: "Services offered"
    }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Dashboard Overview</h2>
        <small className="text-muted">Welcome back, Admin</small>
      </div>

      <div className="row">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="col-md-3 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`card border-0 shadow-sm h-100 bg-${card.color} text-white`}>
                  <div className="card-body d-flex align-items-center">
                    <div className="me-3">
                      <Icon size={40} />
                    </div>
                    <div>
                      <h4 className="card-title mb-1">{card.value}</h4>
                      <p className="card-text mb-0 opacity-75">{card.title}</p>
                      <small className="opacity-50">{card.description}</small>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-primary">Add New Booking</button>
                  <button className="btn btn-outline-success">Register Client</button>
                  <button className="btn btn-outline-info">Update Services</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">Recent Activity</h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item px-0">
                    <small className="text-muted">2 hours ago</small>
                    <div>New physiotherapy session booked</div>
                  </div>
                  <div className="list-group-item px-0">
                    <small className="text-muted">1 day ago</small>
                    <div>Client Ahmed registered</div>
                  </div>
                  <div className="list-group-item px-0">
                    <small className="text-muted">2 days ago</small>
                    <div>Prenatal Pilates service updated</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}