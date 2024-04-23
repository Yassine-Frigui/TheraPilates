import { Container, Row } from "react-bootstrap";

export default function StudioPolicies() {
  return (
    <Container>
      <Row style={{ color: "var(--primary-color)" }}>
        <div style={{ marginTop: "8rem" }} className="mb-4">
          <h1 style={{ textAlign: "center", padding: "2rem" }}>
            Studio Policies
          </h1>
          <h3>Thank you for honouring our studio policies.</h3>
          <h3>
            Before making a purchase, please consider our Late Arrival Policy.
            For safety, you will not be permitted to join after class begins*.
            Please arrive early for a smooth check-in experience.
          </h3>
          <ul className="m-4">
            <li>
              All packages purchased are strictly non-refundable,
              non-exchangeable, & non- transferable.{" "}
            </li>
            <li>
              {" "}
              We have a strict 15-hour Cancellation Policy for all bookings. For
              emergencies, we offer a &quot;Save Your Credit&quot; perk in our
              studio, where you have up to 3 chances/month to save your credits
              with RM40/save if you are unable to make class last minute with
              valid reasons. You will need to inform us BEFORE your designated
              class time & make payment within the same day in order to save
              your credit.
            </li>
            <li>
              In unforeseen events, if you wish to transfer your credits with
              valid reasons and approval from the management, you will be
              required to pay a RM100 package transfer fee.
            </li>
            <li>
              If you wish to freeze your package for valid reasons, there will
              be a RM80/monthly charges per freeze. You may only freeze up to 3
              months per package.
            </li>
          </ul>
          <u>Bookings Online </u>
          <p>Bookings via our website are required for all sessions. </p>
          <u>Arrival Time </u>
          <p>
            Please arrive 5 minutes early for a smooth check-in experience. For
            safety reasons, you will NOT be permitted to join the class when
            arriving 10 minutes after class begins.{" "}
          </p>
          <u>Socks Etiquette </u>{" "}
          <p>
            For hygiene & safety purposes grip socks are required for all
            Equipment classes and appointments. Grippy socks are available for
            purchase at our studios.
          </p>
          <u>No Phones </u>
          <p>
            We promote a tech-free space at WO for your safety and out of
            respect for the instructor teaching. Unless in cases of emergency,
            please leave your phone with your belongings while class is in
            session. Do yourself a favour and make yourself unavailable for just
            an hour. Your brain and cortisol levels will thank you.{" "}
          </p>
          <u>Cash Free Establishment </u>
          <p>
            We are a cash free establishment. Kindly make payment via our
            website, DuitNow QR code, or instant bank transfer for all services
            and products purchase.{" "}
          </p>
          <u>Cancellations</u>
          <p>
            We understand that life can be unpredictable. Thank you for
            respecting our safety policy and honoring our strict 12 hour
            cancellation policy for all bookings. Please note that all
            cancellations or changes received via text or email are not valid.
            All cancellations or changes must be managed online via our website
            at least 12 hours prior to your booking to avoid forfeiting your
            credit.
          </p>
        </div>
      </Row>
    </Container>
  );
}
