import React, { useState, useEffect } from 'react';
import { Mail, Phone, Shield, Eye, Lock, Users, FileText, Globe, HeartHandshake, ChevronRight } from 'lucide-react';
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';
import apiClient from '../../../../../../components/AdminDashboard/Utils/ApiClient/apiClient';
import toast from 'react-hot-toast';

const PrivacyPolicy = () => {
  const [isVisible, setIsVisible] = useState({});
  const [data, setData] = useState(null);

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

    const fetchData = async () => {
      try {
        const { data: response } = await apiClient.get('/privacypolicy');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch privacy policy:', error);
        toast.error('Gagal muat data dari API, menggunakan dummy data.');
        setData(dummyData); // Fallback ke dummy
      }
    };
    fetchData();

    return () => observer.disconnect();
  }, []);

  // Dummy data fallback
  const dummyData = {
    hero: {
      title_en: "Your Data, Protected",
      title_id: "Data Anda, Terlindungi",
      subtitle_en: "Transparency in how we protect and handle your personal information",
      subtitle_id: "Transparansi dalam cara kami melindungi dan menangani informasi pribadi Anda",
    },
    intro: {
      title_en: "Our Commitment to You",
      title_id: "Komitmen Kami untuk Anda",
      content_en: "We respect your right to privacy. This Privacy Policy explains how UrbanLife (PT. Urban Digital Media) collects, stores, uses, processes, retains, transfers, discloses, and protects your personal information on urbanlife.id.",
      content_id: "Kami menghormati hak Anda atas privasi. Kebijakan Privasi ini menjelaskan bagaimana UrbanLife (PT. Urban Digital Media) mengumpulkan, menyimpan, menggunakan, memproses, menyimpan, mentransfer, mengungkapkan, dan melindungi informasi pribadi Anda di urbanlife.id.",
    },
    custom: [
      {
        id: 'personal-info',
        section_number: 1,
        title_en: "Personal Information Collection",
        title_id: "Pengumpulan Informasi Pribadi",
        content_en: "We collect information that identifies or can be used to identify, contact, or locate you or your device (personal information), including name, address, date of birth, occupation, phone number, email address, bank account details, gender, photo, nationality, and identification documents (e.g., KTP, SIM, or Passport).",
        content_id: "Kami mengumpulkan informasi yang dapat mengidentifikasi atau digunakan untuk mengidentifikasi, menghubungi, atau menemukan Anda atau perangkat Anda (informasi pribadi), termasuk nama, alamat, tanggal lahir, pekerjaan, nomor telepon, alamat email, detail rekening bank, gender, foto, kewarganegaraan, dan dokumen identitas (misalnya, KTP, SIM, atau Paspor).",
        notes_en: "",
        notes_id: "",
        warning_en: "",
        warning_id: "",
      },
      {
        id: 'use-info',
        section_number: 2,
        title_en: "Information Usage",
        title_id: "Penggunaan Informasi",
        content_en: "Your information is used to provide and improve our services, process transactions, and communicate with you effectively.",
        content_id: "Informasi Anda digunakan untuk menyediakan dan meningkatkan layanan kami, memproses transaksi, dan berkomunikasi dengan Anda secara efektif.",
        notes_en: "",
        notes_id: "",
        warning_en: "",
        warning_id: "",
      },
      {
        id: 'share-info',
        section_number: 3,
        title_en: "Information Sharing",
        title_id: "Pembagian Informasi",
        content_en: "We may share your information with affiliates or third parties only for legal or service-related purposes, never for sale.",
        content_id: "Kami dapat membagikan informasi Anda dengan afiliasi atau pihak ketiga hanya untuk tujuan hukum atau terkait layanan, tidak pernah untuk dijual.",
        notes_en: "",
        notes_id: "",
        warning_en: "",
        warning_id: "",
      },
      {
        id: 'storage-info',
        section_number: 4,
        title_en: "Data Storage",
        title_id: "Penyimpanan Data",
        content_en: "Your data is stored only as long as needed for our services or as required by law.",
        content_id: "Data Anda disimpan hanya selama diperlukan untuk layanan kami atau sebagaimana diwajibkan oleh hukum.",
        notes_en: "",
        notes_id: "",
        warning_en: "",
        warning_id: "",
      },
      {
        id: 'protection-info',
        section_number: 5,
        title_en: "Data Protection",
        title_id: "Perlindungan Data",
        content_en: "We use security measures to protect your data, though absolute security over the internet cannot be guaranteed.",
        content_id: "Kami menggunakan langkah keamanan untuk melindungi data Anda, meskipun keamanan absolut di internet tidak dapat dijamin.",
        notes_en: "",
        notes_id: "",
        warning_en: "",
        warning_id: "",
      },
      {
        id: 'amendment-access',
        section_number: 6,
        title_en: "Access & Amendment",
        title_id: "Akses & Perubahan",
        content_en: "You can request access to or correction of your data, subject to certain limitations.",
        content_id: "Anda dapat meminta akses atau perbaikan data Anda, dengan beberapa batasan tertentu.",
        notes_en: "",
        notes_id: "",
        warning_en: "",
        warning_id: "",
      },
    ],
    contact: {
      title_en: "Get in Touch",
      title_id: "Hubungi Kami",
      email: "info@urbanlife.id",
      phone: "+62 816 919 812",
    },
    additional: [
      {
        id: 'amendment-policy',
        title_en: 'Policy Updates',
        content_en: 'We may review and amend this privacy policy from time to time. Changes will be notified through our website, and continued use indicates acceptance of updates.',
        content_id: 'Kami dapat meninjau dan mengubah kebijakan privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui situs web kami, dan penggunaan yang terus-menerus menunjukkan penerimaan terhadap pembaruan.',
      },
      {
        id: 'acknowledgment',
        title_en: 'Your Agreement',
        content_en: 'By using our services, you acknowledge reading and agreeing to this policy. You consent to our data processing practices as described herein.',
        content_id: 'Dengan menggunakan layanan kami, Anda mengakui telah membaca dan menyetujui kebijakan ini. Anda menyetujui praktik pemrosesan data kami sebagaimana dijelaskan di sini.',
      },
      {
        id: 'unspecified-data',
        title_en: 'Anonymous Data',
        content_en: 'We may use anonymized data (with all identifiers removed) that cannot be associated with any individual for research and improvement purposes.',
        content_id: 'Kami dapat menggunakan data anonim (dengan semua pengenal dihapus) yang tidak dapat dikaitkan dengan individu untuk tujuan penelitian dan perbaikan.',
      },
      {
        id: 'marketing',
        title_en: 'Marketing Communications',
        content_en: 'We may send promotional messages via email, SMS, or social media. You can opt-out anytime while still receiving essential service communications.',
        content_id: 'Kami dapat mengirim pesan promosi melalui email, SMS, atau media sosial. Anda dapat berhenti berlangganan kapan saja sambil tetap menerima komunikasi layanan penting.',
      },
      {
        id: 'third-party',
        title_en: 'Third-Party Links',
        content_en: 'Our website may contain links to third-party sites with their own privacy policies. We are not responsible for their data practices.',
        content_id: 'Situs web kami mungkin berisi tautan ke situs pihak ketiga dengan kebijakan privasi mereka sendiri. Kami tidak bertanggung jawab atas praktik data mereka.',
      },
    ],
  };

  const sections = data
    ? data.custom.map((section) => ({
        id: section.id,
        title: section.title_en,
        icon: section.id === 'personal-info' ? Users : section.id === 'use-info' ? Eye : section.id === 'share-info' ? Globe : section.id === 'storage-info' ? FileText : section.id === 'protection-info' ? Lock : Shield,
      }))
    : [
        { id: 'personal-info', title: dummyData.custom[0].title_en, icon: Users },
        { id: 'use-info', title: dummyData.custom[1].title_en, icon: Eye },
        { id: 'share-info', title: dummyData.custom[2].title_en, icon: Globe },
        { id: 'storage-info', title: dummyData.custom[3].title_en, icon: FileText },
        { id: 'protection-info', title: dummyData.custom[4].title_en, icon: Lock },
        { id: 'amendment-access', title: dummyData.custom[5].title_en, icon: Shield },
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
              <span className="text-cyan-700 text-sm font-medium">Privacy Policy</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 tracking-tight">
              {data?.hero?.title_en || dummyData.hero.title_en}
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              {data?.hero?.subtitle_en || dummyData.hero.subtitle_en}
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
              <h2 className="text-2xl font-medium text-slate-900">{data?.intro?.title_en || dummyData.intro.title_en}</h2>
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              {data?.intro?.content_en || dummyData.intro.content_en}
            </p>
            <p className="text-slate-600 leading-relaxed">
              Questions? Contact us using the information at the bottom of this page.
            </p>
          </div>
        </div>

        {/* Custom Sections */}
        {data?.custom?.length > 0
          ? data.custom.map((section) => (
              <section
                key={section.id}
                id={section.id}
                data-animate
                className={`mb-16 transition-all duration-700 ${
                  isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                      {section.id === 'personal-info' && <Users className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'use-info' && <Eye className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'share-info' && <Globe className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'storage-info' && <FileText className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'protection-info' && <Lock className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'amendment-access' && <Shield className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                    </div>
                    <h2 className="text-2xl font-medium text-slate-900">{section.title_en}</h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6">{section.content_en}</p>
                </div>
              </section>
            ))
          : dummyData.custom.map((section) => (
              <section
                key={section.id}
                id={section.id}
                data-animate
                className={`mb-16 transition-all duration-700 ${
                  isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                      {section.id === 'personal-info' && <Users className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'use-info' && <Eye className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'share-info' && <Globe className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'storage-info' && <FileText className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'protection-info' && <Lock className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                      {section.id === 'amendment-access' && <Shield className="w-5 h-5 text-cyan-600" aria-hidden="true" />}
                    </div>
                    <h2 className="text-2xl font-medium text-slate-900">{section.title_en}</h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6">{section.content_en}</p>
                </div>
              </section>
            ))}

        {/* Additional Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {data?.additional?.length > 0
            ? data.additional.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  data-animate
                  className={`transition-all duration-700 ${
                    isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                    <h3 className="text-lg font-medium text-slate-900 mb-3">{section.title_en}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{section.content_en}</p>
                  </div>
                </div>
              ))
            : dummyData.additional.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  data-animate
                  className={`transition-all duration-700 ${
                    isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                    <h3 className="text-lg font-medium text-slate-900 mb-3">{section.title_en}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{section.content_en}</p>
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
              <h2 className="text-2xl font-medium mb-2">{data?.contact?.title_en || dummyData.contact.title_en}</h2>
              <p className="text-cyan-100 mb-8 text-sm">Questions about this privacy policy? We’re here to help.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-200" aria-hidden="true" />
                  <div className="text-left">
                    <p className="font-medium">Email Support</p>
                    <a
                      href={`mailto:${data?.contact?.email || dummyData.contact.email}`}
                      className="text-cyan-100 hover:text-white text-sm transition-colors duration-200"
                    >
                      {data?.contact?.email || dummyData.contact.email}
                    </a>
                    <p className="text-cyan-100 mb-1 mt-2">Advertisements:</p>
                    <a
                      href="mailto:ads@urbanlife.id"
                      className="text-cyan-100 hover:text-white text-sm transition-colors duration-200"
                    >
                      ads@urbanlife.id
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-cyan-200" aria-hidden="true" />
                  <div className="text-left">
                    <p className="font-medium">Phone Support</p>
                    <a
                      href={`tel:${data?.contact?.phone || dummyData.contact.phone}`}
                      className="text-cyan-100 hover:text-white text-sm transition-colors duration-200"
                    >
                      {data?.contact?.phone || dummyData.contact.phone}
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