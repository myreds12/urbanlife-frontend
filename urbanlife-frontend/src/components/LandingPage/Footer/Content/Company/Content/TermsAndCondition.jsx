import React, { useState, useEffect } from 'react';
import { FileText, Shield, Globe, Users, Eye, Lock } from 'lucide-react';
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('');

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'usage', 'privacy', 'content', 'liability'];
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
      <section className="relative py-20 bg-gradient-to-b from-cyan-50/50 to-white overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-cyan-50/40 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mt-12">
          <div className="inline-flex items-center px-4 py-2 bg-cyan-50 rounded-full text-cyan-700 text-sm font-medium mb-6">
            <FileText className="w-4 h-4 mr-2" />
            Legal Documentation
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Terms & Conditions
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Clear guidelines for using our platform and services. Last updated January 2025.
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
                <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'intro', label: 'Introduction', icon: <Globe className="w-4 h-4" /> },
                    { id: 'usage', label: 'Terms of Use', icon: <Users className="w-4 h-4" /> },
                    { id: 'privacy', label: 'Privacy Policy', icon: <Lock className="w-4 h-4" /> },
                    { id: 'content', label: 'Content Guidelines', icon: <Eye className="w-4 h-4" /> },
                    { id: 'liability', label: 'Liability', icon: <Shield className="w-4 h-4" /> }
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
            <section id="intro" className="scroll-mt-32">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Introduction</h2>
                  <p className="text-gray-600">Welcome to Urbanlife platform</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Welcome to our website. If you continue to browse and use this website, you agree to comply with and are bound to the following terms and conditions of use, which together with our privacy policy govern urbanlife's relationship with you in relation to the use of this website. If you disagree with any part of these terms and conditions, kindly not to use our website.
                </p>
                
                <div className="bg-cyan-50/50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Company Information</h4>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    urbanlife or urbanlife.id is owned and managed by PT. Urban Digital Media. The term "urbanlife" or "urbanlife.id" or "our" or "us" or "we" refers to the owner of the website whose registered office is at:
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Main Office:</strong> Komplek Perkantoran Buncit Mas Blok C – 03A Lt. 1</p>
                    <p>Jl. Mampang Prapatan Raya No. 108, Kelurahan Duren Tiga, Kecamatan Pancoran, Jakarta Selatan 12760, Indonesia</p>
                    <p><strong>Branch Office:</strong> Jl. Pura Demak, Gang Air Mancur V No. 3, Pemecutan Klod, Kecamatan Denpasar Barat, Kota Denpasar, Bali 80113, Indonesia</p>
                    <p><strong>Registration:</strong> 0606220058651 (registered in Jakarta, Indonesia)</p>
                  </div>
                  <p className="text-gray-600 text-sm mt-4 italic">
                    The term "you" refers to the user or visitor of our website.
                  </p>
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
            <section id="usage" className="scroll-mt-32">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Terms of Use</h2>
                  <p className="text-gray-600">Guidelines for platform usage</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-cyan-50/50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">The use of this website is subject to the following terms of use:</h4>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        1
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                          This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by a third party:
                        </p>
                        <ul className="text-gray-600 text-xs space-y-1 ml-4">
                          <li>• IP address</li>
                          <li>• Browser type</li>
                          <li>• Operating system</li>
                          <li>• Referral type (direct method, a referring link, a website search, or a campaign such as an ad or an email link)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        3
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Your use of this website and any dispute arising out of such use of the website is subject to the law of the Republic of Indonesia.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        4
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Neither we nor any third party related to this website provides any warranty or guarantee to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any of such inaccuracies or errors.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        5
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be at your own responsibility to ensure that any product, service or information available through this website meets your specific requirements.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        6
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        This website contains materials which are owned by or licensed to us. These materials include, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy Policy */}
            <section id="privacy" className="scroll-mt-32">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Privacy & Data</h2>
                  <p className="text-gray-600">How we handle your information</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        7
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        All trademarks reproduced on this website, which are not the property of, or licensed to the operator, are acknowledged on the website.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        8
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-700 font-semibold text-sm flex-shrink-0">
                        9
                      </div>
                      <p className="text-red-800 text-sm leading-relaxed font-medium">
                        Contents related to pornography, racism, discrimination (religion, ethnic or inter-group), coercion or violation are not tolerated and permitted by us. If found, the contents will be deleted without prior notice.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        10
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        From time to time, this website may also include links to other website(s) and/or social media. These links are provided to give you further information. They do not signify that we endorse the website(s) and/or social media. We have no responsibility for the content of the linked website(s) and/or social media.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                        11
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        All the services provided on this website are bound to the specific procedures and policies of each of the services. Please refer to each of the services that you would like to use and read through the procedure and policy carefully before you use the service.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image placeholder in content */}
                <div class="mt-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-3">
                  <img
                    src="/images/LandingPage/Footer/content/Volcano.png"
                    alt="Terms and conditions documentation"
                    class="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </section>

            {/* Content Guidelines */}
            <section id="content" className="scroll-mt-32">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Additional Information</h2>
                  <p className="text-gray-600">Important policies and guidelines</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Cookie Policy & Data Collection
                    </h4>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      This website uses cookies to monitor browsing preferences. Personal information that may be stored includes IP address, browser type, operating system, and referral sources for third-party analytics.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      External Links Policy
                    </h4>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      Our website may include links to external websites and social media for additional information. These links do not signify endorsement and we have no responsibility for their content.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Service-Specific Terms
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      All services on this website are subject to specific procedures and policies. Please review each service's terms carefully before use.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Liability */}
            <section id="liability" className="scroll-mt-32">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Liability & Disclaimer</h2>
                  <p className="text-gray-600">Legal protections and limitations</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h4 className="font-semibold text-amber-800 mb-3">Important Notice</h4>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      Use of this website is at your own risk. We are not liable for any inaccuracies, 
                      errors, or damages arising from the use of our services.
                    </p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All content and materials are owned or licensed by Urbanlife. Unauthorized reproduction 
                    or distribution is strictly prohibited and may result in legal action.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-white to-cyan-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Need Clarification?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            If you have questions about these terms or need additional information, 
            we're here to help.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-cyan-700 transition-colors shadow-sm">
              Contact Support
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors">
              View Services
            </button>
          </div>
          
          <p className="text-gray-500 text-sm mt-8">
            Governed by the laws of the Republic of Indonesia
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;