import MoveClassComponent from "./MoveClassComponent";

export default function MoveChair() {
  return (
    <MoveClassComponent
      className="Chaise Pilates"
      classDuration="50 mins"
      classDifficulty="Débutant"
      classImage="/assets/andrew-valdivia-0-A_G_XeUqc-unsplash.jpg"
      classDescription={
        <div>
          <h3 className="text-center">
            Prêt pour la Chaise Pilates ? Un entraînement efficace qui se sent frais et excitant — parfait si vous avez besoin d'un peu de motivation supplémentaire pour bouger.
          </h3>
          <ul>
            <li>Limité à 4 places par classe seulement</li>
          </ul>
          <p>
            La Chaise est l'un des équipements originaux de Pilates et est l'un des outils les plus efficaces pour améliorer votre pratique de Pilates. La Chaise Pilates défie les muscles de la tête aux pieds grâce à l'utilisation du poids du corps, du contrôle et de la résistance des ressorts. La Chaise Pilates offre une occasion idéale de défier votre corps de nouvelles manières. Attendez-vous à quitter notre classe de Chaise Pilates en vous sentant plus fort, plus flexible et détendu mais défié.
          </p>
        </div>
      }
    />
  );
}
