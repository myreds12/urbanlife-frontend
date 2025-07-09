import React, { useState, useEffect } from 'react';
import "../../../styles/LandingPage/HomePage/Navbar.css";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Top Attractions');

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
    ],
    'Europe': [
      { id: 13, name: 'Eiffel Tower Tours', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=60&h=60&fit=crop&crop=center' },
      { id: 14, name: 'Colosseum Tours', location: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=60&h=60&fit=crop&crop=center' },
      { id: 15, name: 'Santorini Tours', location: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=60&h=60&fit=crop&crop=center' }
    ],
    'North America': [
      { id: 16, name: 'Statue of Liberty Tours', location: 'New York, USA', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=60&h=60&fit=crop&crop=center' },
      { id: 17, name: 'Niagara Falls Tours', location: 'Ontario, Canada', image: 'https://images.unsplash.com/photo-1489447068241-b3490214e879?w=60&h=60&fit=crop&crop=center' }
    ]
  };

  const categories = ['Top Attractions', 'Asia', 'Europe', 'North America'];

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
                    <li><a href="/day-tours" className="mega-menu-link">Day Tours</a></li>
                    <li><a href="/cultural-tours" className="mega-menu-link">Cultural Tours</a></li>
                    <li><a href="/adventure-tours" className="mega-menu-link">Adventure Tours</a></li>
                  </ul>
                </div>
                <div className="mega-menu-section">
                  <h4 className="mega-menu-section-title">Transportation</h4>
                  <ul className="mega-menu-list">
                    <li><a href="/rent-car" className="mega-menu-link">Rent Car</a></li>
                    <li><a href="/airport-transfer" className="mega-menu-link">Airport Transfer</a></li>
                    <li><a href="/private-driver" className="mega-menu-link">Private Driver</a></li>
                  </ul>
                </div>
                <div className="mega-menu-section">
                  <h4 className="mega-menu-section-title">Accommodation</h4>
                  <ul className="mega-menu-list">
                    <li><a href="/hotels" className="mega-menu-link">Hotels & Resorts</a></li>
                    <li><a href="/homestays" className="mega-menu-link">Homestays</a></li>
                    <li><a href="/villas" className="mega-menu-link">Private Villas</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <a href="/news" className="navbar-menu-item">News</a>
          <a href="/language" className="navbar-lang-selector">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1C11.866 1 15 4.134 15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M1 8H15M8 1C6.5 3 6.5 13 8 15M8 1C9.5 3 9.5 13 8 15" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Eng</span>
          </a>
          <a
            href="/contact"
            className="hidden lg:inline-block h-full px-6 py-5 rounded-r-[16px] bg-[#0092B8] text-white font-semibold hover:bg-[#007F9F] transition-all duration-300 shadow-md -mr-6"
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
      <div className={`navbar-mobile-menu ${isMobileOpen ? 'mobile-menu-active' : ''}`}>
        <div className="mobile-menu-content">
          <a href="/place-to-see" onClick={() => setIsMobileOpen(false)} className="mobile-menu-item">Place to see</a>
          <a href="/services" onClick={() => setIsMobileOpen(false)} className="mobile-menu-item">Services</a>
          <a href="/news" onClick={() => setIsMobileOpen(false)} className="mobile-menu-item">News</a>
          <a href="/contact" onClick={() => setIsMobileOpen(false)} className="mobile-menu-item mobile-contact-btn">Contact Us</a>
        </div>
      </div>
      {isMobileOpen && <div className="mobile-menu-overlay" onClick={() => setIsMobileOpen(false)}></div>}
    </>
  );
};

export default Navbar;