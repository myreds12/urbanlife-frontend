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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md">
              Operational Schedule
            </label>
            <button
              type="button"
              onClick={addSchedule}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
            >
              Add Schedule +
            </button>
          </div>
          {schedule.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 relative">
              <button
                type="button"
                onClick={() => removeSchedule(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
                  Day <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.day}
                  onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.time}
                  onChange={(e) => handleScheduleChange(index, "time", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
                  Highlight
                </label>
                <input
                  type="checkbox"
                  checked={item.highlight}
                  onChange={(e) => handleScheduleChange(index, "highlight", e.target.checked)}
                  className="h-5 w-5 text-cyan-600 focus:ring-cyan-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md">
              Achievements
            </label>
            <button
              type="button"
              onClick={addStat}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
            >
              Add Stat +
            </button>
          </div>
          {stats.map((stat, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 relative">
              <button
                type="button"
                onClick={() => removeStat(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
                  Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => handleStatsChange(index, "number", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
                  Label (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={stat.label_en}
                  onChange={(e) => handleStatsChange(index, "label_en", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
                  Label (ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={stat.label_id}
                  onChange={(e) => handleStatsChange(index, "label_id", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "190px" }}>
                  Icon <span className="text-red-500">*</span>
                </label>
                <select
                  value={stat.icon}
                  onChange={(e) => handleStatsChange(index, "icon", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                >
                  <option value="">-- Select Icon --</option>
                  {["users", "building", "car", "star"].map((icon) => (
                    <option key={icon} value={icon}>
                      {icon.charAt(0).toUpperCase() + icon.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsOperationalSection;