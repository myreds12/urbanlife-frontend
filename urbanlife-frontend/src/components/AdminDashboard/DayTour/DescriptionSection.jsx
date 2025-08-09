import React from "react";

const DescriptionSection = ({
  id,
  isActive,
  formData,
  content,
  onChangeContent,
  handleChange,
  locations,
  category,
  type,
}) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="mb-4 flex items-center ">
          <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
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

        {type === "daytour" ? (
          <>
            <div className="flex items-center ">
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

            <div className="flex items-center mt-5">
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
                <option value="">-- Pilih Kategori --</option>
                {category && category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center mt-5">
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
                placeholder="e.g. 1 - 4 jam/hours"
                required
              />
            </div>
          </>
        ) : type === "rentcar" ? (
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
                name="type"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
              />
            </div>
          
          </>
        ) : (
          type === "accommodation" && (
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
                <select
                  name="tipe"
                  value={formData.tipe}
                  onChange={handleChange}
                  required
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                >
                  <option value="hotel">Hotel</option>
                  <option value="eco_lodge">Eco Lodge</option>
                  <option value="guest_house">Guest House</option>
                </select>
              </div>
            </>
          )
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