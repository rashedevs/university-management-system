import { useState } from "react";
import facultyData from "../data/faculty.json";

const FacultyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const filteredFaculty = facultyData.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold py-5">Faculty Overview</h2>
      <input
        type="text"
        placeholder="Search faculty..."
        className="border border-gray-300 rounded p-2 w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="mt-4">
        {filteredFaculty.map((faculty) => (
          <li
            key={faculty.id}
            className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg my-2"
          >
            <div>
              <h3 className="font-semibold">{faculty.name}</h3>
              <p>{faculty.designation}</p>
            </div>

            {selectedFaculty === faculty && (
              <div className="mt-2">
                <p>Subjects: {faculty.subjects.join(", ")}</p>
                <p>Office Hours: {faculty.officeHours}</p>
                <p>Contact: {faculty.contact}</p>
              </div>
            )}
            <button
              onClick={() =>
                setSelectedFaculty(selectedFaculty === faculty ? null : faculty)
              }
              // className="bg-blue-800 hover:bg-blue-700 text-white rounded px-4 py-2"
              className="bg-yellow-500 hover:bg-yellow-400 text-white rounded px-4 py-2"
            >
              Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyManagement;
