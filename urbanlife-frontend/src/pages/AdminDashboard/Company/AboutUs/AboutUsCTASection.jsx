// src/components/AdminDashboard/AboutUs/AboutUsCTASection.jsx
import React from "react";

const AboutUsCTASection = ({ id, isActive, cta, handleCtaChange }) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-md shadow-md shadow-black/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* English Section */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              English Content
            </h3>

            <div className="space-y-4">
              {/* title - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CTA Title (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={cta.title_en}
                  onChange={handleCtaChange}
                  placeholder="Enter CTA title in English..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* desc - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (EN) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description_en"
                  value={cta.description_en}
                  onChange={handleCtaChange}
                  placeholder="Enter CTA description in English..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                />
              </div>
            </div>
          </div>



          {/* Indonesian Section */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              Indonesian Content
            </h3>

            <div className="space-y-4">
              {/* title - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CTA Title (ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_id"
                  value={cta.title_id}
                  onChange={handleCtaChange}
                  placeholder="Masukkan judul CTA dalam bahasa Indonesia..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* desc - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (ID) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description_id"
                  value={cta.description_id}
                  onChange={handleCtaChange}
                  placeholder="Masukkan deskripsi CTA dalam bahasa Indonesia..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Button Text
          </label>
          <input
            type="text"
            name="button_text"
            value={cta.button_text}
            onChange={handleCtaChange}
            placeholder="Enter button text..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Button Link
          </label>
          <input
            type="text"
            name="button_link"
            value={cta.button_link}
            onChange={handleCtaChange}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsCTASection;