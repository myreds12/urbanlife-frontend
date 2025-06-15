import React from 'react';

interface PriceSectionProps {
  id: string;
  isActive: boolean;
}

const PriceSection: React.FC<PriceSectionProps> = ({ id, isActive }) => {
  return (
    <div id={id} className={isActive ? 'block' : 'hidden'}>
      <div className="p-6 rounded-lg shadow-md shadow-black/20">
        {/* Price content will be added here */}
        <p>Price section placeholder</p>
      </div>
    </div>
  );
};

export default PriceSection;