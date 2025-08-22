import React, { useState } from "react";
import { Clock, Edit2, Trash2, Save, X } from "lucide-react";

const ServiceScheduleTable = ({ schedule, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editSchedule, setEditSchedule] = useState({ day: "", time: "", highlight: false });

  const dayTranslations = {
    'MONDAY': 'Senin',
    'TUESDAY': 'Selasa', 
    'WEDNESDAY': 'Rabu',
    'THURSDAY': 'Kamis',
    'FRIDAY': 'Jumat',
    'SATURDAY': 'Sabtu',
    'SUNDAY': 'Minggu'
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditSchedule({ ...item });
  };

  const handleSave = () => {
    const cleanDay = editSchedule.day.toUpperCase().replace(/^servicenschedule\./i, '');
    onUpdate(editingId, { ...editSchedule, day: cleanDay });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditSchedule({ day: "", time: "", highlight: false });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditSchedule((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="space-y-3">
      {schedule.map((item) => (
        <div
          key={item.id}
          className={`group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ${
            editingId === item.id ? 'ring-2 ring-cyan-500 shadow-lg' : ''
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
                    className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    name="time"
                    value={editSchedule.time}
                    onChange={handleChange}
                    placeholder="e.g., 08.00 - 17.00"
                    className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  />
                </div>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="highlight"
                    checked={editSchedule.highlight}
                    onChange={handleChange}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 rounded"
                  />
                  <span className="text-sm text-gray-700">Highlight this schedule</span>
                </label>

                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={!editSchedule.day || !editSchedule.time}
                    className="flex items-center space-x-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
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
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${item.highlight ? 'bg-gray-100 text-gray-600' : 'bg-cyan-100 text-cyan-600'}`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {dayTranslations[item.day] || item.day}
                    </h4>
                    <p className={`text-sm font-medium ${item.highlight ? 'text-gray-700' : 'text-gray-600'}`}>
                      {item.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {item.highlight && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    Special Hours
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceScheduleTable;