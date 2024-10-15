import { useState, useEffect } from "react";

const Dropdown = ({ options, onSelect, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption || null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (defaultOption && !selectedOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption, selectedOption]);

  // Filter the options to exclude the selected option
  const filteredOptions = options?.filter(
    (option) => option?.value !== selectedOption?.value
  );

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white bg-green-500 hover:bg-green-600 focus:ring-1 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {selectedOption ? selectedOption?.label : "Select an option"}
        <svg
          className="w-2.5 h-2.5 ms-3"
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
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {filteredOptions?.map((option) => (
              <li key={option?.value}>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option?.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
