import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { accommodations } from "./AccoDummy";
import { ChevronLeft, ChevronRight, ShoppingCart, X } from "lucide-react";
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
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          handleImageNavigation("prev");
          break;
        case 'ArrowRight':
          handleImageNavigation("next");
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentImageIndex]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
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

  const handleOrderClick = (item) => {
    // Assuming onOrderClick is defined elsewhere or handle accordingly
    console.log("Order clicked for:", item?.nama || accommodation.unit);
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

  const images = accommodation.images || [];

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
        {/* Animated Decorative Elements */}
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
        {/* Image Gallery Section - Keep original thumbnail slider */}
        <div className="image-gallery-section">
          <div className="thumbnail-slider-wrapper">
            <button
              className="slider-arrow left"
              onClick={() => scrollThumbnail("left")}
            >
              <ChevronLeft />
            </button>

            <div className="thumbnail-slider" ref={thumbnailSliderRef}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Hotel view ${idx + 1}`}
                  className="gallery-thumb cursor-pointer"
                  onClick={() => openModal(idx)}
                />
              ))}
            </div>

            <button
              className="slider-arrow right"
              onClick={() => scrollThumbnail("right")}
            >
              <ChevronRight />
            </button>
          </div>

          <div className="info-basic">
            <div className="info-row">
              <span className="info-label">{accommodation.unit}</span>
              <button onClick={() => handleOrderClick(accommodation)} className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap">
                <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                Order
              </button>
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
                  src={images[currentImageIndex]}
                  alt={`${room.room} preview`}
                  className="room-main-image cursor-pointer"
                  onClick={() => openModal(currentImageIndex)}
                />

                <div className="room-thumbnails">
                  {images.slice(0, 3).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumb ${index + 1}`}
                      className={`room-thumb ${
                        currentImageIndex === index ? "active" : ""
                      } cursor-pointer`}
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

      {/* Improved Image Modal - Adapted from TourImage */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-gray-400/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" 
          onClick={handleModalBackdropClick}
        >
          {/* Modal Content */}
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{accommodation.unit} Gallery</h3>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Display */}
            <div className="relative bg-gray-50 flex items-center justify-center min-h-[400px]">
              <img
                src={images[currentImageIndex]}
                alt={`${accommodation.unit} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[500px] object-contain"
                loading="lazy"
              />
              
              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => handleImageNavigation("prev")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleImageNavigation("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'border-cyan-500 ring-2 ring-cyan-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${accommodation.unit} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AccoDetail;