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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 max-w-5xl mx-auto flex flex-col lg:flex-row overflow-hidden">
      
      {/* Gambar di kiri */}
      <div className="relative w-full lg:w-1/3 h-60 lg:h-auto">
        <img
          src={service.image}
          alt={service.title}
          className="object-cover w-full h-full"
        />

        {/* Country Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
            {service.country}
          </span>
        </div>

        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
              Popular
            </span>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/95 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm">
            {service.type}
          </span>
        </div>
      </div>

      {/* Konten di kanan */}
      <div className="w-full lg:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">{service.title}</h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700">{service.rating}</span>
            </div>
            <span className="text-sm text-gray-500">
              ({service.reviews} traveler reviews)
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            "{service.description}"
          </p>

          <div className="mb-4">
            <div className="flex items-start gap-2 mb-1">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-700">Destinations</span>
            </div>
            <p className="text-sm text-gray-600 ml-6 leading-relaxed">{service.destinations}</p>
          </div>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-gray-100 mt-4 flex-wrap gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Start from</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-red-500">
                {formatPrice(service.price)}
              </span>
              <span className="text-sm text-gray-500">/ person</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm">
              Order
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-full text-sm transition-colors">
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
