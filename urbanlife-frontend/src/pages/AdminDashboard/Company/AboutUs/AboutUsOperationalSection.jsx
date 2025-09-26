// src/components/AdminDashboard/AboutUs/AboutUsOperationalSection.jsx
import React from "react";

const AboutUsOperationalSection = ({
  id,
  isActive,
  schedule,
  stats,
  handleScheduleChange,
  addSchedule,
  removeSchedule,
  handleStatsChange,
  addStat,
  removeStat,
}) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Operational Schedule</h3>
            <button
              type="button"
              onClick={addSchedule}
              className="px-3 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
            >
              Add Schedule
            </button>
          </div>
          {schedule.map((item, index) => (
            <div key={index} className="border-t pt-4 mt-4">
              <div className="mb-4 flex items-center">
                <label
                  className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                  style={{ minWidth: "190px" }}
                >
                  Day
                </label>
                <input
                  type="text"
                  value={item.day}
                  onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
                  placeholder="Enter day (e.g., Monday)..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label
                  className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                  style={{ minWidth: "190px" }}
                >
                  Time
                </label>
                <input
                  type="text"
                  value={item.time}
                  onChange={(e) => handleScheduleChange(index, "time", e.target.value)}
                  placeholder="Enter time (e.g., 08:00 - 17:00)..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label
                  className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                  style={{ minWidth: "190px" }}
                >
                  Highlight
                </label>
                <input
                  type="checkbox"
                  checked={item.highlight}
                  onChange={(e) => handleScheduleChange(index, "highlight", e.target.checked)}
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSchedule(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove Schedule
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
            <button
              type="button"
              onClick={addStat}
              className="px-3 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
            >
              Add Achievement
            </button>
          </div>
          {stats.map((stat, index) => (
            <div key={index} className="border-t pt-4 mt-4">
              {/* <div className="mb-4 flex items-center">
                <label
                  className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                  style={{ minWidth: "190px" }}
                >
                  Number
                </label>
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => handleStatsChange(index, "number", e.target.value)}
                  placeholder="Enter number (e.g., 15,000+)..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
                />
              </div> */}
              <div className="mb-4 flex items-center">
                <label
                  className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                  style={{ minWidth: "190px" }}
                >
                  Description (EN)
                </label>
                <input
                  type="text"
                  value={stat.label_en}
                  onChange={(e) => handleStatsChange(index, "label_en", e.target.value)}
                  placeholder="Enter label in English..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label
                  className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
                  style={{ minWidth: "190px" }}
                >
                  Description (ID)
                </label>
                <input
                  type="text"
                  value={stat.label_id}
                  onChange={(e) => handleStatsChange(index, "label_id", e.target.value)}
                  placeholder="Masukkan label dalam bahasa Indonesia..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
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
                  value={stat.icon}
                  onChange={(e) => handleStatsChange(index, "icon", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                >
                  <option value="">Select an icon</option>
                  <option value="users">Users</option>
                  <option value="star">Star</option>
                  <option value="building">Building</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeStat(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove Achievement
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsOperationalSection;