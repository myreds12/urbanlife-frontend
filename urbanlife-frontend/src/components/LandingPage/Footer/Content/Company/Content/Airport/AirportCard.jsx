import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../DayTour/DayTourCard";

const AirportCard = ({ image, title, price, description, onBookNow }) => {
  const { t } = useTranslation();

  return (
    <div className="card-item">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <div className="price-and-button">
          <div className="card-price">From Rp. {price.toLocaleString()}</div>
          <button onClick={onBookNow} className="card-button">
            {t("airport.readmore")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AirportCard;
