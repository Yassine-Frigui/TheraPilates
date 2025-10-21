import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    studioName: "TheraPilates",
    email: "hello@therapilates.co",
    phone: "+216 71 123 456",
    address: "123 Avenue Habib Bourguiba, Tunis, Tunisia",
    workingHours: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM",
    maxBookingsPerDay: 20,
    notificationEmail: true,
    smsReminders: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    localStorage.setItem("therapilates_settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div>
      <h2 className="mb-4">Settings</h2>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Studio Information</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Studio Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="studioName"
                        value={settings.studioName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
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
                        name="phone"
                        value={settings.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max Bookings Per Day</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxBookingsPerDay"
                        value={settings.maxBookingsPerDay}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Working Hours</Form.Label>
                  <Form.Control
                    type="text"
                    name="workingHours"
                    value={settings.workingHours}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Notifications</h5>
            </Card.Header>
            <Card.Body>
              <Form.Check
                type="checkbox"
                label="Email notifications for new bookings"
                name="notificationEmail"
                checked={settings.notificationEmail}
                onChange={handleChange}
                className="mb-3"
              />
              <Form.Check
                type="checkbox"
                label="SMS reminders for appointments"
                name="smsReminders"
                checked={settings.smsReminders}
                onChange={handleChange}
                className="mb-3"
              />
            </Card.Body>
          </Card>

          <Button variant="primary" onClick={handleSave}>
            Save Settings
          </Button>
        </Col>
      </Row>
    </div>
  );
}