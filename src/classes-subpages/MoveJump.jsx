import MoveClassComponent from "./MoveClassComponent";

export default function MoveJump() {
  return (
    <MoveClassComponent
      className="Move Jump"
      classDuration="50 mins"
      classDifficulty="Intermediate"
      classImage="/assets/logan-weaver-lgnwvr-amgv9YUg-MA-unsplash.jpg"
      classDescription={
        <p>
          Dive into high-energy fitness with our Pilates Jumpboard class! MOVE
          Jump is one of our intermediate Reformer Pilates classes utilising the
          Jumping Board which requires you to jump while you are laying down.
          <br />
          <br />
          This low-impact, full-body session combines strength, cardio, and core
          stability for a fun and effective exercise.
          <br />
          <br />
          As this is our intermediate class, you will need to attend at least 5
          Reformer Pilates / MOVE Control classes before you can go for MOVE
          Jump.{" "}
          <b>
            MOVE Jump is not recommended for someone who is nursing ankle, knee
            or leg injuries.{" "}
          </b>
          <br />
          <br />
          Suitable for:
          <ul>
            {" "}
            <li>
              Intermediate/advanced clients. We suggest 10 control classes prior
              to joining Burn/Jump.{" "}
            </li>{" "}
            <li>
              Approach your friendly instructor for advice if feeling unsure if
              the class suits you.{" "}
            </li>
          </ul>
          Not suitable for:
          <ul>
            <li>Ankle, Knee, Leg injuries Pre Natal and injured clients</li>
          </ul>
          <b className="text-center">
            FOR THOSE WHO LIKE A CHALLENGE (INTERMEDIATE)
          </b>
        </p>
      }
    />
  );
}
