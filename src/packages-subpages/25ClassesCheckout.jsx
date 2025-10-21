import CheckoutPage from "./CheckoutComponent";

export default function ClassesBundleCheckout() {
  return (
    <CheckoutPage
      packageTitle="25 Sessions"
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
          <li>25 therapeutic sessions</li>
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
