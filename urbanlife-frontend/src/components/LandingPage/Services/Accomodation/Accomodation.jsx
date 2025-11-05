import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Navbar from "../../HomePage/Navbar/Navbar";
import Footer from "../../HomePage/Footer";
import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";
import AccoCard from "./AccoCard";
import "./Accomodation.css";

const AccomodationPage = () => {
  const [activeAccomodation, setActiveAccomodation] = useState("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [accommodations, setAccommodations] = useState([]);
  const { t } = useTranslation();
  const [categories, setCategories] = useState([])
  const [filteredAccomodation, setFilteredAccommodations] = useState([])

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  // Fetch categories from API
// const categories = [
//     { id: "all", name: "All" },
//     { id: "hotel", name: "Hotel" },
//     { id: "eco_lodge", name: "Eco Lodge" },
//     { id: "guest_house", name: "Guest House" },
//   ];


  useEffect(() => {
    const fetchCategoriesAndAccommodations = async () => {
      try {
        const categoriesRes = await apiClient.get(`/type-akomodasi`, { params: { take: 100, page: 1 } });
        const accommodationsRes = await apiClient.get(`/akomodasi`, { params: { take: 100, page: 1 } });

        if (categoriesRes.data.status === 200 && accommodationsRes.data.status === 200) {
          const allCategories = categoriesRes.data.data || [];
          const allAccommodations = accommodationsRes.data.data || [];

          const formattedCategories = [
            { id: "all", name: "All" },
            ...allCategories.map(type => ({
              id: type.id,
              name: type.name
            })),
          ];

          setCategories(formattedCategories);
          setAccommodations(allAccommodations); 

          setFilteredAccommodations(allAccommodations);
        }
      } catch (error) {
        console.error("Failed to fetch categories or accommodations:", error);
      }
    };

    fetchCategoriesAndAccommodations();
  }, []); 

  useEffect(() => {
    if (activeAccomodation === "all") {
      setFilteredAccommodations(accommodations);
    } else {
      setFilteredAccommodations(
        accommodations.filter(accommodation => accommodation.type_akomodasi_id === activeAccomodation)
      );
    }
  }, [activeAccomodation, accommodations]);

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
                onClick={() => handleAccomodationClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="content-area">
        {filteredAccomodation.length === 0 ? (
          <EmptyState />
        ) : (
          <div className={`all-accommodations`}>
            {filteredAccomodation.map((accommodation) => {
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
                  type={accommodation.tipe}
                  buttonText="See More"
                  linkTo={`/accomodation/detail/${accommodation.id}`} //TODO: Ubah rute ke OrderDetail langsung
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
