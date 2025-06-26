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

  // ====== DATA MANAGEMENT SECTION ======
  // TODO: Replace with API call to fetch services from Admin Dashboard
  // This structure is ready for backend integration
  const [serviceData, setServiceData] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ====== DUMMY DATA (TEMPORARY) ======
  // NOTE: This will be replaced with fetchServicesFromAPI() function
  // Data structure matches what Admin Dashboard will provide
  const getDummyServices = () => {
    return [
      // Day Tour Service
      {
        id: 1,
        title: "Best Of Vietnam In 14 Days",
        country: "Vietnam",
        city: "Hanoi", // Added city field for filtering
        type: "day tour", // Lowercase for consistent filtering
        rating: 4.8,
        reviews: 86,
        price: 1235000,
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&h=350&fit=crop&auto=format&q=80",
        destinations: "Hanoi, Ninh Binh, Sapa, Halong Bay, Hoi An, Ho Chi Minh City, Mekong Delta",
        description: "Beautiful country, culture and food. It was a real surprise to find out cities like Sa Pa or Hoi An. So beautiful!",
        popular: true,
        // Additional fields that Admin Dashboard might provide
        duration: "14 days",
        category: "tour",
        status: "active"
      },
      // Rent Car Service - NEW DATA FOR TESTING
      {
        id: 2,
        title: "Toyota Grand New Avanza",
        country: "Indonesia",
        city: "Bali",
        type: "rent car",
        rating: 4.5,
        reviews: 124,
        price: 235000,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&h=350&fit=crop&auto=format&q=80",
        // For rent car, we use different fields
        destinations: "Available in Bali area", // Or could be "pickup_locations"
        description: "Comfortable family car, perfect for Bali exploration. Includes driver and fuel.",
        popular: false,
        // Rent car specific fields
        duration: "4 hours", // Or "per_day"
        category: "vehicle",
        status: "active",
        // Additional rent car fields that Admin might provide
        capacity: "6 passengers",
        transmission: "Manual",
        fuel_type: "Gasoline"
      },
      // You can add more rent car examples
      {
        id: 3,
        title: "Honda Civic Premium",
        country: "Indonesia", 
        city: "Jakarta",
        type: "rent car",
        rating: 4.7,
        reviews: 89,
        price: 450000,
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=350&fit=crop&auto=format&q=80",
        destinations: "Available in Jakarta & surrounding areas",
        description: "Luxury sedan with professional driver. Perfect for business meetings and airport transfers.",
        popular: true,
        duration: "8 hours",
        category: "vehicle", 
        status: "active",
        capacity: "4 passengers",
        transmission: "Automatic",
        fuel_type: "Gasoline"
      }
    ];
  };

  // ====== API INTEGRATION FUNCTIONS ======
  // TODO: Implement when backend is ready
  // const fetchServicesFromAPI = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     
  //     const response = await fetch('/api/services', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('token')}` // If auth required
  //       }
  //     });
  //     
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch services');
  //     }
  //     
  //     const data = await response.json();
  //     setServiceData(data.services || []);
  //   } catch (err) {
  //     setError(err.message);
  //     console.error('Error fetching services:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ====== COMPONENT INITIALIZATION ======
  useEffect(() => {
    // TODO: Replace getDummyServices() with fetchServicesFromAPI() when backend ready
    const initializeServices = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const services = getDummyServices();
        setServiceData(services);
        setFilteredServices(services); // Initialize filtered services
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    initializeServices();
  }, []);

  // ====== FILTERING LOGIC ======
  useEffect(() => {
    let filtered = serviceData;

    // Filter by Countries
    if (filters.countries.length > 0 && !filters.countries.includes("all")) {
      filtered = filtered.filter(service => 
        filters.countries.some(country => 
          service.country.toLowerCase() === country.toLowerCase()
        )
      );
    }

    // Filter by Cities
    if (filters.cities.length > 0) {
      filtered = filtered.filter(service =>
        filters.cities.some(city => 
          service.city && service.city.toLowerCase() === city.toLowerCase()
        )
      );
    }

    // Filter by Service Types
    if (filters.services.length > 0) {
      filtered = filtered.filter(service =>
        filters.services.some(serviceType =>
          service.type.toLowerCase() === serviceType.toLowerCase()
        )
      );
    }

    // Filter by Price Range
    filtered = filtered.filter(service => 
      service.price >= filters.priceRange[0] && 
      service.price <= filters.priceRange[1]
    );

    setFilteredServices(filtered);
  }, [filters, serviceData]);

  // ====== ERROR HANDLING ======
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <p className="text-red-600 text-lg mb-4">Error loading services: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====== RENDER SECTION ======
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ServiceHeader />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Section */}
          <FilterSection 
            filters={filters}
            setFilters={setFilters}
            // TODO: Pass available filter options from API
            // availableCountries={availableCountries}
            // availableCities={availableCities}
            // availableServiceTypes={availableServiceTypes}
          />
          
          {/* Services Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 font-medium">
                {loading ? (
                  "Loading services..."
                ) : (
                  `Showing ${filteredServices.length} of ${serviceData.length} services`
                )}
              </p>
            </div>
            
            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Services List */}
            {!loading && (
              <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service}
                    // TODO: Add callback functions for backend integration
                    // onOrderClick={handleOrderClick}
                    // onDetailClick={handleDetailClick}
                  />
                ))}
              </div>
            )}

            {/* No Results State */}
            {!loading && filteredServices.length === 0 && (
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