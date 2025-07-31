import React from 'react';
import { Link } from 'react-router-dom';
import './CardItem.css';

const CardItem = ({ 
  image, 
  category, 
  title, 
  description, 
  buttonText,
  categoryColor = "#f59e0b",
  linkTo
}) => {
  const cardContent = (
    <div className="card-item">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      
      <div className="card-content">
        <div className="card-tags">
          <span 
            className="card-tag category-tag" 
            style={{ backgroundColor: categoryColor }}
          >
            {category}
          </span>
        </div>
        
        <h3 className="card-title">{title}</h3>
        
        <p className="card-description">{description}</p>
        
        <button className="card-button">
          {buttonText}
        </button>
      </div>
    </div>
  );

  return linkTo ? (
    <Link to={linkTo} className="card-link-wrapper" style={{ textDecoration: 'none', color: 'inherit' }}>
      {cardContent}
    </Link>
  ) : cardContent;
};

export default CardItem;
