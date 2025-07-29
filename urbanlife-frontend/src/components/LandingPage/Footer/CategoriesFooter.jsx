import React, { useState } from 'react';
import Navbar from "../../../components/LandingPage/HomePage/Navbar/Navbar";
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
import Waterfall from './Content/Categories/Waterfall';

const CategoriesFooter = () => {
  const [activeCategory, setActiveCategory] = useState('All');

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
    "Waterfall"
  ];

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
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title playfair">Categories</h1>
          <div className="breadcrumb">
            <span>Home</span>
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
    </div>
  );
};

export default CategoriesFooter;