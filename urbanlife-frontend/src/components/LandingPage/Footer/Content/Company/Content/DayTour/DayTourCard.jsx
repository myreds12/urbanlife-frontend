import React from "react";
import { Link } from "react-router-dom";
import "./DayTourCard.css";

const DayTourCard = ({ image, title, price, description, onBookNow }) => {
  return (
    <div className="card-item">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <div className="price-and-button">
          <div className="card-price">From IDR {price.toLocaleString()}</div>
          <button onClick={onBookNow} className="card-button">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};


export default DayTourCard;
