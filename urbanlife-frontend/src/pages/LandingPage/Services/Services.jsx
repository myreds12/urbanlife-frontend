import React, { useState, useEffect } from 'react';
import FilterSection from '../../../components/LandingPage/Services/FilterSection';
import ServiceCard from '../../../components/LandingPage/Services/ServiceCard';
import ServiceHeader from '../../../components/LandingPage/Services/ServiceHeader';
import '../../../styles/LandingPage/Services/Services.css';

const Services = () => {
  const [filters, setFilters] = useState({
    countries: [],
    cities: [],
    services: [],
    priceRange: [1000000, 5000000]
  });

  // Mock data - in real app, this would come from API/admin dashboard
  const [serviceData] = useState([
    {
      id: 1,
      title: "Best Of Vietnam In 14 Days",
      country: "Vietnam",
      type: "Day tour",
      rating: 4.8,
      reviews: 86,
      price: 1235000,
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=300&fit=crop",
      destinations: "Hanoi, Ninh Binh, Sapa, Halong Bay, Hoi An, Ho Chi Minh City, Mekong Delta",
      description: "Beautiful country, culture and food. It was a real surprise to find out cities like Sa Pa or Hoi An. So beautiful!",
      popular: true
    },
    {
      id: 2,
      title: "Jakarta City Exploration",
      country: "Indonesia",
      type: "Day tour",
      rating: 4.5,
      reviews: 124,
      price: 850000,
      image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&h=300&fit=crop",
      destinations: "Jakarta, Bogor, Bandung",
      description: "Discover the vibrant capital city of Indonesia with its rich culture and modern attractions.",
      popular: false
    },
    {
      id: 3,
      title: "Bali Paradise Tour",
      country: "Indonesia",
      type: "Day tour",
      rating: 4.9,
      reviews: 203,
      price: 1450000,
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      destinations: "Ubud, Seminyak, Canggu, Nusa Penida",
      description: "Experience the magical island of Bali with its stunning beaches, temples, and rice terraces.",
      popular: true
    }
  ]);

  const [filteredServices, setFilteredServices] = useState(serviceData);

  useEffect(() => {
    // Apply filters to service data
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
    <div className="services-page">
      <div className="container mx-auto px-4 py-8">
        <ServiceHeader />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSection 
            filters={filters}
            setFilters={setFilters}
          />
          
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredServices.length} of {serviceData.length} services
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services found matching your filters.</p>
                <button
                  onClick={() => setFilters({
                    countries: [],
                    cities: [],
                    services: [],
                    priceRange: [1000000, 5000000]
                  })}
                  className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
                >
                  Clear filters to see all services
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;