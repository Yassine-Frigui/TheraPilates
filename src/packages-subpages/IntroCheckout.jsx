import CheckoutPage from "./CheckoutComponent";

export default function IntroCheckout() {
  return (
    <CheckoutPage
      packageTitle="Starter Pack: 3 Sessions"
      classesEligibility={
        <ul className="d-flex flex-row justify-content-around">
          <li>Physiotherapy Session</li>
          <li>Therapeutic Pilates</li>
        </ul>
      }
      packageConditions={
        <ul>
          <li>for first timer, one time purchase</li>
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
