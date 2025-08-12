import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Navbar from "../../HomePage/Navbar/Navbar";
import Footer from "../../HomePage/Footer";
import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";
import AccoCard from "./AccoCard";
import "./Accomodation.css";

const AccomodationPage = () => {
  const [activeAccomodation, setActiveAccomodation] = useState("All");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [categories, setCategories] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const { t } = useTranslation();

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get(`/category`);
        const apiCategories = res.data.data || [];
        setCategories([{ id: "all", name: "All" }, ...apiCategories]);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch accommodations based on selected category
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const params = { take: 10, page: 1 };
        if (activeAccomodation !== "All") {
          params.kategori = activeAccomodation;
        }

        const res = await apiClient.get(`/akomodasi`, { params });

        if (res.data.status === 200) {
          setAccommodations(res.data.data || []);
        } else {
          console.error("Gagal mengambil data akomodasi:", res.data.message);
        }
      } catch (error) {
        console.error("Gagal mengambil data akomodasi:", error);
      }
    };

    fetchAccommodations();
  }, [activeAccomodation]);

  // Mouse move effect for hero section
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

  const handleAccomodationClick = (category) => {
    setActiveAccomodation(category);
  };

  // Empty State Component
  const EmptyState = () => (
      <div className="no-cards text-center py-10 text-gray-500">
        <h3 className="text-lg font-semibold">{t("services.nocontent")}</h3>
        <p>{t("accomodation.noaccomodation")}</p>
      </div>
  );

  return (
    <div className="accommodations-page">
      {/* Fixed Navbar */}
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
          <h1 className="hero-title playfair">{t("accomodation.acco")}</h1>
          <div className="breadcrumb">
            <button
              className="breadcrumb-link cursor-pointer"
              onClick={handleHomeClick}
            >
              {t("services.home")}
            </button>
            <span className="separator">/</span>
            <span>{t("accomodation.acco")}</span>
          </div>
        </div>
      </div>

      {/* Accommodations Section */}
      {categories.length > 0 && (
        <div className="accommodations-container">
          <div className="accommodations-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`accommodation-tab ${
                  activeAccomodation === category.name ? "active" : ""
                }`}
                onClick={() => handleAccomodationClick(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="content-area">
        {accommodations.length === 0 ? (
          <EmptyState />
        ) : (
          <div className={`all-accommodations`}>
            {accommodations.map((accommodation) => {
              const image =
                accommodation.akomodasi_file &&
                accommodation.akomodasi_file[0]?.url &&
                accommodation.akomodasi_file[0]?.url !== ""
                  ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${accommodation.akomodasi_file[0].url
                      .replace(/\\/g, "/")
                      .replace(/^uploads\//, "")}`
                  : "/public/images/error/No_Image_Available.jpg";

              return (
                <AccoCard
                  key={accommodation.id}
                  backgroundImage={image}
                  location={accommodation.lokasi?.nama || ""}
                  unit={accommodation.nama}
                  type={accommodation.kategori}
                  buttonText="See More"
                  linkTo={`/akomodasi/${accommodation.id}`} //TODO: Ubah rute ke OrderDetail langsung
                />
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AccomodationPage;
