import React from 'react';

const TourItinerary = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="bg-white p-4 rounded-md shadow-sm">
        <p className="text-gray-500">Itinerary tidak tersedia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">Rencana Perjalanan</h2>
      <div className="space-y-6">
        {itinerary.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              {index < itinerary.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">{item.nama}</h4>
              <p className="text-gray-700 text-sm">{item.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourItinerary;
