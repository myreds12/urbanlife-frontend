import React, { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // New comment: Added for navigation
import "../../../../styles/LandingPage/HomePage/Submenu.css";

// Original comment: Submenu component for mobile
const Submenu = ({ isSubmenuOpen, setIsSubmenuOpen, data, title, isServices }) => {
  const [activeCategory, setActiveCategory] = useState(Object.keys(data)[0] || '');
  const tabsRef = useRef(null);
  const navigate = useNavigate(); // New comment: Hook for programmatic navigation

  const categories = Object.keys(data);
  const currentItems = data[activeCategory] || [];

  // Original comment: Scroll tabs left or right
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

  // Original comment: Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Original comment: Close submenu
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  // New comment: Handle destination click to navigate to DaytourDetail
  const handleItemClick = (item) => {
    if (!isServices) {
      const detailData = {
        id: item.id,
        title: item.name,
        location: item.location,
        image: item.image,
      };
      console.log("Navigating to DaytourDetail from Submenu:", detailData); // New comment: Debug navigation
      navigate(`/DaytourDetail?id=${item.id}`, { state: detailData });
    } else {
      navigate(`/${item.title.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  return (
    <>
      {/* Original comment: Overlay */}
      {isSubmenuOpen && (
        <div className="places-submenu-overlay" onClick={closeSubmenu}></div>
      )}
      
      {/* Original comment: Submenu Bottom Sheet */}
      <div className={`places-submenu-bottom-sheet ${isSubmenuOpen ? 'places-submenu-bottom-sheet-open' : ''}`}>
        <div className="places-submenu-header">
          <h2 className="places-submenu-title">{title}</h2>
          <button className="places-submenu-close-button" onClick={closeSubmenu}>×</button>
        </div>
        
        <div className="places-submenu-separator"></div>
        
        <div className="places-submenu-content">
          {/* Original comment: Tabs Navigation */}
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
          
          {/* Original comment: Content Area */}
          <div className="places-submenu-destinations">
            {currentItems.map((item, index) => (
              <button
                key={isServices ? index : item.id}
                onClick={() => handleItemClick(item)}
                className="places-submenu-destination-item"
              >
                <img 
                  src={isServices ? `/images/LandingPage/Navbar/${item.image}` : item.image} 
                  alt={isServices ? item.title : item.name} 
                  className="places-submenu-destination-image"
                />
                <div className="places-submenu-destination-content">
                  <h4 className="places-submenu-destination-name">{isServices ? item.title : item.name}</h4>
                  <p className="places-submenu-destination-location">{isServices ? item.subtitle : item.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Submenu;