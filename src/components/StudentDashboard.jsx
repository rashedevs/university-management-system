import { useEffect, useState } from "react";
import studentsData from "../data/students.json";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    setStudent(studentsData[0]); // Simulating fetching first student
  }, []);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">Student Portal</h2>
      <h3 className="text-xl">Welcome, {student.name}</h3>
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <h4 className="text-lg font-semibold">Courses</h4>
        <ul>
          {student.courses.map((course) => (
            <li key={course} className="border-b py-2">
              {course} - Grade: {student.grades[course]}
            </li>
          ))}
        </ul>
        <h4 className="text-lg font-semibold mt-4">Upcoming Events</h4>
        <ul>
          {student.events.map((event) => (
            <li key={event} className="border-b py-2">
              {event}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
