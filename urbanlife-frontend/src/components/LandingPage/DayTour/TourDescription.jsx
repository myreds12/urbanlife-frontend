import React, { useEffect, useState } from 'react';

const TourDescription = ({ description }) => {
  const [desc, setTextArray] = useState([]);

  useEffect(() => {
    setTextArray(description.split('\n').filter(d => d.trim() !== ''));
  }, [description]); 

  return (
    <div className="space-y-4 bg-white p-4 rounded-md shadow-sm">
      {desc.map((d, index) => {
        return (
          <div key={index} className="flex gap-2">
            <p className="text-gray-700">{d}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TourDescription;