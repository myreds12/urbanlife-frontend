import React from "react";

const PrivacyPolicyCustomSection = ({
  id,
  isActive,
  sectionData = {},
  sectionIndex,
  handleChange,
  onRemove,
}) => {
  const {
    section_number,
    title_en,
    title_id,
    content_en,
    content_id,
    notes_en,
    notes_id,
    warning_en,
    warning_id,
  } = sectionData || {};

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        {/* Section number */}
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Section Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="section_number"
            value={section_number ?? sectionIndex + 1}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            readOnly
            required
          />
          <button
            type="button"
            onClick={onRemove}
            className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
            aria-label="Remove section"
          >
            ×
          </button>
        </div>

        {/* Title EN */}
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

        {/* Title ID */}
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

        {/* Content EN */}
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

        {/* Content ID */}
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

        {/* Notes EN */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Notes (EN)
          </label>
          <textarea
            name="notes_en"
            value={notes_en ?? ""}
            onChange={(e) => handleChange(sectionIndex, "notes_en", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
          />
        </div>

        {/* Notes ID */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Notes (ID)
          </label>
          <textarea
            name="notes_id"
            value={notes_id ?? ""}
            onChange={(e) => handleChange(sectionIndex, "notes_id", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
          />
        </div>

        {/* Warning EN */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Warning (EN)
          </label>
          <textarea
            name="warning_en"
            value={warning_en ?? ""}
            onChange={(e) => handleChange(sectionIndex, "warning_en", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
          />
        </div>

        {/* Warning ID */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Warning (ID)
          </label>
          <textarea
            name="warning_id"
            value={warning_id ?? ""}
            onChange={(e) => handleChange(sectionIndex, "warning_id", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyCustomSection;