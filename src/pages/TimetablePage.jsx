import { Container, Row } from "react-bootstrap";
import TimetableDateCard from "../components/TimetableDateCard";
import ClassList from "../components/TimetableListing";
import { useState } from "react";

export default function TimetablePage() {
  // Initialize current date = default value when user hasn't selected a date
  const today = new Date();
  const defaultDay = today.toLocaleString("default", { weekday: "short" });
  const defaultNumDate = today.getDate().toString();
  const defaultMonth = today.toLocaleString("default", { month: "short" });

  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [selectedNumDate, setSelectedNumDate] = useState(defaultNumDate);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  // When user selects a date
  const handleDateSelect = (day) => {
    const { dayName, numDate, month } = day;
    setSelectedDay(dayName);
    setSelectedNumDate(numDate);
    setSelectedMonth(month);
  };

  return (
    <Container
      style={{
        marginTop: "8rem",
        color: "var(--primary-color)",
      }}
    >
      <Row>
        <h2 className="mb-4">Timetable</h2>
      </Row>

      <TimetableDateCard onDateSelect={handleDateSelect} />
      <ClassList
        dayOfWeek={selectedDay}
        numDate={selectedNumDate}
        selectedMonth={selectedMonth}
      />
    </Container>
  );
}
