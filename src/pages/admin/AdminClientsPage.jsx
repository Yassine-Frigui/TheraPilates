import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaHeart,
  FaGift
} from 'react-icons/fa';

const AdminClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newClientData, setNewClientData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    date_naissance: '',
    notes: '',
    statut: 'actif'
  });
  const [editClientData, setEditClientData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    date_naissance: '',
    notes: '',
    statut: 'actif'
  });

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    filterClients();
  }, [clients, searchTerm, statusFilter]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const savedClients = localStorage.getItem("therapilates_clients");
      if (savedClients) {
        const clientsData = JSON.parse(savedClients);
        // Transform data to match frontend expectations
        const transformedClients = clientsData.map(client => ({
          id: client.id,
          prenom: client.prenom || '',
          nom: client.nom || '',
          email: client.email || '',
          telephone: client.telephone || '',
          date_naissance: client.date_naissance || '',
          notes: client.notes || '',
          statut: client.statut || 'actif',
          nombre_visites: client.nombre_visites || 0,
          total_depense: client.total_depense || 0,
          derniere_visite: client.derniere_visite || new Date().toISOString(),
          created_at: client.created_at || new Date().toISOString()
        }));
        setClients(transformedClients);
      } else {
        // Sample data
        const sampleClients = [
          {
            id: 1,
            prenom: 'Marie',
            nom: 'Dupont',
            email: 'marie.dupont@email.com',
            telephone: '+216 71 123 456',
            date_naissance: '1990-05-15',
            notes: 'Regular client, prefers morning sessions',
            statut: 'actif',
            nombre_visites: 12,
            total_depense: 720,
            derniere_visite: '2025-10-20T10:00:00Z',
            created_at: '2025-01-15T09:00:00Z'
          },
          {
            id: 2,
            prenom: 'Ahmed',
            nom: 'Ben Ali',
            email: 'ahmed.benali@email.com',
            telephone: '+216 72 987 654',
            date_naissance: '1985-08-22',
            notes: 'Sports rehabilitation focus',
            statut: 'actif',
            nombre_visites: 8,
            total_depense: 480,
            derniere_visite: '2025-10-18T14:30:00Z',
            created_at: '2025-02-10T11:00:00Z'
          }
        ];
        localStorage.setItem("therapilates_clients", JSON.stringify(sampleClients));
        setClients(sampleClients);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const filterClients = () => {
    let filtered = [...clients];

    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.telephone.includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(client => client.statut === statusFilter);
    }

    setFilteredClients(filtered);
  };

  const getStatutBadge = (statut) => {
    const statusConfig = {
      'actif': { bg: 'success', text: 'Active', icon: <FaHeart size={12} /> },
      'inactif': { bg: 'secondary', text: 'Inactive', icon: null }
    };

    const config = statusConfig[statut] || { bg: 'secondary', text: 'Unknown', icon: null };
    return (
      <span className={`badge bg-${config.bg} d-flex align-items-center gap-1`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const calculateAge = (dateNaissance) => {
    if (!dateNaissance) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const openModal = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const openAddModal = () => {
    setNewClientData({
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      date_naissance: '',
      notes: '',
      statut: 'actif'
    });
    setShowAddModal(true);
  };

  const openEditModal = (client) => {
    setSelectedClient(client);
    setEditClientData({
      prenom: client.prenom || '',
      nom: client.nom || '',
      email: client.email || '',
      telephone: client.telephone || '',
      date_naissance: client.date_naissance || '',
      notes: client.notes || '',
      statut: client.statut || 'actif'
    });
    setShowEditModal(true);
  };

  const handleNewClientChange = (field, value) => {
    setNewClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditClientChange = (field, value) => {
    setEditClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();

    try {
      setIsCreating(true);

      const newClient = {
        ...newClientData,
        id: Date.now(),
        nombre_visites: 0,
        total_depense: 0,
        derniere_visite: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      // Save to localStorage
      const savedClients = localStorage.getItem("therapilates_clients");
      const clients = savedClients ? JSON.parse(savedClients) : [];
      clients.push(newClient);
      localStorage.setItem("therapilates_clients", JSON.stringify(clients));

      // Refresh clients
      await fetchClients();

      // Close modal and show success
      setShowAddModal(false);
      alert('Client created successfully!');

    } catch (error) {
      console.error('Error creating client:', error);
      alert('Error creating client: ' + (error.message || error));
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    if (!selectedClient) return;

    try {
      setIsUpdating(true);

      // Update localStorage
      const savedClients = localStorage.getItem("therapilates_clients");
      if (savedClients) {
        const clients = JSON.parse(savedClients);
        const updatedClients = clients.map(client =>
          client.id === selectedClient.id
            ? { ...client, ...editClientData, updated_at: new Date().toISOString() }
            : client
        );
        localStorage.setItem("therapilates_clients", JSON.stringify(updatedClients));
      }

      // Refresh clients
      await fetchClients();

      // Close modal and show success
      setShowEditModal(false);
      alert('Client updated successfully!');

    } catch (error) {
      console.error('Error updating client:', error);
      alert('Error updating client: ' + (error.message || error));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const savedClients = localStorage.getItem("therapilates_clients");
        if (savedClients) {
          const clients = JSON.parse(savedClients);
          const updatedClients = clients.filter(client => client.id !== clientId);
          localStorage.setItem("therapilates_clients", JSON.stringify(updatedClients));
          await fetchClients();
        }
        alert('Client deleted successfully!');
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error deleting client');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} />
          <p className="text-muted">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-clients">
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
              <FaUsers className="text-primary me-2" />
              Client Management
            </h1>
            <p className="text-muted mb-0">
              {clients.length} clients registered
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
              New Client
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
              <FaUsers className="text-primary mb-2" size={32} />
              <h4 className="fw-bold">{clients.length}</h4>
              <p className="text-muted mb-0">Total clients</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <FaHeart className="text-success mb-2" size={32} />
              <h4 className="fw-bold">{clients.filter(c => c.statut === 'actif').length}</h4>
              <p className="text-muted mb-0">Active clients</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <FaGift className="text-secondary mb-2" size={32} />
              <h4 className="fw-bold">{clients.filter(c => c.statut === 'inactif').length}</h4>
              <p className="text-muted mb-0">Inactive clients</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <FaHeart className="text-success mb-2" size={32} />
              <h4 className="fw-bold">
                {(() => {
                  const clientsWithVisits = clients.filter(c => c.nombre_visites > 0);
                  const totalSpent = clients.reduce((sum, c) => sum + (parseFloat(c.total_depense) || 0), 0);
                  const avgBasket = clientsWithVisits.length > 0 ? Math.round(totalSpent / clientsWithVisits.length) : 0;
                  return avgBasket;
                })()}DT
              </h4>
              <p className="text-muted mb-0">Average basket</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search */}
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
                    placeholder="Search by name, email or phone..."
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
                  <option value="">All statuses</option>
                  <option value="actif">Active</option>
                  <option value="inactif">Inactive</option>
                </select>
              </div>
              <div className="col-md-3">
                <span className="badge bg-light text-dark fs-6 w-100 py-2">
                  {filteredClients.length} result(s)
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Clients Table */}
      <motion.div
        className="clients-table"
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
                    <th className="border-0 py-3">Contact</th>
                    <th className="border-0 py-3">Status</th>
                    <th className="border-0 py-3">Visits</th>
                    <th className="border-0 py-3">Total Spent</th>
                    <th className="border-0 py-3">Last Visit</th>
                    <th className="border-0 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted">
                        <FaUsers className="mb-3" size={48} />
                        <p className="mb-0">No clients found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client, index) => (
                      <motion.tr
                        key={client.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                        className="border-bottom"
                      >
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center">
                            <div className="client-avatar bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                 style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                              <span className="text-primary fw-bold">
                                {client.prenom.charAt(0)}{client.nom.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <strong className="text-dark">
                                  {client.prenom} {client.nom}
                                </strong>
                                <motion.button
                                  className="btn btn-outline-primary"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => openModal(client)}
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
                                {calculateAge(client.date_naissance)} years old
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            <div className="small mb-1">{client.email}</div>
                            <div className="small text-muted">{client.telephone}</div>
                          </div>
                        </td>
                        <td className="py-3">
                          {getStatutBadge(client.statut)}
                        </td>
                        <td className="py-3">
                          <span className="fw-bold">{client.nombre_visites}</span>
                          <div className="small text-muted">visits</div>
                        </td>
                        <td className="py-3">
                          <span className="fw-bold text-success">{client.total_depense}DT</span>
                        </td>
                        <td className="py-3">
                          <span className="small">
                            {client.derniere_visite ? new Date(client.derniere_visite).toLocaleDateString() : 'Never'}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="d-flex gap-1">
                            <motion.button
                              className="btn btn-sm btn-outline-primary"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openModal(client)}
                              title="View details"
                            >
                              <FaEye size={12} />
                            </motion.button>
                            <motion.button
                              className="btn btn-sm btn-outline-success"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Call"
                            >
                              <FaPhone size={12} />
                            </motion.button>
                            <motion.button
                              className="btn btn-sm btn-outline-info"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Email"
                            >
                              <FaEnvelope size={12} />
                            </motion.button>
                            <motion.button
                              className="btn btn-sm btn-outline-warning"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openEditModal(client)}
                              title="Edit"
                            >
                              <FaEdit size={12} />
                            </motion.button>
                            <motion.button
                              className="btn btn-sm btn-outline-danger"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(client.id)}
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

      {/* Modal de détails client */}
      {showModal && selectedClient && (
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
                  <FaUsers className="text-primary me-2" />
                  Profile of {selectedClient.prenom} {selectedClient.nom}
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
                    <h6 className="fw-bold text-primary mb-3">Personal Information</h6>
                    <div className="mb-2">
                      <strong>Full Name:</strong> {selectedClient.prenom} {selectedClient.nom}
                    </div>
                    <div className="mb-2">
                      <strong>Age:</strong> {calculateAge(selectedClient.date_naissance)} years old
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {selectedClient.email}
                    </div>
                    <div className="mb-3">
                      <strong>Phone:</strong> {selectedClient.telephone}
                    </div>

                    <h6 className="fw-bold text-primary mb-3">Status</h6>
                    {getStatutBadge(selectedClient.statut)}
                  </div>

                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary mb-3">History</h6>
                    <div className="mb-2">
                      <strong>Client since:</strong> {selectedClient.created_at ? new Date(selectedClient.created_at).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>Number of visits:</strong> {selectedClient.nombre_visites}
                    </div>
                    <div className="mb-2">
                      <strong>Total spent:</strong> <span className="text-success fw-bold">{selectedClient.total_depense}DT</span>
                    </div>
                    <div className="mb-3">
                      <strong>Last visit:</strong> {selectedClient.derniere_visite ? new Date(selectedClient.derniere_visite).toLocaleDateString() : 'Never'}
                    </div>

                    {selectedClient.notes && (
                      <>
                        <h6 className="fw-bold text-primary mb-3">Notes</h6>
                        <div className="bg-light p-3 rounded">
                          {selectedClient.notes}
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
                  <button className="btn btn-outline-primary">
                    <FaEnvelope className="me-2" />
                    Email
                  </button>
                  <button className="btn btn-outline-warning">
                    <FaCalendarAlt className="me-2" />
                    Book
                  </button>
                  <button className="btn btn-outline-secondary">
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

      {/* Add Client Modal */}
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
                  New Client
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                  disabled={isCreating}
                />
              </div>

              <form onSubmit={handleCreateClient}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newClientData.prenom}
                        onChange={(e) => handleNewClientChange('prenom', e.target.value)}
                        placeholder="Client first name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Last Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newClientData.nom}
                        onChange={(e) => handleNewClientChange('nom', e.target.value)}
                        placeholder="Client last name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={newClientData.email}
                        onChange={(e) => handleNewClientChange('email', e.target.value)}
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Phone *</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={newClientData.telephone}
                        onChange={(e) => handleNewClientChange('telephone', e.target.value)}
                        placeholder="Phone number"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newClientData.date_naissance}
                        onChange={(e) => handleNewClientChange('date_naissance', e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Status</label>
                      <select
                        className="form-select"
                        value={newClientData.statut}
                        onChange={(e) => handleNewClientChange('statut', e.target.value)}
                      >
                        <option value="actif">Active</option>
                        <option value="inactif">Inactive</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={newClientData.notes}
                        onChange={(e) => handleNewClientChange('notes', e.target.value)}
                        placeholder="Notes about the client..."
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
                        Create Client
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && selectedClient && (
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
                  Edit {selectedClient.prenom} {selectedClient.nom}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                  disabled={isUpdating}
                />
              </div>

              <form onSubmit={handleUpdateClient}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">First Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editClientData.prenom}
                        onChange={(e) => handleEditClientChange('prenom', e.target.value)}
                        placeholder="Client first name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Last Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editClientData.nom}
                        onChange={(e) => handleEditClientChange('nom', e.target.value)}
                        placeholder="Client last name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={editClientData.email}
                        onChange={(e) => handleEditClientChange('email', e.target.value)}
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Phone *</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={editClientData.telephone}
                        onChange={(e) => handleEditClientChange('telephone', e.target.value)}
                        placeholder="Phone number"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        value={editClientData.date_naissance}
                        onChange={(e) => handleEditClientChange('date_naissance', e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Status</label>
                      <select
                        className="form-select"
                        value={editClientData.statut}
                        onChange={(e) => handleEditClientChange('statut', e.target.value)}
                      >
                        <option value="actif">Active</option>
                        <option value="inactif">Inactive</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={editClientData.notes}
                        onChange={(e) => handleEditClientChange('notes', e.target.value)}
                        placeholder="Notes about the client..."
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
                        Update
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

export default AdminClientsPage;