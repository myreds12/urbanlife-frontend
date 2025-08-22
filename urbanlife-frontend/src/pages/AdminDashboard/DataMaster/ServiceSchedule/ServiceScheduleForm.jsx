import React, { useState } from "react";

const ServiceScheduleForm = ({ onSubmit, onCancel }) => {
  const [newSchedule, setNewSchedule] = useState({ day: "", time: "", highlight: false });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newSchedule.day) newErrors.day = "Day is required";
    if (!newSchedule.time) newErrors.time = "Time is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setNewSchedule((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {    
    if (!validateForm()) return;

    const cleanSchedule = {
      ...newSchedule,
      day: newSchedule.day.toUpperCase().replace(/^servicenschedule\./i, '')
    };
    
    onSubmit(cleanSchedule);
    setNewSchedule({ day: "", time: "", highlight: false });
    setErrors({});
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Day *</label>
        <input
          type="text"
          name="day"
          value={newSchedule.day}
          onChange={handleChange}
          className={`w-full py-2 px-3 rounded-lg border ${
            errors.day ? 'border-gray-400' : 'border-gray-300'
          } focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm`}
          placeholder="e.g., MONDAY"
        />
        {errors.day && <p className="mt-1 text-sm text-gray-600">{errors.day}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
        <input
          type="text"
          name="time"
          value={newSchedule.time}
          onChange={handleChange}
          placeholder="e.g., 08.00 - 17.00"
          className={`w-full py-2 px-3 rounded-lg border ${
            errors.time ? 'border-gray-400' : 'border-gray-300'
          } focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm`}
        />
        {errors.time && <p className="mt-1 text-sm text-gray-600">{errors.time}</p>}
      </div>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="highlight"
          checked={newSchedule.highlight}
          onChange={handleChange}
          className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 rounded"
        />
        <span className="text-sm text-gray-700">Mark as special hours</span>
      </label>

      <div className="flex space-x-2 pt-2">
        <button
          onClick={handleSubmit}
          disabled={!newSchedule.day || !newSchedule.time}
          className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors"
        >
          Add Schedule
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ServiceScheduleForm;