import React, { useState } from "react";
import { Clock, Edit2, Trash2, Save, X } from "lucide-react";

const ServiceScheduleTable = ({ schedule, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editSchedule, setEditSchedule] = useState({ day: "", time: "", highlight: false });
  const [errors, setErrors] = useState({});

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditSchedule({ ...item });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editSchedule.day) {
      newErrors.day = "Day is required";
    }
    if (!editSchedule.time) {
      newErrors.time = "Time is required";
    } else if (!/^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/.test(editSchedule.time)) {
      newErrors.time = "Time must be in format HH:mm - HH:mm (e.g., 08:00 - 16:00)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    onUpdate(editingId, editSchedule);
    setEditingId(null);
    setEditSchedule({ day: "", time: "", highlight: false });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditSchedule({ day: "", time: "", highlight: false });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditSchedule((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Chunk array for grid display
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const scheduleRows = chunkArray(schedule, 7);

  return (
    <div className="space-y-4">
      {scheduleRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {row.map((item) => (
            <div
              key={item.id}
              className={`group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ${
                editingId === item.id ? "ring-2 ring-cyan-500 shadow-lg col-span-full" : ""
              }`}
            >
              {editingId === item.id ? (
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                      <input
                        type="text"
                        name="day"
                        value={editSchedule.day}
                        onChange={handleChange}
                        className={`w-full py-2 px-3 rounded-lg border ${
                          errors.day ? "border-red-400" : "border-gray-300"
                        } focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm`}
                        placeholder="e.g., Monday, or any day"
                      />
                      {errors.day && <p className="mt-1 text-sm text-red-600">{errors.day}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="text"
                        name="time"
                        value={editSchedule.time}
                        onChange={handleChange}
                        placeholder="e.g., 08:00 - 16:00"
                        className={`w-full py-2 px-3 rounded-lg border ${
                          errors.time ? "border-red-400" : "border-gray-300"
                        } focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm`}
                      />
                      {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                    </div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="highlight"
                        checked={editSchedule.highlight}
                        onChange={handleChange}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 rounded"
                      />
                      <span className="text-sm text-gray-700">Mark as special hours</span>
                    </label>
                    <div className="flex space-x-2 pt-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${item.highlight ? "bg-gray-100 text-gray-600" : "bg-cyan-100 text-cyan-600"}`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 text-cyan-600 hover:bg-cyan-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {item.day}
                      </h4>
                      <p className={`text-xs font-medium ${item.highlight ? "text-red-500" : "text-gray-600"}`}>
                        {item.time}
                      </p>
                    </div>
                    {item.highlight && (
                      <div className="text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          Special Hours
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ServiceScheduleTable;