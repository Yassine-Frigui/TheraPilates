import MoveClassComponent from "./MoveClassComponent";


export default function MoveControl() {
  return (
    <MoveClassComponent
      className="Move Control"
      classDuration="50 mins"
      classDifficulty="Beginner"
      classImage="../assets/bruce-mars-gJtDg6WfMlQ-unsplash.jpg"
      classDescription={
        <p>
          <i>
            <b>HINT: FIRST TIME? START HERE.</b>
          </i>
          Reformer Control is a class suitable for all levels, including
          beginners. It focuses on full-body exercises that help improve
          fundamental movement patterns.
          <br />
          <br />
          This beginner-friendly full body class will train you in muscle
          control, balance, coordination.
          <br />
          <br />
          The class offers progressions and modifications to tailor to your
          fitness level, ensuring a challenging and fulfilling workout that will
          leave you feeling energised.
          <br />
          <br />
          Suitable for:
          <ul>
            <li>First-Timers / Beginners </li>
            <li>All-levels friendly</li>
          </ul>
        </p>
      }
    />
  );
}
