import CheckoutPage from "./CheckoutComponent";

export default function DropInCheckout() {
  return (
    <CheckoutPage
      packageTitle="Drop-in: One Class"
      classesEligibility={
        <ul className="d-flex flex-row justify-content-around">
          <li>MOVE Chair (All-Levels)</li>
          <li>MOVE Control</li>
          <li>MOVE Jump (INT)</li>
          <li>MOVE Burn (INT)</li>
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
