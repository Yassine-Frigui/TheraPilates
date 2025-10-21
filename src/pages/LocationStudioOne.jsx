import { Container, Col, Row } from "react-bootstrap";
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { PiCoatHanger } from "react-icons/pi";
import { CiDumbbell } from "react-icons/ci";
import { IoPeopleSharp } from "react-icons/io5";
import { TbStairsUp } from "react-icons/tb";
import StandardButton from "../components/StandardButton";
import ReformerImage from "/assets/freya-yanggg-yang-JmjDBhXSjyI-unsplash.jpg";

export default function LocationStudioOne() {
  const handleDirection = () => {
    const latitude = 3.14242;
    const longitude = 101.62541;
    const url = `http://maps.google.com/?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const openingHours = [
    { day: "Monday", hours: "0800 - 2000" },
    { day: "Tuesday", hours: "0800 - 2000" },
    { day: "Wednesday", hours: "0800 - 2000" },
    { day: "Thursday", hours: "0800 - 2000" },
    { day: "Friday", hours: "0800 - 2000" },
    { day: "Saturday", hours: "0800 - 2000" },
    { day: "Sunday", hours: "0800 - 2000" },
  ];

  return (
    <Container>
      <Row>
        {/* Column 1: Studio details */}
        <Col
          md={7}
          style={{
            marginTop: "10rem",
            marginBottom: "5rem",
            color: "var(--primary-color)",
            overflow: "hidden",
          }}
        >
          <img
            src={ReformerImage}
            width="80%"
            className="rounded m-4"
            title="Photo by freya yanggg yang on Unsplash"
            alt="A row of exercise machines in a gym
"
          />
          {/* Amenities */}
          <h3 className="mt-4">Amenities</h3>
          <div className="mt-4 p-4">
            <span className="p-2">
              <PiCoatHanger /> Changing Room
            </span>
            <span className="p-2">
              <CiDumbbell /> Locker
            </span>
          </div>

          <hr className="border-top border-2 border-dark"></hr>

          {/* Facilities */}
          <h3 className="my-4">Facilities</h3>
          <Row>
            <h6>Reformer Pilates Group Room</h6>
            <ul className="list-unstyled pt-2 pb-4">
              <li>
                <TbStairsUp />
                &nbsp; Level 1
              </li>
              <li>
                <IoPeopleSharp />
                &nbsp; Up to 14 pax
              </li>
              <li>Pilates Studio</li>
            </ul>
          </Row>
          <Row>
            <h6>Private Equipments Room</h6>
            <ul className="list-unstyled pt-2 pb-4">
              <li>
                <TbStairsUp />
                &nbsp; Level 1
              </li>
              <li>
                <IoPeopleSharp />
                &nbsp; Up to 2 pax
              </li>
              <li>Private classes in Pilates Equipments Room</li>
            </ul>
          </Row>
        </Col>

        {/* Column 2: Contact info and opening hours */}
        <Col
          md={5}
          style={{
            marginTop: "10rem",
            marginBottom: "5rem",
            color: "var(--primary-color)",
            backgroundColor: "var(--secondary-color)",
            paddingTop: "6rem",
            paddingLeft: "2rem",
          }}
        >
          <h3 className="py-2">TheraPilates Studio</h3>
          <p>Welcome to your new healing home</p>
          <p>
            <IoLocationOutline /> 123 Avenue Habib Bourguiba, Tunis, Tunisia
          </p>
          <p>
            <IoCallOutline /> +216 71 123 456
          </p>
          {/* GMaps Get Directions Button */}
          <div onClick={() => handleDirection()}>
            <StandardButton
              text="Get Directions"
              styleClass="mt-2 mb-2 w-100"
            />
          </div>

          <div className="mt-4 p-4">
            <h6>Opening hours for this week: </h6>

            <table>
              {openingHours.map((item, index) => (
                <tr key={index}>
                  <td style={{ paddingRight: "5rem" }}>{item.day}</td>
                  <td>{item.hours}</td>
                </tr>
              ))}
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
