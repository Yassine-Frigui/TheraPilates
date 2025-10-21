import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt,
  FaPlus,
  FaSearch,
  FaFilter,
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
import { adminAPI } from '../../services/api';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [dateFilter, setDateFilter] = useState('tous');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [editFormData, setEditFormData] = useState({
    statut: '',
    service_ids: [], // Changed from service_id to service_ids array
    client_nom: '',
    client_prenom: '',
    client_telephone: '',
    client_email: '',
    notes_admin: ''
  });
  const [newReservationData, setNewReservationData] = useState({
    client_id: '',
    service_ids: [], // Changed from service_id to service_ids array
    date_reservation: '',
    heure_debut: '',
    statut: 'en_attente',
    client_nom: '',
    client_prenom: '',
    client_telephone: '',
    client_email: '',
    notes_client: ''
  });
  const [reservationsNeedingConfirmation, setReservationsNeedingConfirmation] = useState([]);
  const [confirmationCount, setConfirmationCount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activePill, setActivePill] = useState('all');

  useEffect(() => {
    fetchReservations();
    fetchServices();
  }, [dateFilter, statusFilter]);

  useEffect(() => {
    fetchReservationsNeedingConfirmation();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [reservations, searchTerm, activePill, reservationsNeedingConfirmation]);

  const fetchServices = async () => {
    try {
      const response = await adminAPI.getServicesAdmin();
      setServices(response.data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
    }
  };

  const fetchReservationsNeedingConfirmation = async () => {
    try {
      const response = await adminAPI.getReservationsNeedingConfirmation();
      if (response && response.data && response.data.success) {
        setReservationsNeedingConfirmation(response.data.reservations || []);
      } else {
        setReservationsNeedingConfirmation([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations nécessitant confirmation:', error);
      setReservationsNeedingConfirmation([]);
    }
  };

  const fetchReservations = async () => {
    try {
      setLoading(true);
      
      // Build query parameters based on filters
      const filters = {};
      
      if (dateFilter && dateFilter !== 'tous') {
        const today = new Date().toISOString().split('T')[0];
        const thisMonth = new Date().toISOString().slice(0, 7);
        
        switch (dateFilter) {
          case 'aujourd_hui':
            filters.date = today;
            break;
          case 'ce_mois':
            filters.date_debut = `${thisMonth}-01`;
            filters.date_fin = `${thisMonth}-31`;
            break;
          case 'cette_semaine':
            const startOfWeek = new Date();
            const endOfWeek = new Date();
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
            filters.date_debut = startOfWeek.toISOString().split('T')[0];
            filters.date_fin = endOfWeek.toISOString().split('T')[0];
            break;
        }
      }
      
      if (statusFilter && statusFilter !== 'tous') {
        filters.statut = statusFilter;
      }
      
      const response = await adminAPI.getReservations(filters);
      const data = response.data;
      
      // Transform data to match frontend expectations
      const transformedReservations = data.map(reservation => ({
        id: reservation.id,
        client: {
          nom: reservation.client_nom?.split(' ').pop() || '',
          prenom: reservation.client_nom?.split(' ')[0] || '',
          telephone: reservation.client_telephone || '',
          email: reservation.client_email || ''
        },
        // Handle multiple services
        services: reservation.services || [],
        service: reservation.services?.length > 0 ? reservation.services[0] : {
          nom: reservation.service_nom || 'Service inconnu',
          duree: reservation.service_duree || 0,
          prix: reservation.prix_final || 0
        },
        date_reservation: reservation.date_reservation,
        heure_reservation: reservation.heure_debut,
        statut: reservation.statut,
        notes: reservation.notes_client || '',
        is_draft: reservation.is_draft || reservation.statut === 'draft',
        session_id: reservation.session_id,
        created_at: reservation.date_creation,
        // Add influencer data
        influencer_name: reservation.influencer_name,
        influencer_code: reservation.influencer_code
      }));
      
      setReservations(transformedReservations);
    } catch (error) {
      console.error('Erreur lors du chargement des réservations:', error);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const filterReservations = () => {
    let filtered = [...reservations];

    // Filter by pill type first
    switch (activePill) {
      case 'drafts':
        filtered = filtered.filter(res => res.is_draft);
        break;
      case 'admin_approval':
        filtered = filtered.filter(res => {
          const needsConfirmation = (reservationsNeedingConfirmation || []).some(r => r && r.id && res && res.id && r.id === res.id);
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

    setFilteredReservations(filtered);
  };

  const getStatusBadge = (statut, needsConfirmation = false) => {
    if (needsConfirmation) {
      return (
        <span className="badge bg-danger d-flex align-items-center gap-1">
          <FaExclamationTriangle size={12} />
          Action requise
        </span>
      );
    }

    const statusConfig = {
      'draft': { bg: 'light text-dark', text: 'Brouillon', icon: FaEdit },
      'en_attente': { bg: 'warning', text: 'En attente', icon: FaClock },
      'confirmee': { bg: 'success', text: 'Confirmée', icon: FaCheck },
      'en_cours': { bg: 'primary', text: 'En cours', icon: FaClipboardCheck },
      'terminee': { bg: 'info', text: 'Terminée', icon: FaCalendarCheck },
      'annulee': { bg: 'danger', text: 'Annulée', icon: FaTimes },
      'absent': { bg: 'secondary', text: 'Absent', icon: FaBan },
    };

    const config = statusConfig[statut] || { bg: 'secondary', text: 'Inconnu', icon: FaEdit };
    const IconComponent = config.icon;

    return (
      <span className={`badge bg-${config.bg} d-flex align-items-center gap-1`}>
        <IconComponent size={12} />
        {config.text}
      </span>
    );
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      setIsUpdating(true);
      await adminAPI.updateReservationStatus(reservationId, newStatus);
      
      // Update local state
      setReservations(prev => prev.map(res => 
        res.id === reservationId ? { ...res, statut: newStatus } : res
      ));
      
      // Show success message
      alert('Statut mis à jour avec succès !');
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setIsUpdating(false);
    }
  };

  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const openEditModal = (reservation) => {
    // Get service IDs from the reservation
    const serviceIds = [];
    if (reservation.services && reservation.services.length > 0) {
      serviceIds.push(...reservation.services.map(service => service.id));
    } else if (reservation.service_id) {
      serviceIds.push(reservation.service_id);
    }

    setSelectedReservation(reservation);
    setEditFormData({
      statut: reservation.statut,
      service_ids: serviceIds, // Changed from service_id to service_ids
      client_nom: reservation.client?.nom || '',
      client_prenom: reservation.client?.prenom || '',
      client_telephone: reservation.client?.telephone || '',
      client_email: reservation.client?.email || '',
      notes_admin: reservation.notes_admin || ''
    });
    setShowEditModal(true);
  };

  const handlePillChange = (pillType) => {
    setActivePill(pillType);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedReservation) return;

    try {
      setIsUpdating(true);
      
      // Update reservation status and details
      await adminAPI.updateReservationStatus(
        selectedReservation.id, 
        editFormData.statut, 
        editFormData.notes_admin
      );

      // Update client details and services if provided and changed
      const updateData = {};
      if (editFormData.client_nom && editFormData.client_nom !== selectedReservation.client?.nom) {
        updateData.client_nom = editFormData.client_nom;
      }
      if (editFormData.client_prenom && editFormData.client_prenom !== selectedReservation.client?.prenom) {
        updateData.client_prenom = editFormData.client_prenom;
      }
      if (editFormData.client_telephone && editFormData.client_telephone !== selectedReservation.client?.telephone) {
        updateData.client_telephone = editFormData.client_telephone;
      }
      if (editFormData.client_email && editFormData.client_email !== selectedReservation.client?.email) {
        updateData.client_email = editFormData.client_email;
      }

      // Check if services have changed
      const currentServiceIds = [];
      if (selectedReservation.services && Array.isArray(selectedReservation.services) && selectedReservation.services.length > 0) {
        currentServiceIds.push(...selectedReservation.services.map(service => service.id));
      } else if (selectedReservation.service_id) {
        currentServiceIds.push(selectedReservation.service_id);
      }

      const servicesChanged = editFormData.service_ids && editFormData.service_ids.length > 0 &&
        JSON.stringify(editFormData.service_ids.sort()) !== JSON.stringify(currentServiceIds.sort());
      if (servicesChanged) {
        updateData.service_ids = editFormData.service_ids;
      }

      if (Object.keys(updateData).length > 0) {
        await adminAPI.updateReservation(selectedReservation.id, updateData);
      }

      // Refresh reservations
      await fetchReservations();
      
      // Close modal and show success
      setShowEditModal(false);
      alert('Réservation mise à jour avec succès !');
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour de la réservation');
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

  const handleNewReservationChange = (field, value) => {
    setNewReservationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fetchClients = async () => {
    try {
      const response = await adminAPI.getClients(1, 1000); // Get all clients
      setClients(response.data.clients || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
    }
  };

  const openAddReservationModal = () => {
    fetchClients();
    setNewReservationData({
      client_id: '',
      service_ids: [], // Changed from service_id to service_ids
      date_reservation: '',
      heure_debut: '',
      statut: 'en_attente',
      client_nom: '',
      client_prenom: '',
      client_telephone: '',
      client_email: '',
      notes_client: ''
    });
    setShowAddModal(true);
  };

  const handleAddReservationSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one service is selected
    if (!newReservationData.service_ids || newReservationData.service_ids.length === 0) {
      alert('Veuillez sélectionner au moins un service');
      return;
    }
    
    try {
      setIsCreatingNew(true);

      // Prepare data
      const reservationData = {
        service_ids: newReservationData.service_ids, // Changed from service_id to service_ids
        date_reservation: newReservationData.date_reservation,
        heure_debut: newReservationData.heure_debut,
        statut: newReservationData.statut,
        notes_client: newReservationData.notes_client
      };

      // If client_id is provided, use it, otherwise use client details
      if (newReservationData.client_id) {
        reservationData.client_id = newReservationData.client_id;
      } else {
        reservationData.nom = newReservationData.client_nom;
        reservationData.prenom = newReservationData.client_prenom;
        reservationData.telephone = newReservationData.client_telephone;
        reservationData.email = newReservationData.client_email;
      }

      // Create reservation with client
      await adminAPI.createReservationWithClient(reservationData);
      
      // Refresh reservations
      await fetchReservations();
      
      // Close modal and show success
      setShowAddModal(false);
      alert('Réservation créée avec succès !');
      
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création de la réservation: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsCreatingNew(false);
    }
  };

  const handleConvertDraft = async (reservationId) => {
    try {
      const response = await adminAPI.convertDraftReservation(reservationId);
      if (response.data) {
        // Refresh the reservations list
        fetchReservations();
        // Show success message
        alert('Brouillon converti en réservation confirmée !');
      }
    } catch (error) {
      console.error('Erreur lors de la conversion du brouillon:', error);
      alert('Erreur lors de la conversion du brouillon');
    }
  };

  const handleDelete = (reservationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      setReservations(prev => prev.filter(res => res.id !== reservationId));
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-pink-500 mb-3" style={{ width: '3rem', height: '3rem' }} />
          <p className="text-muted">Chargement des réservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-reservations">
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
              Réservations
            </h1>
            <p className="text-muted mb-0">
              Gérez les rendez-vous de votre salon
            </p>
          </div>
          <div className="col-auto">
            <motion.button
              className="btn btn-pink"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddReservationModal}
            >
              <FaPlus className="me-2" />
              Nouvelle réservation
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
            Toutes les réservations
            {activePill === 'all' && (
              <span className="badge bg-white text-primary ms-2">{filteredReservations.length}</span>
            )}
          </button>
          <button
            className={`btn ${activePill === 'drafts' ? 'btn-warning' : 'btn-outline-warning'} rounded-pill px-4`}
            onClick={() => handlePillChange('drafts')}
          >
            Brouillons
            {activePill === 'drafts' && (
              <span className="badge bg-white text-warning ms-2">{filteredReservations.length}</span>
            )}
          </button>
          <button
            className={`btn ${activePill === 'admin_approval' ? 'btn-danger' : 'btn-outline-danger'} rounded-pill px-4`}
            onClick={() => handlePillChange('admin_approval')}
          >
            Action requise
            {activePill === 'admin_approval' && (
              <span className="badge bg-white text-danger ms-2">{filteredReservations.length}</span>
            )}
            {activePill !== 'admin_approval' && reservationsNeedingConfirmation.length > 0 && (
              <span className="badge bg-danger text-white ms-2">{reservationsNeedingConfirmation.length}</span>
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
                    placeholder="Rechercher par nom ou service..."
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
                  <option value="tous">Tous les statuts</option>
                  <option value="draft">Brouillons</option>
                  <option value="en_attente">En attente</option>
                  <option value="confirmee">Confirmée</option>
                  <option value="en_cours">En cours</option>
                  <option value="terminee">Terminée</option>
                  <option value="annulee">Annulée</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="tous">Toutes les dates</option>
                  <option value="aujourd_hui">Aujourd'hui</option>
                  <option value="demain">Demain</option>
                  <option value="cette_semaine">Cette semaine</option>
                </select>
              </div>
              <div className="col-md-2">
                <span className="badge bg-light text-dark fs-6 w-100 py-2">
                  {filteredReservations.length} résultat(s)
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reservations Table */}
      <motion.div
        className="reservations-table"
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
                    <th className="border-0 px-4 py-3">Cliente</th>
                    <th className="border-0 py-3">Service</th>
                    <th className="border-0 py-3">Date & Heure</th>
                    <th className="border-0 py-3">Statut</th>
                    <th className="border-0 py-3">Prix</th>
                    <th className="border-0 py-3">Influencer</th>
                    <th className="border-0 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted">
                        <FaCalendarAlt className="mb-3" size={48} />
                        <p className="mb-0">Aucune réservation trouvée</p>
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((reservation, index) => {
                      const needsConfirmation = (reservationsNeedingConfirmation || []).some(r => r && r.id && reservation && reservation.id && r.id === reservation.id);
                      return (
                        <motion.tr
                          key={reservation.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                          className={needsConfirmation ? 'table-warning' : ''}
                        >
                        <td className="px-4 py-3">
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <strong className="text-dark">
                                {reservation.is_draft ? (
                                  <span className="badge bg-warning text-dark me-2">DRAFT</span>
                                ) : null}
                                {reservation.client?.prenom} {reservation.client?.nom}
                              </strong>
                              <motion.button
                                className="btn btn-secondary"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openModal(reservation)}
                                title="Voir détails"
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
                              {reservation.client?.telephone || ''}
                            </div>
                            <div className="small text-muted">
                              {reservation.client?.email || ''}
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            {reservation.services && reservation.services.length > 1 ? (
                              // Multiple services
                              <div>
                                <div className="fw-semibold text-primary">
                                  {reservation.services.length} services
                                </div>
                                {reservation.services.slice(0, 2).map((service, idx) => (
                                  <div key={idx} className="small text-muted">
                                    • {service.nom} ({service.duree} min)
                                  </div>
                                ))}
                                {reservation.services.length > 2 && (
                                  <div className="small text-muted">
                                    +{reservation.services.length - 2} autres...
                                  </div>
                                )}
                              </div>
                            ) : (
                              // Single service
                              <div>
                                <span className="fw-semibold">{reservation.service?.nom || 'Service inconnu'}</span>
                                <div className="small text-muted">
                                  <FaClock className="me-1" size={12} />
                                  {reservation.service?.duree || 0} min
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            <span className="fw-semibold">
                              {reservation.date_reservation ? new Date(reservation.date_reservation).toLocaleDateString('fr-FR') : 'Date inconnue'}
                            </span>
                            <div className="small text-muted">
                              {reservation.heure_reservation || ''}
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          {getStatusBadge(reservation.statut, needsConfirmation)}
                        </td>
                        <td className="py-3">
                          <span className="fw-bold text-success">
                            {reservation.services && reservation.services.length > 1 
                              ? `${reservation.services.reduce((total, service) => {
                                  const price = parseFloat(service?.prix) || 0;
                                  return total + price;
                                }, 0).toFixed(2)}DT`
                              : `${(parseFloat(reservation.service?.prix) || 0).toFixed(2)}DT`
                            }
                          </span>
                        </td>
                        <td className="py-3">
                          {reservation.influencer_name ? (
                            <div>
                              <span className="badge bg-info text-dark">
                                <FaUser className="me-1" size={10} />
                                {reservation.influencer_name}
                              </span>
                              <div className="small text-muted mt-1">
                                Code: {reservation.influencer_code}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted small">-</span>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="d-flex gap-1 flex-wrap">
                            <motion.button
                              className="btn btn-sm btn-secondary"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openModal(reservation)}
                              title="Voir détails"
                            >
                              <FaEye size={12} />
                            </motion.button>

                            <motion.button
                              className="btn btn-sm btn-outline-warning"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openEditModal(reservation)}
                              title="Modifier statut et détails"
                              disabled={isUpdating}
                            >
                              <FaEdit size={12} />
                            </motion.button>
                            
                            {reservation.is_draft ? (
                              <motion.button
                                className="btn btn-sm btn-outline-success"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleConvertDraft(reservation.id)}
                                title="Convertir en réservation"
                                disabled={isUpdating}
                              >
                                <FaCalendarCheck size={12} />
                              </motion.button>
                            ) : (
                              <>
                                {reservation.statut === 'en_attente' && (
                                  <motion.button
                                    className="btn btn-sm btn-outline-success"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleStatusChange(reservation.id, 'confirmee')}
                                    title="Confirmer"
                                    disabled={isUpdating}
                                  >
                                    <FaCheck size={12} />
                                  </motion.button>
                                )}
                                
                                {['en_attente', 'confirmee'].includes(reservation.statut) && (
                                  <motion.button
                                    className="btn btn-sm btn-outline-warning"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleStatusChange(reservation.id, 'absent')}
                                    title="Marquer comme absent (no-show)"
                                    disabled={isUpdating}
                                  >
                                    <FaBan size={12} />
                                  </motion.button>
                                )}
                                
                                {['en_attente', 'confirmee'].includes(reservation.statut) && !needsConfirmation && (
                                  <motion.button
                                    className="btn btn-sm btn-outline-danger"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleStatusChange(reservation.id, 'annulee')}
                                    title="Annuler"
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
                                  onClick={() => handleStatusChange(reservation.id, 'terminee')}
                                  title="Marquer comme terminée"
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
                              title="Appeler"
                            >
                              <FaPhone size={12} />
                            </motion.button>
                            
                            <motion.button
                              className="btn btn-sm btn-secondary"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(reservation.id)}
                              title="Supprimer"
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
      {showModal && selectedReservation && (
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
                  Détails de la réservation #{selectedReservation.id}
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
                    <h6 className="fw-bold text-primary mb-3">Informations client</h6>
                    <div className="mb-2">
                      <strong>Nom:</strong> {selectedReservation.client?.prenom} {selectedReservation.client?.nom}
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {selectedReservation.client?.email}
                    </div>
                    <div className="mb-3">
                      <strong>Téléphone:</strong> {selectedReservation.client?.telephone}
                    </div>
                    
                    <h6 className="fw-bold text-primary mb-3">Services</h6>
                    {selectedReservation.services && selectedReservation.services.length > 1 ? (
                      // Multiple services
                      <div className="mb-3">
                        <div className="fw-semibold text-primary mb-2">
                          {selectedReservation.services.length} services réservés
                        </div>
                        {selectedReservation.services.map((service, idx) => (
                          <div key={idx} className="border-start border-primary border-3 ps-3 mb-2">
                            <div className="mb-1">
                              <strong>{service?.nom || 'Service inconnu'}</strong>
                            </div>
                            <div className="small text-muted">
                              Durée: {service?.duree || 0} minutes • Prix: {service?.prix || 0}DT
                            </div>
                          </div>
                        ))}
                        <div className="mt-3 pt-2 border-top">
                          <strong>Prix total: {selectedReservation.services?.reduce((total, service) => total + (service?.prix || 0), 0) || 0}DT</strong>
                        </div>
                      </div>
                    ) : (
                      // Single service
                      <div className="mb-3">
                        <div className="mb-2">
                          <strong>Service:</strong> {selectedReservation.service?.nom || 'Service inconnu'}
                        </div>
                        <div className="mb-3">
                          <strong>Prix:</strong> {selectedReservation.service?.prix || 0}DT
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary mb-3">Rendez-vous</h6>
                    <div className="mb-2">
                      <strong>Date:</strong> {selectedReservation.date_reservation ? new Date(selectedReservation.date_reservation).toLocaleDateString('fr-FR') : 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>Heure:</strong> {selectedReservation.heure_reservation}
                    </div>
                    <div className="mb-2">
                      <strong>Statut:</strong> {getStatusBadge(selectedReservation.statut)}
                    </div>
                    <div className="mb-3">
                      <strong>Réservé le:</strong> {selectedReservation.created_at ? new Date(selectedReservation.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                    </div>
                    
                    {selectedReservation.notes && (
                      <>
                        <h6 className="fw-bold text-primary mb-3">Notes client</h6>
                        <div className="bg-light p-3 rounded mb-3">
                          {selectedReservation.notes}
                        </div>
                      </>
                    )}
                    
                    {selectedReservation.notes_admin && (
                      <>
                        <h6 className="fw-bold text-warning mb-3">Notes administrateur</h6>
                        <div className="bg-warning bg-opacity-10 p-3 rounded">
                          {selectedReservation.notes_admin}
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
                    Appeler
                  </button>
                  <button className="btn btn-secondary">
                    <FaEnvelope className="me-2" />
                    Email
                  </button>
                  <button 
                    className="btn btn-outline-warning"
                    onClick={() => {
                      setShowModal(false);
                      openEditModal(selectedReservation);
                    }}
                  >
                    <FaEdit className="me-2" />
                    Modifier
                  </button>
                  <button
                    className="btn btn-secondary ms-auto"
                    onClick={() => setShowModal(false)}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedReservation && (
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
                  Modifier la réservation #{selectedReservation.id}
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
                        Statut de la réservation
                      </h6>
                      
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Statut actuel</label>
                        <div className="mb-2">
                          {getStatusBadge(selectedReservation.statut)}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Nouveau statut</label>
                        <select
                          className="form-select"
                          value={editFormData.statut}
                          onChange={(e) => handleInputChange('statut', e.target.value)}
                          required
                        >
                          <option value="draft">Brouillon</option>
                          <option value="en_attente">En attente</option>
                          <option value="confirmee">Confirmée</option>
                          <option value="en_cours">En cours</option>
                          <option value="terminee">Terminée</option>
                          <option value="annulee">Annulée</option>
                          <option value="absent">Absent (No-show)</option>
                        </select>
                        <div className="form-text">
                          Sélectionnez le nouveau statut pour cette réservation
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Notes administrateur</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={editFormData.notes_admin}
                          onChange={(e) => handleInputChange('notes_admin', e.target.value)}
                          placeholder="Ajoutez des notes sur cette modification..."
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Services</label>
                        <div className="border rounded p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          {services.map(service => (
                            <div key={service.id} className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`edit-service-${service.id}`}
                                value={service.id}
                                checked={editFormData.service_ids.includes(service.id)}
                                onChange={(e) => {
                                  const serviceId = parseInt(e.target.value);
                                  const currentServices = [...editFormData.service_ids];
                                  if (e.target.checked) {
                                    currentServices.push(serviceId);
                                  } else {
                                    const index = currentServices.indexOf(serviceId);
                                    if (index > -1) {
                                      currentServices.splice(index, 1);
                                    }
                                  }
                                  handleInputChange('service_ids', currentServices);
                                }}
                              />
                              <label className="form-check-label" htmlFor={`edit-service-${service.id}`}>
                                <strong>{service.nom}</strong> - {service.prix}DT ({service.duree}min)
                              </label>
                            </div>
                          ))}
                        </div>
                        {editFormData.service_ids.length > 0 && (
                          <div className="form-text">
                            {editFormData.service_ids.length} service(s) sélectionné(s) -
                            Total: {services
                              .filter(service => editFormData.service_ids.includes(service.id))
                              .reduce((total, service) => total + (parseFloat(service.prix) || 0), 0)
                              .toFixed(2)}DT
                          </div>
                        )}
                        <div className="form-text">
                          Modifier les services associés à cette réservation
                        </div>
                      </div>
                    </div>

                    {/* Client Details Section */}
                    <div className="col-md-6">
                      <h6 className="fw-bold text-primary mb-3">
                        <FaUser className="me-2" />
                        Détails du client
                      </h6>
                      
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Prénom</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editFormData.client_prenom}
                          onChange={(e) => handleInputChange('client_prenom', e.target.value)}
                          placeholder="Prénom du client"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Nom</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editFormData.client_nom}
                          onChange={(e) => handleInputChange('client_nom', e.target.value)}
                          placeholder="Nom du client"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Téléphone</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={editFormData.client_telephone}
                          onChange={(e) => handleInputChange('client_telephone', e.target.value)}
                          placeholder="Numéro de téléphone"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={editFormData.client_email}
                          onChange={(e) => handleInputChange('client_email', e.target.value)}
                          placeholder="Adresse email"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Info (Read-only) */}
                  <div className="row mt-4">
                    <div className="col-12">
                      <h6 className="fw-bold text-primary mb-3">Informations de la réservation</h6>
                      <div className="bg-light p-3 rounded">
                        <div className="row">
                          <div className="col-md-4">
                            <strong>Service:</strong> {selectedReservation.service.nom}
                          </div>
                          <div className="col-md-4">
                            <strong>Date:</strong> {new Date(selectedReservation.date_reservation).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="col-md-4">
                            <strong>Heure:</strong> {selectedReservation.heure_reservation}
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
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary d-flex align-items-center gap-2"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <div className="spinner-border spinner-border-sm" role="status" />
                          Mise à jour...
                        </>
                      ) : (
                        <>
                          <FaSave />
                          Sauvegarder les modifications
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

      {/* Add Reservation Modal */}
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
                  Nouvelle Réservation
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                  disabled={isCreatingNew}
                />
              </div>
              
              <form onSubmit={handleAddReservationSubmit}>
                <div className="modal-body">
                  <div className="row">
                    {/* Client Selection */}
                    <div className="col-12 mb-4">
                      <h6 className="fw-bold text-primary mb-3">
                        <FaUser className="me-2" />
                        Client
                      </h6>
                      
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Client existant (optionnel)</label>
                        <select
                          className="form-select"
                          value={newReservationData.client_id}
                          onChange={(e) => handleNewReservationChange('client_id', e.target.value)}
                        >
                          <option value="">Nouveau client</option>
                          {clients.map(client => (
                            <option key={client.id} value={client.id}>
                              {client.prenom} {client.nom} - {client.telephone}
                            </option>
                          ))}
                        </select>
                        <div className="form-text">
                          Sélectionnez un client existant ou laissez vide pour créer un nouveau
                        </div>
                      </div>

                      {!newReservationData.client_id && (
                        <>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label fw-semibold">Prénom *</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newReservationData.client_prenom}
                                onChange={(e) => handleNewReservationChange('client_prenom', e.target.value)}
                                placeholder="Prénom du client"
                                required
                              />
                            </div>
                            
                            <div className="col-md-6 mb-3">
                              <label className="form-label fw-semibold">Nom *</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newReservationData.client_nom}
                                onChange={(e) => handleNewReservationChange('client_nom', e.target.value)}
                                placeholder="Nom du client"
                                required
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label fw-semibold">Téléphone *</label>
                              <input
                                type="tel"
                                className="form-control"
                                value={newReservationData.client_telephone}
                                onChange={(e) => handleNewReservationChange('client_telephone', e.target.value)}
                                placeholder="Numéro de téléphone"
                                required
                              />
                            </div>
                            
                            <div className="col-md-6 mb-3">
                              <label className="form-label fw-semibold">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                value={newReservationData.client_email}
                                onChange={(e) => handleNewReservationChange('client_email', e.target.value)}
                                placeholder="Adresse email"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Reservation Details */}
                    <div className="col-12">
                      <h6 className="fw-bold text-primary mb-3">
                        <FaCalendarAlt className="me-2" />
                        Détails de la réservation
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
                                  checked={newReservationData.service_ids.includes(service.id)}
                                  onChange={(e) => {
                                    const serviceId = parseInt(e.target.value);
                                    const currentServices = [...newReservationData.service_ids];
                                    if (e.target.checked) {
                                      currentServices.push(serviceId);
                                    } else {
                                      const index = currentServices.indexOf(serviceId);
                                      if (index > -1) {
                                        currentServices.splice(index, 1);
                                      }
                                    }
                                    handleNewReservationChange('service_ids', currentServices);
                                  }}
                                />
                                <label className="form-check-label" htmlFor={`service-${service.id}`}>
                                  <strong>{service.nom}</strong> - {service.prix}DT ({service.duree}min)
                                </label>
                              </div>
                            ))}
                          </div>
                          {newReservationData.service_ids.length > 0 && (
                            <div className="form-text">
                              {newReservationData.service_ids.length} service(s) sélectionné(s) - 
                              Total: {services
                                .filter(service => newReservationData.service_ids.includes(service.id))
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
                            value={newReservationData.date_reservation}
                            onChange={(e) => handleNewReservationChange('date_reservation', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold">Heure *</label>
                          <input
                            type="time"
                            className="form-control"
                            value={newReservationData.heure_debut}
                            onChange={(e) => handleNewReservationChange('heure_debut', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label fw-semibold">Statut</label>
                          <select
                            className="form-select"
                            value={newReservationData.statut}
                            onChange={(e) => handleNewReservationChange('statut', e.target.value)}
                          >
                            <option value="en_attente">En attente</option>
                            <option value="confirmee">Confirmée</option>
                            <option value="en_cours">En cours</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Notes</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={newReservationData.notes_client}
                          onChange={(e) => handleNewReservationChange('notes_client', e.target.value)}
                          placeholder="Ajoutez des notes..."
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
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary d-flex align-items-center gap-2"
                      disabled={isCreatingNew}
                    >
                      {isCreatingNew ? (
                        <>
                          <div className="spinner-border spinner-border-sm" role="status" />
                          Création...
                        </>
                      ) : (
                        <>
                          <FaSave />
                          Créer la réservation
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

export default AdminReservations;
