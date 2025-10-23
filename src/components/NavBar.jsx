import { Container, Navbar, Nav } from "react-bootstrap";
import BrandLogo from "/assets/letter-m.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function NavBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = () => {
    navigate("/");
  };

  const navItemText = [
    { text: t('nav.home'), url: "/" },
    { text: t('nav.classes'), url: "/classes" },
    { text: t('nav.packages'), url: "/packages" },
    { text: t('nav.timetable'), url: "/timetable" },
    { text: t('nav.location'), url: "/location" },
    { text: t('nav.contact'), url: "/contact" },
    { text: t('nav.login'), url: "/admin-login" },
  ];

  return (
    <Container
      fluid
      style={{ backgroundColor: "var(--primary-color)", paddingLeft: "0" }}
    >
      <Navbar
        expand="lg"
        style={{
          backgroundColor: "var(--primary-color)",
          position: "fixed",
          zIndex: 1,
          top: 0,
          width: "100vw",
        }}
      >
        <Container
          className="p-2"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={BrandLogo}
              alt="Brand Logo"
              style={{ width: "3rem", height: "3rem" }}
              title="Medium icons created by Creative Squad - Flaticon / https://www.flaticon.com/free-icons/medium"
              onClick={handleNavigation}
            />
          </div>
          <div>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ textAlign: "end" }}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto d-flex align-items-center">
                {navItemText.map((link, index) => (
                  <Nav.Link
                    as={Link}
                    to={link.url}
                    key={index}
                    style={{ color: "var(--font-color)", padding: "1rem" }}
                  >
                    {link.text}
                  </Nav.Link>
                ))}
                <LanguageSwitcher />
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </Container>
  );
}
