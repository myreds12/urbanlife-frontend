import React, { useState, useEffect } from 'react';
import { Home, MapPin, Calendar, Car, Bike, Ship, ArrowRight } from 'lucide-react';
import templeImage from '/images/LandingPage/Footer/content/Temple.png'; // Adjust path based on your project structure
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 'day-tour',
      icon: <Calendar className="w-5 h-5" />,
      title: 'Explore Our Day Tour Packages',
      description:
        'Experience top-rated day tours across Indonesia. From cultural landmarks to nature escapes, enjoy curated journeys with professional local guides.',
      location: 'Various regions available',
    },
    {
      id: 'car-rental',
      icon: <Car className="w-5 h-5" />,
      title: 'Car Rental Services',
      description:
        'Rent a car easily for your trip—whether it’s for business or leisure. Wide selection from economy to luxury vehicles, with full insurance coverage.',
      location: 'Available in major cities',
    },
    {
      id: 'motorbike-rental',
      icon: <Bike className="w-5 h-5" />,
      title: 'Motorbike Rentals',
      description:
        'Navigate urban and island areas with ease using our flexible motorbike rental services. Daily, weekly, or monthly options available.',
      location: 'City & island coverage',
    },
    {
      id: 'ferry-transfers',
      icon: <Ship className="w-5 h-5" />,
      title: 'Pier & Ferry Transfers',
      description:
        'Seamless transport to and from main ports and terminals for your island-hopping adventures or daily commutes.',
      location: 'Popular coastal areas',
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      {/* Font Import (Assuming Tailwind is configured with Inter and Playfair Display) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
        `}
      </style>

      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #82DCE9 0%, #E4F2F2 100%)',
          }}
        />
        <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

        {/* Hero Section */}
        <div className="relative z-10 container mx-auto px-4 py-16 text-center sm:px-6 sm:py-20 mt-15">
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-6 leading-tight">
            About Us
          </h1>
          <p className="font-inter text-lg sm:text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Discover the beauty places around the world.
          </p>
          <div className="mt-6 w-20 h-1 bg-white/60 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        {/* Introduction */}
        <div
          id="intro"
          data-animate
          className={`max-w-5xl mx-auto mb-16 transition-all duration-700 ${
            isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                Your Trusted Travel Partner
              </h2>
              <p className="font-inter text-gray-600 leading-relaxed mb-4 text-base sm:text-lg">
                We provide comprehensive transportation services in Bali and Jakarta, designed to make your Indonesian journey seamless and memorable.
              </p>
              <p className="font-inter text-gray-600 leading-relaxed text-base sm:text-lg">
                From airport transfers to cultural explorations, our professional team ensures safe, comfortable, and reliable transportation solutions for every traveler.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-2 shadow-lg">
                <img
                  src={templeImage}
                  alt="Cultural Temple in Bali"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
              Our Services
            </h3>
            <p className="font-inter text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Comprehensive transportation solutions tailored for your travel needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                data-animate
                className={`group bg-white border border-gray-100 rounded-xl p-6 hover:border-cyan-200 hover:shadow-lg transition-all duration-300 ${
                  isVisible[`service-${service.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center text-cyan-600 group-hover:bg-cyan-200/50 transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-playfair text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h4>
                    <p className="font-inter text-gray-600 text-sm mb-3">
                      {service.description}
                    </p>
                    <span className="font-inter text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">
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
          className={`max-w-5xl mx-auto mb-16 transition-all duration-700 ${
            isVisible.additional ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-8">
              <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                Complete Travel Solutions
              </h3>
              <p className="font-inter text-gray-600 text-base sm:text-lg">
                Beyond transportation, we offer comprehensive travel planning
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Calendar className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-playfair text-lg font-semibold text-gray-900 mb-2">
                    Day Tour Packages
                  </h4>
                  <p className="font-inter text-gray-600 text-sm">
                    Curated Bali experiences featuring cultural sites, natural attractions, and local insights for comprehensive island exploration.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Home className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-playfair text-lg font-semibold text-gray-900 mb-2">
                    Accommodation Booking
                  </h4>
                  <p className="font-inter text-gray-600 text-sm">
                    Partner accommodations available through our platform, enabling complete itinerary planning from a single source.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          id="cta"
          data-animate
          className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 sm:p-12 relative shadow-lg">
            <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h3>
            <p className="font-inter text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              Experience Indonesia with confidence. Professional service, local expertise, and reliable transportation for your perfect trip.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="font-inter bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center shadow-sm hover:shadow-md"
                aria-label="Book Your Trip"
              >
                Book Your Trip
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a
                href="/contact"
                className="font-inter border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
                aria-label="Contact Us"
              >
                Contact Us
              </a>
            </div>

            <p className="font-inter text-gray-500 mt-6 text-sm">
              Have a safe trip and enjoy your holidays!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;