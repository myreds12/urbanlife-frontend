import React from "react";

const PoliceNumberSection = ({ id, isActive, formData, handleChange }) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20 space-y-4">

        {/* Police Number */}
        <div className="flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            License Plate <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="plat_nomor"
            required
            value={formData.plat_nomor || ""}
            onChange={handleChange}
            placeholder="Enter license plate"
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
          />
        </div>

        {/* Tax Status */}
        <div className="flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Tax Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status_pajak"
            required
            value={formData.status_pajak === true ? "true" : formData.status_pajak === false ? "false" : ""}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "status_pajak",
                  value: e.target.value === "true",
                },
              })
            }
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
          >
            <option value="">Choose status</option>
            <option value="true">Active</option>
            <option value="false">Expired</option>
          </select>
        </div>

        {/* Tax Expiry Date */}
        <div className="flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Tax expiry period <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="tanggal_pajak_berakhir"
            required
            value={formData.tanggal_pajak_berakhir || ""}
            onChange={handleChange}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};



export default PoliceNumberSection;
