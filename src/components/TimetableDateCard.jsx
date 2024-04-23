import { useRef, useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function TimetableDateCard({ onDateSelect }) {
  // Set up day and date array
  const [weekArray, setWeekArray] = useState([]);
  const [showArrows, setShowArrows] = useState(true);

  // On mount, render the calendar cards
  useEffect(() => {
    const currentDate = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const newWeekArray = [];

    for (let i = 0; i < 22; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      newWeekArray.push({
        dayName: days[date.getDay()],
        numDate: date.getDate().toString(),
        month: date.toLocaleString("default", { month: "short" }),
      });
    }

    setWeekArray(newWeekArray);
  }, []);

  //   Scroll behavior
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300;
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300;
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop === 0) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      style={{
        position: "relative",
        overflowX: "hidden",
        overflowY: "hidden",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        width: "100%",
        transition: "scrollLeft 0.5s ease-in-out",
      }}
    >
      {/* Arrows container */}
      <div
        style={{
          width: "100%",
          height: "30%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {showArrows && (
          <>
            <FaArrowLeft
              onClick={handleScrollLeft}
              style={{
                position: "fixed",
                top: "15rem",
                left: "4rem",
                zIndex: "2",
                cursor: "pointer",
              }}
            />

            <FaArrowRight
              onClick={handleScrollRight}
              style={{
                position: "fixed",
                top: "15rem",
                right: "4rem",
                zIndex: "2",
                cursor: "pointer",
              }}
            />
          </>
        )}
      </div>

      <Row className="flex-nowrap" style={{ zIndex: "10" }}>
        {weekArray.map((day, index) => (
          <Col key={index} xs={4} sm={4} md={2} lg={1}>
            <Card
              className="p-2 m-2 dateCard"
              key={index}
              onClick={() => onDateSelect(day)}
            >
              <Card.Title style={{ fontSize: "0.8rem" }}>
                {day.dayName}
              </Card.Title>
              <Card.Body>
                <Card.Text
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {day.numDate}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
