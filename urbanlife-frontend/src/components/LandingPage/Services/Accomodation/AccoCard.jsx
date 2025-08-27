import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AccoCard.css";

const AccoCard = ({
  backgroundImage,
  location,
  unit,
  type,
  linkTo,
}) => {
  const { t } = useTranslation();

  return (
    <div className="acco-card-container">
      <div className="acco-card">
        {/* Top side with background image & content */}
        <div className="card-top">
          <div
            className="card-background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="location-badge">{location}</div>
            <div className="card-content">
              <h2 className="unit-name">{unit}</h2>
              <p className="unit-type">— {type}</p>
            </div>
          </div>
        </div>

        {/* Bottom side with stars and button see more*/}
        <div className="card-bottom">
          <div className="stars-container">
            <img
              src="/images/LandingPage/Footer/star.png"
              alt="star"
              className="star-small"
            />
            <img
              src="/images/LandingPage/Footer/star.png"
              alt="star"
              className="star-medium"
            />
            <img
              src="/images/LandingPage/Footer/star.png"
              alt="star"
              className="star-large"
            />
          </div>

          <Link to={linkTo} className="button-link">
            <button className="see-more-button">{t("accomodation.seemore")}</button>
          </Link>

          <div className="stars-container">
            <img
              src="/images/LandingPage/Footer/star.png"
              alt="star"
              className="star-large"
            />
            <img
              src="/images/LandingPage/Footer/star.png"
              alt="star"
              className="star-medium"
            />
            <img
              src="/images/LandingPage/Footer/star.png"
              alt="star"
              className="star-small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccoCard;
