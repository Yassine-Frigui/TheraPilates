import { Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { ClassesData } from "./ClassesData";
import StandardButton from "../components/StandardButton";
import TimetableFilterComponent from "./TimetableFilterComponent";

const ClassList = ({ dayOfWeek, numDate, selectedMonth }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    location: [],
    class: [],
    instructor: [],
    difficulty: [],
  });

  // Filter classes based on the specified day of the week and selected filters
  const filteredClasses = ClassesData.filter((classItem) => {
    const {
      category,
      location,
      class: selectedClasses,
      instructor,
      difficulty,
    } = selectedFilters;

    console.log("Selected Filters:", selectedFilters);

    return (
      classItem.dates.includes(dayOfWeek) &&
      (category.length === 0 ||
        category.some((c) => classItem.category.includes(c))) &&
      (location.length === 0 ||
        location.some((l) => classItem.location.includes(l))) &&
      (selectedClasses.length === 0 ||
        selectedClasses.some((c) => classItem.class.includes(c))) &&
      (instructor.length === 0 ||
        instructor.some((i) => classItem.instructor.includes(i))) &&
      (difficulty.length === 0 ||
        difficulty.some((d) => classItem.difficulty.includes(d)))
    );
  });

  console.log("Filtered Classes:", filteredClasses);

  // Custom sorting function for time strings in AM/PM format

  // Sort filtered classes by time in ascending order

  // Initialize a variable to render all classes for the specified day
  const allClassesForDay = ClassesData.filter((classItem) =>
    classItem.dates.includes(dayOfWeek)
  );

  return (
    <div>
      {/* Filter Component */}
      <TimetableFilterComponent setSelectedFilters={setSelectedFilters} />

      <Row>
        <h3 className="mt-4 d-flex align-items-center text-justify">
          {dayOfWeek}
          &nbsp;
          {selectedMonth}
          &nbsp;
          {numDate}
        </h3>
      </Row>

      {/* Class Listing */}
      {/* If no filter selected, all classes of the day will be rendered */}
      {selectedFilters.category.length === 0 &&
      selectedFilters.location.length === 0 &&
      selectedFilters.class.length === 0 &&
      selectedFilters.instructor.length === 0 &&
      selectedFilters.difficulty.length === 0 ? (
        // Render all classes for the specified day if no filters are selected
        allClassesForDay.map((classItem, index) => (
          <ClassItem key={index} classData={classItem} />
        ))
      ) : filteredClasses.length > 0 ? (
        // Render filtered classes if there are any
        filteredClasses.map((classItem, index) => (
          <ClassItem key={index} classData={classItem} />
        ))
      ) : (
        // Render a message if no classes meet the filter criteria
        <p className="my-4 text-center">
          Unfortunately, there are currently no classes that match your selected
          filter criteria.
        </p>
      )}
    </div>
  );
};

const ClassItem = ({ classData }) => {
  const { time, class: classTitle, instructor, location, room } = classData;

  return (
    <>
      {time.map((classTime, timeIndex) => (
        <Row key={timeIndex} className="d-flex align-items-center">
          <Col sm={4} md={4} lg={2} className="text-center">
            <p>{classTime}</p>
          </Col>
          <Col sm={10} md={8} lg={10}>
            <Card
              className="p-4 m-4 d-flex flex-row justify-content-center"
              style={{
                color: "var(--primary-color)",
                backgroundColor: "var(--secondary-color)",
                borderRadius: "20px",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Col className="col-xs-12 p-2">
                <h5>{classTitle}</h5>
                <p>
                  <b>Instructor: </b>
                  {instructor}
                </p>
              </Col>

              <Col className="col-xs-12 p-2">
                <p>
                  <b>Location: </b>
                  {location}
                </p>
                <p>
                  <b>Room: </b>
                  {room}
                </p>
              </Col>

              <Col className="ml-4 p-2 col-xs-4">
                <StandardButton text={"Book Now"} classLink={"/packages"} />
              </Col>
            </Card>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default ClassList;
