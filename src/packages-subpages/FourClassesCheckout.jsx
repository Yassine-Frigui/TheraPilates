import CheckoutPage from "./CheckoutComponent";

export default function FourClassesCheckout() {
  return (
    <CheckoutPage
      packageTitle="4 Classes"
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
          <li>for busy bees</li>
          <li>
            <b>3 MOOV Control group classes only</b>
          </li>
          <li>
            <b>STRICTLY non-shareable/no friend replacement/non-transferable</b>
          </li>
          <li>
            validity starts from date of first booking (activate within 1 month)
          </li>
        </ul>
      }
    />
  );
}
