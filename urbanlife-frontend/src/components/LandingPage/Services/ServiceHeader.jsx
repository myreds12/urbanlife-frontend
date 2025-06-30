import React from 'react';

const ServiceHeader = () => {
  return (
    <div className="relative mt-20 mb-8 rounded-xl overflow-hidden shadow-md">
      {/* Gradient Background */}
      <div className="bg-gradient-to-r from-cyan-100 via-cyan-50 to-white p-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Services</h1>
        <p className="text-md text-gray-600">Discover amazing destinations and experiences</p>
      </div>
    </div>
  );
};

export default ServiceHeader;
