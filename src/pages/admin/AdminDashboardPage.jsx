import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Card, Row, Col, Button, Badge, ProgressBar, ListGroup, Alert } from 'react-bootstrap';
import {
  FaCalendarCheck,
  FaUsers,
  FaMoneyBill,
  FaChartLine,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCalendarAlt,
  FaUserPlus,
  FaCog,
  FaBell
} from 'react-icons/fa';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalClients: 0,
    totalRevenue: 0,
    activeServices: 0,
    todayBookings: 0,
    pendingBookings: 0,
    completedSessions: 0,
    monthlyRevenue: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("therapilates_bookings") || "[]");
    const clients = JSON.parse(localStorage.getItem("therapilates_clients") || "[]");
    const services = JSON.parse(localStorage.getItem("therapilates_services") || "[]");

    // Calculate today's date
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookings.filter(booking => booking.date === today);

    // Calculate pending bookings
    const pendingBookings = bookings.filter(booking => booking.status === 'pending');

    // Calculate completed sessions (assuming confirmed bookings from past dates)
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 30);
    const completedSessions = bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate < new Date() && booking.status === 'confirmed';
    }).length;

    // Calculate monthly revenue (simplified)
    const monthlyRevenue = bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
    }).length * 85;

    setStats({
      totalBookings: bookings.length,
      totalClients: clients.length,
      totalRevenue: bookings.length * 85,
      activeServices: services.length,
      todayBookings: todayBookings.length,
      pendingBookings: pendingBookings.length,
      completedSessions,
      monthlyRevenue
    });

    // Get recent bookings (last 5)
    const sortedBookings = bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
    setRecentBookings(sortedBookings.slice(0, 5));

    // Get upcoming sessions (next 7 days)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const upcoming = bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= new Date() && bookingDate <= nextWeek && booking.status === 'confirmed';
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    setUpcomingSessions(upcoming.slice(0, 5));

    // Generate alerts
    const newAlerts = [];
    if (pendingBookings.length > 0) {
      newAlerts.push({
        type: 'warning',
        message: `${pendingBookings.length} booking${pendingBookings.length > 1 ? 's' : ''} waiting for confirmation`,
        icon: FaExclamationTriangle
      });
    }
    if (todayBookings.length === 0) {
      newAlerts.push({
        type: 'info',
        message: 'No bookings scheduled for today',
        icon: FaCalendarAlt
      });
    }
    setAlerts(newAlerts);
  }, []);

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: FaCalendarCheck,
      color: "primary",
      description: "All time bookings",
      trend: "+12%",
      trendType: "up"
    },
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: FaUsers,
      color: "success",
      description: "Registered clients",
      trend: "+8%",
      trendType: "up"
    },
    {
      title: "Monthly Revenue",
      value: `TND ${stats.monthlyRevenue}`,
      icon: FaMoneyBill,
      color: "warning",
      description: "This month",
      trend: "+15%",
      trendType: "up"
    },
    {
      title: "Active Services",
      value: stats.activeServices,
      icon: FaChartLine,
      color: "info",
      description: "Services offered",
      trend: "3 new",
      trendType: "neutral"
    }
  ];

  const quickStats = [
    { label: "Today's Bookings", value: stats.todayBookings, icon: FaCalendarAlt },
    { label: "Pending Confirmations", value: stats.pendingBookings, icon: FaClock },
    { label: "Completed Sessions", value: stats.completedSessions, icon: FaCheckCircle }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Dashboard Overview</h2>
          <small className="text-muted">Welcome back, Admin • {new Date().toLocaleDateString()}</small>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm">
            <FaBell className="me-1" />
            Notifications
          </Button>
          <Button variant="outline-secondary" size="sm">
            <FaCog className="me-1" />
            Settings
          </Button>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <Row className="mb-4">
          <Col>
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Alert variant={alert.type} className="d-flex align-items-center">
                    <Icon className="me-2" />
                    {alert.message}
                  </Alert>
                </motion.div>
              );
            })}
          </Col>
        </Row>
      )}

      {/* Main Stats Cards */}
      <Row className="mb-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Col md={3} key={index} className="mb-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="d-flex align-items-center">
                    <div className="me-3">
                      <div className={`bg-${card.color} bg-opacity-10 p-3 rounded-circle`}>
                        <Icon size={24} className={`text-${card.color}`} />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h4 className="mb-1">{card.value}</h4>
                          <p className="text-muted mb-1 small">{card.title}</p>
                          <small className="text-muted">{card.description}</small>
                        </div>
                        <Badge
                          bg={card.trendType === 'up' ? 'success' : card.trendType === 'down' ? 'danger' : 'secondary'}
                          className="small"
                        >
                          {card.trend}
                        </Badge>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>

      {/* Quick Stats Row */}
      <Row className="mb-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Col md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <Card className="text-center border-0 shadow-sm">
                  <Card.Body className="py-3">
                    <Icon size={20} className="text-primary mb-2" />
                    <h5 className="mb-1">{stat.value}</h5>
                    <small className="text-muted">{stat.label}</small>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>

      {/* Main Content Grid */}
      <Row>
        {/* Recent Bookings */}
        <Col lg={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recent Bookings</h5>
                <Button variant="link" size="sm" className="p-0">View All</Button>
              </Card.Header>
              <Card.Body className="p-0">
                <ListGroup variant="flush">
                  {recentBookings.length > 0 ? recentBookings.map((booking, index) => (
                    <ListGroup.Item key={booking.id} className="px-3 py-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-semibold">{booking.clientName}</div>
                          <small className="text-muted">{booking.service}</small>
                        </div>
                        <div className="text-end">
                          <Badge bg={booking.status === 'confirmed' ? 'success' : 'warning'}>
                            {booking.status}
                          </Badge>
                          <div className="small text-muted mt-1">
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  )) : (
                    <ListGroup.Item className="text-center py-4 text-muted">
                      No recent bookings
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Upcoming Sessions */}
        <Col lg={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Upcoming Sessions</h5>
                <Button variant="link" size="sm" className="p-0">View Calendar</Button>
              </Card.Header>
              <Card.Body className="p-0">
                <ListGroup variant="flush">
                  {upcomingSessions.length > 0 ? upcomingSessions.map((session, index) => (
                    <ListGroup.Item key={session.id} className="px-3 py-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-semibold">{session.clientName}</div>
                          <small className="text-muted">{session.service}</small>
                        </div>
                        <div className="text-end">
                          <div className="small fw-semibold">{session.time}</div>
                          <div className="small text-muted">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  )) : (
                    <ListGroup.Item className="text-center py-4 text-muted">
                      No upcoming sessions
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row>
        <Col>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Quick Actions</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={3}>
                    <Button variant="outline-primary" className="w-100 d-flex align-items-center justify-content-center">
                      <FaCalendarCheck className="me-2" />
                      New Booking
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button variant="outline-success" className="w-100 d-flex align-items-center justify-content-center">
                      <FaUserPlus className="me-2" />
                      Add Client
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button variant="outline-info" className="w-100 d-flex align-items-center justify-content-center">
                      <FaChartLine className="me-2" />
                      View Reports
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button variant="outline-secondary" className="w-100 d-flex align-items-center justify-content-center">
                      <FaCog className="me-2" />
                      Settings
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboardPage;