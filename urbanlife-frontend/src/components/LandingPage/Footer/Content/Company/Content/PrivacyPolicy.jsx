import React, { useState, useEffect } from 'react';
import { Mail, Phone, Shield, Eye, Lock, Users, FileText, Globe, HeartHandshake, ChevronRight } from 'lucide-react';
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
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

  const sections = [
    { id: 'personal-info', title: t('privacypolicy.section_personal_info_title'), icon: Users },
    { id: 'use-info', title: t('privacypolicy.section_use_info_title'), icon: Eye },
    { id: 'share-info', title: t('privacypolicy.section_share_info_title'), icon: Globe },
    { id: 'storage-info', title: t('privacypolicy.section_storage_info_title'), icon: FileText },
    { id: 'protection-info', title: t('privacypolicy.section_protection_info_title'), icon: Lock },
    { id: 'amendment-access', title: t('privacypolicy.section_amendment_access_title'), icon: Shield },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-100">
        <Navbar />
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
            alt="Minimalist architecture representing clean data practices"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/90 to-slate-50/95"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-cyan-100/50 rounded-full px-4 py-1.5 mb-8">
              <Shield className="w-4 h-4 text-cyan-600" aria-hidden="true" />
              <span className="text-cyan-700 text-sm font-medium">{t('privacypolicy.hero_label')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 tracking-tight">
              {t('privacypolicy.hero_title')}
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              {t('privacypolicy.hero_subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-all duration-200"
                  aria-label={`Navigate to ${section.title} section`}
                >
                  {section.title}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Introduction */}
        <div
          id="intro"
          data-animate
          className={`mb-20 transition-all duration-700 ${
            isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-cyan-600" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-medium text-slate-900">{t('privacypolicy.intro_title')}</h2>
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              {t('privacypolicy.intro_content', {
                company: 'UrbanLife',
                website: (
                  <a
                    href="https://urbanlife.id"
                    className="text-cyan-600 hover:text-cyan-700 underline decoration-cyan-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    urbanlife.id
                  </a>
                ),
              })}
            </p>
            <p className="text-slate-600 leading-relaxed">{t('privacypolicy.intro_contact')}</p>
          </div>
        </div>

        {/* Personal Information Section */}
        <section
          id="personal-info"
          data-animate
          className={`mb-16 transition-all duration-700 ${
            isVisible['personal-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-cyan-600" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-medium text-slate-900">{t('privacypolicy.section_personal_info_title')}</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">{t('privacypolicy.section_personal_info_content')}</p>
            <div className="space-y-8">
              <div className="border-l-4 border-cyan-400 pl-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">{t('privacypolicy.section_personal_info_direct')}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{t('privacypolicy.section_personal_info_direct_content')}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
                    <p className="text-slate-700 text-sm">{t('privacypolicy.section_personal_info_direct_item1')}</p>
                  </div>
                  <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
                    <p className="text-slate-700 text-sm">{t('privacypolicy.section_personal_info_direct_item2')}</p>
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-cyan-400 pl-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">{t('privacypolicy.section_personal_info_auto')}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{t('privacypolicy.section_personal_info_auto_content')}</p>
                <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
                  <p className="text-slate-700 text-sm">{t('privacypolicy.section_personal_info_auto_cookies')}</p>
                </div>
              </div>
              <div className="border-l-4 border-cyan-400 pl-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">{t('privacypolicy.section_personal_info_third')}</h3>
                <p className="text-slate-700 leading-relaxed">{t('privacypolicy.section_personal_info_third_content')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use of Personal Information */}
        <section
          id="use-info"
          data-animate
          className={`mb-16 transition-all duration-700 ${
            isVisible['use-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-cyan-600" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-medium text-slate-900">{t('privacypolicy.section_use_info_title')}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">{t('privacypolicy.section_use_info_users')}</h3>
                <div className="space-y-2">
                  {t('privacypolicy.section_use_info_users_items', { returnObjects: true }).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 text-cyan-500" aria-hidden="true" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">{t('privacypolicy.section_use_info_business')}</h3>
                <div className="space-y-2">
                  {t('privacypolicy.section_use_info_business_items', { returnObjects: true }).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 text-cyan-500" aria-hidden="true" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Share of Personal Information */}
        <section
          id="share-info"
          data-animate
          className={`mb-16 transition-all duration-700 ${
            isVisible['share-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-600" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-medium text-slate-900">{t('privacypolicy.section_share_info_title')}</h2>
            </div>
            <div className="bg-red-50 border border-red-200-rounded-xl p-4 mb-6">
              <p className="text-red-800 font-medium">{t('privacypolicy.section_share_info_warning')}</p>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">{t('privacypolicy.section_share_info_content')}</p>
            <div className="space-y-3">
              {t('privacypolicy.section_share_info_items', { returnObjects: true }).map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-slate-600 text-xs">{index + 1}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
              <p className="text-slate-700 text-sm">{t('privacypolicy.section_share_info_note')}</p>
            </div>
          </div>
        </section>

        {/* Storage and Protection */}
        <section
          id="storage-info"
          data-animate
          className={`mb-16 transition-all duration-700 ${
            isVisible['storage-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-cyan-600" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-medium text-slate-900">{t('privacypolicy.section_storage_info_title')}</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">{t('privacypolicy.section_storage_info_content')}</p>
            <div className="space-y-2">
              {t('privacypolicy.section_storage_info_items', { returnObjects: true }).map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="protection-info"
          data-animate
          className={`mb-16 transition-all duration-700 ${
            isVisible['protection-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-cyan-600" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-medium text-slate-900">{t('privacypolicy.section_protection_info_title')}</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">{t('privacypolicy.section_protection_info_content')}</p>
            <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
              <p className="text-slate-700 text-sm">{t('privacypolicy.section_protection_info_note')}</p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section
          id="amendment-access"
          data-animate
          className={`mb-16 transition-all duration-700 ${
            isVisible['amendment-access'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-600" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-medium text-slate-900">{t('privacypolicy.section_amendment_access_title')}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-cyan-50/50 rounded-xl p-6 border border-cyan-100">
                <h3 className="text-lg font-medium text-slate-900 mb-4">{t('privacypolicy.section_amendment_access_request')}</h3>
                <div className="space-y-2">
                  {t('privacypolicy.section_amendment_access_request_items', { returnObjects: true }).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-cyan-50/50 rounded-xl p-6 border border-cyan-100">
                <h3 className="text-lg font-medium text-slate-900 mb-4">{t('privacypolicy.section_amendment_access_reject')}</h3>
                <div className="space-y-2">
                  {t('privacypolicy.section_amendment_access_reject_items', { returnObjects: true }).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              id: 'amendment-policy',
              title: t('privacypolicy.section_amendment_policy_title'),
              content: t('privacypolicy.section_amendment_policy_content'),
            },
            {
              id: 'acknowledgment',
              title: t('privacypolicy.section_acknowledgment_title'),
              content: t('privacypolicy.section_acknowledgment_content'),
            },
            {
              id: 'unspecified-data',
              title: t('privacypolicy.section_unspecified_data_title'),
              content: t('privacypolicy.section_unspecified_data_content'),
            },
            {
              id: 'marketing',
              title: t('privacypolicy.section_marketing_title'),
              content: t('privacypolicy.section_marketing_content'),
            },
            {
              id: 'third-party',
              title: t('privacypolicy.section_third_party_title'),
              content: t('privacypolicy.section_third_party_content'),
            },
          ].map((section) => (
            <div
              key={section.id}
              id={section.id}
              data-animate
              className={`transition-all duration-700 ${
                isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <h3 className="text-lg font-medium text-slate-900 mb-3">{section.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <section
          id="contact"
          data-animate
          className={`mt-16 transition-all duration-700 ${
            isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl p-8 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-medium mb-2">{t('privacypolicy.section_contact_title')}</h2>
              <p className="text-cyan-100 mb-8 text-sm">{t('privacypolicy.section_contact_content')}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-200" aria-hidden="true" />
                  <div className="text-left">
                    <p className="font-medium">{t('privacypolicy.section_contact_email_support')}</p>
                    <a
                      href="mailto:info@urbanlife.id"
                      className="text-cyan-100 hover:text-white text-sm transition-colors duration-200"
                    >
                      {t('privacypolicy.section_contact_email_general')}
                    </a>
                    <p className="text-cyan-100 mb-1 mt-2">{t('privacypolicy.section_contact_email_ads')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-cyan-200" aria-hidden="true" />
                  <div className="text-left">
                    <p className="font-medium">{t('privacypolicy.section_contact_phone_support')}</p>
                    <a
                      href="tel:+62816919812"
                      className="text-cyan-100 hover:text-white text-sm transition-colors duration-200"
                    >
                      {t('privacypolicy.section_contact_phone')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;