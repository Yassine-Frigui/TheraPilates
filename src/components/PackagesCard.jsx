import { Card } from "react-bootstrap";
import StandardButton from "./StandardButton";
import { MdAttachMoney } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { CiClock2 } from "react-icons/ci";

export default function PackagesCard({
  categoryTitle,
  packageTitle,
  packagePrice,
  paymentLink,
  paymentSched,
  credits,
  access,
  validity,
}) {
  return (
    <Card
      style={{
        // height: "100%",
        backgroundColor: "var(--secondary-color)",
        color: "var(--primary-color)",
        border: "none",
        borderRadius: "15px",
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
    >
      <p className="mt-4" style={{ font: "4px", fontWeight: "500" }}>
        {" "}
        {categoryTitle}{" "}
      </p>

      <p className="mt-2" style={{ font: "10px", fontWeight: "400" }}>
        {packageTitle}
      </p>

      <Card.Link style={{ textDecoration: "none", color: "inherit" }}>
        <Card.Body>
          <Card.Text
            style={{
              padding: "1rem",
              backgroundColor: "#ffffff",
              borderRadius: "0.6rem",
            }}
          >
            <div>
              {packagePrice}
              <p>
                <MdAttachMoney />
                <span className="px-2">{credits}</span>
              </p>
              <p>
                <FaRegCalendarCheck />
                <span className="px-2">{paymentSched}</span>
              </p>
              <p>
                <GoHome />
                <span className="px-2">{access}</span>
              </p>
              <p>
                <CiClock2 />
                <span className="px-2">{validity}</span>
              </p>
            </div>
          </Card.Text>
          <StandardButton text="Buy Now" classLink={paymentLink} />
        </Card.Body>
      </Card.Link>
    </Card>
  );
}
