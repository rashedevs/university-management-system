import { useState } from "react";
import facultyData from "../data/faculty.json";
import Dropdown from "./reusable/Dropdown";

const FacultyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedOption, setSelectedOption] = useState({
    label: "CSE",
    value: "cse",
  });

  console.log("dept", selectedOption);

  const dropdownOptions = [
    { label: "CSE", value: "cse" },
    { label: "EEE", value: "eee" },
    { label: "ME", value: "me" },
    { label: "CE", value: "ce" },
  ];

  const defaultDropdownOption = dropdownOptions[0];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter faculty based on search term
  const filteredFaculty = facultyData.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);

  // Get current faculty items for the page
  const currentFaculty = filteredFaculty.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // text-[#88FF00]
  return (
    <div className="flex flex-col bg-gray-100">
      <div className="container mx-auto p-4 flex-grow overflow-y-auto">
        {/* <h2 className="text-3xl font-bold py-5">Faculty Overview</h2> */}
        <div className="py-4 mb-3 border-2 bg-green-500 rounded-sm text-center">
          <h1 className="ms-2 p-2 text-3xl font-normal text-[#88FF00] dark:text-gray-400">
            {selectedOption?.value == "cse" &&
              "Department of Computer Science & Engineering"}
            {selectedOption?.value == "eee" &&
              "Department of Electrical & Electronic Engineering"}
            {selectedOption?.value == "me" &&
              "Department of Mechanical Engineering"}
            {selectedOption?.value == "ce" && "Department of Civil Engineering"}
          </h1>
        </div>

        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search faculty..."
            className="border border-gray-300 rounded p-2 w-full mr-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dropdown
            options={dropdownOptions}
            onSelect={(option) => setSelectedOption(option)}
            defaultOption={defaultDropdownOption}
          />
        </div>

        <div className="mt-4">
          {currentFaculty.map((faculty) => (
            <div key={faculty.id}>
              <h2 id={`accordion-open-heading-${faculty.id}`}>
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl hover:bg-gray-100 gap-3"
                  onClick={() =>
                    setSelectedFaculty(
                      selectedFaculty === faculty ? null : faculty
                    )
                  }
                  aria-expanded={selectedFaculty === faculty}
                  aria-controls={`accordion-open-body-${faculty.id}`}
                >
                  <span>
                    <span className="flex items-center">{faculty.name}</span>
                    <span className="flex items-center">
                      {faculty.designation}
                    </span>
                  </span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      selectedFaculty === faculty ? "" : "rotate-180"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id={`accordion-open-body-${faculty.id}`}
                className={`border border-b-0 border-gray-200 ${
                  selectedFaculty === faculty ? "block" : "hidden"
                }`}
                aria-labelledby={`accordion-open-heading-${faculty.id}`}
              >
                <div className="p-5">
                  <p>Subjects: {faculty.subjects.join(", ")}</p>
                  <p>Office Hours: {faculty.officeHours}</p>
                  <p>Contact: {faculty.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-5">
        <nav aria-label="Page navigation">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-green-500 border border-e-0 border-green-300 rounded-s-lg hover:bg-green-600 disabled:opacity-50"
              >
                Prev
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-md ${
                    currentPage === index + 1
                      ? "text-white bg-green-500 hover:bg-green-600"
                      : "text-gray-500 bg-white hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-green-500 border border-green-300 rounded-e-lg hover:bg-green-600 disabled:opacity-50"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default FacultyManagement;
