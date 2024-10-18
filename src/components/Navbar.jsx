import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../src/assets/images/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu after selecting an option
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-green-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Website title */}
          {/* <h1 className="text-white text-xl font-bold">
            University Management System
          </h1> */}

          {/* Logo */}
          <div className="flex justify-between items-center">
            <img
              src={logo} // Update this path to your logo
              alt="University Logo"
              className="h-8 me-2" // Adjust the height as needed
            />
            <h1 className="text-white text-xl font-bold cursor-pointer">
              Management System
            </h1>
          </div>

          {/* Hamburger menu for small screens */}
          <button
            onClick={toggleMenu}
            className="text-white lg:hidden block focus:outline-none ml-auto"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Links for large screens */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#88FF00] mx-2 py-1 border-b-2 border-[#88FF00] transition duration-300"
                  : "text-white hover:text-[#88FF00] px-2 py-1 rounded"
              }
            >
              Student Dashboard
            </NavLink>
            <NavLink
              to="/faculty"
              className={({ isActive }) =>
                isActive
                  ? "text-[#88FF00] mx-2 py-1 border-b-2 border-[#88FF00] transition duration-300"
                  : "text-white hover:text-[#88FF00] px-2 py-1 rounded"
              }
            >
              Faculty Management
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-[#88FF00] mx-2 py-1 border-b-2 border-[#88FF00] transition duration-300"
                  : "text-white hover:text-[#88FF00] px-2 py-1 rounded"
              }
            >
              Course Registration
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Dropdown for mobile at the bottom of the hamburger button */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md z-50 w-48">
          <ul className="py-2 text-gray-800">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-teal-700 hover:bg-slate-600"
                    : "block px-4 py-2 text-gray-800 hover:bg-slate-600"
                }
                onClick={closeMenu}
              >
                Student Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faculty"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-teal-700 hover:bg-slate-600"
                    : "block px-4 py-2 text-gray-800 hover:bg-slate-600"
                }
                onClick={closeMenu}
              >
                Faculty Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-teal-700 hover:bg-slate-600"
                    : "block px-4 py-2 text-gray-800 hover:bg-slate-600"
                }
                onClick={closeMenu}
              >
                Course Registration
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
