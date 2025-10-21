import { useState } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import AdminBookings from "../components/admin/AdminBookings";
import AdminClients from "../components/admin/AdminClients";
import AdminServices from "../components/admin/AdminServices";
import AdminStatistics from "../components/admin/AdminStatistics";
import AdminSettings from "../components/admin/AdminSettings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <Container fluid style={{ marginTop: "8rem", padding: "2rem" }}>
      <Row>
        <Col>
          <h1 className="mb-4" style={{ color: "var(--primary-color)" }}>
            Admin Dashboard
          </h1>

          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="bookings">Bookings</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="clients">Clients</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="services">Services</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="statistics">Statistics</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="settings">Settings</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="bookings">
                    <AdminBookings />
                  </Tab.Pane>
                  <Tab.Pane eventKey="clients">
                    <AdminClients />
                  </Tab.Pane>
                  <Tab.Pane eventKey="services">
                    <AdminServices />
                  </Tab.Pane>
                  <Tab.Pane eventKey="statistics">
                    <AdminStatistics />
                  </Tab.Pane>
                  <Tab.Pane eventKey="settings">
                    <AdminSettings />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}