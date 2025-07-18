import React, { useState, useEffect } from 'react';
import { FiChevronRight } from "react-icons/fi";
import Submenu from './Submenu';
import "../../../../styles/LandingPage/HomePage/Navbar.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Top Attractions');
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const destinationData = {
    'Top Attractions': [
      { id: 1, name: 'Eastern Bali Tour', location: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=60&h=60&fit=crop&crop=center' },
      { id: 2, name: 'Danang City Tour', location: 'Danang, Vietnam', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=60&h=60&fit=crop&crop=center' },
      { id: 3, name: 'Jakarta Tour', location: 'Jakarta, Indonesia', image: 'https://images.unsplash.com/photo-1555212697-194d092e3b55?w=60&h=60&fit=crop&crop=center' },
      { id: 4, name: 'Ho Chi Minh City Tour', location: 'Ho Chi Minh, Vietnam', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=60&h=60&fit=crop&crop=center' },
      { id: 5, name: 'Bangkok Temple Tour', location: 'Bangkok, Thailand', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop&crop=center' },
      { id: 6, name: 'Yogyakarta Tours', location: 'Yogyakarta, Indonesia', image: 'https://images.unsplash.com/photo-1555212697-194d092e3b55?w=60&h=60&fit=crop&crop=center' }
    ],
    'Asia': [
      { id: 7, name: 'Mount Fuji Tour', location: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=60&h=60&fit=crop&crop=center' },
      { id: 8, name: 'Great Wall of China', location: 'Beijing, China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=60&h=60&fit=crop&crop=center' },
      { id: 9, name: 'Angkor Wat Temple', location: 'Siem Reap, Cambodia', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=60&h=60&fit=crop&crop=center' },
      { id: 10, name: 'Kyoto Cultural Tour', location: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=60&h=60&fit=crop&crop=center' },
      { id: 11, name: 'Taj Mahal Tour', location: 'Agra, India', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=60&h=60&fit=crop&crop=center' },
      { id: 12, name: 'Seoul City Experience', location: 'Seoul, South Korea', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=60&h=60&fit=crop&crop=center' }
    ]
  };

  const categories = ['Top Attractions', 'Asia'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(null);
    };
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  const closeDropdown = () => {
    setIsDropdownOpen(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleDropdown = (menu, e) => {
    e.stopPropagation();
    setIsDropdownOpen(isDropdownOpen === menu ? null : menu);
  };

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  const currentDestinations = destinationData[activeCategory] || [];

  const handlePlacesToSeeClick = () => {
    setIsMobileOpen(false);
    setIsSubmenuOpen(true);  
  };

  return (
    <>
      <div className={`navbar-spacer ${isScrolled ? 'navbar-spacer-active' : ''}`}></div>
      <nav className={`navbar-container ${isScrolled ? 'navbar-scrolled' : 'navbar-floating'}`}>
        <div className="navbar-logo">
          <a href="/" className="logo-link">
            <img src="/images/All/Logo.png" alt="UrbanLife Logo" className="logo-image" />
          </a>
        </div>
        <div className="navbar-menu-desktop">
          <div className="navbar-dropdown" onMouseEnter={() => setIsDropdownOpen("place")} onMouseLeave={closeDropdown}>
            <button onClick={(e) => toggleDropdown("place", e)} className="navbar-menu-item dropdown-trigger">
              Place to see
              <svg className={`dropdown-arrow ${isDropdownOpen === "place" ? "dropdown-arrow-active" : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`mega-menu ${isDropdownOpen === "place" ? 'mega-menu-active' : ''}`}>
              <div className="mega-menu-content">
                <div className="mega-menu-sidebar">
                  <h3 className="mega-menu-sidebar-title">Categories</h3>
                  <div className="mega-menu-categories">
                    {categories.map((category) => (
                      <div key={category} className={`mega-menu-category ${activeCategory === category ? 'mega-menu-category-active' : ''}`} onMouseEnter={() => handleCategoryHover(category)}>
                        <div className="mega-menu-category-content">
                          {activeCategory === category && <div className="mega-menu-category-indicator"></div>}
                          <span className="mega-menu-category-text">{category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mega-menu-main">
                  <div className="mega-menu-header">
                    <h3 className="mega-menu-title">{activeCategory}</h3>
                    <p className="mega-menu-subtitle">Discover amazing destinations and experiences</p>
                  </div>
                  <div className="mega-menu-destinations">
                    {currentDestinations.map((destination) => (
                      <a key={destination.id} href={`#${destination.name.toLowerCase().replace(/\s+/g, '-')}`} className="mega-menu-destination">
                        <img src={destination.image} alt={destination.name} className="mega-menu-destination-image"/>
                        <div className="mega-menu-destination-content">
                          <h4 className="mega-menu-destination-name">{destination.name}</h4>
                          <p className="mega-menu-destination-location">{destination.location}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-dropdown" onMouseEnter={() => setIsDropdownOpen("services")} onMouseLeave={closeDropdown}>
            <button onClick={(e) => toggleDropdown("services", e)} className="navbar-menu-item dropdown-trigger">
              Services
              <svg className={`dropdown-arrow ${isDropdownOpen === "services" ? "dropdown-arrow-active" : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`mega-menu services-menu ${isDropdownOpen === "services" ? 'mega-menu-active' : ''}`}>
              <div className="mega-menu-content services-content">
                <div className="mega-menu-section">
                  <h4 className="mega-menu-section-title">Day Tour</h4>
                  <ul className="mega-menu-list">
                    <li><a href="/day-tours" className="mega-menu-link"><img src="/images/LandingPage/Navbar/daytour.png" className="mega-menu-icon" alt="daytour"/> Day Tours</a></li>
                    <li><a href="/cultural-tours" className="mega-menu-link"><img src="/images/LandingPage/Navbar/cultural_tour.png" className="mega-menu-icon" alt="cultural"/> Cultural Tours</a></li>
                    <li><a href="/adventure-tours" className="mega-menu-link"><img src="/images/LandingPage/Navbar/adventure_tour.png" className="mega-menu-icon" alt="adventure"/> Adventure Tours</a></li>
                  </ul>
                </div>
                <div className="mega-menu-section">
                  <h4 className="mega-menu-section-title">Transportation</h4>
                  <ul className="mega-menu-list">
                    <li><a href="/rent-car" className="mega-menu-link"><img src="/images/LandingPage/Navbar/rentcar.png" className="mega-menu-icon" alt="rentcar"/> Rent Car</a></li>
                    <li><a href="/airport-transfer" className="mega-menu-link"><img src="/images/LandingPage/Navbar/airport_transfer.png" className="mega-menu-icon" alt="airport"/> Airport Transfer</a></li>
                    <li><a href="/private-driver" className="mega-menu-link"><img src="/images/LandingPage/Navbar/private_driver.png" className="mega-menu-icon" alt="driver"/>Private Driver</a></li>
                  </ul>
                </div>
                <div className="mega-menu-section">
                  <h4 className="mega-menu-section-title">Accommodation</h4>
                  <ul className="mega-menu-list">
                    <li><a href="/hotels" className="mega-menu-link"><img src="/images/LandingPage/Navbar/hotel_resort.png" className="mega-menu-icon" alt="hotel"/>Hotels & Resorts</a></li>
                    <li><a href="/homestays" className="mega-menu-link"><img src="/images/LandingPage/Navbar/homestay.png" className="mega-menu-icon" alt="airport"/> Homestays</a></li>
                    <li><a href="/villas" className="mega-menu-link"><img src="/images/LandingPage/Navbar/private_villa.png" className="mega-menu-icon" alt="villa"/> Private Villas</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <a href="#news" className="navbar-menu-item">News</a>
          
          <a href="/" className="flex items-center gap-1 text-[15px] font-medium text-[#333]">
            <img src="/images/LandingPage/Navbar/language.png" alt="Lang" className="w-4 h-4 object-contain" />
            <span>Eng</span>
          </a>
          <a
          href="/contact"
          className={`hidden lg:inline-block h-full px-6 py-5
            ${isScrolled 
              ? 'rounded-r-[20px] rounded-l-[20px] mr-[4px] scale-[0.75] px-4 py-3  relative'
              : 'rounded-r-[19px] -mr-[31px] scale-100 px-6 py-5'
            }
            bg-[#0092B8] text-white font-semibold hover:bg-[#007F9F]
            transition-all duration-500 ease-out shadow-md
          `}
        >
          Contact Us
        </a>
        </div>
        <button onClick={toggleMobileMenu} className="navbar-mobile-toggle" aria-label="Toggle mobile menu">
          <div className={`hamburger ${isMobileOpen ? 'hamburger-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

{/* Mobile Menu Overlay */}
  {isMobileOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}
  
  {/* Bottom Sheet */}
  <div className={`bottom-sheet ${isMobileOpen ? 'bottom-sheet-open' : ''}`}>
    <div className="bottom-sheet-header">
      <h2 className="bottom-sheet-title">Menu</h2>
      <button className="close-button" onClick={toggleMobileMenu}>×</button>
    </div>
    <div className="bottom-sheet-separator"></div>
    <div className="bottom-sheet-content">
      <div className="bottom-sheet-menu">
            <button onClick={handlePlacesToSeeClick} className="bottom-sheet-menu-item">
              Places to see
              <FiChevronRight/>
            </button>
            <a href="/services" onClick={() => setIsMobileOpen(false)} className="bottom-sheet-menu-item">
              Services
              <FiChevronRight/>
            </a>
            <a href="/news" onClick={() => setIsMobileOpen(false)} className="bottom-sheet-menu-item">
              News
              <FiChevronRight/>
            </a>
            <a href="/contact" onClick={() => setIsMobileOpen(false)} className="bottom-sheet-contact-btn">
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Submenu 
        isSubmenuOpen={isSubmenuOpen}
        setIsSubmenuOpen={setIsSubmenuOpen}
        destinationData={destinationData}
      />

      </>
  );
};

export default Navbar;