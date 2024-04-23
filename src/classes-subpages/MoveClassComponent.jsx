import { Container, Row, Col } from "react-bootstrap";
import { CiClock2 } from "react-icons/ci";
import { TbStairsUp } from "react-icons/tb";
import StandardButton from "../components/StandardButton";

export default function MoveClassComponent({
  className,
  classDuration,
  classDifficulty,
  classImage,
  classDescription,
}) {
  return (
    <Container style={{ color: "var(--primary-color)" }}>
      <Col style={{ marginTop: "8rem", marginBottom: "2rem" }}>
        {/* Breadcrumb */}
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a
                  href="./classes"
                  style={{
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    color: "inherit",
                  }}
                >
                  Classes
                </a>
              </li>
              <li
                className="breadcrumb-item active font-weight-bold"
                aria-current="page"
                style={{ fontWeight: 400 }}
              >
                {className}
              </li>
            </ol>
          </nav>
        </div>

        {/* Move Control class details */}
        <Row>
          <Col sm={5}>
            <h2 className="ms-4 mt-4">{className}</h2>

            <div className="d-flex flex-row p-4">
              <i className="p-2">
                <CiClock2 />
              </i>
              <span className="p-2">
                {" "}
                <b className="p-2">Duration</b>
                <p className="p-2">{classDuration}</p>
              </span>
              <i className="p-2">
                <TbStairsUp />
              </i>
              <span className="p-2">
                {" "}
                <b className="p-2">Difficulty Level</b>
                <p className="p-2">{classDifficulty}</p>
              </span>
            </div>

            {/* Location dropdown */}
            <div className="d-flex flex-row justify-content-around align-items-center py-2">
              <select
                style={{
                  height: "calc(1.5em + .75rem + 2px)",
                  borderRadius: "5px",
                }}
              >
                <option value="">Select location</option>
                <option value="move-studio-1">MOVE Pilates Studio</option>
              </select>

              <StandardButton text="Book Now" />
            </div>
          </Col>
          <Col sm={7} className="">
            <img
              src={classImage}
              width="60%"
              style={{ borderRadius: "20px", marginLeft: "auto" }}
            ></img>
          </Col>
        </Row>
        <Row
          sm={6}
          style={{
            backgroundColor: "var(--secondary-color)",
            padding: "2rem",
            borderRadius: "20px",
          }}
        >
          <Col sm={4}>
            <h5>About the class</h5>
          </Col>
          <Col sm={6}>{classDescription}</Col>
        </Row>
        <hr className="border-top border-4 border-dark"></hr>
        <Row className="mt-4">
          <Col sm={4}>
            <h4>What you&apos;ll need</h4>
          </Col>
          <Col sm={6} className="d-flex flex-row justify-content-around">
            <span className="pt-2">
              <b>Grip Socks</b>
            </span>
            <span className="pt-2">
              <b>Water Bottle</b>
            </span>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}
