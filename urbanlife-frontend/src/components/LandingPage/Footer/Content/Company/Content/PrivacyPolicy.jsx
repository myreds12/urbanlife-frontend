import React, { useState, useEffect } from 'react';
import { Mail, Phone, Shield, Eye, Lock, Users, FileText, Globe, HeartHandshake, ChevronRight} from 'lucide-react';
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';

const PrivacyPolicy = () => {
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
    { id: 'personal-info', title: 'Personal Information Collection', icon: Users },
    { id: 'use-info', title: 'Information Usage', icon: Eye },
    { id: 'share-info', title: 'Information Sharing', icon: Globe },
    { id: 'storage-info', title: 'Data Storage', icon: FileText },
    { id: 'protection-info', title: 'Data Protection', icon: Lock },
    { id: 'amendment-access', title: 'Access & Amendment', icon: Shield },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section - Centered like Code 2 */}
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
              Your Data,
              <br />
              <span className="text-cyan-600">Protected</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Transparency in how we protect and handle your personal information
            </p>

            
          </div>
        </div>
      </div>

      {/* Navigation Pills - Simplified like Code 2 */}
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
              <h2 className="text-2xl font-medium text-slate-900">Our Commitment to You</h2>
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              We respect your right to privacy. This Privacy Policy explains how{' '}
              <strong className="text-slate-900">UrbanLife</strong> (PT. Urban Digital Media) collects, stores, uses,
              processes, retains, transfers, discloses, and protects your personal information on{' '}
              <a
                href="https://urbanlife.id"
                className="text-cyan-600 hover:text-cyan-700 underline decoration-cyan-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                urbanlife.id
              </a>
              .
            </p>
            <p className="text-slate-600 leading-relaxed">
              Questions? Contact us using the information at the bottom of this page.
            </p>
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
              <h2 className="text-2xl font-medium text-slate-900">1. Personal Information Collection</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              We collect information that identifies or can be used to identify, contact, or locate you or your device
              (personal information), including name, address, date of birth, occupation, phone number, email address, bank
              account details, gender, photo, nationality, and identification documents (e.g., KTP, SIM, or Passport).
            </p>
            <div className="space-y-8">
              <div className="border-l-4 border-cyan-400 pl-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">Information Obtained Directly</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  When you use our website, you provide information necessary for our services, such as:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
                    <p className="text-slate-700 text-sm">
                      Information required to access services, depending on the service you seek.
                    </p>
                  </div>
                  <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
                    <p className="text-slate-700 text-sm">
                      Payment details, including transfer details, amounts, and card/account information for electronic
                      payments.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-cyan-400 pl-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">Information Collected Automatically</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We collect technical data during website visits, such as IP address, viewed pages, session duration, and
                  device information.
                </p>
                <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
                  <p className="text-slate-700 text-sm">
                    <strong>Cookies:</strong> We use cookies to enhance user experience. You can adjust your browser
                    settings to reject cookies, though this may affect functionality.
                  </p>
                </div>
              </div>
              <div className="border-l-4 border-cyan-400 pl-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">Information from Third Parties</h3>
                <p className="text-slate-700 leading-relaxed">
                  We may collect personal information from partners and third parties for purposes related to our services or
                  cooperation agreements.
                </p>
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
              <h2 className="text-2xl font-medium text-slate-900">2. Information Usage</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">For Users</h3>
                <div className="space-y-2">
                  {[
                    'Identity verification and user authentication',
                    'Service provision and booking facilitation',
                    'Payment processing and transaction management',
                    'Communication about services and transactions',
                    'Customer support and inquiry handling',
                    'Service improvement and personalization',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 text-cyan-500" aria-hidden="true" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">Business Operations</h3>
                <div className="space-y-2">
                  {[
                    'Performance monitoring and analytics',
                    'Technical support and problem resolution',
                    'Statistical analysis and product development',
                    'Fraud detection and prevention',
                    'Legal compliance and regulatory reporting',
                    'Business process optimization',
                  ].map((item, index) => (
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
              <h2 className="text-2xl font-medium text-slate-900">3. Information Sharing</h2>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-800 font-medium">🛡️ We never lease or sell your personal information.</p>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              We may disclose or share your personal information with affiliates and other parties only for specific
              purposes permitted by applicable law:
            </p>
            <div className="space-y-3">
              {[
                'Service provision through our affiliates and partners',
                'Legal compliance and regulatory requirements',
                'Government authority requests and instructions',
                'Legal proceedings and dispute resolution',
                'Identity verification processes',
                'Third-party platform integration',
                'Emergency situations affecting safety or public interest',
                'Business restructuring, merger, or acquisition',
                'Operational support from affiliates',
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-slate-600 text-xs">{index + 1}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
              <p className="text-slate-700 text-sm">
                <strong>Note:</strong> We strive to remove personal associations before sharing information when it’s not
                necessary to identify you individually.
              </p>
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
              <h2 className="text-2xl font-medium text-slate-900">4. Data Storage</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Your personal information is stored only as long as necessary to fulfill collection purposes or as required by
              applicable law.
            </p>
            <div className="space-y-2">
              {[
                'Automatic deletion when no longer required',
                'Compliance with partner storage policies',
                'Reasonable protection efforts',
              ].map((item, index) => (
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
              <h2 className="text-2xl font-medium text-slate-900">5. Data Protection</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              We implement reasonable security measures to protect your personal information against unauthorized access,
              use, or disclosure.
            </p>
            <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100">
              <p className="text-slate-700 text-sm">
                <strong>Important:</strong> While we strive to protect your data, internet transmission isn’t completely
                secure. We cannot guarantee absolute security due to factors beyond our control.
              </p>
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
              <h2 className="text-2xl font-medium text-slate-900">6. Access & Amendment</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-cyan-50/50 rounded-xl p-6 border border-cyan-100">
                <h3 className="text-lg font-medium text-slate-900 mb-4">You Can Request</h3>
                <div className="space-y-2">
                  {[
                    'Access to your personal information',
                    'Correction of your personal data',
                    'Withdrawal of consent',
                    'Opt-out of marketing communications',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-cyan-50/50 rounded-xl p-6 border border-cyan-100">
                <h3 className="text-lg font-medium text-slate-900 mb-4">We May Reject Requests</h3>
                <div className="space-y-2">
                  {[
                    'Information containing third-party references',
                    'Requests for irrelevant matters',
                    'When prohibited by applicable law',
                  ].map((item, index) => (
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
              title: '7. Policy Updates',
              content:
                'We may review and amend this privacy policy from time to time. Changes will be notified through our website, and continued use indicates acceptance of updates.',
            },
            {
              id: 'acknowledgment',
              title: '8. Your Agreement',
              content:
                'By using our services, you acknowledge reading and agreeing to this policy. You consent to our data processing practices as described herein.',
            },
            {
              id: 'unspecified-data',
              title: '9. Anonymous Data',
              content:
                'We may use anonymized data (with all identifiers removed) that cannot be associated with any individual for research and improvement purposes.',
            },
            {
              id: 'marketing',
              title: '10. Marketing Communications',
              content:
                'We may send promotional messages via email, SMS, or social media. You can opt-out anytime while still receiving essential service communications.',
            },
            {
              id: 'third-party',
              title: '11. Third-Party Links',
              content:
                'Our website may contain links to third-party sites with their own privacy policies. We are not responsible for their data practices.',
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
              <h2 className="text-2xl font-medium mb-2">12. Get in Touch</h2>
              <p className="text-cyan-100 mb-8 text-sm">
                Questions about this privacy policy? We’re here to help.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-200" aria-hidden="true" />
                  <div className="text-left">
                    <p className="font-medium">Email Support</p>
                    <a
                      href="mailto:info@urbanlife.id"
                      className="text-cyan-100 hover:text-white text-sm transition-colors duration-200"
                    >
                      info@urbanlife.id
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
                      href="tel:+62816919812"
                      className="text-cyan-100 hover:text-white text-sm transition-colors duration-200"
                    >
                      +62 816 919 812
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