import { useState, useEffect } from "react";
import coursesData from "../data/courses.json";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "./reusable/Dropdown";
import book1 from "/images/book1.webp";

const CourseRegistration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    label: "ALL",
    value: "all",
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const dropdownOptions = [
    { label: "ALL", value: "all" },
    { label: "CSE", value: "cse" },
    { label: "EEE", value: "eee" },
    { label: "ME", value: "me" },
    { label: "CE", value: "ce" },
  ];

  const defaultDropdownOption = dropdownOptions[0];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Load enrolled courses from localStorage when the component mounts
  useEffect(() => {
    const savedCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(savedCourses);
  }, []);

  // Filter courses based on search term and selected department
  const filteredCourses = coursesData.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedOption.value === "all" ||
        course.department === selectedOption.label)
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Get current courses for the current page
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEnroll = (courseId, courseName) => {
    const updatedEnrolledCourses = [...enrolledCourses, courseId];
    setEnrolledCourses(updatedEnrolledCourses);
    localStorage.setItem(
      "enrolledCourses",
      JSON.stringify(updatedEnrolledCourses)
    );
    toast.success(`Enrolled in ${courseName} successfully!`);
  };

  const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl mt-3 mb-5 font-bold">Enroll in Courses</h2>

        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search course..."
            className="border border-green-300 rounded-lg p-2 w-full mr-2 focus:border-0 focus:outline-none focus:ring-green-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dropdown
            options={dropdownOptions}
            onSelect={(option) => {
              setSelectedOption(option);
              setCurrentPage(1);
            }}
            defaultOption={defaultDropdownOption}
          />
        </div>

        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <div
                className="lg:h-66 md:h-72 h-72 bg-white flex flex-col justify-between max-w-sm p-6 border border-gray-200 rounded-lg shadow"
                key={course.courseId}
              >
                <div>
                  <div className="flex items-start">
                    <img
                      src={book1}
                      width="40"
                      height="40"
                      alt="course image"
                    />
                    <h5 className="mb-3 ms-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
                      {course.courseName}
                    </h5>
                  </div>
                  <p className="font-semibold text-sm text-gray-700 mb-1">
                    {course.description}
                  </p>
                  <div className="flex flex-row items-center mt-1">
                    <p className="font-normal text-sm text-gray-700">
                      <span className="font-medium">Course Code :</span>{" "}
                      {course.courseId},
                    </p>
                    <p className="font-normal text-sm text-gray-700 ms-2">
                      <span className="font-medium">Credits :</span>{" "}
                      {course.credits}
                    </p>
                  </div>
                  <p className="font-normal text-sm mb-3 text-gray-700">
                    <span className="font-medium">Faculty :</span>{" "}
                    {course.faculty}
                  </p>
                </div>
                <button
                  className={`btn-tiny mx-auto md:mx-0 lg:mx-0 w-32 mt-auto my-2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg ${
                    isEnrolled(course.courseId)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  }`}
                  onClick={() =>
                    handleEnroll(course.courseId, course.courseName)
                  }
                  disabled={isEnrolled(course.courseId)}
                >
                  {isEnrolled(course.courseId) ? "Enrolled" : "Enroll"}
                </button>
              </div>
            ))
          ) : (
            <h3 className="text-red-500">No Courses Found</h3>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
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
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default CourseRegistration;
