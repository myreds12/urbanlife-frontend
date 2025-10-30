import React from "react";
import { useTranslation } from "react-i18next";
import "./UnitCarItem.css";

const UnitCarItem = ({
  image,
  unit,
  people,
  title,
  startsPrice,
  description,
  duration = [],
  onBookNow
}) => {
  const { t } = useTranslation();

  return (
    <div className="card-item">
      <div className="card-image">
        <img src={image} alt={unit} />
        <span className="people-badge">{people}</span>

        <div className="text-overlay">
          <h3 className="car-unit">{unit}</h3>
          <div className="price">
            <h3 className="car-title">{title}</h3>
            <p className="car-price">Rp. {startsPrice.toLocaleString()}</p>
          </div>
        </div>

        {/* Hover Content */}
        <div className="hover-content">
          <div className="scrollable-content">
            <div className="hover-description">
              <p>{description}</p>
            </div>

            {duration.length > 0 && (
              <div className="duration-list">
                <h4>{t("rentcar.duration_price")}:</h4>
                <ul>
                  {duration.map((item, index) => (
                    <li key={index}>
                      <span className="duration-time">{item.durasi.replace('hours', t('rentcar.hours'))}</span>
                      <span className="duration-price">Rp. {parseInt(item.harga || 0).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button className="more-detail-btn" onClick={onBookNow}>
            {t("unitcar.moredetail")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitCarItem;