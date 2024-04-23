import { Button } from "react-bootstrap";

export default function OutlineButton({ text, styleClass }) {
  return (
    <Button
      className={`rounded-pill px-4 py-3 ${styleClass}`}
      style={{
        backgroundColor: "var(--font-color)",
        color: "var(--primary-color)",
        borderColor: "var(--primary-color)",
      }}
    >
      {text}
    </Button>
  );
}
