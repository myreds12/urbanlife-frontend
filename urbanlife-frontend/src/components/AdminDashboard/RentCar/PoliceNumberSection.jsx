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
            Police number
          </label>
          <input
            type="text"
            name="plat_nomor"
            value={formData.plat_nomor || ""}
            onChange={handleChange}
            placeholder="Enter police number"
            className="py-2 px-3 w-full rounded-md border border-gray-300"
          />
        </div>

        {/* Tax Status */}
        <div className="flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Tax Status
          </label>
          <select
            name="status_pajak"
            value={formData.status_pajak === true ? "true" : formData.status_pajak === false ? "false" : ""}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "status_pajak",
                  value: e.target.value === "true",
                },
              })
            }
            className="py-2 px-3 w-full rounded-md border border-gray-300"
          >
            <option value="">Choose</option>
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
            Tax expiry period
          </label>
          <input
            type="date"
            name="tanggal_pajak_berakhir"
            value={formData.tanggal_pajak_berakhir || ""}
            onChange={handleChange}
            className="py-2 px-3 w-full rounded-md border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};



export default PoliceNumberSection;
