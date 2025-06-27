import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../styles/LandingPage/HomePage/Navbar.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Change navbar style after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      <nav className={`navbar-container ${
        isScrolled ? 'navbar-scrolled' : 'navbar-floating'
      }`}>
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="rounded-lg flex items-center ml-5">
            <img src="/images/All/Logo.png" alt="Urbanlife Logo" className="w-23" />
          </div>
        </div>

        {/* Menu Section */}
        <div className="hidden lg:flex space-x-6 items-center">
          <div className="relative">
            <span
              onClick={() => toggleDropdown("place")}
              className="flex items-center text-gray-500 font-medium hover:text-teal-500 cursor-pointer group relative"
            >
              Place to see
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-teal-500 group-hover:w-1/2 transition-all duration-200 origin-center"></span>
              <span className="absolute bottom-0 right-1/2 w-0 h-0.5 bg-teal-500 group-hover:w-1/2 transition-all duration-200 origin-center"></span>
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
          </div>
          
          <div className="relative">
            <span
              onClick={() => toggleDropdown("services")}
              className="flex items-center text-gray-500 font-medium hover:text-teal-500 cursor-pointer group relative"
            >
              Services
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-teal-500 group-hover:w-1/2 transition-all duration-200 origin-center"></span>
              <span className="absolute bottom-0 right-1/2 w-0 h-0.5 bg-teal-500 group-hover:w-1/2 transition-all duration-200 origin-center"></span>
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
          </div>

          <Link
            to="/transportation"
            className="text-gray-500 font-medium hover:text-teal-500 group relative"
          >
            News
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-teal-500 group-hover:w-1/2 transition-all duration-200 origin-center"></span>
            <span className="absolute bottom-0 right-1/2 w-0 h-0.5 bg-teal-500 group-hover:w-1/2 transition-all duration-200 origin-center"></span>
          </Link>
          <Link
            to="/contact"
            className="text-gray-500 font-medium hover:text-teal-500 flex items-center gap-2"
          >
            <i className="fa-solid fa-globe"></i>
            <span>Eng</span>
          </Link>
          <div>
            <Link to="/contact" className="bg-teal-500 text-white px-4 py-[20px] rounded-r-xl text-sm">
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
      </nav>

      {/* Full Width Mega Menu - Place to See */}
      {isDropdownOpen === "place" && (
        <div
          className={`mega-menu ${isScrolled ? 'mega-menu-scrolled' : 'mega-menu-floating'}`}
          onMouseLeave={closeDropdown}
        >
          <div className="container mx-auto px-8 py-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-lg">Asia</h4>
                <ul className="space-y-2">
                  <li><Link to="/indonesia" className="block py-1 hover:text-gray-200 transition-colors">Indonesia</Link></li>
                  <li><Link to="/vietnam" className="block py-1 hover:text-gray-200 transition-colors">Vietnam</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Top Attractions</h4>
                <ul className="space-y-2">
                  <li><Link to="/indonesia/bali" className="block py-1 hover:text-gray-200 transition-colors">Bali Tours</Link></li>
                  <li><Link to="/vietnam/hanoi" className="block py-1 hover:text-gray-200 transition-colors">Hanoi Tours</Link></li>
                  <li><Link to="/indonesia/yogyakarta" className="block py-1 hover:text-gray-200 transition-colors">Yogyakarta Tours</Link></li>
                  <li><Link to="/vietnam/ho-chi-minh" className="block py-1 hover:text-gray-200 transition-colors">Ho Chi Minh City Tours</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Width Mega Menu - Services */}
      {isDropdownOpen === "services" && (
        <div
          className={`mega-menu ${isScrolled ? 'mega-menu-scrolled' : 'mega-menu-floating'}`}
          onMouseLeave={closeDropdown}
        >
          <div className="container mx-auto px-8 py-6">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-lg">Day tour</h4>
                <ul className="space-y-2">
                  <li><Link to="/day-tours" className="block py-1 hover:text-gray-200 transition-colors">Day tour</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Rent car</h4>
                <ul className="space-y-2">
                  <li><Link to="/rent-car" className="block py-1 hover:text-gray-200 transition-colors">Rent car</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Accommodation</h4>
                <ul className="space-y-2">
                  <li><Link to="/accommodation" className="block py-1 hover:text-gray-200 transition-colors">Accommodation</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;