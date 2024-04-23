import { Container, Col, Row, Card } from "react-bootstrap";
import ImageLounge from "../assets/alona-gross-ppDb3WLVd_M-unsplash.jpg";
import StandardButton from "../components/StandardButton";
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function LocationPage() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/move-studio-1");
  };
  return (
    <Container>
      {/* Welcome Card */}
      <Row className="justify-content-start mb-4">
        <Col md={4}>
          <Card
            className="rounded-lg p-2"
            style={{
              height: "80%",
              backgroundColor: "var(--secondary-color)",
              border: "none",
              borderRadius: "30px",
              overflow: "hidden",
              marginTop: "8rem",
              marginBottom: "2rem",
            }}
          >
            <Card.Body>
              {/* Card top photo */}
              <div className="row-md-4 mt-2">
                <img
                  src={ImageLounge}
                  alt="A group of chairs sitting next to each other in a room
                  "
                  title="Photo by Alona Gross on Unsplash
                  "
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    padding: "0",
                  }}
                />
              </div>
              {/* Card lower text content */}
              <div
                className="row-md-6"
                style={{
                  color: "var(--primary-color)",
                }}
              >
                <Card.Title className="display-6 mt-2">
                  MOVE Pilates Studio
                </Card.Title>
                <Card.Text>
                  <p>
                    <IoLocationOutline /> 4, Persiaran Zaaba, Taman Tun Dr
                    Ismail, 60000 Kuala Lumpur.
                  </p>
                  <p>
                    <IoCallOutline /> +6011-1234567
                  </p>
                  <div onClick={handleNavigation}>
                    <StandardButton
                      text="View More"
                      styleClass="mx-4 mt-4 p-4"
                    />
                  </div>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
