import React from 'react';
import { Star, MapPin } from 'lucide-react';

const ServiceCard = ({ service }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace('Rp', 'IDR');
  };

  return (
    <div className="service-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            {service.country}
          </span>
        </div>
        {service.popular && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Popular
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded text-xs">
            {service.type}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{service.title}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">
            ({service.reviews} traveler reviews)
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          "{service.description}"
        </p>
        
        <div className="mb-4">
          <div className="flex items-start gap-1 mb-1">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700">Destinations</span>
          </div>
          <p className="text-sm text-gray-600 ml-5">{service.destinations}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Start from</div>
            <div className="text-xl font-bold text-red-500">
              {formatPrice(service.price)} <span className="text-sm font-normal text-gray-500">/ person</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Order
            </button>
            <button className="text-gray-500 hover:text-gray-700 px-6 py-1 text-sm transition-colors">
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;