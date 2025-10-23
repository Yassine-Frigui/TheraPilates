import MoveClassComponent from "./MoveClassComponent";

export default function MoveBurn() {
  return (
    <MoveClassComponent
      className="Brûlure Réformeur"
      classDuration="50 mins"
      classDifficulty="Intermédiaire"
      classImage="/assets/bruce-mars-pFyKRmDiWEA-unsplash.jpg"
      classDescription={
        <>
          <p>
            <b>POUR CEUX QUI AIMENT LE DÉFI (INTERMÉDIAIRE)</b>
            <br />
            <br />
            Préparez-vous à monter d'un niveau votre pilates avec plus d'intensité, de brûlure et d'endurance avec un mélange d'accessoires pour tester et défier votre force, votre équilibre et votre coordination. Cette classe maintient l'intensité élevée, alors préparez-vous à transpirer et à tester votre endurance.
            <br />
            <br />
            Recommandé de maîtriser les bases du Contrôle Réformeur avant de passer à cette classe.
            <br />
            <br />
            <b>
              Note : Réservation de classe disponible pour Drop-In, ou détenteurs de forfaits de 10 classes et plus seulement.
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
