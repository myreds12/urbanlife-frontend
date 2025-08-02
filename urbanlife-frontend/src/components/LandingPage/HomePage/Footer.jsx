import React, { useState } from 'react';


const blogPosts = [
  { title: "Ubud Art Market ", slug: "ubud-art-market" },
  { title: "Padang Padang Beach ", slug: "padang-padang-beach" },
  { title: "Garuda Wisnu Kencana Cultural Park ", slug: "garuda-wisnu-kencana" },
  { title: "Barong Dance ", slug: "barong-dance" },
  { title: "Banjar Hot Spring ", slug: "banjar-hot-spring" },
  { title: "Ubud Monkey Forest ", slug: "ubud-monkey-forest" },
  { title: "Jatiluwih Rice Terraces ", slug: "jatiluwih-rice-terraces" },
  { title: "Tanah Lot Temple ", slug: "tanah-lot-temple" },
  { title: "Batur Volcano View  ", slug: "batur-volcano" },
  { title: "Tirta Gangga Water Palace ", slug: "tirta-gangga" },
  { title: "Water Sports at Nusa Dua ", slug: "nusa-dua-water-sports" },
  { title: "Tegenungan Waterfall ", slug: "tegenungan-waterfall" },
];
const Footer = () => {
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
                ${companyColorIndex === 0 ? 'hover:text-blue-300 hover:border-blue-300' : ''}
                ${companyColorIndex === 1 ? 'hover:text-purple-300 hover:border-purple-300' : ''}
                ${companyColorIndex === 2 ? 'hover:text-pink-300 hover:border-pink-300' : ''}
                ${companyColorIndex === 3 ? 'hover:text-green-300 hover:border-green-300' : ''}
                ${companyColorIndex === 4 ? 'hover:text-orange-300 hover:border-orange-300' : ''}
                ${companyColorIndex === 5 ? 'hover:text-red-300 hover:border-red-300' : ''}
                ${companyColorIndex === 6 ? 'hover:text-cyan-300 hover:border-cyan-300' : ''}
                ${companyColorIndex === 7 ? 'hover:text-yellow-300 hover:border-yellow-300' : ''}
              `}
            >
              COMPANY
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full
                ${companyColorIndex === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : ''}
                ${companyColorIndex === 1 ? 'bg-gradient-to-r from-purple-400 to-purple-600' : ''}
                ${companyColorIndex === 2 ? 'bg-gradient-to-r from-pink-400 to-pink-600' : ''}
                ${companyColorIndex === 3 ? 'bg-gradient-to-r from-green-400 to-green-600' : ''}
                ${companyColorIndex === 4 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : ''}
                ${companyColorIndex === 5 ? 'bg-gradient-to-r from-red-400 to-red-600' : ''}
                ${companyColorIndex === 6 ? 'bg-gradient-to-r from-cyan-400 to-cyan-600' : ''}
                ${companyColorIndex === 7 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : ''}
              `}></span>
            </button>
            <ul className="space-y-3">
              <li><a href="/AboutUs" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/PrivacyPolicy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/TermsAndConditions" className="text-gray-300 hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="/ContactUs" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <button 
              onClick={handleServicesClick}
              onMouseEnter={handleServicesHover}
              className={`text-lg font-semibold mb-6 text-white transition-all duration-300 cursor-pointer text-left w-full pb-2 relative group
                ${servicesColorIndex === 0 ? 'hover:text-blue-300 hover:border-blue-300' : ''}
                ${servicesColorIndex === 1 ? 'hover:text-purple-300 hover:border-purple-300' : ''}
                ${servicesColorIndex === 2 ? 'hover:text-pink-300 hover:border-pink-300' : ''}
                ${servicesColorIndex === 3 ? 'hover:text-green-300 hover:border-green-300' : ''}
                ${servicesColorIndex === 4 ? 'hover:text-orange-300 hover:border-orange-300' : ''}
                ${servicesColorIndex === 5 ? 'hover:text-red-300 hover:border-red-300' : ''}
                ${servicesColorIndex === 6 ? 'hover:text-cyan-300 hover:border-cyan-300' : ''}
                ${servicesColorIndex === 7 ? 'hover:text-yellow-300 hover:border-yellow-300' : ''}
              `}
            >
              SERVICES
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full
                ${servicesColorIndex === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : ''}
                ${servicesColorIndex === 1 ? 'bg-gradient-to-r from-purple-400 to-purple-600' : ''}
                ${servicesColorIndex === 2 ? 'bg-gradient-to-r from-pink-400 to-pink-600' : ''}
                ${servicesColorIndex === 3 ? 'bg-gradient-to-r from-green-400 to-green-600' : ''}
                ${servicesColorIndex === 4 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : ''}
                ${servicesColorIndex === 5 ? 'bg-gradient-to-r from-red-400 to-red-600' : ''}
                ${servicesColorIndex === 6 ? 'bg-gradient-to-r from-cyan-400 to-cyan-600' : ''}
                ${servicesColorIndex === 7 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : ''}
              `}></span>
            </button>
            <ul className="space-y-3">
              <li><a href="/DayTour" className="text-gray-300 hover:text-white transition-colors">Day Tours</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Bali Airport Transfer Service</a></li>
              <li><a href="/unit-car" className="text-gray-300 hover:text-white transition-colors">Car Rental</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Bali Motorbike Rental</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Transportation to/from Sanur Pier</a></li>
            </ul>
          </div>


          {/* Categories Section */}
          <div>
            <button 
              onClick={handleCategoriesClick}
              onMouseEnter={handleCategoriesHover}
              className={`text-lg font-semibold mb-6 text-white transition-all duration-300 cursor-pointer text-left w-full pb-2 relative group
                ${categoriesColorIndex === 0 ? 'hover:text-blue-300 hover:border-blue-300' : ''}
                ${categoriesColorIndex === 1 ? 'hover:text-purple-300 hover:border-purple-300' : ''}
                ${categoriesColorIndex === 2 ? 'hover:text-pink-300 hover:border-pink-300' : ''}
                ${categoriesColorIndex === 3 ? 'hover:text-green-300 hover:border-green-300' : ''}
                ${categoriesColorIndex === 4 ? 'hover:text-orange-300 hover:border-orange-300' : ''}
                ${categoriesColorIndex === 5 ? 'hover:text-red-300 hover:border-red-300' : ''}
                ${categoriesColorIndex === 6 ? 'hover:text-cyan-300 hover:border-cyan-300' : ''}
                ${categoriesColorIndex === 7 ? 'hover:text-yellow-300 hover:border-yellow-300' : ''}
              `}
            >
              CATEGORIES
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full
                ${categoriesColorIndex === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : ''}
                ${categoriesColorIndex === 1 ? 'bg-gradient-to-r from-purple-400 to-purple-600' : ''}
                ${categoriesColorIndex === 2 ? 'bg-gradient-to-r from-pink-400 to-pink-600' : ''}
                ${categoriesColorIndex === 3 ? 'bg-gradient-to-r from-green-400 to-green-600' : ''}
                ${categoriesColorIndex === 4 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : ''}
                ${categoriesColorIndex === 5 ? 'bg-gradient-to-r from-red-400 to-red-600' : ''}
                ${categoriesColorIndex === 6 ? 'bg-gradient-to-r from-cyan-400 to-cyan-600' : ''}
                ${categoriesColorIndex === 7 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : ''}
              `}></span>
            </button>
            <ul className="space-y-3">
              <li><a href="ubud-art-market" className="text-gray-300 hover:text-white transition-colors">Art Market</a></li>
              <li><a href="padang-padang-beach" className="text-gray-300 hover:text-white transition-colors">Beach</a></li>
              <li><a href="garuda-wisnu-kencana" className="text-gray-300 hover:text-white transition-colors">Cultural Park</a></li>
              <li><a href="barong-dance" className="text-gray-300 hover:text-white transition-colors">Dance</a></li>
              <li><a href="banjar-hot-spring" className="text-gray-300 hover:text-white transition-colors">Hot Spring</a></li>
              <li><a href="ubud-monkey-forest" className="text-gray-300 hover:text-white transition-colors">Monkey Forest</a></li>
              <li><a href="jatiluwih-rice-terraces" className="text-gray-300 hover:text-white transition-colors">Rice Terraces</a></li>
              <li><a href="tanah-lot-temple" className="text-gray-300 hover:text-white transition-colors">Temple</a></li>
              <li><a href="batur-volcano" className="text-gray-300 hover:text-white transition-colors">Volcano</a></li>
              <li><a href="tirta-gangga" className="text-gray-300 hover:text-white transition-colors">Water Palace</a></li>
              <li><a href="nusa-dua-water-sports" className="text-gray-300 hover:text-white transition-colors">Water Sports</a></li>
              <li><a href="tegenungan-waterfall" className="text-gray-300 hover:text-white transition-colors">Waterfall</a></li>
            </ul>
          </div>

          {/* Blog Post Section */}
          <div>
            <button 
              onClick={handleBlogPostClick}
              onMouseEnter={handleBlogHover}
              className={`text-lg font-semibold mb-6 text-white transition-all duration-300 cursor-pointer text-left w-full pb-2 relative group
                ${blogColorIndex === 0 ? 'hover:text-blue-300 hover:border-blue-300' : ''}
                ${blogColorIndex === 1 ? 'hover:text-purple-300 hover:border-purple-300' : ''}
                ${blogColorIndex === 2 ? 'hover:text-pink-300 hover:border-pink-300' : ''}
                ${blogColorIndex === 3 ? 'hover:text-green-300 hover:border-green-300' : ''}
                ${blogColorIndex === 4 ? 'hover:text-orange-300 hover:border-orange-300' : ''}
                ${blogColorIndex === 5 ? 'hover:text-red-300 hover:border-red-300' : ''}
                ${blogColorIndex === 6 ? 'hover:text-cyan-300 hover:border-cyan-300' : ''}
                ${blogColorIndex === 7 ? 'hover:text-yellow-300 hover:border-yellow-300' : ''}
              `}
            >
              BLOG POST
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full
                ${blogColorIndex === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : ''}
                ${blogColorIndex === 1 ? 'bg-gradient-to-r from-purple-400 to-purple-600' : ''}
                ${blogColorIndex === 2 ? 'bg-gradient-to-r from-pink-400 to-pink-600' : ''}
                ${blogColorIndex === 3 ? 'bg-gradient-to-r from-green-400 to-green-600' : ''}
                ${blogColorIndex === 4 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : ''}
                ${blogColorIndex === 5 ? 'bg-gradient-to-r from-red-400 to-red-600' : ''}
                ${blogColorIndex === 6 ? 'bg-gradient-to-r from-cyan-400 to-cyan-600' : ''}
                ${blogColorIndex === 7 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : ''}
              `}></span>
            </button>
            <ul className="space-y-3">
              {blogPosts.map((post, index) => (
                <li key={index}>
                  <a href={`/${post.slug}`} className="text-gray-300 hover:text-white transition-colors">
                    {post.title}
                  </a>
                </li>
              ))}
            </ul> 
          </div>


          {/* Contact Section */}
          <div>
            <div className="mb-8">
              <div className="bg-white text-slate-900 px-5 py-2 rounded inline-block mb-4">
                <img src="/images/All/Logo.png" alt="Urbanlife Logo" className="h-10" />
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">Jakarta Selatan</p>
                <p className="text-gray-300">Indonesia</p>
                <p className="text-gray-300">0821 - 2222 - 8888</p>
                <p className="text-gray-300">support@urbanlife.id</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-6 mb-3">
              {/* TikTok */}
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/urban.life.id/" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </a>
            </div>

            <h3 className="text-lg font-semibold mb-2">Payment Partner</h3>
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