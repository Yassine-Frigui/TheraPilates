import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaClock,
  FaCalendarCheck,
  FaSave,
  FaUser,
  FaBan,

  FaClipboardCheck,
  FaExclamationTriangle
} from 'react-icons/fa';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({
    status: '',
    service_ids: [], // Changed from service_id to service_ids array
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: ''
  });
  const [newBookingData, setNewBookingData] = useState({
    client_id: '',
    service_ids: [], // Changed from service_id to service_ids array
    date: '',
    time: '',
    status: 'pending',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: ''
  });
  const [bookingsNeedingConfirmation, setBookingsNeedingConfirmation] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activePill, setActivePill] = useState('all');

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, [dateFilter, statusFilter]);

  useEffect(() => {
    fetchBookingsNeedingConfirmation();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, activePill, bookingsNeedingConfirmation]);

  const fetchServices = async () => {
    try {
      const savedServices = localStorage.getItem("therapilates_services");
      if (savedServices) {
        setServices(JSON.parse(savedServices));
      } else {
        const defaultServices = [
          { id: 1, nom: "Physiotherapy Session", prix: 85, duree: 50 },
          { id: 2, nom: "Therapeutic Pilates", prix: 65, duree: 50 },
          { id: 3, nom: "Prenatal Pilates", prix: 70, duree: 45 },
          { id: 4, nom: "Postnatal Pilates", prix: 70, duree: 45 },
          { id: 5, nom: "Sports Rehabilitation", prix: 90, duree: 60 }
        ];
        setServices(defaultServices);
        localStorage.setItem("therapilates_services", JSON.stringify(defaultServices));
      }
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const fetchBookingsNeedingConfirmation = async () => {
    try {
      // For demo purposes, we'll simulate some bookings needing confirmation
      const savedBookings = localStorage.getItem("therapilates_bookings");
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        const needingConfirmation = bookings.filter(booking =>
          booking.status === 'pending' || booking.status === 'confirmed'
        );
        setBookingsNeedingConfirmation(needingConfirmation);
      }
    } catch (error) {
      console.error('Error loading bookings needing confirmation:', error);
      setBookingsNeedingConfirmation([]);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const savedBookings = localStorage.getItem("therapilates_bookings");
      if (savedBookings) {
        let bookings = JSON.parse(savedBookings);

        // Apply date filter
        if (dateFilter && dateFilter !== 'all') {
          const today = new Date().toISOString().split('T')[0];
          const thisMonth = new Date().toISOString().slice(0, 7);

          switch (dateFilter) {
            case 'today': {
              bookings = bookings.filter(booking => booking.date === today);
              break;
            }
            case 'this_month': {
              bookings = bookings.filter(booking => booking.date.startsWith(thisMonth));
              break;
            }
            case 'this_week': {
              const startOfWeek = new Date();
              const endOfWeek = new Date();
              startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
              endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
              const startDate = startOfWeek.toISOString().split('T')[0];
              const endDate = endOfWeek.toISOString().split('T')[0];
              bookings = bookings.filter(booking =>
                booking.date >= startDate && booking.date <= endDate
              );
              break;
            }
          }
        }

        // Apply status filter
        if (statusFilter && statusFilter !== 'all') {
          bookings = bookings.filter(booking => booking.status === statusFilter);
        }

        // Transform data to match frontend expectations
        const transformedBookings = bookings.map(booking => ({
          id: booking.id,
          client: {
            nom: booking.clientName?.split(' ').pop() || '',
            prenom: booking.clientName?.split(' ')[0] || '',
            telephone: booking.clientPhone || '',
            email: booking.clientEmail || ''
          },
          services: booking.service ? [{
            nom: booking.service,
            duree: booking.duration || 50,
            prix: parseFloat(booking.price?.replace('TND ', '') || 0)
          }] : [],
          service: booking.service ? {
            nom: booking.service,
            duree: booking.duration || 50,
            prix: parseFloat(booking.price?.replace('TND ', '') || 0)
          } : {
            nom: 'Service inconnu',
            duree: 0,
            prix: 0
          },
          date_reservation: booking.date,
          heure_reservation: booking.time,
          statut: booking.status,
          notes: booking.notes || '',
          is_draft: booking.status === 'draft',
          session_id: booking.id,
          created_at: booking.createdAt,
          influencer_name: null,
          influencer_code: null
        }));

        setBookings(transformedBookings);
      } else {
        // Sample data
        const sampleBookings = [
          {
            id: 1,
            clientName: "Marie Dupont",
            clientEmail: "marie.dupont@email.com",
            clientPhone: "+216 71 123 456",
            service: "Physiotherapy Session",
            date: "2025-10-25",
            time: "10:00",
            duration: 50,
            notes: "Lower back pain assessment",
            status: "confirmed",
            price: "TND 85",
            paymentStatus: "paid",
            createdAt: "2025-10-20T09:00:00Z"
          },
          {
            id: 2,
            clientName: "Ahmed Ben Ali",
            clientEmail: "ahmed.benali@email.com",
            clientPhone: "+216 72 987 654",
            service: "Therapeutic Pilates",
            date: "2025-10-26",
            time: "14:00",
            duration: 50,
            notes: "Group class - rehabilitation focus",
            status: "pending",
            price: "TND 65",
            paymentStatus: "pending",
            createdAt: "2025-10-21T14:30:00Z"
          }
        ];
        localStorage.setItem("therapilates_bookings", JSON.stringify(sampleBookings));
        setBookings(sampleBookings.map(booking => ({
          id: booking.id,
          client: {
            nom: booking.clientName?.split(' ').pop() || '',
            prenom: booking.clientName?.split(' ')[0] || '',
            telephone: booking.clientPhone || '',
            email: booking.clientEmail || ''
          },
          services: [{
            nom: booking.service,
            duree: booking.duration || 50,
            prix: parseFloat(booking.price?.replace('TND ', '') || 0)
          }],
          service: {
            nom: booking.service,
            duree: booking.duration || 50,
            prix: parseFloat(booking.price?.replace('TND ', '') || 0)
          },
          date_reservation: booking.date,
          heure_reservation: booking.time,
          statut: booking.status,
          notes: booking.notes || '',
          is_draft: booking.status === 'draft',
          session_id: booking.id,
          created_at: booking.createdAt,
          influencer_name: null,
          influencer_code: null
        })));
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    // Filter by pill type first
    switch (activePill) {
      case 'drafts':
        filtered = filtered.filter(res => res.is_draft);
        break;
      case 'admin_approval':
        filtered = filtered.filter(res => {
          const needsConfirmation = (bookingsNeedingConfirmation || []).some(r => r && r.id && res && res.id && r.id === res.id);
          return needsConfirmation;
        });
        break;
      case 'all':
      default:
        // No additional filtering for 'all'
        break;
    }

    // Then apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(res =>
        (res.client?.nom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (res.client?.prenom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (res.service?.nom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (res.client?.telephone || '').includes(searchTerm)
      );
    }

    setFilteredBookings(filtered);
  };

  const getStatusBadge = (statut, needsConfirmation = false) => {
    if (needsConfirmation) {
      return (
        <span className="badge bg-danger d-flex align-items-center gap-1">
          <FaExclamationTriangle size={12} />
          Action Required
        </span>
      );
    }

    const statusConfig = {
      'draft': { bg: 'light text-dark', text: 'Draft', icon: FaEdit },
      'pending': { bg: 'warning', text: 'Pending', icon: FaClock },
      'confirmed': { bg: 'success', text: 'Confirmed', icon: FaCheck },
      'in_progress': { bg: 'primary', text: 'In Progress', icon: FaClipboardCheck },
      'completed': { bg: 'info', text: 'Completed', icon: FaCalendarCheck },
      'cancelled': { bg: 'danger', text: 'Cancelled', icon: FaTimes },
      'absent': { bg: 'secondary', text: 'Absent', icon: FaBan },
    };

    const config = statusConfig[statut] || { bg: 'secondary', text: 'Unknown', icon: FaEdit };
    const IconComponent = config.icon;

    return (
      <span className={`badge bg-${config.bg} d-flex align-items-center gap-1`}>
        <IconComponent size={12} />
        {config.text}
      </span>
    );
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setIsUpdating(true);

      // Update local storage
      const savedBookings = localStorage.getItem("therapilates_bookings");
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        const updatedBookings = bookings.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: newStatus, updatedAt: new Date().toISOString() }
            : booking
        );
        localStorage.setItem("therapilates_bookings", JSON.stringify(updatedBookings));

        // Update local state
        setBookings(prev => prev.map(res =>
          res.id === bookingId ? { ...res, statut: newStatus } : res
        ));
      }

      // Show success message
      alert('Status updated successfully!');

    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    } finally {
      setIsUpdating(false);
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const openEditModal = (booking) => {
    // Get service IDs from the booking
    const serviceIds = [];
    if (booking.services && booking.services.length > 0) {
      serviceIds.push(...booking.services.map(service => service.id));
    } else if (booking.service_id) {
      serviceIds.push(booking.service_id);
    }

    setSelectedBooking(booking);
    setEditFormData({
      status: booking.statut,
      service_ids: serviceIds, // Changed from service_id to service_ids
      clientName: `${booking.client?.prenom || ''} ${booking.client?.nom || ''}`.trim(),
      clientEmail: booking.client?.email || '',
      clientPhone: booking.client?.telephone || '',
      notes: booking.notes || ''
    });
    setShowEditModal(true);
  };

  const handlePillChange = (pillType) => {
    setActivePill(pillType);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBooking) return;

    try {
      setIsUpdating(true);

      // Update local storage
      const savedBookings = localStorage.getItem("therapilates_bookings");
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        const updatedBookings = bookings.map(booking =>
          booking.id === selectedBooking.id
            ? {
                ...booking,
                status: editFormData.status,
                clientName: editFormData.clientName,
                clientEmail: editFormData.clientEmail,
                clientPhone: editFormData.clientPhone,
                notes: editFormData.notes,
                updatedAt: new Date().toISOString()
              }
            : booking
        );
        localStorage.setItem("therapilates_bookings", JSON.stringify(updatedBookings));
      }

      // Refresh bookings
      await fetchBookings();

      // Close modal and show success
      setShowEditModal(false);
      alert('Booking updated successfully!');

    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Error updating booking');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewBookingChange = (field, value) => {
    setNewBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fetchClients = async () => {
    try {
      const savedClients = localStorage.getItem("therapilates_clients");
      if (savedClients) {
        setClients(JSON.parse(savedClients));
      } else {
        setClients([]);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const openAddBookingModal = () => {
    fetchClients();
    setNewBookingData({
      client_id: '',
      service_ids: [], // Changed from service_id to service_ids
      date: '',
      time: '',
      status: 'pending',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      notes: ''
    });
    setShowAddModal(true);
  };

  const handleAddBookingSubmit = async (e) => {
    e.preventDefault();

    // Validate that at least one service is selected
    if (!newBookingData.service_ids || newBookingData.service_ids.length === 0) {
      alert('Please select at least one service');
      return;
    }

    try {
      setIsCreatingNew(true);

      // Prepare data
      const bookingData = {
        id: Date.now(),
        clientName: newBookingData.clientName,
        clientEmail: newBookingData.clientEmail,
        clientPhone: newBookingData.clientPhone,
        service: services.find(s => s.id === newBookingData.service_ids[0])?.nom || 'Unknown Service',
        date: newBookingData.date,
        time: newBookingData.time,
        duration: services.find(s => s.id === newBookingData.service_ids[0])?.duree || 50,
        status: newBookingData.status,
        price: `TND ${services.find(s => s.id === newBookingData.service_ids[0])?.prix || 0}`,
        paymentStatus: 'pending',
        notes: newBookingData.notes,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const savedBookings = localStorage.getItem("therapilates_bookings");
      const bookings = savedBookings ? JSON.parse(savedBookings) : [];
      bookings.push(bookingData);
      localStorage.setItem("therapilates_bookings", JSON.stringify(bookings));

      // Refresh bookings
      await fetchBookings();

      // Close modal and show success
      setShowAddModal(false);
      alert('Booking created successfully!');

    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking: ' + (error.message || error));
    } finally {
      setIsCreatingNew(false);
    }
  };

  const handleConvertDraft = async (bookingId) => {
    try {
      await handleStatusChange(bookingId, 'confirmed');
      // Show success message
      alert('Draft converted to confirmed booking!');
    } catch (error) {
      console.error('Error converting draft:', error);
      alert('Error converting draft');
    }
  };

  const handleDelete = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const savedBookings = localStorage.getItem("therapilates_bookings");
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
        localStorage.setItem("therapilates_bookings", JSON.stringify(updatedBookings));
        setBookings(prev => prev.filter(res => res.id !== bookingId));
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} />
          <p className="text-muted">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-bookings">
      {/* Header */}
      <motion.div
        className="page-header mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="row align-items-center">
          <div className="col">
            <h1 className="h3 fw-bold text-dark mb-1">
              <FaCalendarAlt className="text-primary me-2" />
              Bookings Management
            </h1>
            <p className="text-muted mb-0">
              Manage appointments and reservations
            </p>
          </div>
          <div className="col-auto">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddBookingModal}
            >
              <FaPlus className="me-2" />
              New Booking
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Pills Navigation */}
      <motion.div
        className="pills-navigation mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="d-flex gap-2 mb-3">
          <button
            className={`btn ${activePill === 'all' ? 'btn-primary' : 'btn-secondary'} rounded-pill px-4`}
            onClick={() => handlePillChange('all')}
          >
            All Bookings
            {activePill === 'all' && (
              <span className="badge bg-white text-primary ms-2">{filteredBookings.length}</span>
            )}
          </button>
          <button
            className={`btn ${activePill === 'drafts' ? 'btn-warning' : 'btn-outline-warning'} rounded-pill px-4`}
            onClick={() => handlePillChange('drafts')}
          >
            Drafts
            {activePill === 'drafts' && (
              <span className="badge bg-white text-warning ms-2">{filteredBookings.length}</span>
            )}
          </button>
          <button
            className={`btn ${activePill === 'admin_approval' ? 'btn-danger' : 'btn-outline-danger'} rounded-pill px-4`}
            onClick={() => handlePillChange('admin_approval')}
          >
            Action Required
            {activePill === 'admin_approval' && (
              <span className="badge bg-white text-danger ms-2">{filteredBookings.length}</span>
            )}
            {activePill !== 'admin_approval' && bookingsNeedingConfirmation.length > 0 && (
              <span className="badge bg-danger text-white ms-2">{bookingsNeedingConfirmation.length}</span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="filters-section mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by name, service, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="draft">Drafts</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this_week">This Week</option>
                </select>
              </div>
              <div className="col-md-2">
                <span className="badge bg-light text-dark fs-6 w-100 py-2">
                  {filteredBookings.length} result(s)
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bookings Table */}
      <motion.div
        className="bookings-table"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 px-4 py-3">Client</th>
                    <th className="border-0 py-3">Service</th>
                    <th className="border-0 py-3">Date & Time</th>
                    <th className="border-0 py-3">Status</th>
                    <th className="border-0 py-3">Price</th>
                    <th className="border-0 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">
                        <FaCalendarAlt className="mb-3" size={48} />
                        <p className="mb-0">No bookings found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking, index) => {
                      const needsConfirmation = (bookingsNeedingConfirmation || []).some(r => r && r.id && booking && booking.id && r.id === booking.id);
                      return (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                          className={needsConfirmation ? 'table-warning' : ''}
                        >
                        <td className="px-4 py-3">
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <strong className="text-dark">
                                {booking.is_draft ? (
                                  <span className="badge bg-warning text-dark me-2">DRAFT</span>
                                ) : null}
                                {booking.client?.prenom} {booking.client?.nom}
                              </strong>
                              <motion.button
                                className="btn btn-secondary"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openModal(booking)}
                                title="View details"
                                style={{
                                  fontSize: '10px',
                                  padding: '2px 6px',
                                  minWidth: 'auto',
                                  height: '20px'
                                }}
                              >
                                <FaEye size={10} />
                              </motion.button>
                            </div>
                            <div className="small text-muted">
                              {booking.client?.telephone || ''}
                            </div>
                            <div className="small text-muted">
                              {booking.client?.email || ''}
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            {booking.services && booking.services.length > 1 ? (
                              // Multiple services
                              <div>
                                <div className="fw-semibold text-primary">
                                  {booking.services.length} services
                                </div>
                                {booking.services.slice(0, 2).map((service, idx) => (
                                  <div key={idx} className="small text-muted">
                                    • {service.nom} ({service.duree} min)
                                  </div>
                                ))}
                                {booking.services.length > 2 && (
                                  <div className="small text-muted">
                                    +{booking.services.length - 2} others...
                                  </div>
                                )}
                              </div>
                            ) : (
                              // Single service
                              <div>
                                <span className="fw-semibold">{booking.service?.nom || 'Unknown Service'}</span>
                                <div className="small text-muted">
                                  <FaClock className="me-1" size={12} />
                                  {booking.service?.duree || 0} min
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            <span className="fw-semibold">
                              {booking.date_reservation ? new Date(booking.date_reservation).toLocaleDateString() : 'Unknown Date'}
                            </span>
                            <div className="small text-muted">
                              {booking.heure_reservation || ''}
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          {getStatusBadge(booking.statut, needsConfirmation)}
                        </td>
                        <td className="py-3">
                          <span className="fw-bold text-success">
                            {booking.services && booking.services.length > 1
                              ? `${booking.services.reduce((total, service) => {
                                  const price = parseFloat(service?.prix) || 0;
                                  return total + price;
                                }, 0).toFixed(2)}DT`
                              : `${(parseFloat(booking.service?.prix) || 0).toFixed(2)}DT`
                            }
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="d-flex gap-1 flex-wrap">
                            <motion.button
                              className="btn btn-sm btn-secondary"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openModal(booking)}
                              title="View details"
                            >
                              <FaEye size={12} />
                            </motion.button>

                            <motion.button
                              className="btn btn-sm btn-outline-warning"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openEditModal(booking)}
                              title="Edit status and details"
                              disabled={isUpdating}
                            >
                              <FaEdit size={12} />
                            </motion.button>

                            {booking.is_draft ? (
                              <motion.button
                                className="btn btn-sm btn-outline-success"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleConvertDraft(booking.id)}
                                title="Convert to booking"
                                disabled={isUpdating}
                              >
                                <FaCalendarCheck size={12} />
                              </motion.button>
                            ) : (
                              <>
                                {booking.statut === 'pending' && (
                                  <motion.button
                                    className="btn btn-sm btn-outline-success"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                    title="Confirm"
                                    disabled={isUpdating}
                                  >
                                    <FaCheck size={12} />
                                  </motion.button>
                                )}

                                {['pending', 'confirmed'].includes(booking.statut) && (
                                  <motion.button
                                    className="btn btn-sm btn-outline-warning"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleStatusChange(booking.id, 'absent')}
                                    title="Mark as absent (no-show)"
                                    disabled={isUpdating}
                                  >
                                    <FaBan size={12} />
                                  </motion.button>
                                )}

                                {['pending', 'confirmed'].includes(booking.statut) && !needsConfirmation && (
                                  <motion.button
                                    className="btn btn-sm btn-outline-danger"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                    title="Cancel"
                                    disabled={isUpdating}
                                  >
                                    <FaTimes size={12} />
                                  </motion.button>
                                )}
                              </>
                            )}

                            {needsConfirmation && (
                              <>
                                <motion.button
                                  className="btn btn-sm btn-success"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleStatusChange(booking.id, 'completed')}
                                  title="Mark as completed"
                                  disabled={isUpdating}
                                >
                                  <FaCheck size={12} />
                                </motion.button>
                              </>
                            )}

                            <motion.button
                              className="btn btn-sm btn-outline-info"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Call"
                            >
                              <FaPhone size={12} />
                            </motion.button>

                            <motion.button
                              className="btn btn-sm btn-secondary"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(booking.id)}
                              title="Delete"
                              disabled={isUpdating}
                            >
                              <FaTrash size={12} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal de détails */}
      {showModal && selectedBooking && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  <FaCalendarCheck className="text-primary me-2" />
                  Booking Details #{selectedBooking.id}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary mb-3">Client Information</h6>
                    <div className="mb-2">
                      <strong>Name:</strong> {selectedBooking.client?.prenom} {selectedBooking.client?.nom}
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {selectedBooking.client?.email}
                    </div>
                    <div className="mb-3">
                      <strong>Phone:</strong> {selectedBooking.client?.telephone}
                    </div>

                    <h6 className="fw-bold text-primary mb-3">Services</h6>
                    {selectedBooking.services && selectedBooking.services.length > 1 ? (
                      // Multiple services
                      <div className="mb-3">
                        <div className="fw-semibold text-primary mb-2">
                          {selectedBooking.services.length} services booked
                        </div>
                        {selectedBooking.services.map((service, idx) => (
                          <div key={idx} className="border-start border-primary border-3 ps-3 mb-2">
                            <div className="mb-1">
                              <strong>{service?.nom || 'Unknown Service'}</strong>
                            </div>
                            <div className="small text-muted">
                              Duration: {service?.duree || 0} minutes • Price: {service?.prix || 0}DT
                            </div>
                          </div>
                        ))}
                        <div className="mt-3 pt-2 border-top">
                          <strong>Total Price: {selectedBooking.services?.reduce((total, service) => total + (service?.prix || 0), 0) || 0}DT</strong>
                        </div>
                      </div>
                    ) : (
                      // Single service
                      <div className="mb-3">
                        <div className="mb-2">
                          <strong>Service:</strong> {selectedBooking.service?.nom || 'Unknown Service'}
                        </div>
                        <div className="mb-3">
                          <strong>Price:</strong> {selectedBooking.service?.prix || 0}DT
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary mb-3">Appointment</h6>
                    <div className="mb-2">
                      <strong>Date:</strong> {selectedBooking.date_reservation ? new Date(selectedBooking.date_reservation).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>Time:</strong> {selectedBooking.heure_reservation}
                    </div>
                    <div className="mb-2">
                      <strong>Status:</strong> {getStatusBadge(selectedBooking.statut)}
                    </div>
                    <div className="mb-3">
                      <strong>Booked on:</strong> {selectedBooking.created_at ? new Date(selectedBooking.created_at).toLocaleDateString() : 'N/A'}
                    </div>

                    {selectedBooking.notes && (
                      <>
                        <h6 className="fw-bold text-primary mb-3">Client Notes</h6>
                        <div className="bg-light p-3 rounded mb-3">
                          {selectedBooking.notes}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <div className="d-flex gap-2 w-100">
                  <button className="btn btn-outline-success">
                    <FaPhone className="me-2" />
                    Call
                  </button>
                  <button className="btn btn-secondary">
                    <FaEnvelope className="me-2" />
                    Email
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      setShowModal(false);
                      openEditModal(selectedBooking);
                    }}
                  >
                    <FaEdit className="me-2" />
                    Edit
                  </button>
                  <button
                    className="btn btn-secondary ms-auto"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedBooking && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  <FaEdit className="text-warning me-2" />
                  Edit Booking #{selectedBooking.id}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                  disabled={isUpdating}
                />
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="row">
                    {/* Status Section */}
                    <div className="col-md-6">
                      <h6 className="fw-bold text-primary mb-3">
                        <FaClipboardCheck className="me-2" />
                        Booking Status
                      </h6>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Current Status</label>
                        <div className="mb-2">
                          {getStatusBadge(selectedBooking.statut)}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">New Status</label>
                        <select
                          className="form-select"
                          value={editFormData.status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          required
                        >
                          <option value="draft">Draft</option>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="absent">Absent (No-show)</option>
                        </select>
                        <div className="form-text">
                          Select the new status for this booking
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Admin Notes</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={editFormData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Add notes about this modification..."
                        />
                      </div>
                    </div>

                    {/* Client Details Section */}
                    <div className="col-md-6">
                      <h6 className="fw-bold text-primary mb-3">
                        <FaUser className="me-2" />
                        Client Details
                      </h6>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editFormData.clientName}
                          onChange={(e) => handleInputChange('clientName', e.target.value)}
                          placeholder="Client name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={editFormData.clientPhone}
                          onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                          placeholder="Phone number"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={editFormData.clientEmail}
                          onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Info (Read-only) */}
                  <div className="row mt-4">
                    <div className="col-12">
                      <h6 className="fw-bold text-primary mb-3">Booking Information</h6>
                      <div className="bg-light p-3 rounded">
                        <div className="row">
                          <div className="col-md-4">
                            <strong>Service:</strong> {selectedBooking.service.nom}
                          </div>
                          <div className="col-md-4">
                            <strong>Date:</strong> {new Date(selectedBooking.date_reservation).toLocaleDateString()}
                          </div>
                          <div className="col-md-4">
                            <strong>Time:</strong> {selectedBooking.heure_reservation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <div className="d-flex gap-2 w-100">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowEditModal(false)}
                      disabled={isUpdating}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary d-flex align-items-center gap-2"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <div className="spinner-border spinner-border-sm" role="status" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <FaSave />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  <FaPlus className="text-primary me-2" />
                  New Booking
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                  disabled={isCreatingNew}
                />
              </div>

              <form onSubmit={handleAddBookingSubmit}>
                <div className="modal-body">
                  <div className="row">
                    {/* Client Selection */}
                    <div className="col-12 mb-4">
                      <h6 className="fw-bold text-primary mb-3">
                        <FaUser className="me-2" />
                        Client
                      </h6>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Existing Client (optional)</label>
                        <select
                          className="form-select"
                          value={newBookingData.client_id}
                          onChange={(e) => handleNewBookingChange('client_id', e.target.value)}
                        >
                          <option value="">New Client</option>
                          {clients.map(client => (
                            <option key={client.id} value={client.id}>
                              {client.prenom} {client.nom} - {client.telephone}
                            </option>
                          ))}
                        </select>
                        <div className="form-text">
                          Select an existing client or leave empty to create a new one
                        </div>
                      </div>

                      {!newBookingData.client_id && (
                        <>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label fw-semibold">First Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newBookingData.client_prenom || ''}
                                onChange={(e) => handleNewBookingChange('client_prenom', e.target.value)}
                                placeholder="Client first name"
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label fw-semibold">Last Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newBookingData.client_nom || ''}
                                onChange={(e) => handleNewBookingChange('client_nom', e.target.value)}
                                placeholder="Client last name"
                                required
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label fw-semibold">Phone *</label>
                              <input
                                type="tel"
                                className="form-control"
                                value={newBookingData.client_telephone || ''}
                                onChange={(e) => handleNewBookingChange('client_telephone', e.target.value)}
                                placeholder="Phone number"
                                required
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label fw-semibold">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                value={newBookingData.client_email || ''}
                                onChange={(e) => handleNewBookingChange('client_email', e.target.value)}
                                placeholder="Email address"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Booking Details */}
                    <div className="col-12">
                      <h6 className="fw-bold text-primary mb-3">
                        <FaCalendarAlt className="me-2" />
                        Booking Details
                      </h6>

                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label fw-semibold">Services *</label>
                          <div className="border rounded p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {services.map(service => (
                              <div key={service.id} className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`service-${service.id}`}
                                  value={service.id}
                                  checked={newBookingData.service_ids.includes(service.id)}
                                  onChange={(e) => {
                                    const serviceId = parseInt(e.target.value);
                                    const currentServices = [...newBookingData.service_ids];
                                    if (e.target.checked) {
                                      currentServices.push(serviceId);
                                    } else {
                                      const index = currentServices.indexOf(serviceId);
                                      if (index > -1) {
                                        currentServices.splice(index, 1);
                                      }
                                    }
                                    handleNewBookingChange('service_ids', currentServices);
                                  }}
                                />
                                <label className="form-check-label" htmlFor={`service-${service.id}`}>
                                  <strong>{service.nom}</strong> - {service.prix}DT ({service.duree}min)
                                </label>
                              </div>
                            ))}
                          </div>
                          {newBookingData.service_ids.length > 0 && (
                            <div className="form-text">
                              {newBookingData.service_ids.length} service(s) selected -
                              Total: {services
                                .filter(service => newBookingData.service_ids.includes(service.id))
                                .reduce((total, service) => total + (parseFloat(service.prix) || 0), 0)
                                .toFixed(2)}DT
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">Date *</label>
                          <input
                            type="date"
                            className="form-control"
                            value={newBookingData.date}
                            onChange={(e) => handleNewBookingChange('date', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">Time *</label>
                          <input
                            type="time"
                            className="form-control"
                            value={newBookingData.time}
                            onChange={(e) => handleNewBookingChange('time', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label fw-semibold">Status</label>
                          <select
                            className="form-select"
                            value={newBookingData.status}
                            onChange={(e) => handleNewBookingChange('status', e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in_progress">In Progress</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Notes</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={newBookingData.notes}
                          onChange={(e) => handleNewBookingChange('notes', e.target.value)}
                          placeholder="Add any notes..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <div className="d-flex gap-2 w-100">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowAddModal(false)}
                      disabled={isCreatingNew}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary d-flex align-items-center gap-2"
                      disabled={isCreatingNew}
                    >
                      {isCreatingNew ? (
                        <>
                          <div className="spinner-border spinner-border-sm" role="status" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <FaSave />
                          Create Booking
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookingsPage;
