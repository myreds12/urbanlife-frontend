import React from 'react';
import './TicketCard.css';

const TicketCard = ({ 
  backgroundImage, 
  title, 
  subtitle, 
  icon, 
  rightTitle, 
  buttonText = "See more",
  barcodeImage 
}) => {
  return (
    <div className="ticket-card-container">
      <div className="ticket-card">
        <div className="card-left">
          <div className="card-background" style={{ backgroundImage: `url(${backgroundImage})` }} >
            <div className="card-overlay">
              <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-subtitle">— {subtitle}</p>
              </div>
            </div>
          </div>
          <div className="perforation-left"></div>
        </div>

        <div className="card-right">
          <div className="right-content">
            <div className="icon-container">
              <div className="star-row">
                <img src="/images/LandingPage/Footer/star.png" alt="star" className="star-image2" />
                <img src="/images/LandingPage/Footer/star.png" alt="star" className="star-image" />
                <img src={icon} alt="icon" className="card-icon" />
                <img src="/images/LandingPage/Footer/star.png" alt="star" className="star-image" />
                <img src="/images/LandingPage/Footer/star.png" alt="star" className="star-image2" />
              </div>
              <div className="barcode">
                <img src={barcodeImage} alt="barcode" className="barcode-image" />
              </div>
              <h3 className="right-title">{rightTitle}</h3>
              <button className="see-more-btn">{buttonText}</button>
            </div>
          </div>
          <div className="perforation-right"></div>
        </div>
        <div className="separation-line"></div>
      </div>
    </div>
  );
};

export default TicketCard;