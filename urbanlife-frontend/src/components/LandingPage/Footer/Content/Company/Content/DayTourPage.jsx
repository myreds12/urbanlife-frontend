import React, { useState, useEffect } from "react";
import Navbar from "../../../../HomePage/Navbar/Navbar";
import DayTourGrid from "./DayTour/DayTourGrid";
import { DayTour } from "./DayTour/DayTourData";
import Footer from "../../../../HomePage/Footer";
import "./DayTour/DayTourPage.css";
import apiClient from "../../../../../AdminDashboard/Utils/ApiClient/apiClient";
import { useTranslation } from 'react-i18next';

const DayTourPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [categories, setCategories] = useState([{ id: "all", name: "All" }]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [tours, setTours] = useState([]);
  const { t } = useTranslation();

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  // FETCH categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get(`/category`);
        const apiCategories = res.data.data || [];
        setCategories([{ id: "all", name: "All" }, ...apiCategories]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // FETCH items (by category)
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const params = {
          take: 10,
          page: 1,
          type: "TRAVEL_PACKAGE",
        };

        if (activeCategory !== "all") {
          params.category_id = activeCategory;
        }

        console.log("Fetching tours with params:", params);

        const res = await apiClient.get(`/pemesanan/items`, {
          params,
        });

        setTours(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTours();
  }, [activeCategory]);

  // Mouse move effect
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
      return () => heroSection.removeEventListener("mousemove", handleMouseMove);
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
          {/* Dekorasi jika ada */}
        </div>
        <div className="hero-content">
          <h1 className="hero-title playfair">{t("daytour.daytourpackage")}</h1>
          <div className="breadcrumb">
            <button
              className="breadcrumb-link cursor-pointer"
              onClick={handleHomeClick}
            >
              {t("services.home")}
            </button>
            <span className="separator">/</span>
            <span>{t("daytour.daytourpackage")}</span>
          </div>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="categories-container">
        <div className="categories-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Day Tour Cards */}
      <DayTourGrid cards={tours} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DayTourPage;
