import React from 'react';
import DayTourCard from './DayTourCard';
import './DaytourGrid.css';

const DayTourGrid = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return (
      <div className="no-cards">
        <h3>No Content Available</h3>
        <p>No day tour packages found.</p>
      </div>
    );
  }

  return (
    <div className="daytour-list">
      {cards.map((card) => (
        <DayTourCard
          key={card.id}
          image={card.image}
          title={card.title}
          duration={card.duration}
          price={card.price}
          description={card.description}
          linkTo={`/day-tour/${card.slug}`}
        />
      ))}
    </div>
  );
};

export default DayTourGrid;
