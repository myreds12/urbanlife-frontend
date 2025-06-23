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
                <h4 className="font-semibold mb-3 text-lg">Indonesia</h4>
                <ul className="space-y-2">
                  <li><Link to="/indonesia/bali" className="block py-1 hover:text-gray-200 transition-colors">Bali Tours</Link></li>
                  <li><Link to="/indonesia/yogyakarta" className="block py-1 hover:text-gray-200 transition-colors">Yogyakarta Tours</Link></li>
                  <li><Link to="/indonesia/jakarta" className="block py-1 hover:text-gray-200 transition-colors">Jakarta Tours</Link></li>
                  <li><Link to="/indonesia/lombok" className="block py-1 hover:text-gray-200 transition-colors">Lombok Tours</Link></li>
                  <li><Link to="/indonesia/bandung" className="block py-1 hover:text-gray-200 transition-colors">Bandung Tours</Link></li>
                  <li><Link to="/indonesia/borobudur" className="block py-1 hover:text-gray-200 transition-colors">Borobudur Temple Tours</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Vietnam</h4>
                <ul className="space-y-2">
                  <li><Link to="/vietnam/ho-chi-minh" className="block py-1 hover:text-gray-200 transition-colors">Ho Chi Minh City Tours</Link></li>
                  <li><Link to="/vietnam/hanoi" className="block py-1 hover:text-gray-200 transition-colors">Hanoi Tours</Link></li>
                  <li><Link to="/vietnam/halong-bay" className="block py-1 hover:text-gray-200 transition-colors">Halong Bay Tours</Link></li>
                  <li><Link to="/vietnam/hoi-an" className="block py-1 hover:text-gray-200 transition-colors">Hoi An Tours</Link></li>
                  <li><Link to="/vietnam/da-nang" className="block py-1 hover:text-gray-200 transition-colors">Da Nang Tours</Link></li>
                  <li><Link to="/vietnam/sapa" className="block py-1 hover:text-gray-200 transition-colors">Sapa Tours</Link></li>
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
                <h4 className="font-semibold mb-3 text-lg">Day Tours</h4>
                <ul className="space-y-2">
                  <li><Link to="/day-tours/city-tour" className="block py-1 hover:text-gray-200 transition-colors">City Tour</Link></li>
                  <li><Link to="/day-tours/cultural-tour" className="block py-1 hover:text-gray-200 transition-colors">Cultural Tour</Link></li>
                  <li><Link to="/day-tours/nature-tour" className="block py-1 hover:text-gray-200 transition-colors">Nature Tour</Link></li>
                  <li><Link to="/day-tours/adventure-tour" className="block py-1 hover:text-gray-200 transition-colors">Adventure Tour</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Rent Car</h4>
                <ul className="space-y-2">
                  <li><Link to="/rent-car/economy" className="block py-1 hover:text-gray-200 transition-colors">Economy Car</Link></li>
                  <li><Link to="/rent-car/suv" className="block py-1 hover:text-gray-200 transition-colors">SUV</Link></li>
                  <li><Link to="/rent-car/luxury" className="block py-1 hover:text-gray-200 transition-colors">Luxury Car</Link></li>
                  <li><Link to="/rent-car/minivan" className="block py-1 hover:text-gray-200 transition-colors">Minivan</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Accommodation</h4>
                <ul className="space-y-2">
                  <li><Link to="/accommodation/hotel" className="block py-1 hover:text-gray-200 transition-colors">Hotel Booking</Link></li>
                  <li><Link to="/accommodation/resort" className="block py-1 hover:text-gray-200 transition-colors">Resort Booking</Link></li>
                  <li><Link to="/accommodation/villa" className="block py-1 hover:text-gray-200 transition-colors">Villa Rental</Link></li>
                  <li><Link to="/accommodation/apartment" className="block py-1 hover:text-gray-200 transition-colors">Apartment</Link></li>
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