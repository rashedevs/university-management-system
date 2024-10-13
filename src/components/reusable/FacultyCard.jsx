import React from "react";

const FacultyCard = ({
  name,
  designation,
  education,
  department,
  email,
  research,
  imageUrl,
  onDetailsClick,
}) => {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
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
          Department: {department}
        </p>
        <p className="mb-1 font-medium text-gray-700 dark:text-gray-400">
          Email: {email}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Research: {research}
        </p>
        <button
          onClick={onDetailsClick}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default FacultyCard;
