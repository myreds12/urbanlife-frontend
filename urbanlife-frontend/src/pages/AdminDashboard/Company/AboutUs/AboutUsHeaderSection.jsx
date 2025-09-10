// src/components/AdminDashboard/AboutUs/AboutUsHeaderSection.jsx
import React from "react";

const AboutUsHeaderSection = ({ id, isActive, formData, handleChange }) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-md shadow-md ">
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
                  Title (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleChange}
                  placeholder="Enter title in English..."
                  className="w-full py-1 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow"
                  required
                />
              </div>
            {/* tagline -en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tagline (EN)
                </label>
                <input
                  type="text"
                  name="subtitle_en"
                  value={formData.subtitle_en}
                  onChange={handleChange}
                  placeholder="Enter tagline in English..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
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
              Indonesia Content
            </h3>

            <div className="space-y-4">
            {/* title - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_id"
                  value={formData.title_id}
                  onChange={handleChange}
                  placeholder="Masukkan judul dalam bahasa Indonesia..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
            {/* tagline - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tagline (ID)
                </label>
                <input
                  type="text"
                  name="subtitle_id"
                  value={formData.subtitle_id}
                  onChange={handleChange}
                  placeholder="Masukkan tagline dalam bahasa Indonesia..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHeaderSection;
