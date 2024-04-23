import CheckoutPage from "./CheckoutComponent";

export default function ClassesBundleCheckout() {
  return (
    <CheckoutPage
      packageTitle="25 Classes"
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
          <li>25 Reformer group classes</li>
          <li>
            <b>shareable with 1 friend</b>
          </li>
          <li>validity starts from date of purchase</li>
          <li>
            BNPL available upon WhatsApp request (3 months installment, 0%
            interest via Atome){" "}
          </li>
        </ul>
      }
    />
  );
}
