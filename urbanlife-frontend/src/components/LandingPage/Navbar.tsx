import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/LandingPage/Navbar.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // Melacak item mana yang dibuka

  function closeDropdown() {
    setIsDropdownOpen(null);
  }

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleDropdown = (menu) => {
    setIsDropdownOpen(isDropdownOpen === menu ? null : menu);
  };

  return (
    <nav className="bg-white fixed justify-between top-0 left-0 right-0 mx-auto max-w-6xl rounded-lg flex items-center px-5 py-3 mt-6 z-50">
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
            onClick={() => toggleDropdown("place")}
            className="flex items-center text-gray-500 font-medium hover:text-teal-500 cursor-pointer underline-from-left relative"
          >
            Place to see
            <svg
              className={`stroke-gray-500 ml-1 transition-transform duration-200 ${
                isDropdownOpen === "place" ? "rotate-180" : ""
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
          {isDropdownOpen === "place" && (
            <div
              className="absolute top-full left-0 w-screen bg-cyan-600 text-white shadow-md"
              style={{ width: "100vw", marginLeft: "-50vw", left: "50%" }}
              onMouseLeave={closeDropdown}
            >
              <div className="container mx-auto px-4 py-4 grid grid-cols-6 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Top attractions</h4>
                  <ul>
                    <li><Link to="/top-attractions/colosseum" className="block py-1 hover:text-gray-200">Colosseum Tours</Link></li>
                    <li><Link to="/top-attractions/vatican" className="block py-1 hover:text-gray-200">Vatican Museums Tours</Link></li>
                    <li><Link to="/top-attractions/warner" className="block py-1 hover:text-gray-200">Warner Bros. Studio London Tours</Link></li>
                    <li><Link to="/top-attractions/disneyland" className="block py-1 hover:text-gray-200">Disneyland Paris Tours</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">North America</h4>
                  <ul>
                    <li><Link to="/north-america/niagara" className="block py-1 hover:text-gray-200">Niagara Falls, Canadian Side</Link></li>
                    <li><Link to="/north-america/statue" className="block py-1 hover:text-gray-200">Statue of Liberty Tours</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Europe</h4>
                  <ul>
                    <li><Link to="/europe/sagrada" className="block py-1 hover:text-gray-200">Sagrada Familia Tours</Link></li>
                    <li><Link to="/europe/parc" className="block py-1 hover:text-gray-200">Parc Guell Tours</Link></li>
                    <li><Link to="/europe/louvre" className="block py-1 hover:text-gray-200">Louvre Museum Tours</Link></li>
                    <li><Link to="/europe/eiffel" className="block py-1 hover:text-gray-200">Eiffel Tower Tours</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Middle East & Africa</h4>
                  <ul>
                    <li><Link to="/middle-east/burj" className="block py-1 hover:text-gray-200">Burj Khalifa Tours</Link></li>
                    <li><Link to="/middle-east/moulin" className="block py-1 hover:text-gray-200">Moulin Rouge Tours</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Central & South America</h4>
                  <ul>
                    <li><Link to="/central-america/pompeii" className="block py-1 hover:text-gray-200">Pompeii Archaeological Site</Link></li>
                    <li><Link to="/central-america/siam" className="block py-1 hover:text-gray-200">Siam Park Tours</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Asia, Australia & the Pacific</h4>
                  <ul>
                    <li><Link to="/asia/machu" className="block py-1 hover:text-gray-200">Machu Picchu Tours</Link></li>
                    <li><Link to="/asia/london-eye" className="block py-1 hover:text-gray-200">The London Eye Tours</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <span
            onClick={() => toggleDropdown("services")}
            className="flex items-center text-gray-500 font-medium hover:text-teal-500 cursor-pointer underline-from-left relative"
          >
            Services
            <svg
              className={`stroke-gray-500 ml-1 transition-transform duration-200 ${
                isDropdownOpen === "services" ? "rotate-180" : ""
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
          {isDropdownOpen === "services" && (
            <div
              className="absolute top-full left-0 w-screen bg-cyan-600 text-white shadow-md"
              style={{ width: "100vw", marginLeft: "-50vw", left: "50%" }}
              onMouseLeave={closeDropdown}
            >
              <div className="container mx-auto px-4 py-4 grid grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Transportation</h4>
                  <ul>
                    <li><Link to="/transportation/rent-car" className="block py-1 hover:text-gray-200">Rent Car</Link></li>
                    <li><Link to="/transportation/shuttle" className="block py-1 hover:text-gray-200">Shuttle Service</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Accommodation</h4>
                  <ul>
                    <li><Link to="/accommodation/hotel" className="block py-1 hover:text-gray-200">Hotel Booking</Link></li>
                    <li><Link to="/accommodation/resort" className="block py-1 hover:text-gray-200">Resort Booking</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Day Tours</h4>
                  <ul>
                    <li><Link to="/day-tours/city" className="block py-1 hover:text-gray-200">City Tours</Link></li>
                    <li><Link to="/day-tours/nature" className="block py-1 hover:text-gray-200">Nature Tours</Link></li>
                  </ul>
                </div>
              </div>
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
          className="text-gray-500 font-medium hover:text-teal-500 flex items-center gap-2"
        >
          <i className="fa-solid fa-globe"></i>
          <span>Eng</span>
        </Link>
        <div>
          <Link to="/contact" className="bg-teal-500 text-white px-4 py-2 rounded-r-lg text-sm">
          Contact Us
        </Link>
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