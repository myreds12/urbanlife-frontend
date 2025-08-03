import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Car, Home, Sparkles, Globe } from 'lucide-react';
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-300/15 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Hero Section */}
        <Navbar />
        <div
          id="hero"
          data-animate
          className={`relative z-10 px-6 pt-20 pb-12 mt-10 transition-all duration-700 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-lg border border-blue-200/30 rounded-full text-slate-700 text-sm mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Let's Create Something Amazing Together</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 mb-6 leading-tight">
              Ready to
              <br />
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Connect?</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Your next adventure starts with a conversation. Drop us a line and let's make magic happen.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online Now</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Global Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div
                id="contact-info"
                data-animate
                className={`bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-700 ${
                  isVisible['contact-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Get In Touch</h2>
                <p className="text-slate-600 mb-6">
                  Multiple ways to reach us - choose what works best for you
                </p>

                <div className="space-y-4">
                  {/* General Inquiries */}
                  <div className="group bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-4 rounded-xl border border-blue-200/30 hover:border-blue-400/50 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100/80 p-2 rounded-lg group-hover:bg-blue-200/80 transition-colors">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-slate-800 font-semibold">General Inquiries</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                          <span>info@urbanlife.id</span>
                          <span>+62 816 919 812</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Advertisements */}
                  <div className="group bg-gradient-to-r from-cyan-500/5 to-sky-500/5 p-4 rounded-xl border border-cyan-200/30 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-sky-500/10 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-cyan-100/80 p-2 rounded-lg group-hover:bg-cyan-200/80 transition-colors">
                        <Users className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="text-slate-800 font-semibold">Advertisements</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                          <span>ads@urbanlife.id</span>
                          <span>+62 816 919 812</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div
                id="services"
                data-animate
                className={`bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-700 ${
                  isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <h3 className="text-xl font-bold text-slate-800 mb-4">What We Do</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-blue-50/50 backdrop-blur-sm rounded-xl hover:bg-blue-100/50 transition-colors border border-blue-100/50">
                    <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-slate-700 font-medium">Destinations</div>
                  </div>
                  <div className="text-center p-3 bg-cyan-50/50 backdrop-blur-sm rounded-xl hover:bg-cyan-100/50 transition-colors border border-cyan-100/50">
                    <Car className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                    <div className="text-sm text-slate-700 font-medium">Car Rental</div>
                  </div>
                  <div className="text-center p-3 bg-sky-50/50 backdrop-blur-sm rounded-xl hover:bg-sky-100/50 transition-colors border border-sky-100/50">
                    <Home className="w-6 h-6 text-sky-600 mx-auto mb-2" />
                    <div className="text-sm text-slate-700 font-medium">Hotels</div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div
                id="business-hours"
                data-animate
                className={`bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-700 ${
                  isVisible['business-hours'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-800">We're Available</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Mon - Fri</span>
                    <span className="text-slate-800 font-medium">9AM - 6PM</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Saturday</span>
                    <span className="text-slate-800 font-medium">9AM - 4PM</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              id="contact-form"
              data-animate
              className={`bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-700 ${
                isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Send Message</h2>
                <p className="text-slate-600">Tell us about your project and we'll get back to you within 24 hours.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all shadow-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all shadow-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Inquiry Type</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all shadow-sm"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="destination">Travel Destinations</option>
                    <option value="rental">Car Rental</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="advertisement">Advertisement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all shadow-sm"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all resize-none shadow-sm"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          id="bottom-cta"
          data-animate
          className={`relative z-10 px-6 py-16 transition-all duration-700 ${
            isVisible['bottom-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-white/20 via-blue-50/30 to-cyan-50/30 backdrop-blur-xl border border-white/30 rounded-3xl p-8 text-center shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-sm border border-blue-200/30 rounded-full text-sm text-blue-700 mb-4 shadow-sm">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span>Every journey begins with a single message</span>
              </div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">Your Adventure Awaits</h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                From exotic destinations to luxury accommodations - we've got everything covered for your perfect getaway.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Explore Destinations
                </button>
                <button className="border border-blue-300/50 hover:border-blue-400 bg-white/30 backdrop-blur-sm text-slate-700 hover:text-slate-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-white/50 shadow-sm hover:shadow-lg">
                  View Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;