import React, { useState, useEffect } from "react";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const TourImage = ({ images = null, itinerary_images = null, title = "Tour Image", type = null, location = null }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const [processedImages, setProcessedImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    let all_images = [];
    console.log(images, 'images')

    if (type == "travel_package") {
      const itinerary_images_filter = itinerary_images.filter(img => i18n.language == "en" ? img.bahasa === "ENGLISH" : img.bahasa === "INDONESIA")

      itinerary_images_filter.forEach((item) => {
        item.itinerary_files?.forEach((file) => {
          all_images.push({
            image: `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${file.url
              .replace(/\\/g, "/")
              .replace(/^uploads\//, "")}`,
            label: item.nama
          });
        });
      });
    } else if (["kendaraan", "airport_shuttle", "port_shuttle"].includes(type)) {
      all_images = images.map((img) => ({
        image: `${img
          .replace(/\\/g, "/")
          .replace(/^uploads\//, "")}`,
        label: location
      }));
    } else {
      all_images = images.map((img) => ({
        image: `${img
          .replace(/\\/g, "/")
          .replace(/^uploads\//, "")}`,
        label: "Indonesia"
      }));
    }

    if (all_images.length === 0) {
      all_images.push({
        imageUrl: "/public/images/error/No_Image_Available.jpg",
        label: "No Image Available"
      });
    }

    setProcessedImages(all_images);
  }, [images, itinerary_images, t]);

  // Take first 3 images
  const mainImages = processedImages.slice(0, 5);

  // Open gallery modal
  const handleOpenGallery = () => {
    setIsGalleryOpen(true);
  };

  // Close gallery modal
  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setCurrentImageIndex(0);
  };

  // Navigate images
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? processedImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === processedImages.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isGalleryOpen) return;

      switch (e.key) {
        case "Escape":
          handleCloseGallery();
          break;
        case "ArrowLeft":
          handlePrevImage();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isGalleryOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGalleryOpen]);

  return (
    <div className="relative max-w-7xl mx-auto">
      {(!processedImages || processedImages.length === 0) ? (
        <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
          <p className="text-gray-500 text-sm">No images available</p>
        </div>
      ) : (
        <>
          {/* Grid layout */}
          <div className="grid grid-cols-1 gap-4 swiper-container">
            {/* <div className="w-full rounded-lg overflow-hidden relative">
              <img
                src={mainImages[0].image}
                alt={`${title} - Image 1`}
                className="w-full h-auto object-cover"
              />
              {["travel_package", "kendaraan", "airport_shuttle", "port_shuttle"].includes(type) && (
                <div className="itinerary-label">{mainImages[0].label}</div>
              )}
            </div>
            <div className="grid grid-rows-2 gap-4">
              {mainImages.slice(1, 3).map((img, index) => (
                <div key={index} className="h-56 rounded-lg overflow-hidden relative">
                  <img
                    src={img.image}
                    alt={`${title} - Image ${index + 2}`}
                    className="w-full h-auto object-cover"
                  />
                  {["travel_package", "kendaraan", "airport_shuttle", "port_shuttle"].includes(type) && (
                    <div className="itinerary-label">{img.label}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-rows-2 gap-4">
              {mainImages.slice(3, 6).map((img, index) => (
                <div key={index} className="h-56 rounded-lg overflow-hidden relative">
                  <img
                    src={img.image}
                    alt={`${title} - Image ${index + 3}`}
                    className="w-full h-auto object-cover"
                  />
                  {["travel_package", "kendaraan", "airport_shuttle", "port_shuttle"].includes(type) && (
                    <div className="itinerary-label">{img.label}</div>
                  )}
                </div>
              ))}
            </div> */}
            <Swiper
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiper-tour"
            >
              {mainImages.slice(0, 6).map((img, index) => (
                <SwiperSlide>
                  <img src={img.image}
                    alt={`${title} - Image ${index + 3}`} />
                  {["travel_package", "kendaraan", "airport_shuttle", "port_shuttle"].includes(type) && (
                    <div className="itinerary-label main-label">{img.label}</div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
              breakpoints={{
                1024: {
                  slidesPerView: 4, 
                },
                768: {
                  slidesPerView: 3
                },
                480: {
                  slidesPerView: 3,
                },
                0: {
                  slidesPerView: 3,
                },
              }}
            >
              {mainImages.slice(0, 6).map((img, index) => (
                <SwiperSlide>
                  <img src={img.image}
                    alt={`${title} - Image ${index + 3}`} />
                  {["travel_package", "kendaraan", "airport_shuttle", "port_shuttle"].includes(type) && (
                    <div className="itinerary-label thumb-label">{img.label}</div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* See all image button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute see-all-button bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            {t("detail.seeallimage")}
          </button>
        </>
      )}

      {/* Gallery modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-gray-400/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{title} Gallery</h3>
              <button
                onClick={() => {
                  setIsGalleryOpen(false);
                  setCurrentImageIndex(0);
                }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main image */}
            <div className="relative p-20 bg-gray-50 flex items-center justify-center min-h-[400px]">
              <div className=" overflow-hidden relative">
                <img
                  src={processedImages[currentImageIndex].image}
                  alt={`${title} - Image ${currentImageIndex + 1}`}
                  className="w-full max-w-[600px] max-h-[400px] object-contain"
                />
                {["travel_package", "kendaraan", "airport_shuttle", "port_shuttle"].includes(type)
                  ? <div className="itinerary-label">{processedImages[currentImageIndex].label}</div>
                  : <></>}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                {currentImageIndex + 1} / {processedImages.length}
              </div>

              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-800 p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-800 p-2 rounded-full shadow-md"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourImage;
