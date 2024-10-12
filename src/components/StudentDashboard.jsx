import { useEffect, useState } from "react";
import studentsData from "../data/students.json";
import "../styles/StudentDashboard.css";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    setStudent(studentsData[0]); // Simulating fetching first student
  }, []);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="student-dashboard">
      <h1>Student Portal</h1>
      <h2>Welcome, {student.name}</h2>
      <img
        src={student.image}
        alt={`${student.name}'s profile`}
        className="student-image"
      />
      <section>
        <h3>Courses</h3>
        <ul>
          {student.courses.map((course) => (
            <li key={course}>
              {course} - Grade: {student.grades[course]}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Upcoming Events</h3>
        <ul>
          {student.events.map((event) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default StudentDashboard;
