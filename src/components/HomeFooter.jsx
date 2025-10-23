import { FaInstagram } from "react-icons/fa";
import BrandLogo from "/assets/letter-m.png";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomeFooter() {
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center">
        {/* Brand Logo */}
        <div
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--font-color)",
            textAlign: "center",
          }}
        >
          <div className="p-2 mt-4">
            <img
              src={BrandLogo}
              alt="Brand Logo"
              style={{ width: "3rem", height: "3rem" }}
              href="https://www.flaticon.com/free-icons/medium"
              title="Medium icons created by Creative Squad - Flaticon"
            />
          </div>

          {/* Instagram Logo and link */}
          <div className="p-2 mt-2">
            <a
              href="https://www.instagram.com/instagram/"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <FaInstagram />
            </a>
          </div>

          {/* Misc links */}
          <div className="my-4">
            <span className="p-2">
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Contact Us
              </Link>
            </span>
            <span className="p-2">
              <Link
                to="/studio-policies"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Studio Policies
              </Link>
            </span>
          </div>

          {/* Copyright */}
          <hr className="border-top border-3 border-dark"></hr>
          <div className="d-flex justify-content-between">
            <span className="p-2 mb-2">Copyright &copy; 2024 MOVE Pilates</span>
            <span className="p-2 mb-2">@sstherapilates</span>
          </div>
        </div>
      </Row>
    </Container>
  );
}
