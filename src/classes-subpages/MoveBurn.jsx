import MoveClassComponent from "./MoveClassComponent";

export default function MoveBurn() {
  return (
    <MoveClassComponent
      className="Move Burn"
      classDuration="50 mins"
      classDifficulty="Intermediate"
      classImage="/assets/bruce-mars-pFyKRmDiWEA-unsplash.jpg"
      classDescription={
        <>
          <p>
            <b>FOR THOSE WHO LIKE A CHALLENGE (INTERMEDIATE)</b>
            <br />
            <br />
            Get ready to level up your pilates with more intensity, burn, and
            endurance with a mixture of props to test and challenge your
            strength, balance, and coordination. This class keeps the intensity
            high, so prepare to work up a sweat and test your endurance.
            <br />
            <br />
            Recommended to master the basics of Reformer Control before
            proceeding to this class.
            <br />
            <br />
            <b>
              Note: Class booking available for Drop-In, or 10 classes & above
              package holders only.
            </b>
            <br />
            <br />
          </p>
          Suitable for:
          <ul>
            <li>
              Intermediate/advanced clients. We suggest 10-15 Reformer Control
              classes prior to joining Reformer Burn.
            </li>
            <li>
              Approach your friendly instructor for advice if feeling unsure if
              the class suits you.
            </li>
          </ul>
          <br />
          Not suitable for:
          <ul>
            <li>Pre Natal and injured clients</li>
          </ul>
        </>
      }
    />
  );
}
