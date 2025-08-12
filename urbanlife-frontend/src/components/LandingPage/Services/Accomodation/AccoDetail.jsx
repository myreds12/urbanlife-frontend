import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Navbar from "../../HomePage/Navbar/Navbar";
import Footer from "../../HomePage/Footer";
import "./AccoDetail.css";
import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";

const AccoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [accommodation, setAccommodation] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnailSliderRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Helper untuk format URL file
  const formatFileUrl = (path) => {
    if (!path) return "/public/images/error/No_Image_Available.jpg";
    return `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${path
      .replace(/\\/g, "/") // backslash → slash
      .replace(/^uploads\//, "")}`; // hapus 'uploads/' di awal
  };

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(`/akomodasi/${id}`);
        setAccommodation(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
    if (!accommodation?.akomodasi_file) return;
    if (direction === "next") {
      setCurrentImageIndex((prev) =>
        prev === accommodation.akomodasi_file.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? accommodation.akomodasi_file.length - 1 : prev - 1
      );
    }
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

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleOrderClick = () => {
  const tanggalHariIni = new Date().toISOString().split("T")[0];

  const bookingData = {
    id,
    title: accommodation.nama,
    type: "akomodasi",
    country: accommodation.location?.split(", ")?.[1] || "Unknown",
    location: accommodation.location?.split(", ")?.[0] || "Unknown",
    image: formatFileUrl(accommodation?.akomodasi_file?.[0]?.url) || "/public/images/error/No_Image_Available.jpg",
    content: accommodation.akomodasi_content?.[0] || {
      description: "No description available.",
      policies: [],
      itinerary: [],
      priceTable: [],
    },
    tanggal: tanggalHariIni,
  };

  // Sama seperti di handleBookNow → masukkan data spesifik untuk akomodasi
  bookingData.room_and_price = accommodation.akomodasi_room_and_price;
  bookingData.price = accommodation.akomodasi_room_and_price?.[0]?.harga ?? 0;

  console.log("Navigating to OrderDetail with data:", bookingData);

  navigate(`/OrderDetail?type=akomodasi&id=${id}`, {
    state: bookingData,
  });
};


  // const handleOrderClick = (room) => {
  //   console.log("Order clicked for:", room.nama);
  // };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!accommodation) {
    return (
      <div className="acco-detail-page">
        <Navbar />
        <div className="not-found">
          <h2>Data Not Available</h2>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  // const images = accommodation.images || [];

  return (
  <div className="acco-detail-page">
    {/* Navbar fixed */}
    <div className="navbar-fixed">
      <Navbar />
    </div>

    {/* Hero Section */}
    <div
      className="hero-section"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #00A5CC 0%, #007F9F 40%, #0092B8 100%)`,
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title playfair">{accommodation.nama}</h1>
        <div className="breadcrumb">
          <button
            className="breadcrumb-link cursor-pointer"
            onClick={handleHomeClick}
          >
            Home
          </button>
          <span className="separator">/</span>
          <span>{accommodation.kategori}</span>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="acco-container space-y-8">
      {/* Image Gallery + Info */}
      <div className="image-gallery-section flex flex-col md:flex-row gap-6">
        {/* Thumbnail Slider */}
        <div className="thumbnail-slider-wrapper flex-shrink-0">
          <button
            className="slider-arrow left"
            onClick={() => scrollThumbnail("left")}
          >
            <ChevronLeft />
          </button>

          <div className="thumbnail-slider" ref={thumbnailSliderRef}>
            {accommodation.akomodasi_file.map((file, idx) => (
              <img
                key={idx}
                src={formatFileUrl(file.url)}
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

        {/* Info */}
        <div className="info-basic flex-1">
          <div className="info-row">
            <span className="info-label text-lg font-semibold text-gray-800">
              {accommodation.kategori}
            </span>
          </div>

          <div className="info-description max-h-40 overflow-y-auto pr-2 text-gray-700 text-sm leading-relaxed mt-2 border rounded-md p-3 bg-gray-50">
            <p>{accommodation.akomodasi_content[0]?.deskripsi}</p>
          </div>

          {/* Tombol Order */}
          <div className="mt-4">
            <button
              onClick={() => handleOrderClick(accommodation)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md"
            >
              <ShoppingCart size={16} />
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Pricing and Facility */}
      <div className="pricing-facility-section">
        <h3 className="section-title text-xl font-semibold mb-4">Pricing & Facility</h3>
        <div className="space-y-4">
          {accommodation.akomodasi_room_and_price.map((room, idx) => {
            const fasilitasGroup = accommodation.akomodasi_facility_group.find(
              (f) => f.nama === room.nama
            );
            return (
              <div key={idx} className="room-card border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className="room-image-box md:w-1/3">
                  <img
                    src={formatFileUrl(room.AkomodasiFile[0]?.url)}
                    alt={`${room.nama} preview`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openModal(currentImageIndex)}
                  />
                </div>

                <div className="room-detail flex-1 p-4">
                  <div className="room-header flex justify-between items-center mb-2">
                    <h4 className="room-name text-lg font-semibold">{room.nama}</h4>
                    <p className="room-price text-cyan-700 font-bold">
                      IDR {parseInt(room.harga).toLocaleString()}
                    </p>
                  </div>
                  <p className="facility-title font-medium">Facilities:</p>
                  <ul className="room-facilities list-disc pl-5 mt-1 text-gray-700 text-sm">
                    {fasilitasGroup?.fasilitas.map((fac, index) => (
                      <li key={index}>{fac.nama}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Image Modal */}
    {isModalOpen && (
      <div
        className="image-modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={handleModalBackdropClick}
      >
        <div className="modal-content relative bg-white rounded-lg overflow-hidden shadow-lg">
          <button
            className="modal-close absolute top-2 right-3 text-3xl text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            ×
          </button>

          {accommodation.akomodasi_file[currentImageIndex] && (
            <img
              src={formatFileUrl(accommodation.akomodasi_file[currentImageIndex]?.url)}
              alt={`Hotel view ${currentImageIndex + 1}`}
              className="modal-image max-h-[80vh] object-contain"
            />
          )}

          <div className="modal-controls flex justify-between items-center p-4 bg-gray-100">
            <button
              className="modal-nav-btn text-sm font-medium text-cyan-700"
              onClick={() => handleImageNavigation("prev")}
            >
              ‹ Prev
            </button>

            <span className="modal-image-counter text-sm text-gray-600">
              {currentImageIndex + 1} / {accommodation.akomodasi_file.length}
            </span>

            <button
              className="modal-nav-btn text-sm font-medium text-cyan-700"
              onClick={() => handleImageNavigation("next")}
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
    )}

    <Footer />
  </div>
);

};

export default AccoDetail;