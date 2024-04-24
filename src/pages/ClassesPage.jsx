import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import ClassesCard from "../components/ClassesCard";
import Image1 from "/assets/bruce-mars-gJtDg6WfMlQ-unsplash.jpg";
import Image2 from "/assets/bruce-mars-pFyKRmDiWEA-unsplash.jpg";
import Image3 from "/assets/logan-weaver-lgnwvr-amgv9YUg-MA-unsplash.jpg";
import Image4 from "/assets/andrew-valdivia-0-A_G_XeUqc-unsplash.jpg";

export default function ClassesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const cardData = [
    {
      classTitle: "MOVE control",
      classImage: Image1,
      imageTitle: "Photo by bruce mars on Unsplash",
      classDuration: "50 mins",
      classLevel: "Beginner",
      classDescr: `
          HINT: FIRST TIME? START HERE. Reformer Control is a class suitable for all levels, including beginners. It focuses on full-body exercises that help improve fundamental movement patterns.
          This beginner-friendly full body class will train you in muscle control, balance, coordination.
        `,
      classLink: "/movecontrol",
    },
    {
      classTitle: "MOVE Burn (INT)",
      classImage: Image2,
      imageTitle: "Photo by bruce mars on Unsplash",
      classDuration: "50 mins",
      classLevel: "Intermediate",
      classDescr: `
          FOR THOSE WHO LIKE A CHALLENGE (INTERMEDIATE)
          Get ready to level up your pilates with more intensity, burn, and endurance with mixture of props to test and challenge your strength, balance and co-ordination. This class keeps the intensity high, so prepare to work up a sweat and test your endurance.
        `,
      classLink: "/moveburn",
    },
    {
      classTitle: "MOVE Jump (INT)",
      classImage: Image3,
      imageTitle: "Photo by LOGAN WEAVER | @LGNWVR on Unsplash",
      classDuration: "50 mins",
      classLevel: "Intermediate",
      classDescr: `
          Dive into high-energy fitness with our Pilates Jumpboard class! MOOV Jump is one of our intermediate Reformer Pilates classes utilising the Jumping Board which requires you to jump while you are laying down. 
          This low-impact, full-body session combines strength, cardio, and core stability for a fun and effective exercise.
        `,
      classLink: "/movejump",
    },
    {
      classTitle: "MOVE Chair (All Levels)",
      classImage: Image4,
      imageTitle: "Photo by Andrew Valdivia on Unsplash",
      classDuration: "50 mins",
      classLevel: "Beginner",
      classDescr: `
          Ready for Pilates Chair? An effective workout that feels fresh and exciting — perfect if you need a little extra motivation to get moving. 
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
            <h2 className="mb-4">Classes</h2>

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
                  All Classes
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Render filtered cards */}
            {filteredCards.length === 0 ? (
              <p className="mt-4">No classes found</p>
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
