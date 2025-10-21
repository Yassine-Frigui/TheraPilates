import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaCog,
  FaSave,
  FaBuilding,
  FaBell,
  FaCalendarAlt,
  FaCreditCard,
  FaShieldAlt,
  FaPalette,
  FaGlobe,
  FaClock,
  FaMailBulk,
  FaSms,
  FaUserMd,
  FaMapMarkerAlt
} from 'react-icons/fa';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    // Studio Information
    nom_studio: 'TheraPilates',
    description: 'Centre de physiothérapie et pilates thérapeutique',
    email: 'hello@therapilates.co',
    telephone: '+216 71 123 456',
    adresse: '123 Avenue Habib Bourguiba, Tunis, Tunisia',
    code_postal: '1000',
    ville: 'Tunis',
    pays: 'Tunisie',

    // Working Hours
    horaires_travail: {
      lundi: { ouvert: true, debut: '08:00', fin: '20:00' },
      mardi: { ouvert: true, debut: '08:00', fin: '20:00' },
      mercredi: { ouvert: true, debut: '08:00', fin: '20:00' },
      jeudi: { ouvert: true, debut: '08:00', fin: '20:00' },
      vendredi: { ouvert: true, debut: '08:00', fin: '20:00' },
      samedi: { ouvert: true, debut: '09:00', fin: '18:00' },
      dimanche: { ouvert: false, debut: '09:00', fin: '18:00' }
    },

    // Booking Settings
    max_reservations_jour: 20,
    duree_seance_defaut: 60,
    delai_annulation: 24,
    confirmation_automatique: true,
    attente_validation: false,

    // Notifications
    notifications: {
      email_nouvelle_reservation: true,
      email_annulation: true,
      email_rappel: true,
      sms_rappel: false,
      email_marketing: false
    },

    // Payment Settings
    devise: 'TND',
    tva: 19,
    frais_annulation: 50,

    // Security
    mot_de_passe_min: 8,
    double_authentification: false,
    session_timeout: 30,

    // Appearance
    theme: 'light',
    langue: 'fr',
    fuseau_horaire: 'Africa/Tunis'
  });

  const [activeTab, setActiveTab] = useState('studio');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("therapilates_settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      horaires_travail: {
        ...prev.horaires_travail,
        [day]: {
          ...prev.horaires_travail[day],
          [field]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem("therapilates_settings", JSON.stringify(settings));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'studio', label: 'Studio', icon: <FaBuilding size={16} /> },
    { id: 'horaires', label: 'Horaires', icon: <FaClock size={16} /> },
    { id: 'reservations', label: 'Réservations', icon: <FaCalendarAlt size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell size={16} /> },
    { id: 'paiement', label: 'Paiement', icon: <FaCreditCard size={16} /> },
    { id: 'securite', label: 'Sécurité', icon: <FaShieldAlt size={16} /> },
    { id: 'apparence', label: 'Apparence', icon: <FaPalette size={16} /> }
  ];

  const daysOfWeek = [
    { key: 'lundi', label: 'Lundi' },
    { key: 'mardi', label: 'Mardi' },
    { key: 'mercredi', label: 'Mercredi' },
    { key: 'jeudi', label: 'Jeudi' },
    { key: 'vendredi', label: 'Vendredi' },
    { key: 'samedi', label: 'Samedi' },
    { key: 'dimanche', label: 'Dimanche' }
  ];

  return (
    <div className="admin-settings">
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
              <FaCog className="text-primary me-2" />
              Settings
            </h1>
            <p className="text-muted mb-0">
              Configure your studio settings and preferences
            </p>
          </div>
          <div className="col-auto">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="me-2" />
                  Save Settings
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <motion.div
            className="card border-0 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    className={`list-group-item list-group-item-action d-flex align-items-center gap-3 border-0 ${
                      activeTab === tab.id ? 'active bg-primary text-white' : ''
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ backgroundColor: activeTab === tab.id ? '#0d6efd' : '#f8f9fa' }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                  >
                    <span className={activeTab === tab.id ? 'text-white' : 'text-primary'}>
                      {tab.icon}
                    </span>
                    <span className="fw-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="col-md-9">
          <motion.div
            className="card border-0 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="card-body p-4">
              {/* Studio Information */}
              {activeTab === 'studio' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <FaBuilding className="text-primary" size={24} />
                    <h4 className="mb-0 fw-bold">Studio Information</h4>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Studio Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settings.nom_studio}
                        onChange={(e) => handleChange('nom_studio', e.target.value)}
                        placeholder="Studio name"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={settings.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="contact@studio.com"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Phone *</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={settings.telephone}
                        onChange={(e) => handleChange('telephone', e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settings.ville}
                        onChange={(e) => handleChange('ville', e.target.value)}
                        placeholder="City"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settings.code_postal}
                        onChange={(e) => handleChange('code_postal', e.target.value)}
                        placeholder="Postal code"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        value={settings.pays}
                        onChange={(e) => handleChange('pays', e.target.value)}
                        placeholder="Country"
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Address *</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={settings.adresse}
                        onChange={(e) => handleChange('adresse', e.target.value)}
                        placeholder="Full address"
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Description</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={settings.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Studio description..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Working Hours */}
              {activeTab === 'horaires' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <FaClock className="text-primary" size={24} />
                    <h4 className="mb-0 fw-bold">Working Hours</h4>
                  </div>

                  <div className="row">
                    {daysOfWeek.map((day, index) => (
                      <motion.div
                        key={day.key}
                        className="col-12 mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <div className="card border">
                          <div className="card-body py-3">
                            <div className="row align-items-center">
                              <div className="col-md-3">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`ouvert-${day.key}`}
                                    checked={settings.horaires_travail[day.key].ouvert}
                                    onChange={(e) => handleWorkingHoursChange(day.key, 'ouvert', e.target.checked)}
                                  />
                                  <label className="form-check-label fw-semibold" htmlFor={`ouvert-${day.key}`}>
                                    {day.label}
                                  </label>
                                </div>
                              </div>

                              {settings.horaires_travail[day.key].ouvert && (
                                <>
                                  <div className="col-md-3">
                                    <label className="form-label small mb-1">Opening</label>
                                    <input
                                      type="time"
                                      className="form-control form-control-sm"
                                      value={settings.horaires_travail[day.key].debut}
                                      onChange={(e) => handleWorkingHoursChange(day.key, 'debut', e.target.value)}
                                    />
                                  </div>

                                  <div className="col-md-3">
                                    <label className="form-label small mb-1">Closing</label>
                                    <input
                                      type="time"
                                      className="form-control form-control-sm"
                                      value={settings.horaires_travail[day.key].fin}
                                      onChange={(e) => handleWorkingHoursChange(day.key, 'fin', e.target.value)}
                                    />
                                  </div>

                                  <div className="col-md-3">
                                    <span className="badge bg-success">
                                      Open: {settings.horaires_travail[day.key].debut} - {settings.horaires_travail[day.key].fin}
                                    </span>
                                  </div>
                                </>
                              )}

                              {!settings.horaires_travail[day.key].ouvert && (
                                <div className="col-md-9">
                                  <span className="badge bg-secondary">Closed</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Booking Settings */}
              {activeTab === 'reservations' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <FaCalendarAlt className="text-primary" size={24} />
                    <h4 className="mb-0 fw-bold">Booking Settings</h4>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Max Bookings Per Day</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.max_reservations_jour}
                        onChange={(e) => handleChange('max_reservations_jour', parseInt(e.target.value))}
                        min="1"
                        max="100"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Default Session Duration (min)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.duree_seance_defaut}
                        onChange={(e) => handleChange('duree_seance_defaut', parseInt(e.target.value))}
                        min="15"
                        max="180"
                        step="15"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Cancellation Deadline (hours)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.delai_annulation}
                        onChange={(e) => handleChange('delai_annulation', parseInt(e.target.value))}
                        min="1"
                        max="72"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Cancellation Fee (DT)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.frais_annulation}
                        onChange={(e) => handleChange('frais_annulation', parseInt(e.target.value))}
                        min="0"
                        step="5"
                      />
                    </div>

                    <div className="col-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="confirmation_auto"
                              checked={settings.confirmation_automatique}
                              onChange={(e) => handleChange('confirmation_automatique', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="confirmation_auto">
                              Automatic confirmation
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="attente_validation"
                              checked={settings.attente_validation}
                              onChange={(e) => handleChange('attente_validation', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="attente_validation">
                              Require admin validation
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <FaBell className="text-primary" size={24} />
                    <h4 className="mb-0 fw-bold">Notifications</h4>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="card border">
                        <div className="card-header bg-light">
                          <h6 className="mb-0">
                            <FaMailBulk className="me-2 text-primary" />
                            Email Notifications
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-check mb-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="email_nouvelle"
                                  checked={settings.notifications.email_nouvelle_reservation}
                                  onChange={(e) => handleNestedChange('notifications', 'email_nouvelle_reservation', e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="email_nouvelle">
                                  New booking notifications
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-check mb-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="email_annulation"
                                  checked={settings.notifications.email_annulation}
                                  onChange={(e) => handleNestedChange('notifications', 'email_annulation', e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="email_annulation">
                                  Cancellation notifications
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-check mb-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="email_rappel"
                                  checked={settings.notifications.email_rappel}
                                  onChange={(e) => handleNestedChange('notifications', 'email_rappel', e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="email_rappel">
                                  Appointment reminders
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-check mb-3">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="email_marketing"
                                  checked={settings.notifications.email_marketing}
                                  onChange={(e) => handleNestedChange('notifications', 'email_marketing', e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="email_marketing">
                                  Marketing emails
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card border mt-4">
                        <div className="card-header bg-light">
                          <h6 className="mb-0">
                            <FaSms className="me-2 text-success" />
                            SMS Notifications
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="sms_rappel"
                              checked={settings.notifications.sms_rappel}
                              onChange={(e) => handleNestedChange('notifications', 'sms_rappel', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="sms_rappel">
                              SMS appointment reminders
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payment Settings */}
              {activeTab === 'paiement' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <FaCreditCard className="text-primary" size={24} />
                    <h4 className="mb-0 fw-bold">Payment Settings</h4>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Currency</label>
                      <select
                        className="form-select"
                        value={settings.devise}
                        onChange={(e) => handleChange('devise', e.target.value)}
                      >
                        <option value="TND">Tunisian Dinar (TND)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="USD">US Dollar (USD)</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">VAT Rate (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.tva}
                        onChange={(e) => handleChange('tva', parseFloat(e.target.value))}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security */}
              {activeTab === 'securite' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <FaShieldAlt className="text-primary" size={24} />
                    <h4 className="mb-0 fw-bold">Security Settings</h4>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Minimum Password Length</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.mot_de_passe_min}
                        onChange={(e) => handleChange('mot_de_passe_min', parseInt(e.target.value))}
                        min="6"
                        max="20"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.session_timeout}
                        onChange={(e) => handleChange('session_timeout', parseInt(e.target.value))}
                        min="15"
                        max="480"
                      />
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="double_auth"
                          checked={settings.double_authentification}
                          onChange={(e) => handleChange('double_authentification', e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="double_auth">
                          Enable two-factor authentication
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Appearance */}
              {activeTab === 'apparence' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <FaPalette className="text-primary" size={24} />
                    <h4 className="mb-0 fw-bold">Appearance</h4>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Theme</label>
                      <select
                        className="form-select"
                        value={settings.theme}
                        onChange={(e) => handleChange('theme', e.target.value)}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Language</label>
                      <select
                        className="form-select"
                        value={settings.langue}
                        onChange={(e) => handleChange('langue', e.target.value)}
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Timezone</label>
                      <select
                        className="form-select"
                        value={settings.fuseau_horaire}
                        onChange={(e) => handleChange('fuseau_horaire', e.target.value)}
                      >
                        <option value="Africa/Tunis">Africa/Tunis (GMT+1)</option>
                        <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;