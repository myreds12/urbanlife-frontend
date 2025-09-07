import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Globe, Users, Eye, Lock } from 'lucide-react';
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';

const dummyData = {
  hero: {
    id: 'hero',
    title_en: 'Terms & Conditions',
    title_id: 'Syarat & Ketentuan',
    subtitle_en: 'Clear guidelines for using our platform and services. Last updated January 2025.',
    subtitle_id: 'Panduan jelas untuk menggunakan platform dan layanan kami. Terakhir diperbarui Januari 2025.',
    image_url: 'https://example.com/hero-image.jpg',
  },
  custom: [
    {
      id: 'intro',
      section: 'Introduction',
      title_en: 'Introduction',
      title_id: 'Pengenalan',
      content_en: 'Welcome to Urbanlife platform. If you continue to browse and use this website, you agree to comply with and are bound to the following terms and conditions of use.',
      content_id: 'Selamat datang di platform Urbanlife. Jika Anda terus menelusuri dan menggunakan situs web ini, Anda setuju untuk mematuhi syarat dan ketentuan penggunaan berikut.',
      notes_en: 'The term "Urbanlife" refers to PT. Urban Digital Media.',
      notes_id: 'Istilah "Urbanlife" merujuk pada PT. Urban Digital Media.',
      warning_en: '',
      warning_id: '',
    },
    {
      id: 'usage',
      section: 'Terms of Use',
      title_en: 'Terms of Use',
      title_id: 'Syarat Penggunaan',
      content_en: 'The use of this website is subject to the following terms: (1) Content is for general information. (2) Cookies are used to monitor preferences.',
      content_id: 'Penggunaan situs web ini tunduk pada syarat: (1) Konten untuk informasi umum. (2) Cookie digunakan untuk memantau preferensi.',
      notes_en: '',
      notes_id: '',
      warning_en: 'Unauthorized use may lead to legal action.',
      warning_id: 'Penggunaan tanpa izin dapat menyebabkan tindakan hukum.',
    },
    {
      id: 'privacy',
      section: 'Privacy Policy',
      title_en: 'Privacy & Data',
      title_id: 'Privasi & Data',
      content_en: 'We handle your information with care. Personal data may be collected for analytics.',
      content_id: 'Kami menangani informasi Anda dengan hati-hati. Data pribadi dapat dikumpulkan untuk analitik.',
      notes_en: '',
      notes_id: '',
      warning_en: 'Illegal content is not permitted.',
      warning_id: 'Konten ilegal tidak diizinkan.',
    },
    {
      id: 'content',
      section: 'Content Guidelines',
      title_en: 'Content Guidelines',
      title_id: 'Panduan Konten',
      content_en: 'Guidelines for content creation on our platform.',
      content_id: 'Panduan untuk pembuatan konten di platform kami.',
      notes_en: 'Follow community standards.',
      notes_id: 'Ikuti standar komunitas.',
      warning_en: '',
      warning_id: '',
    },
    {
      id: 'liability',
      section: 'Liability',
      title_en: 'Liability & Disclaimer',
      title_id: 'Tanggung Jawab & Penyangkalan',
      content_en: 'Use of this website is at your own risk. We are not liable for inaccuracies.',
      content_id: 'Penggunaan situs web ini sepenuhnya risiko Anda. Kami tidak bertanggung jawab atas ketidakakuratan.',
      notes_en: '',
      notes_id: '',
      warning_en: 'Reproduction of content is prohibited.',
      warning_id: 'Reproduksi konten dilarang.',
    },
  ],
};

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const sections = ['hero', ...dummyData.custom.map((item) => item.id)];
        const scrollPosition = window.scrollY + 200;
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element && scrollPosition >= element.offsetTop) setActiveSection(section);
        }
      }, 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const getSectionIcon = (sectionId) => {
    const icons = {
      intro: <Globe className="w-6 h-6 text-cyan-600" />,
      usage: <Users className="w-6 h-6 text-cyan-600" />,
      privacy: <Lock className="w-6 h-6 text-cyan-600" />,
      content: <Eye className="w-6 h-6 text-cyan-600" />,
      liability: <Shield className="w-6 h-6 text-cyan-600" />,
    };
    return icons[sectionId] || <FileText className="w-6 h-6 text-cyan-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      {/* Hero Section */}
      <section
        id="hero"
        data-animate
        className={`relative py-20 bg-gradient-to-b from-cyan-50 to-white overflow-hidden transition-all duration-700 ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-cyan-50/40 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-cyan-100 rounded-full text-cyan-700 text-sm font-medium mb-6 mt-10">
            <FileText className="w-4 h-4 mr-2" />
            Legal Documentation
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {dummyData.hero.title_en}
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {dummyData.hero.subtitle_en}
          </p>

          {dummyData.hero.image_url && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
                <img
                  src={dummyData.hero.image_url}
                  alt="Legal documentation and guidelines"
                  className="w-full h-56 object-cover rounded-xl"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Quick Navigation</h3>
                <nav className="space-y-3">
                  {dummyData.custom.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center px-4 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-cyan-50 text-cyan-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {getSectionIcon(item.id)}
                      <span className="ml-3 text-sm">{item.section}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-1 space-y-16">
            {dummyData.custom.map((item) => (
              <section
                key={item.id}
                id={item.id}
                data-animate
                className={`scroll-mt-32 transition-all duration-700 ${
                  isVisible[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                    {getSectionIcon(item.id)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {item.title_en}
                    </h2>
                    <p className="text-gray-600 text-sm">{item.section}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 space-y-5">
                  <p className="text-gray-700 text-base leading-relaxed">
                    {item.content_en}
                  </p>

                  {item.notes_en && (
                    <div className="bg-cyan-50/70 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-md">Notes</h4>
                      <p className="text-gray-700 text-sm">{item.notes_en}</p>
                    </div>
                  )}

                  {item.warning_en && (
                    <div className="bg-red-50/70 rounded-xl p-4 border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2 text-md">Warnings</h4>
                      <p className="text-red-700 text-sm">{item.warning_en}</p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;