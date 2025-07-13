import React, { useState, useEffect, useRef } from "react";
import DestinationCard from "../../../components/LandingPage/HomePage/DestinationCard";
import "../../../styles/LandingPage/HomePage/AutoScrollDestinationSlider.css";

const AutoScrollDestinationSlider = ({ travelData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  // Konfigurasi
  const itemsPerView = window.innerWidth > 768 ? 4 : window.innerWidth > 480 ? 2 : 1;
  const autoScrollInterval = 4000; // 4 detik
  const totalItems = travelData.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Auto scroll functionality
  useEffect(() => {
    if (isAutoPlaying && totalItems > itemsPerView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex > maxIndex ? 0 : nextIndex;
        });
      }, autoScrollInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, maxIndex, totalItems, itemsPerView]);

  // Handle navigation
  const nextSlide = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex > maxIndex ? 0 : nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex < 0 ? maxIndex : prevIndex);
  };

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Calculate transform
  const cardWidth = window.innerWidth > 768 ? 300 : window.innerWidth > 480 ? 280 : 260;
  const translateX = -currentIndex * cardWidth;

  return (
    <div className="simple-carousel-container">
      <div 
        className="simple-carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation Buttons */}
        {totalItems > itemsPerView && (
          <>
            <button className="simple-nav simple-nav-prev" onClick={prevSlide}>
              &#8249;
            </button>
            <button className="simple-nav simple-nav-next" onClick={nextSlide}>
              &#8250;
            </button>
          </>
        )}

        {/* Carousel Track */}
        <div className="simple-carousel-track-container">
          <div 
            className="simple-carousel-track"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {travelData.map((item, index) => (
              <div key={item.id} className="simple-carousel-slide">
                <DestinationCard travel={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple Dots */}
      {totalItems > itemsPerView && (
        <div className="simple-carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <span
              key={index}
              className={`simple-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoScrollDestinationSlider;