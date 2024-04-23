import { Button } from "react-bootstrap";

export default function StandardButton({
  text,
  styleClass,
  type,
  classLink,
  onClick,
}) {
  return (
    <>
      <a href={classLink}>
        <Button
          type={type}
          className={`rounded-pill px-4 py-3 ${styleClass}`}
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--font-color)",
            border: "none",
            minWidth: "120px",
            minHeight: "40px",
          }}
          onClick={onClick}
        >
          {text}
        </Button>
      </a>
    </>
  );
}
