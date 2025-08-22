import React, { useState } from "react";
import { Clock, Plus } from "lucide-react";
import ServiceScheduleTable from './ServiceScheduleTable';
import ServiceScheduleForm from './ServiceScheduleForm';
import ServiceScheduleDummy from './ServiceScheduleDummy';

const ServiceScheduleCard = () => {
  const [schedule, setSchedule] = useState(
    ServiceScheduleDummy.map((item, index) => ({ ...item, id: item.id || index + 1 }))
  );
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSchedule = (newSchedule) => {
    const newId = Math.max(...schedule.map(s => s.id), 0) + 1;
    setSchedule(prev => [...prev, { ...newSchedule, id: newId }]);
    setShowAddForm(false);
  };

  const handleUpdateSchedule = (id, updatedSchedule) => {
    setSchedule(prev => 
      prev.map(item => item.id === id ? { ...updatedSchedule, id } : item)
    );
  };

  const handleDeleteSchedule = (id) => {
    setSchedule(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gradient-to-br from-cyan-50 to-slate-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left - Schedule Table (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-4 rounded-t-xl">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Service Schedule ({schedule.length})
              </h2>
            </div>
            
            <div className="p-6">
              {schedule.length > 0 ? (
                <ServiceScheduleTable
                  schedule={schedule}
                  onUpdate={handleUpdateSchedule}
                  onDelete={handleDeleteSchedule}
                />
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Schedule Yet</h3>
                  <p className="text-gray-500 mb-6">Add your first service schedule</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Add First Schedule
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right - Management Panel (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Add New Schedule */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-4 rounded-t-xl">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Schedule
              </h3>
            </div>
            
            <div className="p-6">
              {!showAddForm ? (
                <div className="text-center">
                  <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-cyan-600" />
                  </div>
                  <p className="text-gray-600 mb-4">Add a new service schedule</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                  >
                    Create New Schedule
                  </button>
                </div>
              ) : (
                <ServiceScheduleForm
                  onSubmit={handleAddSchedule}
                  onCancel={() => setShowAddForm(false)}
                />
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-4 rounded-t-xl">
              <h3 className="text-lg font-semibold text-white">Statistics</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Schedules</span>
                <span className="text-2xl font-bold text-slate-700">{schedule.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Special Hours</span>
                <span className="text-2xl font-bold text-slate-700">
                  {schedule.filter(s => s.highlight).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Regular Hours</span>
                <span className="text-2xl font-bold text-cyan-600">
                  {schedule.filter(s => !s.highlight).length}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceScheduleCard;