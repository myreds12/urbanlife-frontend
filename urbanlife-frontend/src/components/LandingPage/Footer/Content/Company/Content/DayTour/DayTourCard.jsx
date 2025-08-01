import React from "react";
import { Link } from "react-router-dom";
import "./DayTourCard.css";

const DayTourCard = ({ image, title, duration, price, description, linkTo }) => {
  return (
 <div className="card-item">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>

      <div className="card-content">
        <div className="card-tags">
          {duration && (
            <span className="card-tag" style={{ backgroundColor: "#10b981" }}>
              ⏱ {duration}
            </span>
          )}
        </div>

        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <div className="price-and-button">
          <div className="card-price">From IDR {price.toLocaleString()}</div>
          <Link to={linkTo} className="card-button">
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DayTourCard;
