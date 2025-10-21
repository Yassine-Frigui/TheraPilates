import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaConciergeBell,
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaClock,
  FaUsers,
  FaEuroSign,
  FaTag,
  FaFilter
} from 'react-icons/fa';

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newServiceData, setNewServiceData] = useState({
    nom: '',
    description: '',
    duree: 60,
    prix: '',
    categorie: 'physiotherapie',
    instructeur: '',
    max_participants: 1,
    niveau: 'debutant',
    materiel_requis: '',
    objectifs: '',
    contre_indications: '',
    statut: 'actif'
  });
  const [editServiceData, setEditServiceData] = useState({
    nom: '',
    description: '',
    duree: 60,
    prix: '',
    categorie: 'physiotherapie',
    instructeur: '',
    max_participants: 1,
    niveau: 'debutant',
    materiel_requis: '',
    objectifs: '',
    contre_indications: '',
    statut: 'actif'
  });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, categoryFilter]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const savedServices = localStorage.getItem("therapilates_services");
      if (savedServices) {
        const servicesData = JSON.parse(savedServices);
        // Transform data to match frontend expectations
        const transformedServices = servicesData.map(service => ({
          id: service.id,
          nom: service.nom || service.name || '',
          description: service.description || '',
          duree: service.duree || service.duration || 60,
          prix: service.prix || service.price || '',
          categorie: service.categorie || service.category || 'physiotherapie',
          instructeur: service.instructeur || service.instructor || '',
          max_participants: service.max_participants || service.maxParticipants || 1,
          niveau: service.niveau || 'debutant',
          materiel_requis: service.materiel_requis || '',
          objectifs: service.objectifs || '',
          contre_indications: service.contre_indications || '',
          statut: service.statut || 'actif',
          created_at: service.created_at || new Date().toISOString(),
          updated_at: service.updated_at || new Date().toISOString()
        }));
        setServices(transformedServices);
      } else {
        // Sample data
        const sampleServices = [
          {
            id: 1,
            nom: 'Séance de Physiothérapie Individuelle',
            description: 'Évaluation et traitement physiothérapeutique personnalisé',
            duree: 50,
            prix: '85DT',
            categorie: 'physiotherapie',
            instructeur: 'Dr. Sarah Johnson',
            max_participants: 1,
            niveau: 'tous_niveaux',
            materiel_requis: 'Table de massage, équipements de rééducation',
            objectifs: 'Soulager la douleur, améliorer la mobilité',
            contre_indications: 'Contre-indications médicales spécifiques',
            statut: 'actif',
            created_at: '2025-01-15T09:00:00Z',
            updated_at: '2025-01-15T09:00:00Z'
          },
          {
            id: 2,
            nom: 'Pilates Thérapeutique en Groupe',
            description: 'Cours collectif de Pilates axé sur la rééducation',
            duree: 50,
            prix: '65DT',
            categorie: 'pilates',
            instructeur: 'Emma Wilson',
            max_participants: 8,
            niveau: 'intermediaire',
            materiel_requis: 'Tapis, ballons, bandes élastiques',
            objectifs: 'Renforcer les muscles profonds, améliorer la posture',
            contre_indications: 'Grossesse avancée, certaines pathologies',
            statut: 'actif',
            created_at: '2025-01-20T10:00:00Z',
            updated_at: '2025-01-20T10:00:00Z'
          },
          {
            id: 3,
            nom: 'Pilates Prénatal',
            description: 'Pilates spécialisé pour les femmes enceintes',
            duree: 45,
            prix: '70DT',
            categorie: 'prénatal',
            instructeur: 'Dr. Marie Dupont',
            max_participants: 6,
            niveau: 'debutant',
            materiel_requis: 'Tapis, coussins de soutien',
            objectifs: 'Préparer le corps à l\'accouchement, soulager les douleurs',
            contre_indications: 'Complications de grossesse',
            statut: 'actif',
            created_at: '2025-02-01T11:00:00Z',
            updated_at: '2025-02-01T11:00:00Z'
          }
        ];
        localStorage.setItem("therapilates_services", JSON.stringify(sampleServices));
        setServices(sampleServices);
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = [...services];

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.instructeur.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(service => service.categorie === categoryFilter);
    }

    setFilteredServices(filtered);
  };

  const getCategoryBadge = (categorie) => {
    const categoryConfig = {
      'physiotherapie': { bg: 'primary', text: 'Physiothérapie', icon: <FaUsers size={12} /> },
      'pilates': { bg: 'success', text: 'Pilates', icon: <FaConciergeBell size={12} /> },
      'prénatal': { bg: 'info', text: 'Prénatal', icon: <FaTag size={12} /> },
      'postnatal': { bg: 'warning', text: 'Postnatal', icon: <FaTag size={12} /> },
      'rééducation': { bg: 'danger', text: 'Rééducation', icon: <FaUsers size={12} /> }
    };

    const config = categoryConfig[categorie] || { bg: 'secondary', text: categorie, icon: null };
    return (
      <span className={`badge bg-${config.bg} d-flex align-items-center gap-1`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getNiveauBadge = (niveau) => {
    const niveauConfig = {
      'debutant': { bg: 'success', text: 'Débutant' },
      'intermediaire': { bg: 'warning', text: 'Intermédiaire' },
      'avance': { bg: 'danger', text: 'Avancé' },
      'tous_niveaux': { bg: 'info', text: 'Tous niveaux' }
    };

    const config = niveauConfig[niveau] || { bg: 'secondary', text: niveau };
    return (
      <span className={`badge bg-${config.bg}`}>
        {config.text}
      </span>
    );
  };

  const getStatutBadge = (statut) => {
    const statusConfig = {
      'actif': { bg: 'success', text: 'Actif' },
      'inactif': { bg: 'secondary', text: 'Inactif' }
    };

    const config = statusConfig[statut] || { bg: 'secondary', text: 'Unknown' };
    return (
      <span className={`badge bg-${config.bg}`}>
        {config.text}
      </span>
    );
  };

  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const openAddModal = () => {
    setNewServiceData({
      nom: '',
      description: '',
      duree: 60,
      prix: '',
      categorie: 'physiotherapie',
      instructeur: '',
      max_participants: 1,
      niveau: 'debutant',
      materiel_requis: '',
      objectifs: '',
      contre_indications: '',
      statut: 'actif'
    });
    setShowAddModal(true);
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setEditServiceData({
      nom: service.nom || '',
      description: service.description || '',
      duree: service.duree || 60,
      prix: service.prix || '',
      categorie: service.categorie || 'physiotherapie',
      instructeur: service.instructeur || '',
      max_participants: service.max_participants || 1,
      niveau: service.niveau || 'debutant',
      materiel_requis: service.materiel_requis || '',
      objectifs: service.objectifs || '',
      contre_indications: service.contre_indications || '',
      statut: service.statut || 'actif'
    });
    setShowEditModal(true);
  };

  const handleNewServiceChange = (field, value) => {
    setNewServiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditServiceChange = (field, value) => {
    setEditServiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateService = async (e) => {
    e.preventDefault();

    try {
      setIsCreating(true);

      const newService = {
        ...newServiceData,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Save to localStorage
      const savedServices = localStorage.getItem("therapilates_services");
      const services = savedServices ? JSON.parse(savedServices) : [];
      services.push(newService);
      localStorage.setItem("therapilates_services", JSON.stringify(services));

      // Refresh services
      await fetchServices();

      // Close modal and show success
      setShowAddModal(false);
      alert('Service created successfully!');

    } catch (error) {
      console.error('Error creating service:', error);
      alert('Error creating service: ' + (error.message || error));
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!selectedService) return;

    try {
      setIsUpdating(true);

      // Update localStorage
      const savedServices = localStorage.getItem("therapilates_services");
      if (savedServices) {
        const services = JSON.parse(savedServices);
        const updatedServices = services.map(service =>
          service.id === selectedService.id
            ? { ...service, ...editServiceData, updated_at: new Date().toISOString() }
            : service
        );
        localStorage.setItem("therapilates_services", JSON.stringify(updatedServices));
      }

      // Refresh services
      await fetchServices();

      // Close modal and show success
      setShowEditModal(false);
      alert('Service updated successfully!');

    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service: ' + (error.message || error));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const savedServices = localStorage.getItem("therapilates_services");
        if (savedServices) {
          const services = JSON.parse(savedServices);
          const updatedServices = services.filter(service => service.id !== serviceId);
          localStorage.setItem("therapilates_services", JSON.stringify(updatedServices));
          await fetchServices();
        }
        alert('Service deleted successfully!');
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Error deleting service');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} />
          <p className="text-muted">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-services">
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
              <FaConciergeBell className="text-primary me-2" />
              Services Management
            </h1>
            <p className="text-muted mb-0">
              {services.length} services available
            </p>
          </div>
          <div className="col-auto">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
            >
              <FaPlus className="me-2" />
              New Service
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="row mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <FaConciergeBell className="text-primary mb-2" size={32} />
              <h4 className="fw-bold">{services.length}</h4>
              <p className="text-muted mb-0">Total services</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <FaUsers className="text-success mb-2" size={32} />
              <h4 className="fw-bold">{services.filter(s => s.categorie === 'physiotherapie').length}</h4>
              <p className="text-muted mb-0">Physiotherapy</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <FaTag className="text-info mb-2" size={32} />
              <h4 className="fw-bold">{services.filter(s => s.categorie === 'pilates').length}</h4>
              <p className="text-muted mb-0">Pilates</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <FaClock className="text-warning mb-2" size={32} />
              <h4 className="fw-bold">
                {services.length > 0 ? Math.round(services.reduce((sum, s) => sum + (s.duree || 0), 0) / services.length) : 0}min
              </h4>
              <p className="text-muted mb-0">Avg duration</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="search-section mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by name, description or instructor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All categories</option>
                  <option value="physiotherapie">Physiotherapy</option>
                  <option value="pilates">Pilates</option>
                  <option value="prénatal">Prénatal</option>
                  <option value="postnatal">Postnatal</option>
                  <option value="rééducation">Rééducation</option>
                </select>
              </div>
              <div className="col-md-3">
                <span className="badge bg-light text-dark fs-6 w-100 py-2">
                  {filteredServices.length} result(s)
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Table */}
      <motion.div
        className="services-table"
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
                    <th className="border-0 px-4 py-3">Service</th>
                    <th className="border-0 py-3">Category</th>
                    <th className="border-0 py-3">Duration</th>
                    <th className="border-0 py-3">Price</th>
                    <th className="border-0 py-3">Instructor</th>
                    <th className="border-0 py-3">Level</th>
                    <th className="border-0 py-3">Status</th>
                    <th className="border-0 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5 text-muted">
                        <FaConciergeBell className="mb-3" size={48} />
                        <p className="mb-0">No services found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((service, index) => (
                      <motion.tr
                        key={service.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                        className="border-bottom"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="fw-bold text-dark mb-1">{service.nom}</div>
                            <div className="small text-muted" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {service.description}
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          {getCategoryBadge(service.categorie)}
                        </td>
                        <td className="py-3">
                          <span className="fw-bold">{service.duree}min</span>
                        </td>
                        <td className="py-3">
                          <span className="fw-bold text-success">{service.prix}</span>
                        </td>
                        <td className="py-3">
                          <span className="small">{service.instructeur}</span>
                        </td>
                        <td className="py-3">
                          {getNiveauBadge(service.niveau)}
                        </td>
                        <td className="py-3">
                          {getStatutBadge(service.statut)}
                        </td>
                        <td className="py-3">
                          <div className="d-flex gap-1">
                            <motion.button
                              className="btn btn-sm btn-outline-primary"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openModal(service)}
                              title="View details"
                            >
                              <FaEye size={12} />
                            </motion.button>
                            <motion.button
                              className="btn btn-sm btn-outline-warning"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openEditModal(service)}
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </motion.button>
                            <motion.button
                              className="btn btn-sm btn-outline-danger"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(service.id)}
                              title="Delete"
                            >
                              <FaTrash size={12} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal de détails service */}
      {showModal && selectedService && (
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
                  <FaConciergeBell className="text-primary me-2" />
                  Service Details: {selectedService.nom}
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
                    <h6 className="fw-bold text-primary mb-3">Basic Information</h6>
                    <div className="mb-2">
                      <strong>Name:</strong> {selectedService.nom}
                    </div>
                    <div className="mb-2">
                      <strong>Category:</strong> {getCategoryBadge(selectedService.categorie)}
                    </div>
                    <div className="mb-2">
                      <strong>Duration:</strong> {selectedService.duree} minutes
                    </div>
                    <div className="mb-2">
                      <strong>Price:</strong> <span className="text-success fw-bold">{selectedService.prix}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Instructor:</strong> {selectedService.instructeur}
                    </div>
                    <div className="mb-2">
                      <strong>Level:</strong> {getNiveauBadge(selectedService.niveau)}
                    </div>
                    <div className="mb-3">
                      <strong>Max Participants:</strong> {selectedService.max_participants}
                    </div>

                    <h6 className="fw-bold text-primary mb-3">Status</h6>
                    {getStatutBadge(selectedService.statut)}
                  </div>

                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary mb-3">Additional Details</h6>
                    <div className="mb-2">
                      <strong>Description:</strong>
                      <div className="mt-1">{selectedService.description}</div>
                    </div>

                    {selectedService.objectifs && (
                      <div className="mb-2">
                        <strong>Objectives:</strong>
                        <div className="mt-1">{selectedService.objectifs}</div>
                      </div>
                    )}

                    {selectedService.materiel_requis && (
                      <div className="mb-2">
                        <strong>Equipment Required:</strong>
                        <div className="mt-1">{selectedService.materiel_requis}</div>
                      </div>
                    )}

                    {selectedService.contre_indications && (
                      <div className="mb-3">
                        <strong>Contraindications:</strong>
                        <div className="mt-1 bg-light p-2 rounded small">{selectedService.contre_indications}</div>
                      </div>
                    )}

                    <div className="mb-2">
                      <strong>Created:</strong> {selectedService.created_at ? new Date(selectedService.created_at).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>Last Updated:</strong> {selectedService.updated_at ? new Date(selectedService.updated_at).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <div className="d-flex gap-2 w-100">
                  <button className="btn btn-outline-warning">
                    <FaEdit className="me-2" />
                    Edit Service
                  </button>
                  <button className="btn btn-outline-danger">
                    <FaTrash className="me-2" />
                    Delete
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

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl">
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  <FaPlus className="text-primary me-2" />
                  New Service
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                  disabled={isCreating}
                />
              </div>

              <form onSubmit={handleCreateService}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Service Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newServiceData.nom}
                        onChange={(e) => handleNewServiceChange('nom', e.target.value)}
                        placeholder="Service name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Category *</label>
                      <select
                        className="form-select"
                        value={newServiceData.categorie}
                        onChange={(e) => handleNewServiceChange('categorie', e.target.value)}
                        required
                      >
                        <option value="physiotherapie">Physiotherapy</option>
                        <option value="pilates">Pilates</option>
                        <option value="prénatal">Prénatal</option>
                        <option value="postnatal">Postnatal</option>
                        <option value="rééducation">Rééducation</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Duration (minutes) *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newServiceData.duree}
                        onChange={(e) => handleNewServiceChange('duree', parseInt(e.target.value))}
                        min="15"
                        max="180"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Price *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newServiceData.prix}
                        onChange={(e) => handleNewServiceChange('prix', e.target.value)}
                        placeholder="e.g., 85DT"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Instructor *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newServiceData.instructeur}
                        onChange={(e) => handleNewServiceChange('instructeur', e.target.value)}
                        placeholder="Instructor name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Max Participants *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newServiceData.max_participants}
                        onChange={(e) => handleNewServiceChange('max_participants', parseInt(e.target.value))}
                        min="1"
                        max="50"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Level</label>
                      <select
                        className="form-select"
                        value={newServiceData.niveau}
                        onChange={(e) => handleNewServiceChange('niveau', e.target.value)}
                      >
                        <option value="debutant">Débutant</option>
                        <option value="intermediaire">Intermédiaire</option>
                        <option value="avance">Avancé</option>
                        <option value="tous_niveaux">Tous niveaux</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Status</label>
                      <select
                        className="form-select"
                        value={newServiceData.statut}
                        onChange={(e) => handleNewServiceChange('statut', e.target.value)}
                      >
                        <option value="actif">Active</option>
                        <option value="inactif">Inactive</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Description *</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={newServiceData.description}
                        onChange={(e) => handleNewServiceChange('description', e.target.value)}
                        placeholder="Service description..."
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Objectives</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={newServiceData.objectifs}
                        onChange={(e) => handleNewServiceChange('objectifs', e.target.value)}
                        placeholder="Service objectives..."
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Required Equipment</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={newServiceData.materiel_requis}
                        onChange={(e) => handleNewServiceChange('materiel_requis', e.target.value)}
                        placeholder="Equipment needed..."
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Contraindications</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={newServiceData.contre_indications}
                        onChange={(e) => handleNewServiceChange('contre_indications', e.target.value)}
                        placeholder="Medical contraindications..."
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddModal(false)}
                    disabled={isCreating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <FaPlus className="me-2" />
                        Create Service
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && selectedService && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl">
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  <FaEdit className="text-warning me-2" />
                  Edit Service: {selectedService.nom}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                  disabled={isUpdating}
                />
              </div>

              <form onSubmit={handleUpdateService}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Service Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editServiceData.nom}
                        onChange={(e) => handleEditServiceChange('nom', e.target.value)}
                        placeholder="Service name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Category *</label>
                      <select
                        className="form-select"
                        value={editServiceData.categorie}
                        onChange={(e) => handleEditServiceChange('categorie', e.target.value)}
                        required
                      >
                        <option value="physiotherapie">Physiotherapy</option>
                        <option value="pilates">Pilates</option>
                        <option value="prénatal">Prénatal</option>
                        <option value="postnatal">Postnatal</option>
                        <option value="rééducation">Rééducation</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Duration (minutes) *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={editServiceData.duree}
                        onChange={(e) => handleEditServiceChange('duree', parseInt(e.target.value))}
                        min="15"
                        max="180"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Price *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editServiceData.prix}
                        onChange={(e) => handleEditServiceChange('prix', e.target.value)}
                        placeholder="e.g., 85DT"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Instructor *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editServiceData.instructeur}
                        onChange={(e) => handleEditServiceChange('instructeur', e.target.value)}
                        placeholder="Instructor name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Max Participants *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={editServiceData.max_participants}
                        onChange={(e) => handleEditServiceChange('max_participants', parseInt(e.target.value))}
                        min="1"
                        max="50"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Level</label>
                      <select
                        className="form-select"
                        value={editServiceData.niveau}
                        onChange={(e) => handleEditServiceChange('niveau', e.target.value)}
                      >
                        <option value="debutant">Débutant</option>
                        <option value="intermediaire">Intermédiaire</option>
                        <option value="avance">Avancé</option>
                        <option value="tous_niveaux">Tous niveaux</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Status</label>
                      <select
                        className="form-select"
                        value={editServiceData.statut}
                        onChange={(e) => handleEditServiceChange('statut', e.target.value)}
                      >
                        <option value="actif">Active</option>
                        <option value="inactif">Inactive</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Description *</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={editServiceData.description}
                        onChange={(e) => handleEditServiceChange('description', e.target.value)}
                        placeholder="Service description..."
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Objectives</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={editServiceData.objectifs}
                        onChange={(e) => handleEditServiceChange('objectifs', e.target.value)}
                        placeholder="Service objectives..."
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Required Equipment</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={editServiceData.materiel_requis}
                        onChange={(e) => handleEditServiceChange('materiel_requis', e.target.value)}
                        placeholder="Equipment needed..."
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Contraindications</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={editServiceData.contre_indications}
                        onChange={(e) => handleEditServiceChange('contre_indications', e.target.value)}
                        placeholder="Medical contraindications..."
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0">
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
                    className="btn btn-warning"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaEdit className="me-2" />
                        Update Service
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicesPage;