import React from 'react';

const TourDescription = ({ description }) => {
  return (
    <div className="space-y-4 bg-white p-4 rounded-md shadow-sm">
      <p className="text-gray-700">{description}</p>
    </div>
  );
};
export default TourDescription;