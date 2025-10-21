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
      classTitle: "Physiotherapy Session",
      classImage: Image1,
      imageTitle: "Photo by bruce mars on Unsplash",
      classDuration: "50 mins",
      classLevel: "Beginner",
      classDescr: `
          FIRST TIME? START HERE. Our Physiotherapy Session is suitable for all levels, including beginners. It focuses on assessment and treatment to improve movement and function.
          This session will help you with muscle control, balance, and coordination through therapeutic exercises.
        `,
      classLink: "/movecontrol",
    },
    {
      classTitle: "Therapeutic Pilates",
      classImage: Image2,
      imageTitle: "Photo by bruce mars on Unsplash",
      classDuration: "50 mins",
      classLevel: "Beginner",
      classDescr: `
          Experience the healing power of Pilates. Therapeutic Pilates combines traditional Pilates with physiotherapy principles to address specific health needs.
          Improve your strength, flexibility, and posture in a supportive environment.
        `,
      classLink: "/moveburn",
    },
    {
      classTitle: "Prenatal Pilates",
      classImage: Image3,
      imageTitle: "Photo by LOGAN WEAVER | @LGNWVR on Unsplash",
      classDuration: "50 mins",
      classLevel: "Beginner",
      classDescr: `
          Prepare for childbirth with our specialized Prenatal Pilates class. Designed for expectant mothers, this session focuses on strengthening the core, improving posture, and promoting relaxation.
          Safe and effective exercises to support you through pregnancy.
        `,
      classLink: "/movejump",
    },
    {
      classTitle: "Postnatal Pilates",
      classImage: Image4,
      imageTitle: "Photo by Andrew Valdivia on Unsplash",
      classDuration: "50 mins",
      classLevel: "Beginner",
      classDescr: `
          Recover and strengthen after childbirth with Postnatal Pilates. This class helps restore core strength, improve pelvic floor function, and regain confidence in your body.
          Gentle yet effective exercises tailored for new mothers.
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
            <h2 className="mb-4">Sessions</h2>

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
                  All Sessions
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Render filtered cards */}
            {filteredCards.length === 0 ? (
              <p className="mt-4">No sessions found</p>
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
