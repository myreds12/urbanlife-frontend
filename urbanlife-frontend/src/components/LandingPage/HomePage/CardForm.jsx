import React, { useState } from "react";

const CardForm = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-4 space-y-3">
      {/* Select Country */}
      <select
        className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm"
        defaultValue=""
      >
        <option value="" disabled>
          Select country
        </option>
        {/* Tambahkan opsional country */}
      </select>

      {/* Select City */}
      <select
        className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm"
        defaultValue=""
      >
        <option value="" disabled>
          Select city
        </option>
        {/* Tambahkan opsional city */}
      </select>

      {/* Services + Date group */}
      <div className="bg-gray-100 rounded-md p-3 space-y-3">
        {/* Select Services */}
        <select
          className="w-full p-2 bg-white border-0 rounded-md text-gray-500 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select services
          </option>
          {/* Tambahkan opsional services */}
        </select>

        {/* Date fields */}
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          {/* From */}
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              From
            </label>
            <div className="relative">
              <input
                type="text"
                value={fromDate}
                readOnly
                onClick={() =>
                  document.getElementById("fromDateInput")?.showPicker()
                }
                placeholder="Select date"
                className="w-full p-2 bg-white border-0 rounded-md text-gray-600 text-sm cursor-pointer"
              />
              <input
                type="date"
                id="fromDateInput"
                className="absolute inset-0 opacity-0 cursor-pointer"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <i className="fa-solid fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          </div>

          {/* To */}
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                value={toDate}
                readOnly
                onClick={() =>
                  document.getElementById("toDateInput")?.showPicker()
                }
                placeholder="Select date"
                className="w-full p-2 bg-white border-0 rounded-md text-gray-600 text-sm cursor-pointer"
              />
              <input
                type="date"
                id="toDateInput"
                className="absolute inset-0 opacity-0 cursor-pointer"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              <i className="fa-solid fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full bg-teal-500 text-white p-2 rounded-md text-sm font-medium hover:bg-teal-600 transition">
        Search
      </button>
    </div>
  );
};

export default CardForm;
