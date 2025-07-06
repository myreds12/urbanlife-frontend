import React, { useState, useEffect } from 'react';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

const TourImage = ({ images = [], title = 'Tour Image' }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle empty images
  if (!images || images.length === 0) {
    return (
      <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-500 text-sm">No images available</p>
      </div>
    );
  }

  // Take first 3 images
  const mainImages = images.slice(0, 3);

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
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isGalleryOpen) return;
      
      switch (e.key) {
        case 'Escape':
          handleCloseGallery();
          break;
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen]);

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Grid layout: 1 big image left, 2 vertical images right */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left big image */}
        <div className="w-full rounded-lg overflow-hidden">
          <img
            src={mainImages[0]}
            alt={`${title} - Image 1`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {/* Right vertical images */}
        <div className="grid grid-rows-2 gap-4">
          {mainImages.slice(1, 3).map((image, index) => (
            <div key={index} className="h-55 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`${title} - Image ${index + 2}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* See all image button */}
      <button
        onClick={handleOpenGallery}
        aria-label="View all images"
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-200"
      >
        <Eye className="w-4 h-4" />
        See all {images.length} images
      </button>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-gray-400/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          {/* Modal Content */}
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title} Gallery</h3>
              <button
                onClick={handleCloseGallery}
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
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[500px] object-contain"
                loading="lazy"
              />
              
              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
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
                      alt={`${title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={handleCloseGallery}
            aria-label="Close gallery"
          />
        </div>
      )}
    </div>
  );
};

export default TourImage;