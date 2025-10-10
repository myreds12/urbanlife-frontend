import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, Users, Car, Home, Sparkles, Globe } from 'lucide-react';
import Navbar from '../../../../HomePage/Navbar/Navbar';
import Footer from '../../../../HomePage/Footer';
import { useTranslation } from 'react-i18next';
import apiClient from '../../../../../AdminDashboard/Utils/ApiClient/apiClient';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ContactUsPage = () => {
  const { t, i18n } = useTranslation();
  console.log('Current language:', i18n.language); // Debug bahasa saat ini

  useEffect(() => {
    console.log('Language changed to:', i18n.language); // Debug perubahan bahasa
  }, [i18n.language]);

  const [formData, setFormData] = useState({
    to: "purwohandoko83@gmail.com",
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isVisible, setIsVisible] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animasi muncul saat scroll
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

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Swal.fire({
        icon: "warning",
        title: t("contactus.warning_title", "Incomplete Form"),
        text: t("contactus.warning_text", "Please fill all required fields."),
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiClient.post("/mails/contactus", formData);

      if (res?.data?.status === 201) {
        Swal.fire({
          icon: "success",
          title: t("contactus.form_success_title", "Message Sent!"),
          text: t(
            "contactus.form_success_text",
            "Thank you for contacting us. We’ll get back to you soon!"
          ),
          confirmButtonColor: "#3085d6",
        });

        // Reset form
        setFormData({
          to: "purwohandoko83@gmail.com",
          name: "",
          email: "",
          subject: "",
          message: "",
          inquiryType: "general",
        });
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: t("contactus.form_error_title", "Submission Failed"),
        text: t(
          "contactus.form_error_text",
          "Something went wrong while sending your message."
        ),
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          className={`relative z-10 px-6 pt-20 pb-12 mt-10 transition-all duration-700 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-lg border border-blue-200/30 rounded-full text-slate-700 text-sm mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{t('contactus.cta_tagline')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 mb-6 leading-tight">
              {t('contactus.hero_title')}
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              {t('contactus.hero_subtitle')}
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{t('contactus.hero_status_online')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{t('contactus.hero_status_global')}</span>
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
                className={`bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-700 ${isVisible['contact-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('contactus.get_in_touch')}</h2>
                <p className="text-slate-600 mb-6">{t('contactus.get_in_touch_desc')}</p>

                <div className="space-y-4">
                  {/* General Inquiries */}
                  <div className="group bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-4 rounded-xl border border-blue-200/30 hover:border-blue-400/50 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100/80 p-2 rounded-lg group-hover:bg-blue-200/80 transition-colors">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-slate-800 font-semibold">{t('contactus.general_inquiries')}</h3>
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
                        <h3 className="text-slate-800 font-semibold">{t('contactus.advertisements')}</h3>
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
                className={`bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-700 min-h-[360px] flex flex-col justify-between ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
              >
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">{t('contactus.services_title')}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50/50 backdrop-blur-sm rounded-xl hover:bg-blue-100/50 transition-colors border border-blue-100/50">
                      <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-base text-slate-700 font-medium">{t('contactus.destinations')}</div>
                    </div>
                    <div className="text-center p-4 bg-cyan-50/50 backdrop-blur-sm rounded-xl hover:bg-cyan-100/50 transition-colors border border-cyan-100/50">
                      <Car className="w-8 h-8 text-cyan-600 mx-auto mb-3" />
                      <div className="text-base text-slate-700 font-medium">{t('contactus.car_rental')}</div>
                    </div>
                    <div className="text-center p-4 bg-sky-50/50 backdrop-blur-sm rounded-xl hover:bg-sky-100/50 transition-colors border border-sky-100/50">
                      <Home className="w-8 h-8 text-sky-600 mx-auto mb-3" />
                      <div className="text-base text-slate-700 font-medium">{t('contactus.hotels')}</div>
                    </div>
                  </div>
                  <div className="group mt-6 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-4 rounded-xl border border-blue-200/30 hover:border-blue-400/50 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 transition-all duration-300 hover:shadow-lg">
                    <p className="text-center text-slate-600 text-sm leading-relaxed">
                      {t('contactus.service_description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              id="contact-form"
              data-animate
              className={`bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-700 ${isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('contactus.send_message')}</h2>
                <p className="text-slate-600">{t('contactus.send_message_desc')}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('contactus.name')} *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all shadow-sm"
                      placeholder={t('contactus.name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('contactus.email')} *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all shadow-sm"
                      placeholder={t('contactus.email')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('contactus.inquiry_type')}</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all shadow-sm"
                  >
                    <option value="general">{t('contactus.inquiry_general')}</option>
                    <option value="destination">{t('contactus.inquiry_destination')}</option>
                    <option value="rental">{t('contactus.inquiry_rental')}</option>
                    <option value="accommodation">{t('contactus.inquiry_accommodation')}</option>
                    <option value="advertisement">{t('contactus.inquiry_advertisement')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('contactus.subject')} *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all shadow-sm"
                    placeholder={t('contactus.subject')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('contactus.message')} *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all resize-none shadow-sm"
                    placeholder={t('contactus.message')}
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>{t('contactus.submit')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          id="bottom-cta"
          data-animate
          className={`relative z-10 px-6 py-16 transition-all duration-700 ${isVisible['bottom-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-white/20 via-blue-50/30 to-cyan-50/30 backdrop-blur-xl border border-white/30 rounded-3xl p-8 text-center shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-sm border border-blue-200/30 rounded-full text-sm text-blue-700 mb-4 shadow-sm">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span>{t('contactus.cta_tagline')}</span>
              </div>

              <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">{t('contactus.cta_title')}</h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">{t('contactus.cta_desc')}</p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  {t('contactus.cta_explore')}
                </Link>
                <Link
                  to="/Services"
                  className="border border-blue-300/50 hover:border-blue-400 bg-white/30 backdrop-blur-sm text-slate-700 hover:text-slate-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-white/50 shadow-sm hover:shadow-lg text-center"
                >
                  {t('contactus.cta_services')}
                </Link>
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