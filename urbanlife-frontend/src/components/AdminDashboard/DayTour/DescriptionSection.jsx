import React from 'react';

const DescriptionSection = ({
  id,
  isActive,
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div id={id} className={isActive ? 'block' : 'hidden'}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "170px" }}>
              Daytour package name
            </label>            
            <input
              type="text"
              name="packageName"
              value={formData.packageName}
              onChange={handleChange}
              className="py-1 px-3 w-full rounded-md border border-gray-300 focus:outline-cyan-600"
            />
          </div>

          <div className="flex space-x-4 mt-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">English</label>
              <div className="mt-3">
                <span className="text-red-500 mr-1">*</span> Description
              </div>
              <textarea
                name="englishDescription"
                value={formData.englishDescription}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md h-60 border border-gray-300 focus:outline-cyan-600"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Indonesia</label>
              <div className="mt-3">
                <span className="text-red-500 mr-1">*</span> Description
              </div>
              <textarea
                name="indonesiaDescription"
                value={formData.indonesiaDescription}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded-md h-60 border border-gray-300 focus:outline-cyan-600"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-cyan-700">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
              Save Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DescriptionSection;