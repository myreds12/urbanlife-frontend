// src/components/AdminDashboard/AboutUs/AboutUsServicesSection.jsx
import React from "react";

const AboutUsServicesSection = ({
  id,
  isActive,
  services,
  handleServiceChange,
  addService,
  removeService,
}) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Services</h3>
          <button
            type="button"
            onClick={addService}
            className="px-3 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Add Service
          </button>
        </div>
        {services.map((service, index) => (
          <div key={index} className="border-t pt-4 mt-4">
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Service Title (EN)
              </label>
              <input
                type="text"
                value={service.title_en}
                onChange={(e) => handleServiceChange(index, "title_en", e.target.value)}
                placeholder="Enter service title in English..."
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Service Title (ID)
              </label>
              <input
                type="text"
                value={service.title_id}
                onChange={(e) => handleServiceChange(index, "title_id", e.target.value)}
                placeholder="Masukkan judul layanan dalam bahasa Indonesia..."
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Description (EN)
              </label>
              <textarea
                value={service.description_en}
                onChange={(e) => handleServiceChange(index, "description_en", e.target.value)}
                placeholder="Enter service description in English..."
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
                rows="3"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Description (ID)
              </label>
              <textarea
                value={service.description_id}
                onChange={(e) => handleServiceChange(index, "description_id", e.target.value)}
                placeholder="Masukkan deskripsi layanan dalam bahasa Indonesia..."
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
                rows="3"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Icon
              </label>
              <select
                value={service.icon}
                onChange={(e) => handleServiceChange(index, "icon", e.target.value)}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
              >
                <option value="">Select an icon</option>
                <option value="car">Car</option>
                <option value="plane">Plane</option>
                <option value="ship">Ship</option>
                <option value="bike">Bike</option>
              </select>
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Location
              </label>
              <input
                type="text"
                value={service.location}
                onChange={(e) => handleServiceChange(index, "location", e.target.value)}
                placeholder="Enter service location..."
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
              />
            </div>
            <button
              type="button"
              onClick={() => removeService(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsServicesSection;