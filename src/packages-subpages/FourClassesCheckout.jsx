import CheckoutPage from "./CheckoutComponent";

export default function FourClassesCheckout() {
  return (
    <CheckoutPage
      packageTitle="4 Sessions"
      classesEligibility={
        <ul className="d-flex flex-row justify-content-around">
          <li>Physiotherapy Session</li>
          <li>Therapeutic Pilates</li>
          <li>Prenatal Pilates</li>
          <li>Postnatal Pilates</li>
        </ul>
      }
      packageConditions={
        <ul>
          <li>for busy bees</li>
          <li>
            <b>3 Therapeutic Pilates sessions only</b>
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
