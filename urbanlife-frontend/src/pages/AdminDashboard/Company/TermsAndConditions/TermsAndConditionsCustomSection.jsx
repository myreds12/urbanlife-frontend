import React from "react";

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

  // Notes handlers
  const updateNote = (lang, value) => {
    handleChange(sectionIndex, `notes_${lang}`, value);
  };

  // Warnings handlers
  const updateWarning = (lang, value) => {
    handleChange(sectionIndex, `warning_${lang}`, value);
  };

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
            onChange={(e) =>
              handleChange(sectionIndex, "section", e.target.value)
            }
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
            placeholder="e.g. Introduction, Terms of Use"
          />
        </div>

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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={title_en ?? ""}
                  onChange={(e) =>
                    handleChange(sectionIndex, "title_en", e.target.value)
                  }
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content (EN) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content_en"
                  value={content_en ?? ""}
                  onChange={(e) =>
                    handleChange(sectionIndex, "content_en", e.target.value)
                  }
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                />
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-600">
                  Notes (EN)
                </h4>
                <div className="flex items-start">
                  <textarea
                    value={notes_en}
                    onChange={(e) => updateNote("en", e.target.value)}
                    className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-20"
                    placeholder="Notes (EN)"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-600">
                  Warnings (EN)
                </h4>
                <div className="flex items-start">
                  <textarea
                    value={warning_en}
                    onChange={(e) => updateWarning("en", e.target.value)}
                    className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-20"
                    placeholder="Warning (EN)"
                  />
                </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_id"
                  value={title_id ?? ""}
                  onChange={(e) =>
                    handleChange(sectionIndex, "title_id", e.target.value)
                  }
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content (ID) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content_id"
                  value={content_id ?? ""}
                  onChange={(e) =>
                    handleChange(sectionIndex, "content_id", e.target.value)
                  }
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                />
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-600">
                  Notes (ID)
                </h4>
                <div className="flex items-start">
                  <textarea
                    value={notes_id}
                    onChange={(e) => updateNote("id", e.target.value)}
                    className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-20"
                    placeholder="Notes (ID)"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-600">
                  Warnings (ID)
                </h4>
                <div className="flex items-start">
                  <textarea
                    value={warning_id}
                    onChange={(e) => updateWarning("id", e.target.value)}
                    className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-20"
                    placeholder="Warning (ID)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsCustomSection;