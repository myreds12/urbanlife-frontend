import React, { useState } from 'react';

const PriceSection = ({ id, isActive }) => {
  const [priceData, setPriceData] = useState({
    startFrom: 'Rp 1.200.000',
    indonesiaDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPriceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Price submitted:', priceData);
  };

  return (
    <div id={id} className={isActive ? 'block' : 'hidden'}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
            <div className="mb-4 mt-20 inline-flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 border border-gray-900 px-4 py-[6px]">
              Start from
            </span>
            <input
              type="text"
              name="startFrom"
              value={priceData.startFrom}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-[6px] text-sm"
            />
          </div>

            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Indonesia</h4>
              <div className="mb-4">
                <div className="mt-3 text-sm mb-2">
                  <span className="text-red-500 mr-1">*</span> Description
                </div>
                <textarea
                  name="indonesiaDescription"
                  value={priceData.indonesiaDescription}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md h-40"
                />
              </div>
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

export default PriceSection;