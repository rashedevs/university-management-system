import { useState, useEffect } from "react";
import coursesData from "../data/courses.json";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "./reusable/Dropdown";
import book1 from "/images/book1.webp";
import "react-toastify/dist/ReactToastify.css";

const CourseRegistration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    label: "ALL",
    value: "all",
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // State for registration number and error messages
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", registrationNumber: "" });

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

  useEffect(() => {
    const savedCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(savedCourses);
  }, []);

  const filteredCourses = coursesData.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedOption.value === "all" ||
        course.department === selectedOption.label)
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEnroll = (courseId, faculty, courseName) => {
    setSelectedCourse({ courseId, faculty, courseName });
    setIsModalOpen(true);
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { email: "", registrationNumber: "" };

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required.";
      formIsValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format.";
      formIsValid = false;
    }

    // Registration number validation
    const registrationPattern = /^\d{5}$/;
    if (!registrationNumber) {
      newErrors.registrationNumber = "Registration number is required.";
      formIsValid = false;
    } else if (!registrationPattern.test(registrationNumber)) {
      newErrors.registrationNumber =
        "Registration number must be a 5-digit number.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedEnrolledCourses = [
        ...enrolledCourses,
        selectedCourse.courseId,
      ];
      setEnrolledCourses(updatedEnrolledCourses);
      localStorage.setItem(
        "enrolledCourses",
        JSON.stringify(updatedEnrolledCourses)
      );
      setIsModalOpen(false);
      toast.success(`Enrolled in ${selectedCourse.courseName} successfully!`);
      // Reset form fields
      setEmail("");
      setRegistrationNumber("");
      setErrors({ email: "", registrationNumber: "" });
    }
  };

  const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl mt-2 mb-5 font-bold">Enroll in Courses</h2>

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
                className="lg:h-64 md:h-66 h-68 bg-white flex flex-col justify-between max-w-sm p-6 border border-gray-100 rounded-lg shadow-lg"
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
                    handleEnroll(
                      course.courseId,
                      course.faculty,
                      course.courseName
                    )
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

        {isModalOpen && (
          <div className="fixed inset-0 p-5 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-5 text-2xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>

              <h2 className="text-xl font-bold mb-4">Complete Enrollment</h2>

              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="courseName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    value={selectedCourse.courseName}
                    readOnly
                    className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="faculty"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Faculty
                  </label>
                  <input
                    type="text"
                    id="faculty"
                    value={selectedCourse.faculty}
                    readOnly
                    className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="registrationNumber"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Registration Number <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="registrationNumber"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className={`bg-gray-50 border ${
                      errors.registrationNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                    placeholder="5-digit registration number"
                    required
                  />
                  {errors.registrationNumber && (
                    <p className="text-red-500 text-xs font-medium mt-1">
                      {errors.registrationNumber}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Your email <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-gray-50 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                    placeholder="your email"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs font-medium mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRegistration;
