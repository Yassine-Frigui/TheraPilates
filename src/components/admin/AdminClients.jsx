import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    medicalHistory: "",
    membershipType: "basic"
  });

  useEffect(() => {
    const savedClients = localStorage.getItem("therapilates_clients");
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      // Initialize with some sample data
      const sampleClients = [
        {
          id: 1,
          name: "Marie Dupont",
          email: "marie.dupont@email.com",
          phone: "+216 71 123 456",
          dateOfBirth: "1985-03-15",
          medicalHistory: "Lower back pain, prenatal care",
          membershipType: "premium"
        },
        {
          id: 2,
          name: "Ahmed Ben Ali",
          email: "ahmed.benali@email.com",
          phone: "+216 72 987 654",
          dateOfBirth: "1990-07-22",
          medicalHistory: "Sports injury rehabilitation",
          membershipType: "basic"
        }
      ];
      setClients(sampleClients);
      localStorage.setItem("therapilates_clients", JSON.stringify(sampleClients));
    }
  }, []);

  const saveClients = (newClients) => {
    setClients(newClients);
    localStorage.setItem("therapilates_clients", JSON.stringify(newClients));
  };

  const handleShowModal = (client = null) => {
    if (client) {
      setEditingClient(client);
      setFormData(client);
    } else {
      setEditingClient(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        medicalHistory: "",
        membershipType: "basic"
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      const updatedClients = clients.map(client =>
        client.id === editingClient.id ? { ...formData, id: editingClient.id } : client
      );
      saveClients(updatedClients);
    } else {
      const newClient = {
        ...formData,
        id: Date.now()
      };
      saveClients([...clients, newClient]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      const filteredClients = clients.filter(client => client.id !== id);
      saveClients(filteredClients);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Clients Management</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Add New Client
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Membership</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <span className={`badge bg-${client.membershipType === 'premium' ? 'success' : 'secondary'}`}>
                  {client.membershipType}
                </span>
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(client)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(client.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingClient ? "Edit Client" : "Add New Client"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Membership Type</Form.Label>
                  <Form.Select
                    value={formData.membershipType}
                    onChange={(e) => setFormData({...formData, membershipType: e.target.value})}
                  >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Medical History</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.medicalHistory}
                    onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                    placeholder="Brief medical history or conditions..."
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingClient ? "Update" : "Add"} Client
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}