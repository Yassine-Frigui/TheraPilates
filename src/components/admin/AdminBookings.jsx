import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    service: "",
    date: "",
    time: "",
    status: "pending"
  });

  useEffect(() => {
    const savedBookings = localStorage.getItem("therapilates_bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Initialize with some sample data
      const sampleBookings = [
        {
          id: 1,
          clientName: "Marie Dupont",
          service: "Physiotherapy Session",
          date: "2025-10-25",
          time: "10:00",
          status: "confirmed"
        },
        {
          id: 2,
          clientName: "Ahmed Ben Ali",
          service: "Therapeutic Pilates",
          date: "2025-10-26",
          time: "14:00",
          status: "pending"
        }
      ];
      setBookings(sampleBookings);
      localStorage.setItem("therapilates_bookings", JSON.stringify(sampleBookings));
    }
  }, []);

  const saveBookings = (newBookings) => {
    setBookings(newBookings);
    localStorage.setItem("therapilates_bookings", JSON.stringify(newBookings));
  };

  const handleShowModal = (booking = null) => {
    if (booking) {
      setEditingBooking(booking);
      setFormData(booking);
    } else {
      setEditingBooking(null);
      setFormData({
        clientName: "",
        service: "",
        date: "",
        time: "",
        status: "pending"
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBooking(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBooking) {
      const updatedBookings = bookings.map(booking =>
        booking.id === editingBooking.id ? { ...formData, id: editingBooking.id } : booking
      );
      saveBookings(updatedBookings);
    } else {
      const newBooking = {
        ...formData,
        id: Date.now()
      };
      saveBookings([...bookings, newBooking]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const filteredBookings = bookings.filter(booking => booking.id !== id);
      saveBookings(filteredBookings);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      confirmed: "success",
      cancelled: "danger",
      completed: "info"
    };
    return <span className={`badge bg-${variants[status] || 'secondary'}`}>{status}</span>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Bookings Management</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Add New Booking
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.clientName}</td>
              <td>{booking.service}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{getStatusBadge(booking.status)}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(booking)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(booking.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingBooking ? "Edit Booking" : "Add New Booking"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Service</Form.Label>
                  <Form.Select
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="Physiotherapy Session">Physiotherapy Session</option>
                    <option value="Therapeutic Pilates">Therapeutic Pilates</option>
                    <option value="Prenatal Pilates">Prenatal Pilates</option>
                    <option value="Postnatal Pilates">Postnatal Pilates</option>
                    <option value="Rehabilitation Pilates">Rehabilitation Pilates</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingBooking ? "Update" : "Add"} Booking
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}