import React, { useState, useEffect } from "react";
import Navbar from "../../../../HomePage/Navbar/Navbar";
import PortGrid from "./Port/PortGrid";
import Footer from "../../../../HomePage/Footer";
import "./DayTour/DayTourPage.css";
import apiClient from "../../../../../AdminDashboard/Utils/ApiClient/apiClient";
import { useTranslation } from 'react-i18next';

const PortPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();


  console.log('Current language:', i18n.language);

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  // FETCH items (by category)
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const params = {
          take: 10,
          page: 1,
          type: "PORT_SHUTTLE",
        };

        const res = await apiClient.get(`/pemesanan/items`, {
          params,
        });

        setData(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTours();
  }, []);

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
          <h1 className="hero-title playfair">{t("port.portpackage")}</h1>
          <div className="breadcrumb">
            <button
              className="breadcrumb-link cursor-pointer"
              onClick={handleHomeClick}
            >
              {t("services.home")}
            </button>
            <span className="separator">/</span>
            <span>{t("port.portpackage")}</span>
          </div>
        </div>
      </div>

      <div className="categories-container"><div className="categories-tabs"></div></div>
      {/* Day Tour Cards */}
      <PortGrid cards={data} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PortPage;
