// src/components/AdminDashboard/AboutUs/AboutUsHeaderSection.jsx
import React from "react";

const AboutUsHeaderSection = ({ id, isActive, formData, handleChange }) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Title (EN) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
            placeholder="Enter title in English..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Title (ID) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title_id"
            value={formData.title_id}
            onChange={handleChange}
            placeholder="Masukkan judul dalam bahasa Indonesia..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Tagline (EN)
          </label>
          <input
            type="text"
            name="content_en"
            value={formData.content_en}
            onChange={handleChange}
            placeholder="Enter tagline in English..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Tagline (ID)
          </label>
          <input
            type="text"
            name="content_id"
            value={formData.content_id}
            onChange={handleChange}
            placeholder="Masukkan tagline dalam bahasa Indonesia..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsHeaderSection;