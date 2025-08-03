import React, { useState, useEffect } from 'react';
import Navbar from "../../../components/LandingPage/HomePage/Navbar/Navbar";
import Footer from '../HomePage/Footer';
import './CategoriesFooter.css';

import ArtMarket from './Content/Categories/ArtMarket';
import Beach from './Content/Categories/Beach';
import CulturalPark from './Content/Categories/CulturalPark';
import Dance from './Content/Categories/Dance';
import HotSpring from './Content/Categories/HotSpring';
import MonkeyForest from './Content/Categories/MonkeyForest';
import RiceTerraces from './Content/Categories/RiceTerraces';
import Temple from './Content/Categories/Temple';
import Volcano from './Content/Categories/Volcano';
import WaterPalace from './Content/Categories/WaterPalace';
import WaterSports from './Content/Categories/WaterSports';
import Waterfall from './Content/Categories/Waterfall';

const CategoriesFooter = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const categories = [
    "All",
    "Art Market",
    "Beach",
    "Cultural Park",
    "Dance",
    "Hot Spring",
    "Monkey Forest",
    "Rice Terraces",
    "Temple",
    "Volcano",
    "Water Palace",
    "Water Sports",
    "Waterfall"
  ];

  const handleHomeClick = () => {
    window.location.href = '/';
  };


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

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'All':
        return (
          <div className="all-categories">
            <ArtMarket />
            <Beach />
            <CulturalPark />
            <Dance />
            <HotSpring />
            <MonkeyForest />
            <RiceTerraces />
            <Temple />
            <Volcano />
            <WaterPalace />
            <WaterSports />
            <Waterfall />
          </div>
        );
      case 'Art Market':
        return <ArtMarket />;
      case 'Beach':
        return <Beach />;
      case 'Cultural Park':
        return <CulturalPark />;
      case 'Dance':
        return <Dance />;
      case 'Hot Spring':
        return <HotSpring />;
      case 'Monkey Forest':
        return <MonkeyForest />;
      case 'Rice Terraces':
        return <RiceTerraces />;
      case 'Temple':
        return <Temple />;
      case 'Volcano':
        return <Volcano />;
      case 'Water Palace':
        return <WaterPalace />;
      case 'Water Sports':
        return <WaterSports />;
      case 'Waterfall':
        return <Waterfall />;
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
          <h1 className="hero-title playfair">Categories</h1>
          <div className="breadcrumb">
            <button className="breadcrumb-link cursor-pointer" onClick={handleHomeClick}>
              Home
            </button>
            <span className="separator">/</span>
            <span>Categories</span>
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

      <Footer />
    </div>
  );
};

export default CategoriesFooter;