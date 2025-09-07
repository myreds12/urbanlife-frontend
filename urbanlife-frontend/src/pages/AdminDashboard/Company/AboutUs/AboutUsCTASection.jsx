// src/components/AdminDashboard/AboutUs/AboutUsCTASection.jsx
import React from "react";

const AboutUsCTASection = ({ id, isActive, cta, handleCtaChange }) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            CTA Title (EN)
          </label>
          <input
            type="text"
            name="title_en"
            value={cta.title_en}
            onChange={handleCtaChange}
            placeholder="Enter CTA title in English..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            CTA Title (ID)
          </label>
          <input
            type="text"
            name="title_id"
            value={cta.title_id}
            onChange={handleCtaChange}
            placeholder="Masukkan judul CTA dalam bahasa Indonesia..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Description (EN)
          </label>
          <textarea
            name="description_en"
            value={cta.description_en}
            onChange={handleCtaChange}
            placeholder="Enter CTA description in English..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
            rows="3"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Description (ID)
          </label>
          <textarea
            name="description_id"
            value={cta.description_id}
            onChange={handleCtaChange}
            placeholder="Masukkan deskripsi CTA dalam bahasa Indonesia..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
            rows="3"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Button Text
          </label>
          <input
            type="text"
            name="button_text"
            value={cta.button_text}
            onChange={handleCtaChange}
            placeholder="Enter button text..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Button Link
          </label>
          <input
            type="text"
            name="button_link"
            value={cta.button_link}
            onChange={handleCtaChange}
            placeholder="Enter button URL (e.g., /contact)..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsCTASection;