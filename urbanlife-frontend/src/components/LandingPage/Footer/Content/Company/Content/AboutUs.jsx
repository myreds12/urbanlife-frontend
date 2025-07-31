import React, { useState, useEffect } from 'react';
import { MapPin, Car, Plane, Ship, Bike, Calendar, Home, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

const services = [
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "Explore Our Day Tour Packages",
    description: "Experience top-rated day tours across Indonesia. From cultural landmarks to nature escapes, enjoy curated journeys with professional local guides.",
    location: "Various regions available"
  },
  {
    icon: <Car className="w-5 h-5" />,
    title: "Car Rental Services",
    description: "Rent a car easily for your trip—whether it's for business or leisure. Wide selection from economy to luxury vehicles, with full insurance coverage.",
    location: "Available in major cities"
  },
  {
    icon: <Bike className="w-5 h-5" />,
    title: "Motorbike Rentals",
    description: "Navigate urban and island areas with ease using our flexible motorbike rental services. Daily, weekly, or monthly options available.",
    location: "City & island coverage"
  },
  {
    icon: <Ship className="w-5 h-5" />,
    title: "Pier & Ferry Transfers",
    description: "Seamless transport to and from main ports and terminals for your island-hopping adventures or daily commutes.",
    location: "Popular coastal areas"
  }
];



  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-cyan-600 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </a>
            <span>/</span>
            <span className="text-gray-900 font-medium">About Us</span>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional transportation services across Bali and Jakarta
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div 
          id="intro"
          data-animate
          className={`max-w-4xl mx-auto mb-20 transition-all duration-700 ${
            isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-6">
                Your Trusted Travel Partner
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We provide comprehensive transportation services in Bali and Jakarta, designed to make your Indonesian journey seamless and memorable.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From airport transfers to cultural explorations, our professional team ensures safe, comfortable, and reliable transportation solutions for every traveler.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 h-64 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Travel Illustration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-medium text-gray-900 mb-4">Our Services</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive transportation solutions tailored for your travel needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index}
                id={`service-${index}`}
                data-animate
                className={`group bg-white border border-gray-100 rounded-xl p-6 hover:border-cyan-200 hover:shadow-sm transition-all duration-300 ${
                  isVisible[`service-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600 group-hover:bg-cyan-100 transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{service.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">
                      {service.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div 
          id="additional"
          data-animate
          className={`max-w-4xl mx-auto mb-20 transition-all duration-700 ${
            isVisible.additional ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Complete Travel Solutions</h3>
              <p className="text-gray-600">Beyond transportation, we offer comprehensive travel planning</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Day Tour Packages</h4>
                  <p className="text-gray-600 text-sm">Curated Bali experiences featuring cultural sites, natural attractions, and local insights for comprehensive island exploration.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Accommodation Booking</h4>
                  <p className="text-gray-600 text-sm">Partner accommodations available through our platform, enabling complete itinerary planning from a single source.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div 
          id="cta"
          data-animate
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-medium text-gray-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience Indonesia with confidence. Professional service, local expertise, and reliable transportation for your perfect trip.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center">
                Book Your Trip
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors">
                Contact Us
              </button>
            </div>
            
            <p className="text-gray-500 mt-6 text-sm">
              Have a safe trip and enjoy your holidays!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">© 2025 UrbanLife. Discover the beauty places around the world.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;