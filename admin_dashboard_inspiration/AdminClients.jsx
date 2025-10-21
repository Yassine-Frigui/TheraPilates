import React, { useState, useEffect } from 'react';
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
  FaStar,
  FaHeart,
  FaGift
} from 'react-icons/fa';
import { adminAPI } from '../../services/api';

const AdminClients = () => {
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
      const response = await adminAPI.getClients();
      setClients(response.data.clients || []);
    } catch (error) {
      console.error('Erreur lors du chargement des clients:', error);
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
      'actif': { bg: 'success', text: 'Actif', icon: <FaHeart size={12} /> },
      'inactif': { bg: 'secondary', text: 'Inactif', icon: null }
    };
    
    const config = statusConfig[statut] || { bg: 'secondary', text: 'Inconnu', icon: null };
    return (
      <span className={`badge bg-${config.bg} d-flex align-items-center gap-1`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const calculateAge = (dateNaissance) => {
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
      await adminAPI.createClient(newClientData);
      
      // Refresh clients
      await fetchClients();
      
      // Close modal and show success
      setShowAddModal(false);
      alert('Client créé avec succès !');
      
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création du client: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    if (!selectedClient) return;
    
    try {
      setIsUpdating(true);
      await adminAPI.updateClient(selectedClient.id, editClientData);
      
      // Refresh clients
      await fetchClients();
      
      // Close modal and show success
      setShowEditModal(false);
      alert('Client mis à jour avec succès !');
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour du client: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (clientId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        await adminAPI.deleteClient(clientId);
        await fetchClients();
        alert('Client supprimé avec succès !');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du client');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-pink-500 mb-3" style={{ width: '3rem', height: '3rem' }} />
          <p className="text-muted">Chargement des clients...</p>
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
              Gestion des Clients
            </h1>
            <p className="text-muted mb-0">
              {clients.length} clients enregistrés
            </p>
          </div>
          <div className="col-auto">
            <motion.button
              className="btn btn-pink"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
            >
              <FaPlus className="me-2" />
              Nouveau client
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
              <p className="text-muted mb-0">Clients actifs</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <FaGift className="text-secondary mb-2" size={32} />
              <h4 className="fw-bold">{clients.filter(c => c.statut === 'inactif').length}</h4>
              <p className="text-muted mb-0">Clients inactifs</p>
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
              <p className="text-muted mb-0">Panier moyen</p>
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
                    placeholder="Rechercher par nom, email ou téléphone..."
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
                  <option value="">Tous les statuts</option>
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
              </div>
              <div className="col-md-3">
                <span className="badge bg-light text-dark fs-6 w-100 py-2">
                  {filteredClients.length} résultat(s)
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
                    <th className="border-0 py-3">Statut</th>
                    <th className="border-0 py-3">Visites</th>
                    <th className="border-0 py-3">Total dépensé</th>
                    <th className="border-0 py-3">Dernière visite</th>
                    <th className="border-0 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted">
                        <FaUsers className="mb-3" size={48} />
                        <p className="mb-0">Aucun client trouvé</p>
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
                            <div className="client-avatar bg-pink-100 rounded-circle d-flex align-items-center justify-content-center me-3"
                                 style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                              <span className="text-pink-600 fw-bold">
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
                                {calculateAge(client.date_naissance)} ans
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
                          <div className="small text-muted">visites</div>
                        </td>
                        <td className="py-3">
                          <span className="fw-bold text-success">{client.total_depense}DT</span>
                        </td>
                        <td className="py-3">
                          <span className="small">
                            {new Date(client.derniere_visite).toLocaleDateString('fr-FR')}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="d-flex gap-1">
                            <motion.button
                              className="btn btn-sm btn-outline-primary"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openModal(client)}
                              title="Voir détails"
                            >
                              <FaEye size={12} />
                            </motion.button>
                            <motion.button
                              className="btn btn-sm btn-outline-success"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Appeler"
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
                              title="Modifier"
                            >
                              <FaEdit size={12} />
                            </motion.button>
                            <motion.button
                              className="btn btn-sm btn-outline-danger"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(client.id)}
                              title="Supprimer"
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
                  Profil de {selectedClient.prenom} {selectedClient.nom}
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
                    <h6 className="fw-bold text-primary mb-3">Informations personnelles</h6>
                    <div className="mb-2">
                      <strong>Nom complet:</strong> {selectedClient.prenom} {selectedClient.nom}
                    </div>
                    <div className="mb-2">
                      <strong>Âge:</strong> {calculateAge(selectedClient.date_naissance)} ans
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {selectedClient.email}
                    </div>
                    <div className="mb-3">
                      <strong>Téléphone:</strong> {selectedClient.telephone}
                    </div>
                    
                    <h6 className="fw-bold text-primary mb-3">Statut</h6>
                    {getStatutBadge(selectedClient.statut)}
                  </div>
                  
                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary mb-3">Historique</h6>
                    <div className="mb-2">
                      <strong>Client depuis:</strong> {new Date(selectedClient.created_at).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="mb-2">
                      <strong>Nombre de visites:</strong> {selectedClient.nombre_visites}
                    </div>
                    <div className="mb-2">
                      <strong>Total dépensé:</strong> <span className="text-success fw-bold">{selectedClient.total_depense}DT</span>
                    </div>
                    <div className="mb-3">
                      <strong>Dernière visite:</strong> {new Date(selectedClient.derniere_visite).toLocaleDateString('fr-FR')}
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
                    Appeler
                  </button>
                  <button className="btn btn-outline-primary">
                    <FaEnvelope className="me-2" />
                    Email
                  </button>
                  <button className="btn btn-outline-warning">
                    <FaCalendarAlt className="me-2" />
                    Réserver
                  </button>
                  <button className="btn btn-outline-secondary">
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
                  Nouveau Client
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
                      <label className="form-label fw-semibold">Prénom *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newClientData.prenom}
                        onChange={(e) => handleNewClientChange('prenom', e.target.value)}
                        placeholder="Prénom du client"
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Nom *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newClientData.nom}
                        onChange={(e) => handleNewClientChange('nom', e.target.value)}
                        placeholder="Nom du client"
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
                      <label className="form-label fw-semibold">Téléphone *</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={newClientData.telephone}
                        onChange={(e) => handleNewClientChange('telephone', e.target.value)}
                        placeholder="Numéro de téléphone"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Date de naissance</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newClientData.date_naissance}
                        onChange={(e) => handleNewClientChange('date_naissance', e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Statut</label>
                      <select
                        className="form-select"
                        value={newClientData.statut}
                        onChange={(e) => handleNewClientChange('statut', e.target.value)}
                      >
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={newClientData.notes}
                        onChange={(e) => handleNewClientChange('notes', e.target.value)}
                        placeholder="Notes sur le client..."
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
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status" />
                        Création...
                      </>
                    ) : (
                      <>
                        <FaPlus className="me-2" />
                        Créer le client
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
                  Modifier {selectedClient.prenom} {selectedClient.nom}
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
                      <label className="form-label fw-semibold">Prénom *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editClientData.prenom}
                        onChange={(e) => handleEditClientChange('prenom', e.target.value)}
                        placeholder="Prénom du client"
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Nom *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editClientData.nom}
                        onChange={(e) => handleEditClientChange('nom', e.target.value)}
                        placeholder="Nom du client"
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
                      <label className="form-label fw-semibold">Téléphone *</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={editClientData.telephone}
                        onChange={(e) => handleEditClientChange('telephone', e.target.value)}
                        placeholder="Numéro de téléphone"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Date de naissance</label>
                      <input
                        type="date"
                        className="form-control"
                        value={editClientData.date_naissance}
                        onChange={(e) => handleEditClientChange('date_naissance', e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Statut</label>
                      <select
                        className="form-select"
                        value={editClientData.statut}
                        onChange={(e) => handleEditClientChange('statut', e.target.value)}
                      >
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={editClientData.notes}
                        onChange={(e) => handleEditClientChange('notes', e.target.value)}
                        placeholder="Notes sur le client..."
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
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status" />
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <FaEdit className="me-2" />
                        Mettre à jour
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

export default AdminClients;
