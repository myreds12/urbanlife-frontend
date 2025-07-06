import React from 'react';

const TourDescription = ({ description, policies }) => {
  return (
    <div className="space-y-4 bg-white p-4 rounded-md shadow-sm">
      <p className="text-gray-700">{description}</p>

       <div className='space-y-1'>
       <p className="font-bold text-gray-900">Policy and procedure :</p>
       <p className="text-gray-700">
              {policies.map((item) => (
                     <div className="mb-2 flex gap-2">
                            <p className="text-gray-700">•</p>
                            <p className="text-gray-700">{item.description}</p>
                     </div>
              ))}
       </p>
       </div>
    </div>
  );
};

export default TourDescription;