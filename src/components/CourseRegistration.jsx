import { useState } from "react";
import coursesData from "../data/courses.json";
import { ToastContainer, toast } from "react-toastify";

const CourseRegistration = () => {
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Enrollment successful!");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">Enroll in Courses</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          required
        >
          <option value="" disabled>
            Select a course
          </option>
          {coursesData.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white rounded px-4 py-2"
        >
          Enroll
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CourseRegistration;
