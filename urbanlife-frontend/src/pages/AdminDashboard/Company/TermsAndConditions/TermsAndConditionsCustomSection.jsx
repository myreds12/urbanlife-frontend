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
    notes = [],
    warning = [],
  } = sectionData || {};

  // Notes
  const addNote = () => {
    const newNote = { en: "", id: "" };
    const updatedNotes = [...notes, newNote];
    handleChange(sectionIndex, "notes", updatedNotes);
  };

  const updateNote = (noteIndex, field, value) => {
    const updatedNotes = notes.map((note, i) =>
      i === noteIndex ? { ...note, [field]: value } : note
    );
    handleChange(sectionIndex, "notes", updatedNotes);
  };

  const removeNote = (noteIndex) => {
    const updatedNotes = notes.filter((_, i) => i !== noteIndex);
    handleChange(sectionIndex, "notes", updatedNotes);
  };

  // Warnings
  const addWarning = () => {
    const newWarning = { en: "", id: "" };
    const updatedWarning = [...warning, newWarning];
    handleChange(sectionIndex, "warning", updatedWarning);
  };

  const updateWarning = (warningIndex, field, value) => {
    const updatedWarning = warning.map((warn, i) =>
      i === warningIndex ? { ...warn, [field]: value } : warn
    );
    handleChange(sectionIndex, "warning", updatedWarning);
  };

  const removeWarning = (warningIndex) => {
    const updatedWarning = warning.filter((_, i) => i !== warningIndex);
    handleChange(sectionIndex, "warning", updatedWarning);
  };

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        {/* Section */}
        <div className="mb-4 flex items-center justify-between">
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

        {/* Notes */}
        {notes.map((note, noteIndex) => (
          <div key={noteIndex} className="mb-4">
            <div className="flex items-center justify-between">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Note {noteIndex + 1} (EN)
              </label>
              <textarea
                value={note.en}
                onChange={(e) => updateNote(noteIndex, "en", e.target.value)}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
              />
              <button
                type="button"
                onClick={() => removeNote(noteIndex)}
                className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
                aria-label="Remove note"
              >
                ×
              </button>
            </div>
            <div className="mt-2 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Note {noteIndex + 1} (ID)
              </label>
              <textarea
                value={note.id}
                onChange={(e) => updateNote(noteIndex, "id", e.target.value)}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
              />
            </div>
          </div>
        ))}

        {/* Add Notes Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={addNote}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Add Notes +
          </button>
        </div>

        {/* Warnings */}
        {warning.map((warn, warningIndex) => (
          <div key={warningIndex} className="mb-4">
            <div className="flex items-center justify-between">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Warning {warningIndex + 1} (EN)
              </label>
              <textarea
                value={warn.en}
                onChange={(e) => updateWarning(warningIndex, "en", e.target.value)}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
              />
              <button
                type="button"
                onClick={() => removeWarning(warningIndex)}
                className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
                aria-label="Remove warning"
              >
                ×
              </button>
            </div>
            <div className="mt-2 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Warning {warningIndex + 1} (ID)
              </label>
              <textarea
                value={warn.id}
                onChange={(e) => updateWarning(warningIndex, "id", e.target.value)}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
              />
            </div>
          </div>
        ))}

        {/* Add Warning Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={addWarning}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Add Warning +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsCustomSection;
