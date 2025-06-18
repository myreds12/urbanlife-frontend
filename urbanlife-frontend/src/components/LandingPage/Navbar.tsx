import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/LandingPage/Navbar.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    function closeDropdown() {
    setIsDropdownOpen(false);
  }


  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white fixed justify-between top-0 left-0 right-0 mx-auto max-w-6xl rounded-lg flex items-center  px-5 py-3 mt-6 z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="rounded-lg flex items-center">
          <img src="/public/logo.png" alt="Urbanlife Logo" className="w-23" />
        </div>
      </div>

      {/* Menu Section */}
      <div className="hidden lg:flex space-x-6 items-center">
        <div className="relative">
          <span
            onClick={toggleDropdown}
            className="flex items-center text-gray-500 font-medium hover:text-teal-500 cursor-pointer underline-from-left relative"
          >
            Place to see
            <svg
              className={`stroke-gray-500 ml-1 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-32 bg-white shadow-md rounded-md"           onClick={(e) => e.stopPropagation()}
          onMouseLeave={closeDropdown}
>
              <Link
                to="/home"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Home
              </Link>
            </div>
          )}
        </div>
        <div className="relative">
          <span
            onClick={toggleDropdown}
            className="flex items-center text-gray-500 font-medium hover:text-teal-500 cursor-pointer underline-from-left relative"
          >
            Services
            <svg
              className={`stroke-gray-500 ml-1 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-32 bg-white shadow-md rounded-md"           onClick={(e) => e.stopPropagation()}
          onMouseLeave={closeDropdown}
>
              <Link
                to="/home"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Home
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/transportation"
          className="text-gray-500 font-medium hover:text-teal-500 underline-from-left relative"
        >
          News
        </Link>
        <Link
          to="/contact"
          className="text-gray-500 font-medium hover:text-teal-500 flex items-center gap-2">
          <i className="fa-solid fa-globe"></i>
          <span>Eng</span>

        </Link>
              <div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded-r-lg text-sm">
          Contact Us
        </button>
      </div>

      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button onClick={toggleMobileMenu} className="text-gray-800 focus:outline-none">
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-14 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg w-48">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                to="/place-to-see"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-800 hover:text-teal-500"
              >
                Place to see
              </Link>
            </li>
            <li>
              <Link
                to="/transportation"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-800 hover:text-teal-500"
              >
                Transportation services
              </Link>
            </li>
            <li>
              <Link
                to="/accommodation"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-800 hover:text-teal-500"
              >
                Accommodation
              </Link>
            </li>
            <li>
              <Link
                to="/day-tour"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-800 hover:text-teal-500"
              >
                Day tour
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-800 hover:text-teal-500"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-800 hover:text-teal-500 flex items-center"
              >
                <span>Eng</span>
                <span className="ml-1 text-gray-500">🌐</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Contact Us Button */}
    </nav>
  );
};

export default Navbar;