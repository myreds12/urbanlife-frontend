import React from 'react';

const TourPolicies = ({ policies }) => {
  return (
    <div className="space-y-4 bg-white p-4 rounded-md shadow-sm">
      <div className='space-y-1'>
        <div className="space-y-2">
          {policies.map((item, index) => (
            <div key={index} className="flex gap-2">
              <p className="text-gray-700">•</p>
              <p className="text-gray-700">{item.policyname}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TourPolicies;