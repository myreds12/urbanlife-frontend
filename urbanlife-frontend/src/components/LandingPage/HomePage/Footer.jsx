import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-6 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-40 mb-12">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">COMPANY</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Day Tours</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Bali Airport Transfer Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Car Rental</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Bali Motorbike Rental</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Transportation to/from Sanur Pier</a></li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">CATEGORIES</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Art Market</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Beach</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cultural Park</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hot Spring</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Monkey Forest</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Rice Terraces</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Temple</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Volcano</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Water Palace</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Water Sports</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Waterfall</a></li>
            </ul>
          </div>

          {/* Blog Post Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">BLOG POST</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ubud Art Market - time to shop for local souvenirs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Padang Padang Beach - a hidden beach</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Garuda Wisnu Kencana Cultural Park - a center of cultural activities</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Barong Dance - a battle between good and evil</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Banjar Hot Spring - a great spot to relax</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ubud Monkey Forest - a sacred monkey forest</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Jatiluwih Rice Terraces - an introduction to Subak</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tanah Lot Temple - a guardian snake underneath</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Batur Volcano View and Lake - hike for the sunrise</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tirta Gangga Water Palace - a water garden sanctuary</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Water sports at Nusa Dua - your holiday activities</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tegenungan Waterfall - time to freshen up</a></li>
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
            <div className="flex space-x-4 mb-3">
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
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
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

        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            2025 Copyright Urbanlife • All rights reserved • Made in Jakarta
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
