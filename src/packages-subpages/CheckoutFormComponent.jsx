import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import StandardButton from "../components/StandardButton";

const CreditCardForm = () => {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="cardholderName">
        <Form.Label className="pt-2">Cardholder Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter cardholder name"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="cardNumber">
        <Form.Label className="pt-2">Card Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </Form.Group>

      <Row>
        <Form.Group as={Col} controlId="expiryDate">
          <Form.Label className="pt-2">Expiry Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="securityCode">
          <Form.Label className="pt-2">Security Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter security code"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            required
          />
        </Form.Group>
      </Row>

      <div className="mt-4">
        <StandardButton
          text="Confirm and pay"
          type={"submit"}
          styleClass={"w-100"}
        />
      </div>
    </Form>
  );
};

export default CreditCardForm;
