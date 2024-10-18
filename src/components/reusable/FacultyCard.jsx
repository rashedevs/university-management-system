import React from "react";

const FacultyCard = ({
  name,
  designation,
  education,
  department,
  email,
  research,
  subjects,
  imageUrl,
  onDetailsClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row my-3 text-center items-center justify-between bg-white border border-gray-100 rounded-lg shadow-lg w-full">
      <img
        className="p-6 w-48 h-48 rounded-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={imageUrl}
        alt={name}
      />

      <div className="flex flex-col items-start justify-center p-4 leading-normal md:flex-grow md:ml-4">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">
          Designation: {designation}
        </p>
        <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">
          Education: {education}
        </p>
        <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">
          Subjects: {subjects}
        </p>
        <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">
          Department: {department}
        </p>
      </div>

      <div className="flex items-center justify-center md:ml-auto md:mr-4">
        <button
          onClick={onDetailsClick}
          className="px-4 m-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-1 focus:outline-none"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default FacultyCard;
