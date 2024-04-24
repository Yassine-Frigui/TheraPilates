import MoveClassComponent from "./MoveClassComponent";

export default function MoveChair() {
  return (
    <MoveClassComponent
      className="Move Chair"
      classDuration="50 mins"
      classDifficulty="Beginner"
      classImage="/assets/andrew-valdivia-0-A_G_XeUqc-unsplash.jpg"
      classDescription={
        <div>
          <h3 className="text-center">
            Ready for Pilates Chair? An effective workout that feels fresh and
            exciting — perfect if you need a little extra motivation to get
            moving.
          </h3>
          <ul>
            <li>Limited to 4 slots per class only</li>
          </ul>
          <p>
            The Chair is one of the original pieces of Pilates equipment and is
            one of the most effective tools for enhancing your Pilates practice.
            Chair Pilates challenges muscles from head to toe through the use of
            body weight, control, and spring resistance. Chair Pilates offers an
            ideal chance to challenge your body in new ways. Expect to leave our
            Chair Pilates class feeling stronger, more flexible, and relaxed yet
            challenged.
          </p>
        </div>
      }
    />
  );
}
