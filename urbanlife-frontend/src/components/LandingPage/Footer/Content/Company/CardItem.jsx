import React from 'react';
import { Link } from 'react-router-dom';
import './CardItem.css';

const CardItem = ({ 
  image, 
  category, 
//   difficulty, 
  title, 
  description, 
  buttonText,
  categoryColor = "#f59e0b",
  link = "#"
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

        <Link to={link} className="card-button">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default CardItem;
