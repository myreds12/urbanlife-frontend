import React from "react";

const PrivacyPolicyHeroSection = ({ id, isActive, formData, handleChange }) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Title (EN) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title_en"
            value={formData.title_en}
            onChange={(e) => handleChange("title_en", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Title (ID) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title_id"
            value={formData.title_id}
            onChange={(e) => handleChange("title_id", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Subtitle (EN) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subtitle_en"
            value={formData.subtitle_en}
            onChange={(e) => handleChange("subtitle_en", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Subtitle (ID) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subtitle_id"
            value={formData.subtitle_id}
            onChange={(e) => handleChange("subtitle_id", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyHeroSection;