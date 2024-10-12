import { useState } from "react";
import facultyData from "../data/faculty.json";
import "../styles/FacultyManagement.css";

const FacultyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const filteredFaculty = facultyData.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faculty-management">
      <h1>Faculty Overview</h1>
      <input
        type="text"
        placeholder="Search faculty..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredFaculty.map((faculty) => (
          <li key={faculty.id} onClick={() => setSelectedFaculty(faculty)}>
            <img
              src={faculty.image}
              alt={faculty.name}
              className="faculty-image"
            />
            <h3>
              {faculty.name} - {faculty.designation}
            </h3>
            {selectedFaculty && selectedFaculty.id === faculty.id && (
              <div className="faculty-details">
                <p>Subjects: {faculty.subjects.join(", ")}</p>
                <p>Office Hours: {faculty.officeHours}</p>
                <p>Contact: {faculty.contact}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyManagement;
