import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 50,
    price: "",
    category: "physiotherapy",
    instructor: "",
    maxParticipants: 1
  });

  useEffect(() => {
    const savedServices = localStorage.getItem("therapilates_services");
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      // Initialize with some sample data
      const sampleServices = [
        {
          id: 1,
          name: "Physiotherapy Session",
          description: "Individual physiotherapy assessment and treatment session",
          duration: 50,
          price: "TND 85",
          category: "physiotherapy",
          instructor: "Dr. Sarah Johnson",
          maxParticipants: 1
        },
        {
          id: 2,
          name: "Therapeutic Pilates",
          description: "Group therapeutic Pilates class focusing on rehabilitation",
          duration: 50,
          price: "TND 65",
          category: "pilates",
          instructor: "Emma Wilson",
          maxParticipants: 8
        },
        {
          id: 3,
          name: "Prenatal Pilates",
          description: "Specialized Pilates for expectant mothers",
          duration: 45,
          price: "TND 70",
          category: "prenatal",
          instructor: "Dr. Marie Dupont",
          maxParticipants: 6
        }
      ];
      setServices(sampleServices);
      localStorage.setItem("therapilates_services", JSON.stringify(sampleServices));
    }
  }, []);

  const saveServices = (newServices) => {
    setServices(newServices);
    localStorage.setItem("therapilates_services", JSON.stringify(newServices));
  };

  const handleShowModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        name: "",
        description: "",
        duration: 50,
        price: "",
        category: "physiotherapy",
        instructor: "",
        maxParticipants: 1
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      const updatedServices = services.map(service =>
        service.id === editingService.id ? { ...formData, id: editingService.id } : service
      );
      saveServices(updatedServices);
    } else {
      const newService = {
        ...formData,
        id: Date.now()
      };
      saveServices([...services, newService]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const filteredServices = services.filter(service => service.id !== id);
      saveServices(filteredServices);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Services Management</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Add New Service
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Duration (min)</th>
            <th>Price</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>
                <span className={`badge bg-${service.category === 'physiotherapy' ? 'primary' : service.category === 'pilates' ? 'success' : 'info'}`}>
                  {service.category}
                </span>
              </td>
              <td>{service.duration}</td>
              <td>{service.price}</td>
              <td>{service.instructor}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(service)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
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
            {editingService ? "Edit Service" : "Add New Service"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
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
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="physiotherapy">Physiotherapy</option>
                    <option value="pilates">Pilates</option>
                    <option value="prenatal">Prenatal</option>
                    <option value="postnatal">Postnatal</option>
                    <option value="rehabilitation">Rehabilitation</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="e.g., TND 85"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Instructor</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Max Participants</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of the service..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingService ? "Update" : "Add"} Service
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}