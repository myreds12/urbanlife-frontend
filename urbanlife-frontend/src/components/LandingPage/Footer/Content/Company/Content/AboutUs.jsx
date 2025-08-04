import React, { useState, useEffect } from 'react';
import { Home, MapPin, Calendar, Car, Bike, Ship, ArrowRight } from 'lucide-react';
import templeImage from '/images/LandingPage/Footer/content/Temple.png'; // Adjust path based on your project structure
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();
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
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl text-white font-bold mb-6 leading-tight drop-shadow-md">
            {t('aboutus.hero_title')}
          </h1>
          <p className="font-inter text-xl sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {t('aboutus.hero_subtitle')}
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
                {t('aboutus.intro_title')}
              </h2>
              <p className="font-inter text-gray-600 leading-relaxed mb-4 text-base sm:text-lg">
                {t('aboutus.intro_description_1')}
              </p>
              <p className="font-inter text-gray-600 leading-relaxed text-base sm:text-lg">
                {t('aboutus.intro_description_2')}
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl p-2 shadow-lg">
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
              {t('aboutus.services_title')}
            </h3>
            <p className="font-inter text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              {t('aboutus.services_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {t('aboutus.services', { returnObjects: true }).map((service) => (
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
                    {
                      {
                        'day-tour': <Calendar className="w-5 h-5" />,
                        'car-rental': <Car className="w-5 h-5" />,
                        'motorbike-rental': <Bike className="w-5 h-5" />,
                        'ferry-transfers': <Ship className="w-5 h-5" />,
                      }[service.id]
                    }
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
                {t('aboutus.additional_title')}
              </h3>
              <p className="font-inter text-gray-600 text-base sm:text-lg">
                {t('aboutus.additional_subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t('aboutus.additional_services', { returnObjects: true }).map((service, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    {index === 0 ? <Calendar className="w-5 h-5 text-cyan-600" /> : <Home className="w-5 h-5 text-cyan-600" />}
                  </div>
                  <div>
                    <h4 className="font-playfair text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h4>
                    <p className="font-inter text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
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
              {t('aboutus.cta_title')}
            </h3>
            <p className="font-inter text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              {t('aboutus.cta_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="font-inter bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center shadow-sm hover:shadow-md"
                aria-label={t('aboutus.cta_book_button')}
              >
                {t('aboutus.cta_book_button')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a
                href="/contact"
                className="font-inter border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
                aria-label={t('aboutus.cta_contact_button')}
              >
                {t('aboutus.cta_contact_button')}
              </a>
            </div>

            <p className="font-inter text-gray-500 mt-6 text-sm">
              {t('aboutus.cta_footer')}
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