import React, { useState } from "react";

const ContactForm = ({ id, isActive, formConfig, onChange }) => {
  const [fieldType, setFieldType] = useState("text");
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const addField = () => {
    if (!fieldLabel.trim() || !fieldName.trim()) return;

    const newField = {
      name: fieldName,
      type: fieldType,
      label: fieldLabel,
      required: isRequired,
    };

    const updatedConfig = {
      ...formConfig,
      fields: [...(formConfig.fields || []), newField],
    };

    onChange(updatedConfig);
    setFieldLabel("");
    setFieldName("");
    setIsRequired(false);
  };

  const removeField = (index) => {
    const updatedFields = [...formConfig.fields];
    updatedFields.splice(index, 1);

    onChange({
      ...formConfig,
      fields: updatedFields,
    });
  };

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="mb-6 rounded-md">
          {/* header - checkbox - addnew */}
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium text-gray-800">
              Add New Field
            </h4>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isRequired}
                  onChange={(e) => setIsRequired(e.target.checked)}
                  className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-600 mr-2"
                />
                <span className="text-sm text-gray-700">Required</span>
              </label>
              <button
                type="button"
                onClick={addField}
                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 text-sm"
              >
                Add Field
              </button>
            </div>
          </div>

          {/* type - label - field */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Type
              </label>
              <select
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="textarea">Text Area</option>
                <option value="number">Number</option>
                <option value="tel">Phone</option>
                <option value="select">Dropdown</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Label
              </label>
              <input
                type="text"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                placeholder="e.g., Full Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Name
              </label>
              <input
                type="text"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                placeholder="e.g., full_name"
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-md font-medium text-gray-800 mb-3">
            Form Fields
          </h4>

          {formConfig.fields && formConfig.fields.length > 0 ? (
            <div className="space-y-3">
              {formConfig.fields.map((field, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-4 bg-gray-100 shadow-md rounded-md"
                >
                  <div>
                    <span className="font-medium">{field.label}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({field.type})
                    </span>
                    {field.required && (
                      <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="text-red-600 border border-red-400 px-2 py-1 rounded-md hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No fields added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;