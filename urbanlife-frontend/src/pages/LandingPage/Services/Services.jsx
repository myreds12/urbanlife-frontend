import React, { useState, useEffect } from 'react';
import FilterSection from '../../../components/LandingPage/Services/FilterSection';
import ServiceCard from '../../../components/LandingPage/Services/ServiceCard';
import ServiceHeader from '../../../components/LandingPage/Services/ServiceHeader';
import '../../../styles/LandingPage/Services/Services.css';
import Navbar from '../../../components/LandingPage/HomePage/Navbar';

const Services = () => {
  const [filters, setFilters] = useState({
    countries: [],
    cities: [],
    services: [],
    priceRange: [1000000, 5000000]
  });

  // Single service for now as requested
  const [serviceData] = useState([
    {
      id: 1,
      title: "Best Of Vietnam In 14 Days",
      country: "Vietnam",
      type: "Day tour",
      rating: 4.8,
      reviews: 86,
      price: 1235000,
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&h=350&fit=crop&auto=format&q=80",
      destinations: "Hanoi, Ninh Binh, Sapa, Halong Bay, Hoi An, Ho Chi Minh City, Mekong Delta",
      description: "Beautiful country, culture and food. It was a real surprise to find out cities like Sa Pa or Hoi An. So beautiful!",
      popular: true
    }
  ]);

  const [filteredServices, setFilteredServices] = useState(serviceData);

  useEffect(() => {
    let filtered = serviceData;

    if (filters.countries.length > 0 && !filters.countries.includes("All")) {
      filtered = filtered.filter(service => 
        filters.countries.includes(service.country)
      );
    }

    if (filters.services.length > 0) {
      filtered = filtered.filter(service => 
        filters.services.includes(service.type)
      );
    }

    filtered = filtered.filter(service => 
      service.price >= filters.priceRange[0] && 
      service.price <= filters.priceRange[1]
    );

    setFilteredServices(filtered);
  }, [filters, serviceData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ServiceHeader />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSection 
            filters={filters}
            setFilters={setFilters}
          />
          
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600 font-medium">
                Showing {filteredServices.length} of {serviceData.length} services
              </p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                  <p className="text-gray-500 text-lg mb-4">No services found matching your filters.</p>
                  <button
                    onClick={() => setFilters({
                      countries: [],
                      cities: [],
                      services: [],
                      priceRange: [1000000, 5000000]
                    })}
                    className="text-teal-600 hover:text-teal-700 font-medium px-4 py-2 rounded-md hover:bg-teal-50 transition-colors"
                  >
                    Clear filters to see all services
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Services;