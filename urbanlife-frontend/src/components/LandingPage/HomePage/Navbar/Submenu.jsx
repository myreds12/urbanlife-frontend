import React, { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../../../styles/LandingPage/HomePage/Submenu.css";

const Submenu = ({ isSubmenuOpen, setIsSubmenuOpen, data, title, isServices }) => {
  const [activeCategory, setActiveCategory] = useState(Object.keys(data)[0] || '');
  const tabsRef = useRef(null);
  const navigate = useNavigate();

  const categories = Object.keys(data);
  const currentItems = data[activeCategory] || [];

  // Service navigation mapping
  const serviceNavigationMap = {
    'Day Tours': '/DayTour',
    'Rent Car': '/unit-car',
    'Hotel & Resorts': '/hotels',
    'Cultural Tours': '/cultural-tours',
    'Adventure Tours': '/adventure-tours',
    'Airport Transfer': '/airport-transfer',
    'Private Driver': '/private-driver',
    'Homestays': '/homestays',
    'Private Villas': '/villas'
  };

  // Scroll tabs left or right
  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = 150;
      const scrollLeft = direction === 'left' ? -scrollAmount : scrollAmount;
      tabsRef.current.scrollBy({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Close submenu
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  // Handle item click with proper navigation
  const handleItemClick = (item) => {
    // Close submenu first
    closeSubmenu();
    
    if (!isServices) {
      // Handle destinations (places to see)
      const detailData = {
        id: item.id,
        title: item.name,
        location: item.location,
        image: item.image,
      };
      console.log("Navigating to DaytourDetail from Submenu:", detailData);
      navigate(`/DaytourDetail?id=${item.id}`, { state: detailData });
    } else {
      // Handle services navigation
      const servicePath = serviceNavigationMap[item.title];
      if (servicePath) {
        console.log("Navigating to service:", item.title, "->", servicePath);
        navigate(servicePath);
      } else {
        // Fallback: create path from title
        const fallbackPath = `/${item.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`;
        console.log("Using fallback navigation:", item.title, "->", fallbackPath);
        navigate(fallbackPath);
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      {isSubmenuOpen && (
        <div className="places-submenu-overlay" onClick={closeSubmenu}></div>
      )}
      
      {/* Submenu Bottom Sheet */}
      <div className={`places-submenu-bottom-sheet ${isSubmenuOpen ? 'places-submenu-bottom-sheet-open' : ''}`}>
        <div className="places-submenu-header">
          <h2 className="places-submenu-title">{title}</h2>
          <button className="places-submenu-close-button" onClick={closeSubmenu}>×</button>
        </div>
        
        <div className="places-submenu-separator"></div>
        
        <div className="places-submenu-content">
          {/* Tabs Navigation */}
          <div className="places-submenu-tabs-container">
            <button 
              className="places-submenu-arrow places-submenu-arrow-left"
              onClick={() => scrollTabs('left')}
            >
              <FiChevronLeft />
            </button>
            
            <div className="places-submenu-tabs" ref={tabsRef}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`places-submenu-tab ${activeCategory === category ? 'places-submenu-tab-active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <button 
              className="places-submenu-arrow places-submenu-arrow-right"
              onClick={() => scrollTabs('right')}
            >
              <FiChevronRight />
            </button>
          </div>
          
          {/* Content Area */}
          <div className="places-submenu-destinations">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <button
                  key={isServices ? `${item.title}-${index}` : `${item.id} -${index}`}
                  onClick={() => handleItemClick(item)}
                  className="places-submenu-destination-item hover:bg-gray-50 transition-colors duration-200"
                >
                  <img 
                    src={isServices ? `/images/LandingPage/Navbar/${item.image}` : item.image} 
                    alt={isServices ? item.title : item.name} 
                    className="places-submenu-destination-image"
                    onError={(e) => {
                      e.target.src = '/public/images/error/No_Image_Available.jpg';
                    }}
                  />
                  <div className="places-submenu-destination-content">
                    <h4 className="places-submenu-destination-name">
                      {isServices ? item.title : item.name}
                    </h4>
                    {!isServices && (
                      <p className="places-submenu-destination-location">{item.location}</p>
                    )}
                    {isServices && item.subtitle && (
                      <p className="places-submenu-destination-location">{item.subtitle}</p>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📍</div>
                <p>No items available in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Submenu;