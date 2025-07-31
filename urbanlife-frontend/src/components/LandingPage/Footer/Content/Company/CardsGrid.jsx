import React from 'react';
import CardItem from './CardItem';
import './CardsGrid.css';

const CardsGrid = ({ cards }) => {
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
        <CardItem
          key={card.id}
          image={card.image}
          category={card.category}
        //   difficulty={card.difficulty}
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
          categoryColor={card.categoryColor}
          difficultyColor={card.difficultyColor}
          link={card.link}
        />
      ))}
    </div>
  );
};

export default CardsGrid;