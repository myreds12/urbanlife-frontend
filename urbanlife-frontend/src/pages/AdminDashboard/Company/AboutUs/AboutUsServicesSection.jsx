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
      <div className="bg-white p-6 rounded-md shadow-md shadow-black/20">
        <div className="mb-4 flex items-center justify-end">
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
            className="border border-gray-200 rounded-lg p-6 mb-8 relative"
          >
            <button
              type="button"
              onClick={() => removeService(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>

            <div className="mt-5 mb-4 flex items-center">
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
                  {/* title - en */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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

                  {/* desc - en */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (EN) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={service.description_en}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "description_en",
                          e.target.value
                        )
                      }
                      className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                      required
                    />
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
                  {/* title - id */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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

                  {/* desc - id */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (ID) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={service.description_id}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "description_id",
                          e.target.value
                        )
                      }
                      className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsServicesSection;
