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
    title,
    content,
    notes = [],
    warning = [],
  } = sectionData || {};

  // Notes
  const addNote = () => {
    const newNote = { text: "" };
    const updatedNotes = [...notes, newNote];
    handleChange(sectionIndex, "notes", updatedNotes);
  };

  const updateNote = (noteIndex, value) => {
    const updatedNotes = notes.map((note, i) =>
      i === noteIndex ? { ...note, text: value } : note
    );
    handleChange(sectionIndex, "notes", updatedNotes);
  };

  const removeNote = (noteIndex) => {
    const updatedNotes = notes.filter((_, i) => i !== noteIndex);
    handleChange(sectionIndex, "notes", updatedNotes);
  };

  // Warnings
  const addWarning = () => {
    const newWarning = { text: "" };
    const updatedWarning = [...warning, newWarning];
    handleChange(sectionIndex, "warning", updatedWarning);
  };

  const updateWarning = (warningIndex, value) => {
    const updatedWarning = warning.map((warn, i) =>
      i === warningIndex ? { ...warn, text: value } : warn
    );
    handleChange(sectionIndex, "warning", updatedWarning);
  };

  const removeWarning = (warningIndex) => {
    const updatedWarning = warning.filter((_, i) => i !== warningIndex);
    handleChange(sectionIndex, "warning", updatedWarning);
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
            onChange={(e) => handleChange(sectionIndex, "section", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
            placeholder="e.g. Introduction, Terms of Use"
          />
        </div>

        {/* Title */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={title ?? ""}
            onChange={(e) => handleChange(sectionIndex, "title", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>

        {/* Content */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            value={content ?? ""}
            onChange={(e) => handleChange(sectionIndex, "content", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
            required
          />
        </div>

        {/* Notes & Warnings Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Notes */}
          <div className="flex-1 p-4 border border-gray-200 rounded-md">
            <h4 className="text-md font-medium mb-3">Notes</h4>
            {notes.map((note, noteIndex) => (
              <div key={noteIndex} className="flex items-start mb-3">
                <textarea
                  value={note.text}
                  onChange={(e) => updateNote(noteIndex, e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-16 mr-2"
                  placeholder="Enter note text"
                />
                <button
                  type="button"
                  onClick={() => removeNote(noteIndex)}
                  className="text-red-500 hover:text-red-700 font-bold"
                  aria-label="Remove note"
                >
                  &times;
                </button>
              </div>
            ))}
            <Button 
              variant="secondary"
              size="sm"
              onClick={addNote} 
              className="w-full"
            >
              Add Note +
            </Button>
          </div>

          {/* Warnings */}
          <div className="flex-1 p-4 border border-gray-200 rounded-md">
            <h4 className="text-md font-medium mb-3">Warnings</h4>
            {warning.map((warn, warningIndex) => (
              <div key={warningIndex} className="flex items-start mb-3">
                <textarea
                  value={warn.text}
                  onChange={(e) => updateWarning(warningIndex, e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-16 mr-2"
                  placeholder="Enter warning text"
                />
                <button
                  type="button"
                  onClick={() => removeWarning(warningIndex)}
                  className="text-red-500 hover:text-red-700 font-bold"
                  aria-label="Remove warning"
                >
                  &times;
                </button>
              </div>
            ))}
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={addWarning} 
              className="w-full"
            >
              Add Warning +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsCustomSection;