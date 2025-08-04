import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { accommodations } from "./AccoDummy";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Navbar from "../../HomePage/Navbar/Navbar";
import Footer from "../../HomePage/Footer";
import "./AccoDetail.css";

const AccoDetail = () => {
  const navigate = useNavigate();
  const accommodation = accommodations[0];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnailSliderRef = useRef(null);

  const scrollThumbnail = (direction) => {
    if (!thumbnailSliderRef.current) return;
    const scrollAmount = 250;
    thumbnailSliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
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

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleImageNavigation = (direction) => {
    if (!accommodation?.images) return;
    if (direction === "next") {
      setCurrentImageIndex((prev) =>
        prev === accommodation.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? accommodation.images.length - 1 : prev - 1
      );
    }
  };

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  const openModal = (index = 0) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!accommodation) {
    return (
      <div className="acco-detail-page">
        <Navbar />
        <div className="not-found">
          <h2>Data Not Available</h2>
          <p>Please check AccoDummy.jsx file</p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="acco-detail-page">
      <div className="navbar-fixed">
        <Navbar />
      </div>

      <div
        className="hero-section"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #00A5CC 0%, #007F9F 40%, #0092B8 100%)`,
        }}
      >
        {/* Animated Decorative Elements. takda css nya */}
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
            <button
              className="breadcrumb-link cursor-pointer"
              onClick={handleHomeClick}
            >
              Home
            </button>
            <span className="separator">/</span>
            <span>Accommodation</span>
          </div>
        </div>
      </div>

      <div className="acco-container">
        {/* Image Gallery Section */}
        <div className="image-gallery-section">
          <div className="thumbnail-slider-wrapper">
            <button
              className="slider-arrow left"
              onClick={() => scrollThumbnail("left")}
            >
              <FiChevronLeft />
            </button>

            <div className="thumbnail-slider" ref={thumbnailSliderRef}>
              {accommodation.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Hotel view ${idx + 1}`}
                  className="gallery-thumb"
                  onClick={() => openModal(idx)}
                />
              ))}
            </div>

            <button
              className="slider-arrow right"
              onClick={() => scrollThumbnail("right")}
            >
              <FiChevronRight />
            </button>
          </div>

          <div className="info-basic">
            <div className="info-row">
              <span className="info-label">{accommodation.unit}</span>
              <span className="info-location">{accommodation.location}</span>
            </div>
            <div className="info-description">
              <p>{accommodation.description}</p>
            </div>
          </div>
        </div>

        {/* Pricing and Facility Section */}
        <div className="pricing-facility-section">
          <h3 className="section-title">PRICING & FACILITY</h3>
          {accommodation.rooms.map((room, idx) => (
            <div key={idx} className="room-card">
              <div className="room-image-box">
                <img
                  src={accommodation.images[currentImageIndex]}
                  alt={`${room.room} preview`}
                  className="room-main-image"
                  onClick={() => openModal(currentImageIndex)}
                />

                <div className="room-thumbnails">
                  {accommodation.images.slice(0, 3).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumb ${index + 1}`}
                      className={`room-thumb ${
                        currentImageIndex === index ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="room-detail">
                <div className="room-header">
                  <h4 className="room-name">{room.room}</h4>
                  <p className="room-price">{room.price}</p>
                </div>
                <p className="facility-title">Facilities :</p>
                <ul className="room-facilities">
                  {room.facility?.map((fac, index) => (
                    <li key={index} className="facility-item">
                      {fac}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <div
        className={`image-modal ${isModalOpen ? "active" : ""}`}
        onClick={handleModalBackdropClick}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>
            ×
          </button>

          {accommodation.images && accommodation.images[currentImageIndex] && (
            <img
              src={accommodation.images[currentImageIndex]}
              alt={`Hotel view ${currentImageIndex + 1}`}
              className="modal-image"
            />
          )}

          <div className="modal-controls">
            <button
              className="modal-nav-btn"
              onClick={() => handleImageNavigation("prev")}
              disabled={
                !accommodation.images || accommodation.images.length <= 1
              }
            >
              ‹ Prev
            </button>

            <span className="modal-image-counter">
              {currentImageIndex + 1} / {accommodation.images?.length || 0}
            </span>

            <button
              className="modal-nav-btn"
              onClick={() => handleImageNavigation("next")}
              disabled={
                !accommodation.images || accommodation.images.length <= 1
              }
            >
              Next ›
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccoDetail;
