import { Row, Col } from "react-bootstrap";
import { ClassesData } from "./ClassesData";
import { useState, useEffect } from "react";
import { Multiselect } from "multiselect-react-dropdown";

const TimetableFilterComponent = ({ setSelectedFilters }) => {
  // State for selected options in each filter category
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState([]);
  const [selectedDifficultyLevels, setSelectedDifficultyLevels] = useState([]);

  // useEffect to clear filters when user changes filter selection
  useEffect(() => {
    setSelectedFilters({
      category: selectedCategory,
      location: selectedLocation,
      class: selectedClasses,
      instructor: selectedInstructor,
      difficulty: selectedDifficultyLevels,
    });
  }, [
    selectedCategory,
    selectedLocation,
    selectedClasses,
    selectedInstructor,
    selectedDifficultyLevels,
    setSelectedFilters,
  ]);

  // Create arrays from ClassesData.js
  const categories = [...new Set(ClassesData.map((item) => item.category))];
  const locations = [...new Set(ClassesData.map((item) => item.location))];
  const classes = [...new Set(ClassesData.map((item) => item.class))];
  const instructors = [...new Set(ClassesData.map((item) => item.instructor))];
  const difficultyLevels = [
    ...new Set(ClassesData.map((item) => item.difficulty)),
  ];

  return (
    <Row
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        backgroundColor: "var(--secondary-color)",
      }}
    >
      {/* Category Filter */}

      <Col className="p-2 text-center" style={{ borderRight: "solid 2px" }}>
        <Multiselect
          options={categories.map((category) => ({
            name: category,
            id: category,
          }))}
          displayValue="name"
          placeholder="Categories"
          onSelect={(selectedList) =>
            setSelectedCategory(selectedList.map((item) => item.name))
          }
          onRemove={(selectedList) =>
            setSelectedCategory(selectedList.map((item) => item.name))
          }
          selectedValues={selectedCategory.map((category) => ({
            name: category,
            id: category,
          }))}
        />
      </Col>

      {/* Location Filter */}
      <Col className="p-2 text-center" style={{ borderRight: "solid 2px" }}>
        <Multiselect
          options={locations.map((location) => ({
            name: location,
            id: location,
          }))}
          displayValue="name"
          placeholder="Locations"
          onSelect={(selectedList) =>
            setSelectedLocation(selectedList.map((item) => item.name))
          }
          onRemove={(selectedList) =>
            setSelectedLocation(selectedList.map((item) => item.name))
          }
          selectedValues={selectedLocation.map((location) => ({
            name: location,
            id: location,
          }))}
        />
      </Col>

      {/* Classes Filter */}
      <Col className="p-2 text-center" style={{ borderRight: "solid 2px" }}>
        <Multiselect
          options={classes.map((classItem) => ({
            name: classItem,
            id: classItem,
          }))}
          displayValue="name"
          placeholder="Classes"
          onSelect={(selectedList) =>
            setSelectedClasses(selectedList.map((item) => item.name))
          }
          onRemove={(selectedList) =>
            setSelectedClasses(selectedList.map((item) => item.name))
          }
          selectedValues={selectedClasses.map((classItem) => ({
            name: classItem,
            id: classItem,
          }))}
        />
      </Col>

      {/* Instructors Filter */}
      <Col className="p-2 text-center" style={{ borderRight: "solid 2px" }}>
        <Multiselect
          options={instructors.map((instructor) => ({
            name: instructor,
            id: instructor,
          }))}
          displayValue="name"
          placeholder="Instructors"
          onSelect={(selectedList) =>
            setSelectedInstructor(selectedList.map((item) => item.name))
          }
          onRemove={(selectedList) =>
            setSelectedInstructor(selectedList.map((item) => item.name))
          }
          selectedValues={selectedInstructor.map((instructor) => ({
            name: instructor,
            id: instructor,
          }))}
        />
      </Col>

      {/* Difficulty Levels Filter */}
      <Col className="p-2 text-center">
        <Multiselect
          options={difficultyLevels.map((level) => ({
            name: level,
            id: level,
          }))}
          displayValue="name"
          placeholder="Difficulty levels"
          onSelect={(selectedList) =>
            setSelectedDifficultyLevels(selectedList.map((item) => item.name))
          }
          onRemove={(selectedList) =>
            setSelectedDifficultyLevels(selectedList.map((item) => item.name))
          }
          selectedValues={selectedDifficultyLevels.map((level) => ({
            name: level,
            id: level,
          }))}
        />
      </Col>
    </Row>
  );
};

export default TimetableFilterComponent;
