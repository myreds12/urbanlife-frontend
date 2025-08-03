import React, { useState, useEffect } from "react";
import Navbar from "../../../../HomePage/Navbar/Navbar";
import DayTourGrid from "./DayTour/DayTourGrid";
import { DayTour } from "./DayTour/DayTourData";
import Footer from "../../../../HomePage/Footer";
import "./DayTour/DayTourPage.css";

const categories = [
  "All",
  "Beach",
  "Mountain",
  "Temple",
  "Waterfall",
  "Cultural",
  "Adventure",
];

const DayTourPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTours =
    activeCategory === "All"
      ? DayTour
      : DayTour.filter((item) => item.category === activeCategory);

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const heroSection = document.querySelector(".hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroSection.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div className="categories-page">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #00A5CC 0%, #007F9F 40%, #0092B8 100%)`,
        }}
      >
        <div className="hero-decorations">
          <div className="floating-element diamond diamond-1"></div>
          <div className="floating-element diamond diamond-2"></div>
          <div className="floating-element diamond diamond-3"></div>
          <div className="floating-element triangle triangle-1"></div>
          <div className="floating-element triangle triangle-2"></div>
          <div className="floating-element triangle triangle-3"></div>
          <div className="floating-element hexagon hexagon-1"></div>
          <div className="floating-element hexagon hexagon-2"></div>
          <div className="floating-line line-1"></div>
          <div className="floating-line line-2"></div>
          <div className="floating-line line-3"></div>
          <div className="dots-pattern dots-1"></div>
          <div className="dots-pattern dots-2"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title playfair">Day Tour Packages</h1>
          <div className="breadcrumb">
            <button
              className="breadcrumb-link cursor-pointer"
              onClick={handleHomeClick}
            >
              Home
            </button>
            <span className="separator">/</span>
            <span>Day Tour</span>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="categories-container">
        <div className="categories-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Day Tour Cards */}
      <DayTourGrid cards={filteredTours} />

      <Footer />
    </div>
  );
};

export default DayTourPage;
