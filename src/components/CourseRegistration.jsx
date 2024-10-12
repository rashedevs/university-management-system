import { useState } from "react";
import coursesData from "../data/courses.json";
import "../styles/CourseRegistration.css";

const CourseRegistration = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="course-registration">
      <h1>Enroll in Courses</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          required
        >
          <option value="">Select a course</option>
          {coursesData.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <button type="submit">Enroll</button>
      </form>
      {isSubmitted && <p className="success-message">Enrollment successful!</p>}
    </div>
  );
};

export default CourseRegistration;
