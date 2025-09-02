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
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md">
            Services Section
          </label>
          <button
            type="button"
            onClick={addService}
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
          >
            Add Service +
          </button>
        </div>

        {services.map((service, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 mb-4 relative"
          >
            <button
              type="button"
              onClick={() => removeService(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Title (EN) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={service.title_en}
                onChange={(e) =>
                  handleServiceChange(index, "title_en", e.target.value)
                }
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Title (ID) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={service.title_id}
                onChange={(e) =>
                  handleServiceChange(index, "title_id", e.target.value)
                }
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Description (EN) <span className="text-red-500">*</span>
              </label>
              <textarea
                value={service.description_en}
                onChange={(e) =>
                  handleServiceChange(index, "description_en", e.target.value)
                }
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Description (ID) <span className="text-red-500">*</span>
              </label>
              <textarea
                value={service.description_id}
                onChange={(e) =>
                  handleServiceChange(index, "description_id", e.target.value)
                }
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Icon <span className="text-red-500">*</span>
              </label>
              <select
                value={service.icon}
                onChange={(e) =>
                  handleServiceChange(index, "icon", e.target.value)
                }
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                required
              >
                <option value="">-- Select Icon --</option>
                {["car", "plane", "ship", "bike", "calendar", "building"].map(
                  (icon) => (
                    <option key={icon} value={icon}>
                      {icon.charAt(0).toUpperCase() + icon.slice(1)}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="mb-4 flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={service.location}
                onChange={(e) =>
                  handleServiceChange(index, "location", e.target.value)
                }
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                required
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsServicesSection;
