import React, { useState, useEffect } from 'react';
import Navbar from '../../HomePage/Navbar/Navbar';
import Footer from '../../HomePage/Footer';
import './Accomodation.css';

import LegianFourteenHotel from './content/Legian-FourteenHotel';

const AccomodationPage = () => {
  const [activeAccomodation, setActiveAccomodation] = useState('All');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const accommodations = [
    "All",
    "Hotel",
    "Eco Lodge",
    "Guest House"
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

  const handleAccomodationClick = (accommodation) => {
    setActiveAccomodation(accommodation);
  };

  const EmptyState = ({ type }) => (
    <div className="empty-state">
      <h3>{type} belum tersedia</h3>
      <p>Konten untuk {type} sedang dalam pengembangan.</p>
    </div>
  );

  const renderAccomodationContent = () => {
    switch (activeAccomodation) {
      case 'All':
        return (
          <div className="all-accommodations">
            <LegianFourteenHotel />
          </div>
        );
      case 'Hotel':
        return (
          <div className="hotel-accommodations">
            <LegianFourteenHotel />
          </div>
        );
      case 'Eco Lodge':
        return (
          <div className="eco-lodge-accommodations">
            <EmptyState type="Eco Lodge" />
          </div>
        );
      case 'Guest House':
        return (
          <div className="guest-house-accommodations">
            <EmptyState type="Guest House" />
          </div>
        );
      default:
        return (
          <div className="no-content">
            <EmptyState type="Content" />
          </div>
        );
    }
  };

  return (
    <div className="accommodations-page">
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
          <h1 className="hero-title playfair">Accommodation</h1>
          <div className="breadcrumb">
            <button className="breadcrumb-link cursor-pointer" onClick={handleHomeClick}>
              Home
            </button>
            <span className="separator">/</span>
            <span>Accommodation</span>
          </div>
        </div>
      </div>

      {/* Accommodations Section */}
      <div className="accommodations-container">
        <div className="accommodations-tabs">
          {accommodations.map((accommodation) => (
            <button
              key={accommodation}
              className={`accommodation-tab ${activeAccomodation === accommodation ? 'active' : ''}`}
              onClick={() => handleAccomodationClick(accommodation)}
            >
              {accommodation}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {renderAccomodationContent()}
      </div>

      <Footer />
    </div>
  );
};

export default AccomodationPage;