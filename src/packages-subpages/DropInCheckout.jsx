import CheckoutPage from "./CheckoutComponent";

export default function DropInCheckout() {
  return (
    <CheckoutPage
      packageTitle="Drop-in: One Session"
      classesEligibility={
        <ul className="d-flex flex-row justify-content-around">
          <li>Physiotherapy Session</li>
          <li>Therapeutic Pilates</li>
          <li>Prenatal Pilates</li>
          <li>Postnatal Pilates</li>
          <li>Rehabilitation Pilates</li>
        </ul>
      }
      packageConditions={
        <ul>
          <li>
            1 reformer{" "}
            <b>
              <u>group class</u>
            </b>
          </li>
          <li>strictly non-shareable </li>
          <li>book within 30 days from date of purchase One time payment</li>
        </ul>
      }
    />
  );
}
