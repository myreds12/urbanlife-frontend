import React from "react";

const PrivacyPolicyContactSection = ({ id, isActive, formData, handleChange }) => {
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
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContactSection;