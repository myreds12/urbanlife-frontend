import React, { useState, useEffect } from "react";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";

const TourImage = ({ images = null, itinerary_images = null, title = "Tour Image" }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();
  const [processedImages, setProcessedImages] = useState([]);

  useEffect(() => {
    let all_images = [];
    console.log(images, 'images')
    if (Array.isArray(images) && images.length > 0) {
      all_images = images.map((img) =>
        `${img
          .replace(/\\/g, "/")
          .replace(/^uploads\//, "")}`
      );
    }

    else if (Array.isArray(itinerary_images)) {
      itinerary_images.forEach((item) => {
        item.itinerary_files?.forEach((file) => {
          all_images.push(
            `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${file.url
              .replace(/\\/g, "/")
              .replace(/^uploads\//, "")}`
          );
        });
      });
    }

    if (all_images.length === 0) {
      all_images.push("/public/images/error/No_Image_Available.jpg");
    }

    setProcessedImages(all_images);
  }, [images, itinerary_images]);

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
          <div className="grid grid-cols-3 gap-4">
            <div className="w-full rounded-lg overflow-hidden">
              <img
                src={mainImages[0]}
                alt={`${title} - Image 1`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-4">
              {mainImages.slice(1, 3).map((image, index) => (
                <div key={index} className="h-55 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${title} - Image ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-rows-2 gap-4">
              {mainImages.slice(3, 6).map((image, index) => (
                <div key={index} className="h-55 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${title} - Image ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* See all image button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white hover:shadow-lg transition-all duration-300"
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
            <div className="relative p-10 bg-gray-50 flex items-center justify-center min-h-[400px]">
              <img
                src={processedImages[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="max-w-[600px] max-h-[400px] object-contain"
              />
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
