import React from 'react';

const TourItinerary = ({ itinerary }) => {
  return (
    <div className="space-y-6 bg-white p-4 rounded-md shadow-sm">
      <div className="space-y-4">
        {itinerary.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              {index < itinerary.length && (
                <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourItinerary;