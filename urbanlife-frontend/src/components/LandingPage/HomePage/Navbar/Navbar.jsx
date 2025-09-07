import React, { useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // New comment: Added for navigation
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient"; // New comment: Import apiClient for API calls
import Submenu from "./Submenu";
import "../../../../styles/LandingPage/HomePage/Navbar.css";

import { useTranslation } from "react-i18next";
import { formatBookingData } from "../../../AdminDashboard/Utils/FormatData/bookingFormatData";

// Original comment: Main Navbar component
const Navbar = () => {
  // Original comment: State for mobile menu and dropdown
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Top Attractions");
  const [isPlacesSubmenuOpen, setIsPlacesSubmenuOpen] = useState(false);
  const [isServicesSubmenuOpen, setIsServicesSubmenuOpen] = useState(false);
  // New comment: State for top attractions from API
  const [topAttractions, setTopAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // New comment: Hook for programmatic navigation
  const { t, i18n } = useTranslation();

  // Original comment: Static destination data
  const destinationData = {
    "Top Attractions":
      topAttractions.length > 0
        ? topAttractions
        : [
            // New comment: Fallback dummy data if API fails
            {
              id: 1,
              name: "Eastern Bali Tour",
              location: "Bali, Indonesia",
              image:
                "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=60&h=60&fit=crop&crop=center",
            },
            {
              id: 2,
              name: "Danang City Tour",
              location: "Danang, Vietnam",
              image:
                "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=60&h=60&fit=crop&crop=center",
            },
            {
              id: 3,
              name: "Jakarta Tour",
              location: "Jakarta, Indonesia",
              image:
                "https://images.unsplash.com/photo-1555212697-194d092e3b55?w=60&h=60&fit=crop&crop=center",
            },
            {
              id: 4,
              name: "Ho Chi Minh City Tour",
              location: "Ho Chi Minh, Vietnam",
              image:
                "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=60&h=60&fit=crop&crop=center",
            },
          ],
    Asia: [
      // { id: 20, name: 'Mount Fuji Tour', location: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=60&h=60&fit=crop&crop=center' },
      // { id: 21, name: 'Great Wall of China', location: 'Beijing, China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=60&h=60&fit=crop&crop=center' },
      // { id: 23, name: 'Angkor Wat Temple', location: 'Siem Reap, Cambodia', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=60&h=60&fit=crop&crop=center' },
      // { id: 24, name: 'Kyoto Cultural Tour', location: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=60&h=60&fit=crop&crop=center' },
      // { id: 25, name: 'Taj Mahal Tour', location: 'Agra, India', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=60&h=60&fit=crop&crop=center' },
      // { id: 26, name: 'Seoul City Experience', location: 'Seoul, South Korea', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=60&h=60&fit=crop&crop=center' }
    ],
  };

  // Original comment: Static service data
  const serviceData = {
    "Day Tour": [{ title: "Day Tours", image: "daytour.png" }],
    "Rent a Car": [{ title: "Rent a Car", image: "rentcar.png" }],
    Accomodation: [{ title: "Hotel & Resorts", image: "hotel_resort.png" }],
  };

  // New comment: Fetch top attractions from API
  useEffect(() => {
    const fetchTopAttractions = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(
          "/pemesanan/items?is_category=false&top_attraction=true"
        );
        const rawData = response.data.data;
        console.log("API Response:", rawData); // New comment: Debug raw API response

        if (!rawData || rawData.length === 0) {
          console.warn("⚠️ API returned empty data, using dummy fallback");
          setTopAttractions([]);
          setIsLoading(false);
          return;
        }

        // New comment: Map API data to match destinationData structure
        const formattedData = rawData.map((item) => ({
          id: item.id,
          name: item.nama,
          location: `${item.lokasi?.nama || "Unknown"}, ${
            item.lokasi?.negara?.nama || "Unknown"
          }`,
          image: item.file_url
            ? `${apiClient.defaults.baseURL.replace(
                /\/$/,
                ""
              )}/public/${item.file_url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`
            : "/public/images/error/No_Image_Available.jpg", // New comment: Fallback image
            ...item,
        }));
        setTopAttractions(formattedData);
        console.log("Formatted top attractions:", formattedData); // New comment: Debug formatted data
      } catch (error) {
        console.error(
          "❌ API Error - using dummy data fallback:",
          error.response?.status,
          error.message
        ); // New comment: Detailed error log
        setTopAttractions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopAttractions();
  }, []);

  // Original comment: Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Original comment: Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(null);
    };
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Original comment: Close dropdown function
  const closeDropdown = () => {
    setIsDropdownOpen(null);
  };

  // Original comment: Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Original comment: Toggle dropdown menu
  const toggleDropdown = (menu, e) => {
    e.stopPropagation();
    setIsDropdownOpen(isDropdownOpen === menu ? null : menu);
  };

  // Original comment: Handle category hover
  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  // Original comment: Get current destinations based on active category
  const currentDestinations = destinationData[activeCategory] || [];

  // Original comment: Handle Places to See click for mobile
  const handlePlacesToSeeClick = () => {
    setIsMobileOpen(false);
    setIsPlacesSubmenuOpen(true);
  };

  // Original comment: Handle Services click for mobile
  const handleServicesClick = () => {
    setIsMobileOpen(false);
    setIsServicesSubmenuOpen(true);
  };

  // New comment: Handle destination click to navigate to DaytourDetail
  const handleDestinationClick = (destination) => {
    console.log(destination, "clicked");
    const bookingData = formatBookingData(destination);

    console.log("Navigating to DaytourDetail with data:", bookingData); // New comment: Debug navigation
    navigate(`/Detail/${destination.id}`, { state: bookingData });
  };

  return (
    <>
      {/* Original comment: Navbar spacer */}
      <div
        className={`navbar-spacer ${isScrolled ? "navbar-spacer-active" : ""}`}
      ></div>
      <nav
        className={`navbar-container ${
          isScrolled ? "navbar-scrolled" : "navbar-floating"
        }`}
      >
        {/* Original comment: Logo */}
        <div className="navbar-logo">
          <a href="/" className="logo-link">
            <img
              src="/images/All/Logo.png"
              alt="UrbanLife Logo"
              className="logo-image"
            />
          </a>
        </div>
        {/* Original comment: Desktop menu */}
        <div className="navbar-menu-desktop">
          <div
            className="navbar-dropdown"
            onMouseEnter={() => setIsDropdownOpen("place")}
            onMouseLeave={closeDropdown}
          >
            <button
              onClick={(e) => toggleDropdown("place", e)}
              className="navbar-menu-item dropdown-trigger"
            >
              {t("navbar.placetosee")}
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
            <div
              className={`mega-menu ${
                isDropdownOpen === "place" ? "mega-menu-active" : ""
              }`}
            >
              <div className="mega-menu-content">
                <div className="mega-menu-sidebar">
                  <h3 className="mega-menu-sidebar-title">
                    {t("navbar.categories")}
                  </h3>
                  <div className="mega-menu-categories">
                    {["Top Attractions", "Asia"].map((category) => (
                      <div
                        key={category}
                        className={`mega-menu-category ${
                          activeCategory === category
                            ? "mega-menu-category-active"
                            : ""
                        }`}
                        onMouseEnter={() => handleCategoryHover(category)}
                      >
                        <div className="mega-menu-category-content">
                          {activeCategory === category && (
                            <div className="mega-menu-category-indicator"></div>
                          )}
                          <span className="mega-menu-category-text">
                            {category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mega-menu-main">
                  <div className="mega-menu-header">
                    <h3 className="mega-menu-title">{activeCategory}</h3>
                    <p className="mega-menu-subtitle">{t("navbar.subtitle")}</p>
                  </div>
                  {/* New comment: Show loading or error state */}
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600" />
                    </div>
                  ) : (
                    <div className="mega-menu-destinations">
                      {currentDestinations.map((destination) => (
                        <button
                          key={`${destination.id} -${destination.name}`}
                          onClick={() => handleDestinationClick(destination)}
                          className="mega-menu-destination"
                        >
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="mega-menu-destination-image"
                          />
                          <div className="mega-menu-destination-content">
                            <h4 className="mega-menu-destination-name">
                              {destination.name}
                            </h4>
                            <p className="mega-menu-destination-location">
                              {destination.location}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="navbar-dropdown"
            onMouseEnter={() => setIsDropdownOpen("services")}
            onMouseLeave={closeDropdown}
          >
            <button
              onClick={(e) => toggleDropdown("services", e)}
              className="navbar-menu-item dropdown-trigger"
            >
              {t("navbar.services")}
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
            <div
              className={`mega-menu services-menu ${
                isDropdownOpen === "services" ? "mega-menu-active" : ""
              }`}
            >
              <div className="mega-menu-content services-content">
                <div className="mega-menu-section">
                  <h4 className="mega-menu-section-title">
                    {t("navbar.daytour")}
                  </h4>
                  <ul className="mega-menu-list">
                    <li>
                      <a href="/DayTour" className="mega-menu-link">
                        <img
                          src="/images/LandingPage/Navbar/daytour.png"
                          className="mega-menu-icon"
                          alt="daytour"
                        />
                        {t("navbar.daytour")}
                      </a>
                    </li>
                    {/* <li><a href="/cultural-tours" className="mega-menu-link"><img src="/images/LandingPage/Navbar/cultural_tour.png" className="mega-menu-icon" alt="cultural"/> Cultural Tours</a></li>
                    <li><a href="/adventure-tours" className="mega-menu-link"><img src="/images/LandingPage/Navbar/adventure_tour.png" className="mega-menu-icon" alt="adventure"/> Adventure Tours</a></li> */}
                  </ul>
                </div>
                <div className="mega-menu-section">
                  <h4 className="mega-menu-section-title">
                    {t("navbar.transportation")}
                  </h4>
                  <ul className="mega-menu-list">
                    <li>
                      <a href="/unit-car" className="mega-menu-link">
                        <img
                          src="/images/LandingPage/Navbar/rentcar.png"
                          className="mega-menu-icon"
                          alt="rentcar"
                        />
                        {t("navbar.rentcar")}
                      </a>
                    </li>
                    {/* <li><a href="/airport-transfer" className="mega-menu-link"><img src="/images/LandingPage/Navbar/airport_transfer.png" className="mega-menu-icon" alt="airport"/> Airport Transfer</a></li>
                    <li><a href="/private-driver" className="mega-menu-link"><img src="/images/LandingPage/Navbar/private_driver.png" className="mega-menu-icon" alt="driver"/>Private Driver</a></li> */}
                  </ul>
                </div>
                <div className="mega-menu-section">
                  <h4 className="mega-menu-section-title">
                    {t("navbar.accomodation")}
                  </h4>
                  <ul className="mega-menu-list">
                    <li><a href="/accomodation" className="mega-menu-link"><img src="/images/LandingPage/Navbar/hotel_resort.png" className="mega-menu-icon" alt="hotel"/>{t("navbar.hotel")}</a></li>
                    {/*  <li><a href="/homestays" className="mega-menu-link"><img src="/images/LandingPage/Navbar/homestay.png" className="mega-menu-icon" alt="homestay"/> Homestays</a></li>
                    <li><a href="/villas" className="mega-menu-link"><img src="/images/LandingPage/Navbar/private_villa.png" className="mega-menu-icon" alt="villa"/> Private Villas</a></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <a href="#news" className="navbar-menu-item">
            {t("navbar.news")}
          </a>
          <div
            className="flex items-center gap-2 text-[15px] font-medium text-[#333] cursor-pointer"
            onClick={() => {
              const newLang = i18n.language === "en" ? "id" : "en";
              i18n.changeLanguage(newLang);
            }}
          >
            <img
              src="/images/LandingPage/Navbar/language.png"
              alt="Lang"
              className="w-4 h-4 object-contain"
            />
            <span>{i18n.language === "en" ? "Eng" : "Ind"}</span>
          </div>{" "}
          {/* Original comment: Contact Us button */}
          <a
            href="https://wa.me/+62816919812"
            className={`hidden lg:inline-block h-full px-6 py-5
              ${
                isScrolled
                  ? "rounded-r-[20px] rounded-l-[20px] mr-[4px] scale-[0.75] px-4 py-3 relative"
                  : "rounded-r-[19px] -mr-[31px] scale-100 px-6 py-5"
              }
              bg-[#0092B8] text-white font-semibold hover:bg-[#007F9F]
              transition-all duration-500 ease-out shadow-md
            `}
          >
            {t("navbar.contactus")}
          </a>
        </div>
        {/* Original comment: Mobile toggle button */}
        <button
          onClick={toggleMobileMenu}
          className="navbar-mobile-toggle"
          aria-label="Toggle mobile menu"
        >
          <div
            className={`hamburger ${isMobileOpen ? "hamburger-active" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

      {/* Original comment: Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
      )}

      {/* Original comment: Bottom Sheet */}
      <div
        className={`bottom-sheet ${isMobileOpen ? "bottom-sheet-open" : ""}`}
      >
        <div className="bottom-sheet-header">
          <h2 className="bottom-sheet-title">Menu</h2>
          <button className="close-button" onClick={toggleMobileMenu}>
            ×
          </button>
        </div>
        <div className="bottom-sheet-separator"></div>
        <div className="bottom-sheet-content">
          <div className="bottom-sheet-menu">
            <button
              onClick={handlePlacesToSeeClick}
              className="bottom-sheet-menu-item"
            >
              {t("navbar.placetosee")}
              <FiChevronRight />
            </button>
            <button
              onClick={handleServicesClick}
              className="bottom-sheet-menu-item"
            >
              {t("navbar.services")}
              <FiChevronRight />
            </button>
            <a
              href="#news"
              onClick={() => setIsMobileOpen(false)}
              className="bottom-sheet-menu-item"
            >
              {t("navbar.news")}
              <FiChevronRight />
            </a>
            <a
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="bottom-sheet-contact-btn"
            >
              {t("navbar.contactus")}
            </a>
          </div>
        </div>
      </div>
      {/* Original comment: Places Submenu */}
      <Submenu
        isSubmenuOpen={isPlacesSubmenuOpen}
        setIsSubmenuOpen={setIsPlacesSubmenuOpen}
        data={destinationData}
        title={t("navbar.placetosee")}
        isServices={false}
      />
      {/* Original comment: Services Submenu */}
      <Submenu
        isSubmenuOpen={isServicesSubmenuOpen}
        setIsSubmenuOpen={setIsServicesSubmenuOpen}
        data={serviceData}
        title={t("navbar.services")}
        isServices={true}
      />
    </>
  );
};

export default Navbar;
