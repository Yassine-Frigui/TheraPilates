import { Row, Col, Container, Card } from "react-bootstrap";
import StandardButton from "../components/StandardButton";
import OutlineButton from "../components/OutlineButton";
import Background1 from "/assets/the-blowup-_7wfhH3HHg0-unsplash.jpg";
import Background2 from "/assets/sandra-filipe-ahtFAYSPza0-unsplash.jpg";
import LobbyImg from "/assets/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg";
import Image3 from "/assets/levi-t-61V7052F7A4-unsplash.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ImageLounge from "/assets/alona-gross-ppDb3WLVd_M-unsplash.jpg";

export default function HomePage() {
  return (
    <>
      <Container fluid>
        <Col xs={12} className="text-center">
          <Row
            style={{
              backgroundImage: `url(${Background1})`,
              backgroundSize: "cover",
              color: "var(--font-color)",
              position: "relative",
              minHeight: "80vh",
            }}
          >
            <div
              className="d-flex flex-column align-items-start col-6 mb-4 ml-2"
              style={{ marginTop: "30%", marginLeft: "5%" }}
            >
              <h1>MOVE Pilates</h1>
              <p>
                We are a come-as-you-are, community-focused pilates studio. We
                focus on you, for you.
              </p>
              <div>
                <Link to="/packages">
                  <StandardButton text="JOIN THE MOVEMENT" />
                </Link>
              </div>
            </div>
          </Row>

          {/* Welcome Card */}
          <Row className="justify-content-center my-4">
            <Col md={8}>
              <Card
                className="rounded-lg my-4"
                style={{
                  height: "60vh",
                  backgroundColor: "var(--secondary-color)",
                  border: "none",
                  borderRadius: "30px",
                  overflow: "hidden",
                }}
              >
                <Card.Body className="d-flex align-items-center p-0">
                  <div className="col-6">
                    {/* Left 50% photo */}
                    <img
                      src={LobbyImg}
                      title="Photo by Frames For Your Heart on Unsplash"
                      alt="Image of a comforting lounge"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div
                    className="col-6 p-4"
                    style={{
                      color: "var(--primary-color)",
                    }}
                  >
                    {/* Right 50% text content */}
                    <Card.Title className="display-6 fw-bold">
                      Welcome to MOVE!
                    </Card.Title>
                    <Card.Text>
                      A safe space where every body is free to feel good through
                      Pilates. At MOVE, it is a community of like-minded
                      individuals who love staying active, our friendly and
                      encouraging atmosphere will make you feel right at home.
                      We believe you will feel seen within our studio, and we
                      cannot wait for you to come MOVE with us.
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* End of card */}

          {/* CTA check out packages */}
          <Row
            className="justify-content-center align-items-center p-4"
            style={{
              backgroundImage: `url(${Background2})`,
              backgroundSize: "cover",
              color: "var(--font-color)",
              position: "relative",
              minHeight: "80vh",
              // alt: "A white and pink abstract background with smooth lines",
              // title: "Photo by Sandra Filipe on Unsplash",
            }}
          >
            <div style={{ marginTop: "10%" }}>
              <h2 className="my-2">Inhale, Ready? Exhale, Let&apos;s MOVE.</h2>
              <Link to="/packages">
                <button
                  className="btn btn-outline-light my-2"
                  style={{ borderRadius: "30px", padding: "15px" }}
                >
                  Let&apos;s MOVE together
                </button>
              </Link>
            </div>
          </Row>

          {/* CTA See and book classes */}
          <Row
            className="justify-content-center align-items-center p-4"
            style={{
              height: "50vh",
              color: "var(--primary-color)",
            }}
          >
            <div className="h-auto">
              <h2 className="p-2">JOIN THE MOVE PILATES CLUB</h2>
              <p className="p-2">We like to MOVE it MOVE it.</p>
              <p className="p-2">
                &quot;Change happens through movement and movement heals.&quot;
                - Joseph Pilates
              </p>
              <div className="text-center">
                <Link to="/classes">
                  <StandardButton
                    text="See all classes"
                    styleClass="mt-3 mx-4 p-4"
                  />
                </Link>
                <Link to="/timetable">
                  <OutlineButton
                    text="Book a class"
                    styleClass="mt-3 mx-4 p-4"
                  />
                </Link>
              </div>
            </div>
          </Row>

          {/* Location */}
          <Row
            style={{
              height: "50vh",
              color: "var(--primary-color)",
              position: "relative",
            }}
            className="mb-4 location"
          >
            <div>
              <h2>Location</h2>
              <p>
                4, Persiaran Zaaba, Taman Tun Dr Ismail, 60000 Kuala Lumpur.
              </p>
              <img
                src={Image3}
                alt="A minimalist bookshelf"
                style={{
                  width: "50vw",
                  height: "40vh",
                  objectFit: "cover",
                  borderRadius: "30px",
                }}
              />
            </div>
            <div className="overlap">
              <h6>MOOV Pilates Studio</h6>
              <img
                src={ImageLounge}
                alt="A group of chairs sitting next to each other in a room
                  "
                title="Photo by Alona Gross on Unsplash
                  "
                style={{
                  width: "20rem",
                  objectFit: "contain",
                  padding: "0",
                }}
              />
              <p>
                <IoLocationOutline /> 4, Persiaran Zaaba, Taman Tun Dr Ismail,
                60000 Kuala Lumpur.
              </p>
              <p>
                <IoCallOutline /> +60111234567
              </p>

              <StandardButton
                text="View More"
                styleClass="mx-4 p-4"
                classLink={"/location"}
              />
            </div>
          </Row>
        </Col>
      </Container>
    </>
  );
}
