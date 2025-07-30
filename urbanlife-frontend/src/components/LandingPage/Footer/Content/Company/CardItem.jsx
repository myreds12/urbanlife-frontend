import React from 'react';
import './CardItem.css';

const CardItem = ({ 
  image, 
  category, 
//   difficulty, 
  title, 
  description, 
  buttonText,
  categoryColor = "#f59e0b",
//   difficultyColor = "#ef4444"
}) => {
  return (
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
          {/* <span 
            className="card-tag difficulty-tag"
            style={{ backgroundColor: difficultyColor }}
          >
            {difficulty}
          </span> */}
        </div>
        
        <h3 className="card-title">{title}</h3>
        
        <p className="card-description">{description}</p>
        
        <button className="card-button">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CardItem;