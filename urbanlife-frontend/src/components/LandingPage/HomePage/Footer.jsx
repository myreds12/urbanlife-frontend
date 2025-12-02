import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import apiClient from '../../AdminDashboard/Utils/ApiClient/apiClient';
import toast from 'react-hot-toast';
import { useLogo } from '../../LogoFaviconManager';

const Footer = () => {
  const { t } = useTranslation();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { logo } = useLogo()
  const [contact, setContact] = useState(null)

  // Array warna-warna yang akan bergantian
  const colors = [
    { text: 'text-blue-300', border: 'border-blue-300', gradient: 'from-blue-400 to-blue-600' },
    { text: 'text-purple-300', border: 'border-purple-300', gradient: 'from-purple-400 to-purple-600' },
    { text: 'text-pink-300', border: 'border-pink-300', gradient: 'from-pink-400 to-pink-600' },
    { text: 'text-green-300', border: 'border-green-300', gradient: 'from-green-400 to-green-600' },
    { text: 'text-orange-300', border: 'border-orange-300', gradient: 'from-orange-400 to-orange-600' },
    { text: 'text-red-300', border: 'border-red-300', gradient: 'from-red-400 to-red-600' },
    { text: 'text-cyan-300', border: 'border-cyan-300', gradient: 'from-cyan-400 to-cyan-600' },
    { text: 'text-yellow-300', border: 'border-yellow-300', gradient: 'from-yellow-400 to-yellow-600' },
  ];

  const [companyColorIndex, setCompanyColorIndex] = useState(0);
  const [servicesColorIndex, setServicesColorIndex] = useState(0);
  const [categoriesColorIndex, setCategoriesColorIndex] = useState(1);
  const [blogColorIndex, setBlogColorIndex] = useState(2);

  const handleCompanyHover = () => {
    setCompanyColorIndex((prev) => (prev + 1) % colors.length);
  };

  const handleServicesHover = () => {
    setServicesColorIndex((prev) => (prev + 1) % colors.length);
  };

  const handleCategoriesHover = () => {
    setCategoriesColorIndex((prev) => (prev + 1) % colors.length);
  };

  const handleBlogHover = () => {
    setBlogColorIndex((prev) => (prev + 1) % colors.length);
  };

  const handleCompanyClick = () => {
    window.location.href = '/Company';
  };
  const handleServicesClick = () => {
    window.location.href = '/Services';
  };
  const handleCategoriesClick = () => {
    window.location.href = '/categories';
  };
  const handleBlogPostClick = () => {
    window.location.href = '/blog';
  };

  // Fetch blog data from API
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/blog', {
          params: { take: 10, page: 1 },
        });
        const { data } = response.data;
        setBlogData(data || []);
      } catch (error) {
        console.error('❌ Failed to fetch blog data:', error);
        toast.error(t('blog.error_fetch'));
        setBlogData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [t]);

  // Ekstrak kategori unik dari blogData
  const uniqueCategories = [...new Set(blogData.map(blog => blog.blog_category?.name).filter(name => name))];

  useEffect(() => {
    const fetchAboutData = async () => {
      const response = await apiClient.get("/aboutus");
      const data = response.data.data[0];
      const phoneNumber = data.AboutUsCta.button_url.split('?')[0].split('/').pop();

      setContact(phoneNumber || "/contact")
    }
    fetchAboutData()
  }, [])

  return (
    <footer className="bg-[#071C4D] text-white pt-16 pb-6 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Company Section */}
          <div>
            <button
              onClick={handleCompanyClick}
              onMouseEnter={handleCompanyHover}
              className={`text-lg font-semibold mb-6 text-white transition-all duration-300 cursor-pointer text-left w-full pb-2 relative group
                ${colors[companyColorIndex].text} ${colors[companyColorIndex].border}`}
            >
              {t('footer.company')}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full
                ${colors[companyColorIndex].gradient}`}
              ></span>
            </button>
            <ul className="space-y-3">
              <li>
                <a href="/AboutUs" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.aboutus')}
                </a>
              </li>
              <li>
                <a href="/PrivacyPolicy" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.privacypolicy')}
                </a>
              </li>
              <li>
                <a href="/TermsAndConditions" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.termsncondition')}
                </a>
              </li>
              <li>
                <a href="/ContactUs" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.contactus')}
                </a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <button
              onClick={handleServicesClick}
              onMouseEnter={handleServicesHover}
              className={`text-lg font-semibold mb-6 text-white transition-all duration-300 cursor-pointer text-left w-full pb-2 relative group
                ${colors[servicesColorIndex].text} ${colors[servicesColorIndex].border}`}
            >
              {t('footer.services')}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full
                ${colors[servicesColorIndex].gradient}`}
              ></span>
            </button>
            <ul className="space-y-3">
              <li>
                <a href="/DayTour" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.daytour')}
                </a>
              </li>
              <li>
                <a href="/unit-car" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.carrental')}
                </a>
              </li>
              <li>
                <a href="/accomodation" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.accomodation')}
                </a>
              </li>
              <li>
                <a href="/motorcycle" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.rentmotorcycle')}
                </a>
              </li>
              <li>
                <a href="/airport-shuttle" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.airportshuttle')}
                </a>
              </li>
              <li>
                <a href="/port-shuttle" className="text-gray-300 hover:text-white transition-colors">
                  {t('footer.portshuttle')}
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <button
              onClick={handleCategoriesClick}
              onMouseEnter={handleCategoriesHover}
              className={`text-lg font-semibold mb-6 text-white transition-all duration-300 cursor-pointer text-left w-full pb-2 relative group
                ${colors[categoriesColorIndex].text} ${colors[categoriesColorIndex].border}`}
            >
              {t('footer.categories')}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full
                ${colors[categoriesColorIndex].gradient}`}
              ></span>
            </button>
            <ul className="space-y-3">
              {loading ? (
                <li className="text-gray-300">{t('blog.loading')}</li>
              ) : uniqueCategories.length > 0 ? (
                uniqueCategories.map((category, index) => (
                  <li key={index}>
                    <a
                      href={`/categories?category=${category}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >{category}</a>
                  </li>
                ))
              ) : (
                <li className="text-gray-300">{t('blog.no_categories')}</li>
              )}
            </ul>
          </div>

          {/* Blog Posts Section */}
          <div>
            <button
              onClick={handleBlogPostClick}
              onMouseEnter={handleBlogHover}
              className={`text-lg font-semibold mb-6 text-white transition-all duration-300 cursor-pointer text-left w-full pb-2 relative group
                ${colors[blogColorIndex].text} ${colors[blogColorIndex].border}`}
            >
              {t('footer.blogpost')}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full
                ${colors[blogColorIndex].gradient}`}
              ></span>
            </button>
            <ul className="space-y-3">
              {loading ? (
                <li className="text-gray-300">{t('blog.loading')}</li>
              ) : blogData.length > 0 ? (
                blogData.map((blog) => (
                  <li key={blog.id}>
                    <a
                      href={`/blog/${blog.slug}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {blog.blog_content[0]?.judul || 'Untitled'}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-300">{t('blog.no_posts')}</li>
              )}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <div className="mb-8">
              <div className="bg-white text-slate-900 px-5 py-2 rounded inline-block mb-4">
                <img src={logo} alt="Urbanlife Logo" className="h-10" />
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">Jakarta Selatan</p>
                <p className="text-gray-300">Indonesia</p>
                <p className="text-gray-300">{contact}</p>
                <p className="text-gray-300"> info@urbanlife.id </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">{t('footer.followus')}</h3>
            <div className="flex space-x-6 mb-3">
              <a
                href="https://www.facebook.com/share/16g9Syc76Q/?mibextid=wwXIfr"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook Urbanlife"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/urban.life.id/"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram Urbanlife"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </a>
            </div>

            <h3 className="text-lg font-semibold mb-2">{t('footer.paymentpartner')}</h3>
            <div className="bg-white text-slate-900 px-6 py-2 rounded inline-block mb-4 mt-1">
              <img src="/images/All/Xendit.png" alt="Payment Partner" className="h-10" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6">
          <p className="text-center text-gray-400">
            2025 Copyright Urbanlife • All rights reserved • Made in Jakarta
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;