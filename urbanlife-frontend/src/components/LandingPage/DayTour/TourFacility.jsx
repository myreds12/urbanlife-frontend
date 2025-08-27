import React from 'react';

const TourFacilities = ({ facilities }) => {
  return (
    <div className="space-y-4 bg-white p-4 rounded-md shadow-sm">
      <div className='space-y-1'>
        <p className="font-bold text-gray-900">Facilities:</p>
        <div className="space-y-2">
          {facilities.map((item, index) => (
            <div key={index} className="flex gap-2">
              <p className="text-gray-700">•</p>
              <p className="text-gray-700">{item.nama}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TourFacilities;