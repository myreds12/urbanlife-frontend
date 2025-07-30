import React, { useState } from 'react';
import Navbar from "../../../HomePage/Navbar/Navbar";
import CardsGrid from './CardsGrid';
import { cardsData, getCardsByCategory } from './Content/cardsData';
import './CompanyFooter.css';

const CompanyFooter = () => {
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
    const filteredCards = getCardsByCategory(activeCategory);
    
    switch (activeCategory) {
      case 'All':
        return <CardsGrid cards={cardsData} />;
      
      default:
        return <CardsGrid cards={filteredCards} />;
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

export default CompanyFooter;