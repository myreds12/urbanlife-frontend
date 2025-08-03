import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Globe, Users, Eye, Lock } from 'lucide-react';
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';
import { useTranslation } from 'react-i18next';

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState({});

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'usage', 'privacy', 'content', 'liability', 'cta'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
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

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section
        id="hero"
        data-animate
        className={`relative py-20 bg-gradient-to-b from-cyan-50/50 to-white overflow-hidden transition-all duration-700 ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Subtle background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-cyan-50/40 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mt-12">
          <div className="inline-flex items-center px-4 py-2 bg-cyan-50 rounded-full text-cyan-700 text-sm font-medium mb-6">
            <FileText className="w-4 h-4 mr-2" />
            {t('termsandconditions.hero_label')}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {t('termsandconditions.hero_title')}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('termsandconditions.hero_subtitle')}
          </p>

          {/* Image Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
              <img
                src="/images/LandingPage/Footer/content/company/TermsandConditions.png"
                alt="Legal documentation and guidelines"
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">{t('termsandconditions.nav_intro')}</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'intro', label: t('termsandconditions.nav_intro'), icon: <Globe className="w-4 h-4" /> },
                    { id: 'usage', label: t('termsandconditions.nav_usage'), icon: <Users className="w-4 h-4" /> },
                    { id: 'privacy', label: t('termsandconditions.nav_privacy'), icon: <Lock className="w-4 h-4" /> },
                    { id: 'content', label: t('termsandconditions.nav_content'), icon: <Eye className="w-4 h-4" /> },
                    { id: 'liability', label: t('termsandconditions.nav_liability'), icon: <Shield className="w-4 h-4" /> }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-cyan-50 text-cyan-700 border border-cyan-100'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3 text-sm">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Introduction */}
            <section
              id="intro"
              data-animate
              className={`scroll-mt-32 transition-all duration-700 ${
                isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('termsandconditions.intro_title')}</h2>
                  <p className="text-gray-600">{t('termsandconditions.intro_subtitle')}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
                <p className="text-gray-700 leading-relaxed">{t('termsandconditions.intro_content')}</p>
                
                <div className="bg-cyan-50/50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">{t('termsandconditions.intro_company_title')}</h4>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">{t('termsandconditions.intro_company_content')}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>{t('termsandconditions.intro_company_main_office')}</p>
                    <p>{t('termsandconditions.intro_company_branch_office')}</p>
                    <p>{t('termsandconditions.intro_company_registration')}</p>
                  </div>
                  <p className="text-gray-600 text-sm mt-4 italic">{t('termsandconditions.intro_company_note')}</p>
                </div>

                {/* Image placeholder in content */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-3">
                  <img
                    src="/images/LandingPage/Footer/content/HotSpring.png"
                    alt="Urbanlife office building"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </section>

            {/* Terms of Use */}
            <section
              id="usage"
              data-animate
              className={`scroll-mt-32 transition-all duration-700 ${
                isVisible.usage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('termsandconditions.usage_title')}</h2>
                  <p className="text-gray-600">{t('termsandconditions.usage_subtitle')}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-cyan-50/50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">{t('termsandconditions.usage_content_title')}</h4>
                </div>

                <div className="space-y-6">
                  {t('termsandconditions.usage_items', { returnObjects: true }).map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-100">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Privacy Policy */}
            <section
              id="privacy"
              data-animate
              className={`scroll-mt-32 transition-all duration-700 ${
                isVisible.privacy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('termsandconditions.privacy_title')}</h2>
                  <p className="text-gray-600">{t('termsandconditions.privacy_subtitle')}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  {t('termsandconditions.privacy_items', { returnObjects: true }).map((item, index) => (
                    <div key={index} className={`rounded-xl p-6 ${index === 2 ? 'bg-red-50 border border-red-200' : 'bg-white border border-gray-100'}`}>
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0 ${index === 2 ? 'bg-red-100 text-red-700' : 'bg-cyan-100 text-cyan-700'}`}>
                          {index + 7}
                        </div>
                        <p className={`text-sm leading-relaxed ${index === 2 ? 'text-red-800 font-medium' : 'text-gray-700'}`}>
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Image placeholder in content */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-3">
                    <img
                      src="/images/LandingPage/Footer/content/Volcano.png"
                      alt="Terms and conditions documentation"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Content Guidelines */}
            <section
              id="content"
              data-animate
              className={`scroll-mt-32 transition-all duration-700 ${
                isVisible.content ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('termsandconditions.content_title')}</h2>
                  <p className="text-gray-600">{t('termsandconditions.content_subtitle')}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      {t('termsandconditions.content_cookie_title')}
                    </h4>
                    <p className="text-amber-700 text-sm leading-relaxed">{t('termsandconditions.content_cookie_content')}</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      {t('termsandconditions.content_links_title')}
                    </h4>
                    <p className="text-blue-700 text-sm leading-relaxed">{t('termsandconditions.content_links_content')}</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      {t('termsandconditions.content_service_title')}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{t('termsandconditions.content_service_content')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Liability */}
            <section
              id="liability"
              data-animate
              className={`scroll-mt-32 transition-all duration-700 ${
                isVisible.liability ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('termsandconditions.liability_title')}</h2>
                  <p className="text-gray-600">{t('termsandconditions.liability_subtitle')}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h4 className="font-semibold text-amber-800 mb-3">{t('termsandconditions.liability_notice_title')}</h4>
                    <p className="text-amber-700 text-sm leading-relaxed">{t('termsandconditions.liability_notice_content')}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">{t('termsandconditions.liability_content')}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section
        id="cta"
        data-animate
        className={`bg-gradient-to-b from-white to-cyan-50/30 py-20 transition-all duration-700 ${
          isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('termsandconditions.cta_title')}</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t('termsandconditions.cta_subtitle')}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="bg-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-cyan-700 transition-colors shadow-sm">
                {t('termsandconditions.cta_contact_button')}
              </button>
            </Link>
            <Link to="/services">
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors">
                {t('termsandconditions.cta_services_button')}
              </button>
            </Link>
          </div>

          <p className="text-gray-500 text-sm mt-8">{t('termsandconditions.cta_governed')}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;