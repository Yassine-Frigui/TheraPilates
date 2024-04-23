import { Container, Row, Col, Card } from "react-bootstrap";
import { MdAttachMoney } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { BiCalendar } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import packageData from "../PackageData";
import VisaImage from "../assets/294654_visa_icon.png";
import MastercardImage from "../assets/380809_card_master_mastercard_icon.png";
import CreditCardForm from "./CheckoutFormComponent";

export default function CheckoutPage({ packageTitle, packageConditions, classesEligibility }) {
  const selectedPackage = packageData.find(
    (item) => item.packageTitle === packageTitle
  );

  return (
    <Container style={{ marginTop: "8rem", color: "var(--primary-color)" }}>
      <Row sm={12}>
        {/* Breadcrumb */}
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a
                  href="./packages"
                  style={{
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    color: "inherit",
                  }}
                >
                  Packages
                </a>
              </li>
              <li
                className="breadcrumb-item active font-weight-bold"
                aria-current="page"
                style={{ fontWeight: 400 }}
              >
                Confirm and Pay
              </li>
            </ol>
          </nav>
        </div>
      </Row>

      <Row>
        {/* Payment amount input */}
        <Col sm={6} className="p-2">
          <h5>
            <b>Your Package</b>
          </h5>
          <p>{packageConditions}</p>
          <Card
            className="p-4"
            style={{
              backgroundColor: "var(--secondary-color)",
              color: "var(--primary-color)",
              borderStyle: "solid",
              borderColor: "grey",
              borderRadius: "20px",
            }}
          >
            <Card.Text>
              <ul className="list-unstyled">
                <li className="ms-2">
                  <MdAttachMoney />
                  <span className="ms-4">{selectedPackage.paymentSched}</span>
                </li>
                <li className="ms-2">
                  <FaRegCalendarCheck />
                  <span className="ms-4">{selectedPackage.credits}</span>
                </li>
                <li className="ms-2">
                  <BiCalendar />
                  <span className="ms-4">{selectedPackage.validity}</span>
                </li>
                <li className="ms-2">
                  <CiStar />
                  <span className="ms-4">{selectedPackage.packagePrice}</span>
                </li>
                <li className="ms-2">
                  <FaRegClock />
                  <span className="ms-4">
                    Validity will start if no bookings made after 1 month
                  </span>
                </li>
              </ul>
            </Card.Text>
          </Card>

          <div className="mt-4">
            <h5 className="mt-2">What you&apos;re eligible</h5>
            <h5 className="mt-2">Classes</h5>
            <p>
              <IoLocationOutline /> Onsite classes only
            </p>
           {classesEligibility}
          </div>

          <hr></hr>

          <h5>Pay with</h5>

          <div
            className="form-check d-flex flex-row justify-content-start align-items-center shadow mb-5 rounded"
            style={{
              backgroundColor: "var(--secondary-color)",
              borderRadius: "20px",
              border: "none",
              padding: "1rem",
            }}
          >
            <label className="form-check-label p-2" htmlFor="flexRadioDefault2">
              <input
                className="form-check-input mx-4"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                color="var(--primary=color)"
                checked
              />
              Credit / Debit Cards{" "}
            </label>

            <img
              src={VisaImage}
              style={{ width: "3rem", height: "3rem", marginLeft: "8rem" }}
            />
            <img
              src={MastercardImage}
              style={{ width: "3rem", height: "3rem", marginLeft: "1rem" }}
            />
          </div>

          {/* Card payment form */}
          <div className="mt-2 w-100">
            <CreditCardForm />
          </div>
        </Col>

        {/* Payment amount breakdown */}
        <Col sm={5}>
          <Card
            className="shadow p-4 mb-5 rounded"
            style={{
              backgroundColor: "var(--secondary-color)",
              color: "var(--primary-color)",
              border: "none",
              borderRadius: "20px",
              position: "sticky",
              top: "8rem",
            }}
          >
            <Card.Title>{packageTitle}</Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-between">
                <span className="p-2">{packageData.access}</span>
                <span className="p-2">{packageData.credits}</span>
              </div>

              <div className="mt-4">
                <h5>Price Detail</h5>
                <p className="d-flex justify-content-between ">
                  <span className="p-2">Standard</span>
                  <span className="p-2">{selectedPackage.packagePrice}</span>
                </p>
                <p className="d-flex justify-content-between ">
                  {" "}
                  <span className="p-2">Subtotal</span>{" "}
                  <span className="p-2"> {selectedPackage.packagePrice}</span>
                </p>
              </div>

              <hr></hr>
              <p className="d-flex justify-content-between">
                <span className="p-2">
                  <b>Grand Total</b>
                </span>
                <span className="p-2">{selectedPackage.packagePrice}</span>
              </p>
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
