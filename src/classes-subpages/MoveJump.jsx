import MoveClassComponent from "./MoveClassComponent";

export default function MoveJump() {
  return (
    <MoveClassComponent
      className="Saut Réformeur"
      classDuration="50 mins"
      classDifficulty="Intermédiaire"
      classImage="/assets/logan-weaver-lgnwvr-amgv9YUg-MA-unsplash.jpg"
      classDescription={
        <p>
          Plongez dans le fitness à haute énergie avec notre classe de Pilates Jumpboard ! MOVE Jump est l'une de nos classes de Pilates Réformeur intermédiaire utilisant le Jumping Board qui vous oblige à sauter tout en étant allongé.
          <br />
          <br />
          Cette séance complète à faible impact combine force, cardio et stabilité du noyau pour un exercice amusant et efficace.
          <br />
          <br />
          Comme il s'agit de notre classe intermédiaire, vous devrez assister à au moins 5 classes de Pilates Réformeur / MOVE Control avant de pouvoir passer à MOVE Jump.{" "}
          <b>
            MOVE Jump n'est pas recommandé pour quelqu'un qui soigne des blessures à la cheville, au genou ou à la jambe.{" "}
          </b>
          <br />
          <br />
          Convient pour :
          <ul>
            {" "}
            <li>
              Clients intermédiaires/avancés. Nous suggérons 10 classes de contrôle avant de rejoindre Burn/Jump.{" "}
            </li>{" "}
            <li>
              Approchez votre instructeur amical pour des conseils si vous vous sentez incertain si la classe vous convient.{" "}
            </li>
          </ul>
          Ne convient pas pour :
          <ul>
            <li>Blessures à la cheville, au genou, à la jambe, pré-natal et clients blessés</li>
          </ul>
          <b className="text-center">
            POUR CEUX QUI AIMENT LE DÉFI (INTERMÉDIAIRE)
          </b>
        </p>
      }
    />
  );
}
