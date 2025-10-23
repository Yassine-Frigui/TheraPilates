import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import ClassesCard from "../components/ClassesCard";
import Image1 from "/assets/img_5.jpg";
import Image2 from "/assets/img_6.jpg";
import Image3 from "/assets/logan-weaver-lgnwvr-amgv9YUg-MA-unsplash.jpg";
import Image4 from "/assets/andrew-valdivia-0-A_G_XeUqc-unsplash.jpg";

export default function ClassesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const cardData = [
    {
      classTitle: "Séance de Physiothérapie",
      classImage: Image1,
      imageTitle: "Photo par bruce mars sur Unsplash",
      classDuration: "50 mins",
      classLevel: "Débutant",
      classDescr: `
          PREMIÈRE FOIS ? COMMENCEZ ICI. Notre Séance de Physiothérapie convient à tous les niveaux, y compris les débutants. Elle se concentre sur l'évaluation et le traitement pour améliorer le mouvement et la fonction.
          Cette séance vous aidera avec le contrôle musculaire, l'équilibre et la coordination grâce à des exercices thérapeutiques.
        `,
      classLink: "/movecontrol",
    },
    {
      classTitle: "Pilates Thérapeutique",
      classImage: Image2,
      imageTitle: "Photo par bruce mars sur Unsplash",
      classDuration: "50 mins",
      classLevel: "Débutant",
      classDescr: `
          Découvrez le pouvoir guérisseur du Pilates. Le Pilates Thérapeutique combine le Pilates traditionnel avec les principes de physiothérapie pour répondre à des besoins de santé spécifiques.
          Améliorez votre force, votre flexibilité et votre posture dans un environnement favorable.
        `,
      classLink: "/moveburn",
    },
    {
      classTitle: "Pilates Prénatal",
      classImage: Image3,
      imageTitle: "Photo par LOGAN WEAVER | @LGNWVR sur Unsplash",
      classDuration: "50 mins",
      classLevel: "Débutant",
      classDescr: `
          Préparez-vous à l'accouchement avec notre classe spécialisée de Pilates Prénatal. Conçue pour les futures mamans, cette séance se concentre sur le renforcement du noyau, l'amélioration de la posture et la promotion de la relaxation.
          Exercices sûrs et efficaces pour vous soutenir pendant la grossesse.
        `,
      classLink: "/movejump",
    },
    {
      classTitle: "Pilates Postnatal",
      classImage: Image4,
      imageTitle: "Photo par Andrew Valdivia sur Unsplash",
      classDuration: "50 mins",
      classLevel: "Débutant",
      classDescr: `
          Récupérez et renforcez-vous après l'accouchement avec le Pilates Postnatal. Cette classe aide à restaurer la force du noyau, à améliorer la fonction du plancher pelvien et à retrouver confiance en votre corps.
          Exercices doux mais efficaces adaptés aux nouvelles mamans.
        `,
      classLink: "/movechair",
    },
  ];

  const filterCards = () => {
    if (selectedDifficulty === "all") {
      return cardData;
    } else {
      return cardData.filter((card) => card.classLevel === selectedDifficulty);
    }
  };

  const filteredCards = filterCards();

  const handleChangeDifficulty = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  return (
    <>
      {/* Classes cards grid display */}
      <Container>
        <div
          style={{
            marginTop: "8rem",
            marginBottom: "2rem",
            color: "var(--primary-color)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row sm={2}>
            <h2 className="mb-4">Séances</h2>

            {/* Filter controls */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={handleChangeDifficulty}
                onClick={filteredCards}
                style={{
                  width: "15rem",
                  height: "4rem",
                  padding: "1rem",
                  border: "1px",
                  borderColor: "grey",
                  borderStyle: "solid",
                  borderRadius: "8px",
                  backgroundColor: "var(--secondary-color)",
                }}
              >
                <option value="all" selected>
                  Toutes les Séances
                </option>
                <option value="Beginner">Débutant</option>
                <option value="Intermediate">Intermédiaire</option>
                <option value="Advanced">Avancé</option>
              </select>
            </div>

            {/* Render filtered cards */}
            {filteredCards.length === 0 ? (
              <p className="mt-4">Aucune séance trouvée</p>
            ) : (
              filteredCards.map((card, index) => (
                <Col key={index} sm={4} className="mt-4">
                  <ClassesCard
                    classTitle={card.classTitle}
                    classImage={card.classImage}
                    imageTitle={card.imageTitle}
                    classDuration={card.classDuration}
                    classLevel={card.classLevel}
                    classDescr={card.classDescr}
                    classLink={card.classLink}
                  />
                </Col>
              ))
            )}
          </Row>
        </div>
      </Container>
    </>
  );
}
