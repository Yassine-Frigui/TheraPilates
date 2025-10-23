import MoveClassComponent from "./MoveClassComponent";

export default function MoveControl() {
  return (
    <MoveClassComponent
      className="Contrôle Réformeur"
      classDuration="50 mins"
      classDifficulty="Débutant"
      classImage="/assets/bruce-mars-gJtDg6WfMlQ-unsplash.jpg"
      classDescription={
        <p>
          <i>
            <b>CONSEIL : PREMIÈRE FOIS ? COMMENCEZ ICI.</b>
          </i>
          Le Contrôle Réformeur est une classe adaptée à tous les niveaux, y compris les débutants. Elle se concentre sur des exercices complets du corps qui aident à améliorer les schémas de mouvement fondamentaux.
          <br />
          <br />
          Cette classe complète pour débutants vous entraînera au contrôle musculaire, à l'équilibre, à la coordination.
          <br />
          <br />
          La classe offre des progressions et des modifications pour s'adapter à votre niveau de forme physique, assurant un entraînement stimulant et enrichissant qui vous laissera énergisé.
          <br />
          <br />
          Adapté pour :
          <ul>
            <li>Première fois / Débutants</li>
            <li>Convivial pour tous niveaux</li>
          </ul>
        </p>
      }
    />
  );
}
