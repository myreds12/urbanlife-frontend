import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../styles/LandingPage/HomePage/Navbar.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect with smooth transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(null);
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  function closeDropdown() {
    setIsDropdownOpen(null);
  }

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleDropdown = (menu, e) => {
    e.stopPropagation();
    setIsDropdownOpen(isDropdownOpen === menu ? null : menu);
  };

  return (
    <>
      {/* Spacer to prevent content jump when navbar becomes fixed */}
      <div className={`navbar-spacer ${isScrolled ? 'navbar-spacer-active' : ''}`}></div>
      
      <nav className={`navbar-container ${
        isScrolled ? 'navbar-scrolled' : 'navbar-floating'
      }`}>
        {/* Logo Section */}
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <img 
              src="/images/All/Logo.png" 
              alt="Urbanlife Logo" 
              className="logo-image" 
            />
          </Link>
        </div>

        {/* Desktop Menu Section */}
        <div className="navbar-menu-desktop">
          {/* Place to See Dropdown */}
          <div className="navbar-dropdown">
            <button
              onClick={(e) => toggleDropdown("place", e)}
              onMouseEnter={() => setIsDropdownOpen("place")}
              className="navbar-menu-item dropdown-trigger"
            >
              Place to see
              <svg
                className={`dropdown-arrow ${
                  isDropdownOpen === "place" ? "dropdown-arrow-active" : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          
          {/* Services Dropdown */}
          <div className="navbar-dropdown">
            <button
              onClick={(e) => toggleDropdown("services", e)}
              onMouseEnter={() => setIsDropdownOpen("services")}
              className="navbar-menu-item dropdown-trigger"
            >
              Services
              <svg
                className={`dropdown-arrow ${
                  isDropdownOpen === "services" ? "dropdown-arrow-active" : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Regular Links */}
          <Link to="/news" className="navbar-menu-item">
            News
          </Link>
          
          <Link to="/language" className="navbar-lang-selector">
            <i className="fa-solid fa-globe"></i>
            <span>Eng</span>
          </Link>
          
          <Link to="/contact" className="navbar-contact-btn">
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="navbar-mobile-toggle"
          aria-label="Toggle mobile menu"
        >
          <div className={`hamburger ${isMobileOpen ? 'hamburger-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMobileOpen ? 'mobile-menu-active' : ''}`}>
        <div className="mobile-menu-content">
          <Link
            to="/place-to-see"
            onClick={() => setIsMobileOpen(false)}
            className="mobile-menu-item"
          >
            Place to see
          </Link>
          <Link
            to="/services"
            onClick={() => setIsMobileOpen(false)}
            className="mobile-menu-item"
          >
            Services
          </Link>
          <Link
            to="/news"
            onClick={() => setIsMobileOpen(false)}
            className="mobile-menu-item"
          >
            News
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="mobile-menu-item mobile-contact-btn"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mega Menu - Place to See */}
      <div 
        className={`mega-menu ${isDropdownOpen === "place" ? 'mega-menu-active' : ''} ${
          isScrolled ? 'mega-menu-scrolled' : 'mega-menu-floating'
        }`}
        onMouseLeave={closeDropdown}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mega-menu-content">
          <div className="mega-menu-section">
            <h4 className="mega-menu-title">Asia</h4>
            <ul className="mega-menu-list">
              <li><Link to="/indonesia" className="mega-menu-link">Indonesia</Link></li>
              <li><Link to="/vietnam" className="mega-menu-link">Vietnam</Link></li>
            </ul>
          </div>
          <div className="mega-menu-section">
            <h4 className="mega-menu-title">Top Attractions</h4>
            <ul className="mega-menu-list">
              <li><Link to="/indonesia/bali" className="mega-menu-link">Bali Tours</Link></li>
              <li><Link to="/vietnam/hanoi" className="mega-menu-link">Hanoi Tours</Link></li>
              <li><Link to="/indonesia/yogyakarta" className="mega-menu-link">Yogyakarta Tours</Link></li>
              <li><Link to="/vietnam/ho-chi-minh" className="mega-menu-link">Ho Chi Minh City Tours</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mega Menu - Services */}
      <div 
        className={`mega-menu ${isDropdownOpen === "services" ? 'mega-menu-active' : ''} ${
          isScrolled ? 'mega-menu-scrolled' : 'mega-menu-floating'
        }`}
        onMouseLeave={closeDropdown}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mega-menu-content mega-menu-three-col">
          <div className="mega-menu-section">
            <h4 className="mega-menu-title">Day Tour</h4>
            <ul className="mega-menu-list">
              <li><Link to="/day-tours" className="mega-menu-link">Day Tours</Link></li>
            </ul>
          </div>
          <div className="mega-menu-section">
            <h4 className="mega-menu-title">Transportation</h4>
            <ul className="mega-menu-list">
              <li><Link to="/rent-car" className="mega-menu-link">Rent Car</Link></li>
            </ul>
          </div>
          <div className="mega-menu-section">
            <h4 className="mega-menu-title">Accommodation</h4>
            <ul className="mega-menu-list">
              <li><Link to="/accommodation" className="mega-menu-link">Hotels & Resorts</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;