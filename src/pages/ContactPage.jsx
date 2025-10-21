import { Card, Row, Col, Container, Form } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import StandardButton from "../components/StandardButton";
import { useState } from "react";

export default function ContactPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    const hasAtSymbol = email.includes("@");
    if (!hasAtSymbol) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form successfully submitted!");
  };

  return (
    <Container>
      <div style={{ marginTop: "8rem", marginBottom: "2rem" }}>
        <Card
          className="rounded-lg p-4"
          style={{
            backgroundColor: "var(--secondary-color)",
            color: "var(--primary-color)",
            border: "none",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          <Card.Body>
            <Row>
              {/* Business info */}
              <Col sm={6}>
                <div className="p-4 d-flex flex-column">
                  <h3>Find a Location</h3>
                  <p>
                    To get in touch with our outlets, visit our{" "}
                    <a href="/location" style={{ color: "inherit" }}>
                      locations
                    </a>
                    .
                  </p>
                </div>

                <div className="p-4 d-flex flex-column">
                  <h3>Connect with us on social media</h3>
                  <span>
                    <a
                      href="https://www.instagram.com/instagram/"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        padding: "1rem",
                      }}
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://wa.me/60111234567"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        padding: "1rem",
                      }}
                    >
                      <FaWhatsapp />
                    </a>
                  </span>
                </div>

                <div className="p-4 d-flex flex-column">
                  <h3>Business Information</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td className="p-2">
                          <IoMailOutline />
                        </td>
                        <td>hello@therapilates.co</td>
                      </tr>
                      <tr>
                        <td className="p-2">
                          <IoLocationOutline />
                        </td>
                        <td>
                          123 Avenue Habib Bourguiba, Tunis, Tunisia.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">
                          <IoCallOutline />
                        </td>
                        <td>+216 71 123 456</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>

              {/* Contact Form */}
              <Col sm={6}>
                <h3 className="mt-4">What can we help you with?</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label className="mt-2">Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label className="mt-2">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={validateEmail}
                      isInvalid={!!emailError}
                    />
                  </Form.Group>

                  <Form.Group controlId="formMobile">
                    <Form.Label className="mt-2">Mobile Number</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <select
                          style={{
                            height: "calc(1.5em + .75rem + 2px)",
                            border: "none",
                            borderRadius: "5px 0 0 5px",
                          }}
                        >
                          <option defaultValue="+216">+216 (Tunisia)</option>
                          <option value="+62">+62 (Indonesia)</option>
                          <option value="+63">+63 (Philippines)</option>
                          <option value="+65">+65 (Singapore)</option>
                          <option value="+66">+66 (Thailand)</option>
                          <option value="+84">+84 (Vietnam)</option>
                          <option value="+855">+855 (Cambodia)</option>
                          <option value="+856">+856 (Laos)</option>
                          <option value="+95">+95 (Myanmar)</option>
                          <option value="+670">+670 (Timor-Leste)</option>
                        </select>
                      </div>
                      <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formSubject">
                    <Form.Label className="mt-2">Subject</Form.Label>
                    <Form.Control as="select" defaultValue="">
                      <option value="">Choose...</option>
                      <option>General Inquiry</option>
                      <option>Feedback</option>
                      <option>Support</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formDescription">
                    <Form.Label className="mt-2">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Enter your message"
                    />
                  </Form.Group>

                  <StandardButton
                    type="submit"
                    text="Submit"
                    styleClass="mt-4"
                  />
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
