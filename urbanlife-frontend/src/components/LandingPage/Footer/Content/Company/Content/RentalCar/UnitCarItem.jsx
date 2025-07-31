import React from 'react';
import './UnitCarItem.css';

const UnitCarItem = ({ 
  image, 
  unit,
  people, 
  title, 
  price, 
  description
}) => {
  return (
    <div className="card-item" data-description={description}>
      <div className="card-image">
        <img src={image} alt={unit} />
        <span className="people-badge">{people}</span>

        <div className="text-overlay">
         <h3 className="car-unit">{unit}</h3>
         <div className="price">
              <h3 className="car-title">{title}</h3>
              <p className="car-price">{price}</p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default UnitCarItem;
