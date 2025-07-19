import React, { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../../../../styles/LandingPage/HomePage/Submenu.css";

const Submenu = ({ isSubmenuOpen, setIsSubmenuOpen, data, title, isServices }) => {
  const [activeCategory, setActiveCategory] = useState(Object.keys(data)[0] || '');
  const tabsRef = useRef(null);

  const categories = Object.keys(data);
  const currentItems = data[activeCategory] || [];

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

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
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
            {currentItems.map((item, index) => (
              <div key={isServices ? index : item.id} className="places-submenu-destination-item">
                <img 
                  src={isServices ? `/images/LandingPage/Navbar/${item.image}` : item.image} 
                  alt={isServices ? item.title : item.name} 
                  className="places-submenu-destination-image"
                />
                <div className="places-submenu-destination-content">
                  <h4 className="places-submenu-destination-name">{isServices ? item.title : item.name}</h4>
                  <p className="places-submenu-destination-location">{isServices ? item.subtitle : item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Submenu;