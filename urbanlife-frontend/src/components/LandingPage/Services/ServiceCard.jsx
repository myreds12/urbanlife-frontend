import React from 'react';
import { Star, MapPin, Users, Clock, Settings } from 'lucide-react';

const ServiceCard = ({ service, onOrderClick, onDetailClick }) => {
  // ====== PRICE FORMATTING ======
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace('Rp', 'IDR');
  };

  // ====== SERVICE TYPE STYLING ======
  const getServiceTypeStyle = (type) => {
    const styles = {
      'day tour': 'bg-blue-100 text-blue-800',
      'rent car': 'bg-green-100 text-green-800',
      'accommodation': 'bg-purple-100 text-purple-800'
    };
    return styles[type.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // ====== PRICE UNIT BASED ON SERVICE TYPE ======
  const getPriceUnit = (type) => {
    const units = {
      'day tour': '/ person',
      'rent car': '/ 4 hours', // or could be from service.duration
      'accommodation': '/ night'
    };
    return units[type.toLowerCase()] || '/ unit';
  };

  // ====== RENDER ADDITIONAL INFO BASED ON SERVICE TYPE ======
  const renderServiceSpecificInfo = () => {
    const type = service.type.toLowerCase();
    
    switch(type) {
      case 'rent car':
        return (
          <div className="mb-4">
            <div className="flex items-start gap-2 mb-2">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {service.capacity && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{service.capacity}</span>
                  </div>
                )}
                {service.transmission && (
                  <div className="flex items-center gap-1">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span>{service.transmission}</span>
                  </div>
                )}
                {service.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{service.duration}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'day tour':
        return (
          <div className="mb-4">
            <div className="flex items-start gap-2 mb-1">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-700">Destinations</span>
            </div>
            <p className="text-sm text-gray-600 ml-6 leading-relaxed">{service.destinations}</p>
          </div>
        );
      
      case 'accommodation':
        return (
          <div className="mb-4">
            <div className="flex items-start gap-2 mb-1">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-700">Location</span>
            </div>
            <p className="text-sm text-gray-600 ml-6 leading-relaxed">{service.destinations}</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  // ====== EVENT HANDLERS ======
  const handleOrderClick = () => {
    // TODO: Implement order functionality
    // This will integrate with backend ordering system
    if (onOrderClick) {
      onOrderClick(service);
    } else {
      console.log('Order clicked for service:', service.id);
      // Temporary alert for testing
      alert(`Order functionality for ${service.title} will be implemented when backend is ready`);
    }
  };

  const handleDetailClick = () => {
    // TODO: Navigate to service detail page
    // This will integrate with routing system
    if (onDetailClick) {
      onDetailClick(service);
    } else {
      console.log('Detail clicked for service:', service.id);
      // Temporary alert for testing  
      alert(`Detail page for ${service.title} will be implemented with routing`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 max-w-5xl mx-auto flex flex-col lg:flex-row overflow-hidden">
      
      {/* ====== IMAGE SECTION ====== */}
      <div className="relative w-full lg:w-1/3 h-60 lg:h-auto">
        <img
          src={service.image}
          alt={service.title}
          className="object-cover w-full h-full"
          onError={(e) => {
            // Fallback image if original fails to load
            e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=350&fit=crop&auto=format&q=80';
          }}
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

        {/* Service Type Badge */}
        <div className="absolute bottom-4 left-4">
          <span className={`${getServiceTypeStyle(service.type)} backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm capitalize`}>
            {service.type}
          </span>
        </div>
      </div>

      {/* ====== CONTENT SECTION ====== */}
      <div className="w-full lg:w-2/3 p-6 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">{service.title}</h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700">{service.rating}</span>
            </div>
            <span className="text-sm text-gray-500">
              ({service.reviews} traveler reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            "{service.description}"
          </p>

          {/* Service-specific Information */}
          {renderServiceSpecificInfo()}
        </div>

        {/* ====== PRICE & ACTION SECTION ====== */}
        <div className="flex items-end justify-between pt-4 border-t border-gray-200 mt-4 flex-wrap gap-4">
          {/* Price */}
          <div>
            <div className="text-sm text-gray-500 mb-1">Start from</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-red-500">
                {formatPrice(service.price)}
              </span>
              <span className="text-sm text-gray-500">{getPriceUnit(service.type)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={handleOrderClick}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm"
            >
              Order
            </button>
            <button 
              onClick={handleDetailClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-full text-sm transition-colors"
            >
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;