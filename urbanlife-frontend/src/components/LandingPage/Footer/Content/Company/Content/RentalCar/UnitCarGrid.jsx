import React from 'react';
import UnitCarItem from './UnitCarItem';
import './UnitCarGrid.css';

const UnitCarGrid = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return (
      <div className="no-cards">
        <h3>No Content Available</h3>
        <p>No cards found for the selected category.</p>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {cards.map((card) => (
        <UnitCarItem
          key={card.id}
          image={card.image}
          unit={card.unit}
          people={card.people}
          title={card.title}
          startsPrice={card.startsPrice}        
          description={card.description}        
          duration={card.duration}        
        />
      ))}
    </div>
  );
};

export default UnitCarGrid;