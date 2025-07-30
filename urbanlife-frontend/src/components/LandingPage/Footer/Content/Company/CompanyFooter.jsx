import React, { useState } from 'react';
import Navbar from "../../../HomePage/Navbar/Navbar";
import './CompanyFooter.css';
import { useEffect } from 'react';
import AboutUs from './Content/aboutus';

const CompanyFooter = () => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      return () => heroSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'About Us',
    'Privacy Policy',
    'Terms and Conditions',
    'Contact Us',
    'Day Tours',
    'Bali Airport Transfer Service',
    'Car Rental',
    'Bali Motorbike Rental',
    'Transportation to/from Sanur Pier',
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'All':
        return (
          <div className="all-categories">
            <AboutUs />
          </div>
        );
      case 'About Us':
        return <AboutUs />;
      
      default:
        return (
          <div className="no-content">
            <h2>Content Coming Soon</h2>
            <p>Content for {activeCategory} is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="categories-page">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="hero-section" style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #00A5CC 0%, #007F9F 40%, #0092B8 100%)`
      }}>
        {/* Animated Decorative Elements */}
        <div className="hero-decorations">
          {/* Floating Diamonds */}
          <div className="floating-element diamond diamond-1"></div>
          <div className="floating-element diamond diamond-2"></div>
          <div className="floating-element diamond diamond-3"></div>
          
          {/* Floating Triangles */}
          <div className="floating-element triangle triangle-1"></div>
          <div className="floating-element triangle triangle-2"></div>
          <div className="floating-element triangle triangle-3"></div>
          
          {/* Floating Hexagons */}
          <div className="floating-element hexagon hexagon-1"></div>
          <div className="floating-element hexagon hexagon-2"></div>
          
          {/* Floating Lines */}
          <div className="floating-line line-1"></div>
          <div className="floating-line line-2"></div>
          <div className="floating-line line-3"></div>
          
          {/* Floating Dots Pattern */}
          <div className="dots-pattern dots-1"></div>
          <div className="dots-pattern dots-2"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title playfair">Company</h1>
          <div className="breadcrumb">
            <span>Home</span>
            <span className="separator">/</span>
            <span>Company</span>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-container">
        <div className="categories-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {renderCategoryContent()}
      </div>
    </div>
  );
};

export default CompanyFooter;
