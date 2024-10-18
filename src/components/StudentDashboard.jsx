import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import studentsData from "../data/students.json";
import coursesData from "../data/courses.json";
import book1 from "/images/book1.webp";
import completedCourses from "../data/completedCourses.json";
import { Bar } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import CourseModal from "./reusable/CourseModal";
import finding from "../assets/Animation - 1729278428371.json";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Lottie from "lottie-react";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const image = studentsData[0].image;

  const handleDetailsClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  useEffect(() => {
    const storedCourseIds = JSON.parse(localStorage.getItem("enrolledCourses"));
    if (storedCourseIds) {
      const filteredCourses = coursesData.filter((course) =>
        storedCourseIds.includes(course.courseId)
      );
      setEnrolledCourses(filteredCourses);
    }
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentDateNew = new Date();
  const examDate = new Date(currentDateNew);
  examDate.setDate(currentDateNew.getDate() + 25);

  // Format the exam date
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedExamDate = examDate.toLocaleDateString(undefined, options);

  const calculateCGPA = () => {
    const totalPoints = completedCourses.reduce((acc, course) => {
      const grade = course.obtainedGrade;
      let gradePoint = 0;
      if (grade === "A") gradePoint = 4.0;
      else if (grade === "B") gradePoint = 3.0;
      else if (grade === "C") gradePoint = 2.0;
      else if (grade === "D") gradePoint = 1.0;
      return acc + gradePoint;
    }, 0);

    return (totalPoints / completedCourses.length).toFixed(2);
  };
  // Data for the CGPA chart
  const chartData = {
    labels: completedCourses.map((course) => course.courseName),
    datasets: [
      {
        label: "Obtained Grade",
        data: completedCourses.map((course) => {
          const grade = course.obtainedGrade;
          if (grade === "A") return 4.0;
          if (grade === "B") return 3.0;
          if (grade === "C") return 2.0;
          if (grade === "D") return 1.0;
          return 0;
        }),
        backgroundColor: completedCourses.map((course, index) => {
          // Array of colors or use a color-generating logic
          const colors = [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ];
          return colors[index % colors.length]; // Cycle through colors
        }),
        borderColor: completedCourses.map((course, index) => {
          const colors = [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ];
          return colors[index % colors.length]; // Cycle through colors
        }),
        borderWidth: 1,
      },
    ],
  };

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
      },
    },
  };

  const notificationCount = 3;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        {/* Event Marquee */}
        <div
          className=""
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            backgroundColor: "#f3f4f6",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              animation: "marquee 20s linear infinite",
              fontSize: "17px",
              color: "#ed0740",
            }}
          >
            Upcoming Events: Semester final exams will start in 25 days on{" "}
            {formattedExamDate}. Prepare well!
          </div>

          <style>
            {`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
        `}
          </style>
        </div>
        {/* Welcome card */}
        <div className="w-full mx-auto overflow-hidden rounded-lg shadow-lg">
          <div className="bg-gradient-to-r from-green-400 to-blue-400 p-1">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentDate}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Welcome back,{" "}
                    <span className="text-pink-600">{"John!"}</span>
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Stay updated in your student portal
                  </p>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Graduation Cap Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 sm:w-10 sm:h-10 text-green-500 dark:text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>

                  {/* Notification Icon with Count Badge */}
                  <div className="relative">
                    <svg
                      onClick={() =>
                        toast.info(`Notification feature is coming!`)
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      style={{
                        animation: "ring 1s ease-in-out infinite",
                        transformOrigin: "top center", // Ensures the icon rotates around its top center
                      }}
                    >
                      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>

                    {/* Notification count badge */}
                    {notificationCount > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px 6px",
                          fontSize: "10px",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "18px", // Ensures the circle stays rounded
                        }}
                      >
                        {notificationCount}
                      </span>
                    )}
                  </div>

                  <style>
                    {`
      @keyframes ring {
        0% { transform: rotate(0); }
        10% { transform: rotate(15deg); }
        20% { transform: rotate(-10deg); }
        30% { transform: rotate(10deg); }
        40% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
        60%, 100% { transform: rotate(0); }
      }
    `}
                  </style>

                  {/* Avatar */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white dark:border-gray-700 overflow-hidden shadow-lg">
                    <img
                      src={image}
                      alt={"Rashed"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          "Rashed"
                        )}&background=3b82f6&color=ffffff`;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CGPA Chart */}
        <div className="w-full mx-auto p-4 mt-6">
          <h2 className="text-2xl font-bold my-2 text-gray-800">
            Current CGPA:{" "}
            <span className="text-pink-600">{calculateCGPA()}</span>{" "}
            <span className="text-sm">(out of 4)</span>
          </h2>
          <div className="w-full h-full md:h-96">
            <Bar data={chartData} options={option} />
          </div>
        </div>
        {/* Completed Courses */}
        <div className="w-full mx-auto p-4 mt-4">
          <h2 className="text-2xl font-bold my-2 text-gray-800 mb-8">
            Completed Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedCourses.map((course, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-xl p-6 flex flex-col justify-between h-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Course Information */}
                <h3 className="text-gray-800 text-lg font-semibold">
                  {course.courseName}
                </h3>
                <p className="text-gray-600">
                  <span className="font-medium">Grade:</span>{" "}
                  {course.obtainedGrade}
                </p>

                {/* Popover - appears on hover */}
                <div
                  data-popover
                  id={`popover-course-${index}`}
                  role="tooltip"
                  className="absolute z-10 invisible group-hover:visible group-focus:visible opacity-0 group-hover:opacity-100 group-focus:opacity-100 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-blue-900 border border-blue-900 rounded-lg shadow-lg"
                >
                  <div className="p-3">
                    <h4 className="text-base mt-1 mb-3 font-semibold leading-none text-white">
                      {course.courseName}
                    </h4>
                    <p className="mb-1 text-sm text-white">
                      Semester: {course.semester}
                    </p>
                    <p className="mb-1 text-sm text-white">
                      Professor: {course.instructor}
                    </p>
                    <p className="mb-1 text-sm text-white">
                      Email: {course.email}
                    </p>
                    <p className="mb-4 text-sm text-white">
                      Department: {course.department}
                    </p>
                    <div data-popper-arrow></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Enrolled Courses */}
        <div className="w-full mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold my-2 text-gray-800">
              Enrolled Courses
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses?.length ? (
              enrolledCourses.map((course) => (
                <div
                  key={course.courseId}
                  className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-xl mb-6"
                >
                  <div className="flex justify-start items-center mb-2">
                    <img src={book1} alt="Course Icon" className="w-8 h-8" />
                    <h3 className="text-gray-800 text-lg ms-2 font-semibold">
                      {course.courseName}
                    </h3>
                  </div>
                  <h4 className="text-gray-800 text-sm">
                    <span className="text-gray-700 text-sm font-semibold me-1">
                      Schedule :
                    </span>{" "}
                    {course.schedule}
                  </h4>
                  <h4 className="text-gray-800 text-sm">
                    <span className="text-gray-700 text-sm font-semibold me-1">
                      Instructor :
                    </span>{" "}
                    {course.faculty}
                  </h4>
                  <h4 className="mb-4 text-gray-800 text-sm">
                    <span className="text-gray-700 text-sm font-semibold me-1">
                      Department :
                    </span>{" "}
                    {course.department}
                  </h4>
                  <button
                    onClick={() => handleDetailsClick(course)}
                    className="bg-green-500 max-w-24 mx-auto md:mx-0 text-white py-1 px-4 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Details
                  </button>
                </div>
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
                    No enrolled courses found.
                  </h1>
                  <NavLink
                    to="/register"
                    className="mt-3 cursor-pointer font-medium text-sm text-white py-2 px-3 bg-green-500 hover:bg-green-600 rounded"
                  >
                    Browse Courses
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CourseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        course={selectedCourse}
      />
      <ToastContainer />
    </div>
  );
};

export default StudentDashboard;
