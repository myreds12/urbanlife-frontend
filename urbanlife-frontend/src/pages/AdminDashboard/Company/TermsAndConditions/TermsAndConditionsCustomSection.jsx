import React from "react";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";

const TermsAndConditionsCustomSection = ({
  id,
  isActive,
  sectionData = {},
  sectionIndex,
  handleChange,
  onRemove,
}) => {
  const {
    section,
    title_en,
    title_id,
    content_en,
    content_id,
    notes_en = '',
    notes_id = '',
    warning_en = '',
    warning_id = '',
  } = sectionData || {};

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20 mt-6">
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={onRemove}
            className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
            aria-label="Remove section"
          >
            ×
          </button>
        </div>
        
        {/* Section */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Section <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="section"
            value={section ?? ""}
            onChange={(e) => handleChange(sectionIndex, "section", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
            placeholder="e.g. Introduction, Terms of Use"
          />
        </div>

        {/* Title (EN) */}
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
            value={title_en ?? ""}
            onChange={(e) => handleChange(sectionIndex, "title_en", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>

        {/* Title (ID) */}
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
            value={title_id ?? ""}
            onChange={(e) => handleChange(sectionIndex, "title_id", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>

        {/* Content (EN) */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Content (EN) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content_en"
            value={content_en ?? ""}
            onChange={(e) => handleChange(sectionIndex, "content_en", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
            required
          />
        </div>

        {/* Content (ID) */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Content (ID) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content_id"
            value={content_id ?? ""}
            onChange={(e) => handleChange(sectionIndex, "content_id", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
            required
          />
        </div>

        {/* Notes & Warnings Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Notes */}
          <div className="flex-1 p-4 border border-gray-200 rounded-md">
            <h4 className="text-md font-medium mb-3">Notes</h4>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-2">Notes (EN)</label>
              <textarea
                value={notes_en}
                onChange={(e) => handleChange(sectionIndex, "notes_en", e.target.value)}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-16"
                placeholder="Enter notes text (EN)"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-2">Notes (ID)</label>
              <textarea
                value={notes_id}
                onChange={(e) => handleChange(sectionIndex, "notes_id", e.target.value)}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-16"
                placeholder="Enter notes text (ID)"
              />
            </div>
          </div>

          {/* Warnings */}
          <div className="flex-1 p-4 border border-gray-200 rounded-md">
            <h4 className="text-md font-medium mb-3">Warnings</h4>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-2">Warnings (EN)</label>
              <textarea
                value={warning_en}
                onChange={(e) => handleChange(sectionIndex, "warning_en", e.target.value)}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-16"
                placeholder="Enter warning text (EN)"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-2">Warnings (ID)</label>
              <textarea
                value={warning_id}
                onChange={(e) => handleChange(sectionIndex, "warning_id", e.target.value)}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-16"
                placeholder="Enter warning text (ID)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsCustomSection;