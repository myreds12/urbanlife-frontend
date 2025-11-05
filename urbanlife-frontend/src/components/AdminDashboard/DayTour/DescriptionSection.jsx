import React from "react";

const DescriptionSection = ({
  id,
  isActive,
  formData,
  content,
  onChangeContent,
  handleChange,
  locations,
  category = [], // ✅ Default value untuk category
  guides = [], // ✅ Default value untuk guides
  drivers = [], // ✅ Default value untuk drivers
  type,
  type_akomodasi
}) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        {/* Toggle Top Attraction */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <label
              className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
              style={{ minWidth: "190px" }}
            >
              Top Attraction
            </label>
            <button
              type="button"
              onClick={() =>
                handleChange({
                  target: {
                    name: "top_attraction",
                    value: !formData.top_attraction,
                  },
                })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.top_attraction ? "bg-cyan-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.top_attraction ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="ml-3 text-sm text-gray-600">
              {formData.top_attraction ? "Yes" : "No"}
            </span>
          </div>
          { type !== "daytour" 
          ? <div className="flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Status
              </label>
              <button
                type="button"
                onClick={() =>
                  handleChange({
                    target: {
                      name: "status",
                      value: !formData.status,
                    },
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.status ? "bg-cyan-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.status ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="ml-3 text-sm text-gray-600">
                {formData.status ? "Active" : "Inactive"}
              </span>
            </div>
          : <></> }
        </div>

        <div className="mb-4 flex items-center ">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Select Location <span className="text-red-500">*</span>
          </label>
          <select
            name="lokasi_id"
            value={formData.lokasi_id}
            onChange={handleChange}
            className="input input-bordered w-full py-1 rounded-lg border border-gray-300 focus:ring-cyan-500"
            required
          >
            <option value="">-- Choose location --</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.nama}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ PERBAIKAN: Conditional rendering yang lebih jelas */}
        {type === "daytour" && (
          <>
            {/* Baris 1: Guide + Package Name */}
            {/* <div className="flex items-center gap-5 mb-5"> */}
              {/* <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700">
                  Guide
                </label>
                <select
                  name="guide_id"
                  value={formData.guide_id || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                >
                  <option value="">-- Pilih Guide --</option>
                  {guides.map((guide) => (
                    <option key={guide.id} value={guide.id}>
                      {guide.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}

              <div className="flex items-center mb-5">
                <label
                  className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
                >
                  Daytour package name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                />
              </div>
            

            {/* Baris 2: Category */}
            <div className="flex items-center mb-5">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Select Guide <span className="text-red-500">*</span>
              </label>
              <select
                name="guide_id"
                value={formData.guide_id || ""}
                onChange={handleChange}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                required
              >
                <option value="">-- Choose Guide --</option>
                {guides.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center mb-5">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Select Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                value={formData.category_id || ""}
                onChange={handleChange}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                required
              >
                <option value="">-- Choose category --</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Baris 3: Duration */}
            <div className="flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="durasi"
                value={formData.durasi || ""}
                onChange={handleChange}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                placeholder="e.g. 1 - 4 hours"
                required
              />
            </div>
          </>
        )}

        {type === "rentcar" && (
          <>
            <div className="flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Unit Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
              />
            </div>

            <div className="flex items-center mt-5">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
              />
            </div>

            <div className="flex items-center mt-5">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Passenger Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kapasitas"
                value={formData.kapasitas}
                onChange={handleChange}
                required
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
              />
            </div>

            {/* ✅ Select Driver */}
            <div className="flex items-center mt-5">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Driver <span className="text-red-500">*</span>
              </label>
              <select
                name="driver_id"
                value={formData.driver_id || ""}
                onChange={handleChange}
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                required
              >
                <option value="">-- Choose Driver --</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.nama} - {driver.no_telepon}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {type === "accommodation" && (
          <>
            <div className="flex items-center">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Unit Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
              />
            </div>

            <div className="flex items-center mt-5">
              <label
                className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "190px" }}
              >
                Type <span className="text-red-500">*</span>
              </label>
              {/* <select
                name="tipe"
                value={formData.tipe}
                onChange={handleChange}
                required
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
              >
                <option value="hotel">Hotel</option>
                <option value="eco_lodge">Eco Lodge</option>
                <option value="guest_house">Guest House</option>
              </select> */}
              <select
                name="type_akomodasi_id"
                value={formData.type_akomodasi_id}
                onChange={handleChange}
                className="input input-bordered w-full py-1 rounded-lg border border-gray-300 focus:ring-cyan-500"
                required
              >
                <option value="">-- Choose Type --</option>
                {type_akomodasi.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="flex space-x-4 mt-6">
          {content.map((item, index) => (
            <div key={item.bahasa} className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                {item.bahasa}
              </label>
              <div className="mt-2">
                <span className="text-red-500 mr-1">*</span>{" "}
                {item.bahasa === "ENGLISH" ? "Description" : "Deskripsi"}
              </div>
              <textarea
                value={item.deskripsi}
                name="deskripsi"
                onChange={(e) =>
                onChangeContent(index, "deskripsi", e.target.value)
                }
                className="mt-1 p-2 w-full rounded-md h-60 border border-gray-300 focus:ring-cyan-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
