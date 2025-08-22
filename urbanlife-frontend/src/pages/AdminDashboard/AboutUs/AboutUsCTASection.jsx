import React from "react";

const AboutUsCTASection = ({ id, isActive, formData, handleChange }) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Section <span className="text-red-500">*</span>
          </label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="input input-bordered w-full py-1 rounded-lg border border-gray-300 focus:ring-cyan-500"
            required
          >
            <option value="">-- Choose Section --</option>
            <option value="cta">CTA</option>
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Title (EN) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
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
            onChange={handleChange}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Description (EN) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description_en"
            value={formData.description_en}
            onChange={handleChange}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Description (ID) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description_id"
            value={formData.description_id}
            onChange={handleChange}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
            Button Text
          </label>
          <input
            type="text"
            name="button_text"
            value={formData.button_text}
            onChange={handleChange}
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
            value={formData.button_link}
            onChange={handleChange}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsCTASection;