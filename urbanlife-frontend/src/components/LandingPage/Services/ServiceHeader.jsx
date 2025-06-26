import React from 'react';

const ServiceHeader = () => {
  return (
    <div className="relative mb-8 rounded-xl overflow-hidden">
      {/* Gradient Background */}
      <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-white p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Services</h1>
        <p className="text-gray-600">Discover amazing destinations and experiences</p>
      </div>
    </div>
  );
};

export default ServiceHeader;
