import { useState } from "react";
import facultyData from "../data/faculty.json";
import Dropdown from "./reusable/Dropdown";
import FacultyCard from "./reusable/FacultyCard";
import Modal from "./reusable/Modal";
import finding from "../assets/Animation - 1729278428371.json";
import Lottie from "lottie-react";

const FacultyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedOption, setSelectedOption] = useState({
    label: "CSE",
    value: "cse",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const filteredFaculty = facultyData.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      faculty.department == selectedOption.label
  );

  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);

  // Get current faculty items for the page
  const currentFaculty = filteredFaculty.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDetailsClick = (faculty) => {
    setSelectedFaculty(faculty);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFaculty(null);
  };
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 flex-grow overflow-y-auto">
        <h2 className="text-3xl mt-2 mb-4 font-bold">Faculty Overview</h2>

        <div className="py-3 mb-3 border-2 bg-green-500 rounded-lg text-center">
          <h1 className="ms-2 p-2 text-3xl font-bold text-white dark:text-gray-400">
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
            className="border border-green-300 rounded-lg p-2 w-full mr-2 focus:border-0 focus:outline-none focus:ring-green-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dropdown
            options={dropdownOptions}
            onSelect={(option) => setSelectedOption(option)}
            defaultOption={defaultDropdownOption}
          />
        </div>

        <div className="mt-4">
          {currentFaculty.length ? (
            currentFaculty.map((faculty) => (
              <FacultyCard
                key={faculty.id}
                name={faculty.name}
                designation={faculty.designation}
                education={faculty.education}
                department={faculty.department}
                email={faculty.email}
                subjects={faculty.subjects}
                research={faculty.research}
                imageUrl={faculty.image}
                onDetailsClick={() => handleDetailsClick(faculty)}
              />
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center items-center my-5">
              <div className="">
                <div className="mx-auto h-36 w-36 md:w-54 lg:w-72">
                  <Lottie animationData={finding}></Lottie>
                </div>
              </div>
              <div className="lg:mt-28 mx-auto text-center">
                <h1 className=" text-pink-600 font-medium text-lg mb-3">
                  No faculty data found.
                </h1>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {currentFaculty.length ? (
          <>
            <div className="flex justify-center mt-5">
              <nav aria-label="Page navigation">
                <ul className="inline-flex -space-x-px text-sm">
                  <li>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
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
          </>
        ) : (
          <></>
        )}

        {/* Render Modal */}
        {isModalOpen && selectedFaculty && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            faculty={selectedFaculty}
          />
        )}
      </div>
    </div>
  );
};

export default FacultyManagement;
