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
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    const fetchData = async () => {
      const cachedData = localStorage.getItem('privacyPolicyData');
      if (cachedData) {
        setData(JSON.parse(cachedData));
        return;
      }
      try {
        const { data: response } = await apiClient.get('/privacypolicy');
        setData(response.data);
        localStorage.setItem('privacyPolicyData', JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to fetch privacy policy:', error);
        toast.error('Gagal muat data dari API, menggunakan dummy data.');
        setData(dummyData);
        localStorage.setItem('privacyPolicyData', JSON.stringify(dummyData));
      }
    };
    fetchData();

    return () => observer.disconnect();
  }, []);

const dummyData = {
  hero: {
    id: 'hero',
    title_en: "Your Data, Protected",
    title_id: "Data Anda, Terlindungi",
    subtitle_en: "Transparency in how we protect and handle your personal information",
    subtitle_id: "Transparansi dalam cara kami melindungi dan menangani informasi pribadi Anda",
  },
  custom: [
    {
      id: 'personal-info',
      section_number: 1,
      section: 'Personal Information Collection',
      title_en: "Personal Information Collection",
      title_id: "Pengumpulan Informasi Pribadi",
      content_en: "We collect information that identifies or can be used to identify, contact, or locate you or your device (personal information), including name, address, date of birth, occupation, phone number, email address, bank account details, gender, photo, nationality, and identification documents (e.g., KTP, SIM, or Passport).",
      content_id: "Kami mengumpulkan informasi yang dapat mengidentifikasi atau digunakan untuk mengidentifikasi, menghubungi, atau menemukan Anda atau perangkat Anda (informasi pribadi), termasuk nama, alamat, tanggal lahir, pekerjaan, nomor telepon, alamat email, detail rekening bank, gender, foto, kewarganegaraan, dan dokumen identitas (misalnya, KTP, SIM, atau Paspor).",
      notes: [{ en: "Please ensure all details are accurate.", id: "Pastikan semua detail akurat." }],
      warning: [{ en: "Misuse of data may result in legal action.", id: "Penyalahgunaan data dapat menyebabkan tindakan hukum." }],
    },
    {
      id: 'use-info',
      section_number: 2,
      section: 'Information Usage',
      title_en: "Information Usage",
      title_id: "Penggunaan Informasi",
      content_en: "Your information is used to provide and improve our services, process transactions, and communicate with you effectively.",
      content_id: "Informasi Anda digunakan untuk menyediakan dan meningkatkan layanan kami, memproses transaksi, dan berkomunikasi dengan Anda secara efektif.",
      notes: [{ en: "Data usage is logged for security.", id: "Penggunaan data dicatat untuk keamanan." }],
      warning: [{ en: "Unauthorized access is prohibited.", id: "Akses tanpa izin dilarang." }],
    },
    {
      id: 'share-info',
      section_number: 3,
      section: 'Information Sharing',
      title_en: "Information Sharing",
      title_id: "Pembagian Informasi",
      content_en: "We may share your information with affiliates or third parties only for legal or service-related purposes, never for sale.",
      content_id: "Kami dapat membagikan informasi Anda dengan afiliasi atau pihak ketiga hanya untuk tujuan hukum atau terkait layanan, tidak pernah untuk dijual.",
      notes: [{ en: "Sharing is limited to trusted partners.", id: "Pembagian dibatasi pada mitra terpercaya." }],
      warning: [{ en: "Data sales are strictly forbidden.", id: "Penjualan data sangat dilarang." }],
    },
    {
      id: 'storage-info',
      section_number: 4,
      section: 'Data Storage',
      title_en: "Data Storage",
      title_id: "Penyimpanan Data",
      content_en: "Your data is stored only as long as needed for our services or as required by law.",
      content_id: "Data Anda disimpan hanya selama diperlukan untuk layanan kami atau sebagaimana diwajibkan oleh hukum.",
      notes: [{ en: "Data retention follows legal standards.", id: "Retensi data mengikuti standar hukum." }],
      warning: [{ en: "Unauthorized retention is illegal.", id: "Retensi tanpa izin melanggar hukum." }],
    },
    {
      id: 'protection-info',
      section_number: 5,
      section: 'Data Protection',
      title_en: "Data Protection",
      title_id: "Perlindungan Data",
      content_en: "We use security measures to protect your data, though absolute security over the internet cannot be guaranteed.",
      content_id: "Kami menggunakan langkah keamanan untuk melindungi data Anda, meskipun keamanan absolut di internet tidak dapat dijamin.",
      notes: [{ en: "Regular security audits are conducted.", id: "Audit keamanan dilakukan secara rutin." }],
      warning: [{ en: "Report security breaches immediately.", id: "Laporkan pelanggaran keamanan segera." }],
    },
    {
      id: 'amendment-access',
      section_number: 6,
      section: 'Access & Amendment',
      title_en: "Access & Amendment",
      title_id: "Akses & Perubahan",
      content_en: "You can request access to or correction of your data, subject to certain limitations.",
      content_id: "Anda dapat meminta akses atau perbaikan data Anda, dengan beberapa batasan tertentu.",
      notes: [{ en: "Requests must be submitted in writing.", id: "Permintaan harus dikirim secara tertulis." }],
      warning: [{ en: "False requests may be rejected.", id: "Permintaan palsu dapat ditolak." }],
    },
    ],
    contact: {
      id: 'contact',
      title_en: "Get in Touch",
      title_id: "Hubungi Kami",
      email: "info@urbanlife.id",
      phone: "+62 816 919 812",
    },
    additional: [
      {
        id: 'amendment-policy',
        section: 'Policy Updates',
        title_en: 'Policy Updates',
        content_en: 'We may review and amend this privacy policy from time to time. Changes will be notified through our website, and continued use indicates acceptance of updates.',
        content_id: 'Kami dapat meninjau dan mengubah kebijakan privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui situs web kami, dan penggunaan yang terus-menerus menunjukkan penerimaan terhadap pembaruan.',
      },
      {
        id: 'acknowledgment',
        section: 'Your Agreement',
        title_en: 'Your Agreement',
        content_en: 'By using our services, you acknowledge reading and agreeing to this policy. You consent to our data processing practices as described herein.',
        content_id: 'Dengan menggunakan layanan kami, Anda mengakui telah membaca dan menyetujui kebijakan ini. Anda menyetujui praktik pemrosesan data kami sebagaimana dijelaskan di sini.',
      },
    ],
  };

  const sections = data
    ? data.custom.map((section) => ({
        id: section.id,
        title: section.title_en,
        icon: section.id === 'personal-info' ? Users : section.id === 'use-info' ? Eye : section.id === 'share-info' ? Globe : section.id === 'storage-info' ? FileText : section.id === 'protection-info' ? Lock : Shield,
      }))
    : dummyData.custom.map((section) => ({
        id: section.id,
        title: section.title_en,
        icon: section.id === 'personal-info' ? Users : section.id === 'use-info' ? Eye : section.id === 'share-info' ? Globe : section.id === 'storage-info' ? FileText : section.id === 'protection-info' ? Lock : Shield,
      }));

  return (
    <div className="bg-slate-50 min-h-screen">
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
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {data?.custom?.length > 0
          ? data.custom.map((section) => (
              <section
                key={section.id}
                id={section.id}
                data-animate
                className={`mb-16 transition-all duration-700 ${isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
                  {section.notes.some(note => note.en || note.id) && (
                    <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
                      <h3 className="text-md font-medium text-cyan-800 mb-2">Notes</h3>
                      {section.notes.map((note, i) => (note.en || note.id) && (
                        <p key={i} className="text-sm text-cyan-700">{note.en || note.id}</p>
                      ))}
                    </div>
                  )}
                  {section.warning.some(warn => warn.en || warn.id) && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg">
                      <h3 className="text-md font-medium text-red-800 mb-2">Warnings</h3>
                      {section.warning.map((warn, i) => (warn.en || warn.id) && (
                        <p key={i} className="text-sm text-red-700">{warn.en || warn.id}</p>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))
          : dummyData.custom.map((section) => (
              <section
                key={section.id}
                id={section.id}
                data-animate
                className={`mb-16 transition-all duration-700 ${isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
                  {section.notes.some(note => note.en || note.id) && (
                    <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
                      <h3 className="text-md font-medium text-cyan-800 mb-2">Notes</h3>
                      {section.notes.map((note, i) => (note.en || note.id) && (
                        <p key={i} className="text-sm text-cyan-700">{note.en || note.id}</p>
                      ))}
                    </div>
                  )}
                  {section.warning.some(warn => warn.en || warn.id) && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg">
                      <h3 className="text-md font-medium text-red-800 mb-2">Warnings</h3>
                      {section.warning.map((warn, i) => (warn.en || warn.id) && (
                        <p key={i} className="text-sm text-red-700">{warn.en || warn.id}</p>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
        {data?.additional?.length > 0
          ? data.additional.map((section) => (
              <div
                key={section.id}
                id={section.id}
                data-animate
                className={`mb-16 transition-all duration-700 ${isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
                className={`mb-16 transition-all duration-700 ${isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                  <h3 className="text-lg font-medium text-slate-900 mb-3">{section.title_en}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{section.content_en}</p>
                </div>
              </div>
            ))}
        <section
          id="contact"
          data-animate
          className={`mt-16 transition-all duration-700 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;