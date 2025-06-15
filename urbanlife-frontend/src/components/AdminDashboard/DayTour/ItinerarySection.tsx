import React from 'react';

interface ItinerarySectionProps {
  id: string;
  isActive: boolean;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ id, isActive }) => {
  return (
    <div id={id} className={isActive ? 'block' : 'hidden'}>
      <div className="p-6 rounded-lg shadow-md shadow-black/20">
        {/* Itinerary content will be added here */}
        <p>Itinerary section placeholder</p>
      </div>
    </div>
  );
};

export default ItinerarySection;