import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "../../../styles/LandingPage/HomePage/DestinationCard.css";
import ModalDestination from "../Utils/modal/ModalDestination";

const DestinationCard = ({ country, title, destinations, price, image }) => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookNow = () => {
    const bookingData = {
      date: 'Kam, 08 Mei 2025',
      duration: '1 - 12 hours',
      location: country,
      vehicle: title,
      image: image,
      price: `Rp ${price}`,
    };

    navigate("/OrderDetail", { state: bookingData });
  };

  // Data untuk sharing
  const shareData = {
    title: "Bagikan Destinasi",
    location: country,
    description: `${title} - ${destinations}`,
    image: image,
    url: `${window.location.origin}/destination/${title.replace(/\s+/g, '-').toLowerCase()}`
  };

  return (
    <>
      <div
        className={`destination-card ${isShareModalOpen ? 'hover-active' : ''}`}
        onMouseEnter={() => {
          console.log("Mouse entered card:", title);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (!isShareModalOpen) {
            console.log("Mouse left card:", title);
            setIsHovered(false);
          }
        }}
      >
        <div className="card-image">
          <img src={image} alt={title} />
          
          {/* Country Label - Top Left */}
          <div className="country-label">{country}</div>
          
          {/* Shared Button - Top Right */}
          <button
            onClick={() => {
              console.log("Share button clicked for:", title);
              setIsShareModalOpen(true);
              setIsHovered(true); // Pertahankan status hover saat modal terbuka
            }}
            className="share-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/>
            </svg>
          </button>
          
          {/* Book Now Button - Bottom Right */}
          <button onClick={handleBookNow} className="book-btn">
            Book now <span className="arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </span>
          </button>
        </div>
        
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="destinations">{destinations}</p>
          <p className="price">From Rp {price}</p>
        </div>
      </div>

      {/* Share Modal menggunakan Portal untuk render di luar component tree */}
      {isShareModalOpen && createPortal(
        <ModalDestination
          isOpen={isShareModalOpen}
          onClose={() => {
            console.log("Modal closed for:", title);
            setIsShareModalOpen(false);
            setIsHovered(false); // Reset status hover saat modal ditutup
          }}
          shareData={shareData}
        />,
        document.body
      )}
    </>
  );
};

export default DestinationCard;