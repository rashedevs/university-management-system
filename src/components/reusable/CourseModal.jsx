import React from "react";

const CourseModal = ({ isOpen, onClose, course }) => {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-xl">
        <div className="relative p-5 bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Close button at top right */}
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/* Course details */}
          <div className="p-4 md:p-5 text-start">
            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              {course?.courseName}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-1">
              <strong>Instructor:</strong> {course?.faculty}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-1">
              <strong>Schedule:</strong> {course?.schedule}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-1">
              <strong>Location:</strong> {course?.location}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-1">
              <strong>Department:</strong> {course?.department}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-1">
              <strong>Description:</strong> {course?.description}
            </p>
          </div>

          {/* Close button at the bottom */}
          <div className="flex justify-center mt-3">
            <button
              onClick={onClose}
              className="px-4 mb-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-1 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
