import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/LandingPage/HomePage/DestinationCard.css";

const DestinationCard = ({ country, title, destinations, price, image }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

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

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={image} alt={title} />
        
        {/* Country Label - Top Left */}
        <div className="country-label">{country}</div>
        
        {/* Heart/Like Button - Top Right */}
        <button 
          className={`heart-icon ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeToggle}
          aria-label="Like destination"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={isLiked ? "#ff4757" : "none"} 
            stroke={isLiked ? "#ff4757" : "#ffffff"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
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
  );
};

export default DestinationCard;