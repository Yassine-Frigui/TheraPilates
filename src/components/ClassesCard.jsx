import { Card } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import StandardButton from "./StandardButton";

export default function ClassesCard({
  classTitle,
  classImage,
  imageTitle,
  classDuration,
  classLevel,
  classDescr,
  classLink,
}) {
  const trimmedText = classDescr.trim();
  const truncatedText =
    trimmedText.length > 100 ? trimmedText.slice(0, 100) + "..." : trimmedText;

  return (
    <Card
      style={{
        height: "100%",
        backgroundColor: "var(--secondary-color)",
        color: "var(--primary-color)",
        border: "none",
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
    >
      <Card.Img
        variant="top"
        src={classImage}
        title={imageTitle}
        fluid
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      />
      <Card.Title className="mt-4"> {classTitle} </Card.Title>
      <Card.Link style={{ textDecoration: "none", color: "inherit" }}>
        <Card.Body>
          <Card.Text>
            <span className="mt-2">
              <FaRegClock />
              <b className="p-2">{classDuration}</b>
              <VscGraph />
              <b className="p-2">{classLevel}</b>
            </span>
            <p
              style={{
                paddingTop: "1rem",
                paddingBottom: "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {truncatedText}
            </p>
          </Card.Text>

          <StandardButton text="View More" classLink={classLink} />
        </Card.Body>
      </Card.Link>
    </Card>
  );
}
