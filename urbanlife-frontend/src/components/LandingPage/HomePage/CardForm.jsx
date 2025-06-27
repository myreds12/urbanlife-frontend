import React, { useState } from "react";

const CardForm = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="w-[200px] sm:w-[500px] mx-auto mx-auto space-y-1 p-12 pl-40 pr-2">

      {/* Select Country */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <select
          className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select country
          </option>
          {/* Tambahkan opsi country */}
        </select>
      </div>

      {/* Select City */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <select
          className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select city
          </option>
          {/* Tambahkan opsi city */}
        </select>
      </div>

      {/* Services + Date Range */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
        {/* Select Services */}
        <select
          className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select services
          </option>
          {/* Tambahkan opsi layanan */}
        </select>

        {/* Date range */}
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          {/* From */}
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              From
            </label>
            <div className="relative cursor-pointer">
              <input
                type="date"
                id="fromDateInput"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div
                className="w-full p-2 bg-gray-100 rounded-md text-gray-700 text-sm flex items-center gap-2"
                onClick={() =>
                  document.getElementById("fromDateInput")?.showPicker()
                }
              >
                <i className="fa-solid fa-calendar-alt text-gray-400 text-sm" />
                {fromDate
                  ? new Date(fromDate).toLocaleDateString("id-ID", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })
                  : "Select date"}
              </div>
            </div>
          </div>

          {/* To */}
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              To
            </label>
            <div className="relative cursor-pointer">
              <input
                type="date"
                id="toDateInput"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div
                className="w-full p-2 bg-gray-100 rounded-md text-gray-700 text-sm flex items-center gap-2"
                onClick={() =>
                  document.getElementById("toDateInput")?.showPicker()
                }
              >
                <i className="fa-solid fa-calendar-alt text-gray-400 text-sm" />
                {toDate
                  ? new Date(toDate).toLocaleDateString("id-ID", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })
                  : "Select date"}
              </div>
            </div>
          </div>
        </div>
            <button className="w-full bg-teal-500 text-white p-2 rounded-md text-sm font-medium hover:bg-teal-600 transition">
            Search
            </button>
      </div>
    </div>
  );
};

export default CardForm;
