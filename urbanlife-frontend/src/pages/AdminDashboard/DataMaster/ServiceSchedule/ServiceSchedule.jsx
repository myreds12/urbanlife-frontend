import React, { useState, useEffect } from "react";
import { Clock, Plus } from "lucide-react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient"; // Adjust path as needed
import ServiceScheduleTable from "./ServiceScheduleTable";
import ServiceScheduleForm from "./ServiceScheduleForm";

const ServiceScheduleCard = () => {
  const [schedule, setSchedule] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch schedules from API
  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get("/service-schedule");
      console.log("API response:", res); // Debug full response
      const data = res.data.data || [];
      console.log("Parsed schedule data:", data); // Debug parsed data
      const transformedSchedule = data.map((item) => ({
        id: item.id,
        day: item.hari, // Keep as received from API
        time: item.jam_buka,
        highlight: item.is_special_day,
      }));
      setSchedule(transformedSchedule);
    } catch (err) {
      const errorMessage = err.response
        ? `API Error: ${err.response.status} - ${err.response.data?.message || err.message}`
        : `Network Error: ${err.message}`;
      console.error("Failed to fetch schedules:", errorMessage, err); // Detailed debug
      setError(errorMessage);
      // Fallback dummy data (optional, remove if backend is fixed)
      setSchedule([
        { id: 1, day: "Monday", time: "08:00 - 16:00", highlight: false },
        { id: 2, day: "Tuesday", time: "08:00 - 16:00", highlight: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Add new schedule
  const handleAddSchedule = async (newSchedule) => {
    try {
      // Validate
      if (!newSchedule.day) {
        throw new Error("Day is required");
      }
      if (!/^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/.test(newSchedule.time)) {
        throw new Error("Time must be in format HH:mm - HH:mm (e.g., 08:00 - 16:00)");
      }
      const payload = {
        hari: newSchedule.day, // Send as-is
        jam_buka: newSchedule.time, // Send actual time
        is_special_day: newSchedule.highlight,
      };
      console.log("Adding schedule, payload:", payload); // Debug
      const res = await apiClient.post("/service-schedule", payload);
      console.log("Add response:", res.data); // Debug
      setSchedule((prev) => [
        ...prev,
        { ...newSchedule, id: res.data.data.id },
      ]);
      setShowAddForm(false);
    } catch (err) {
      const errorMessage = err.response
        ? `API Error: ${err.response.status} - ${err.response.data?.message || err.message}`
        : `Network Error: ${err.message}`;
      console.error("Failed to add schedule:", errorMessage, err);
      setError(errorMessage);
    }
  };

  // Update schedule
  const handleUpdateSchedule = async (id, updatedSchedule) => {
    try {
      // Validate
      if (!updatedSchedule.day) {
        throw new Error("Day is required");
      }
      if (!updatedSchedule.time) {
        throw new Error("Time is required");
      }
      if (!/^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/.test(updatedSchedule.time)) {
        throw new Error("Time must be in format HH:mm - HH:mm (e.g., 08:00 - 16:00)");
      }
      const payload = {
        hari: updatedSchedule.day, // Send as-is
        jam_buka: updatedSchedule.time, // Send actual time
        is_special_day: updatedSchedule.highlight,
      };
      console.log(`Updating schedule ID: ${id}, Payload:`, payload); // Debug
      const res = await apiClient.put(`/service-schedule/${id}`, payload);
      console.log("Update response:", res.data); // Debug
      setSchedule((prev) =>
        prev.map((item) =>
          item.id === id ? { ...updatedSchedule, id } : item
        )
      );
    } catch (err) {
      const errorMessage = err.response
        ? `API Error: ${err.response.status} - ${err.response.data?.message || err.message}`
        : `Network Error: ${err.message}`;
      console.error("Failed to update schedule:", errorMessage, err);
      setError(errorMessage);
    }
  };

  // Delete schedule
  const handleDeleteSchedule = async (id) => {
    try {
      console.log("Deleting schedule ID:", id); // Debug
      await apiClient.delete(`/service-schedule/${id}`);
      setSchedule((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      const errorMessage = err.response
        ? `API Error: ${err.response.status} - ${err.response.data?.message || err.message}`
        : `Network Error: ${err.message}`;
      console.error("Failed to delete schedule:", errorMessage, err);
      setError(errorMessage);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchSchedule();
  }, []);

  // Render loading
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gradient-to-br from-cyan-50 to-slate-100 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  // Render error
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gradient-to-br from-cyan-50 to-slate-100 min-h-screen text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchSchedule}
          className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gradient-to-br from-cyan-50 to-slate-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Schedule Table */}
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

        {/* Management Panel */}
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
                  {schedule.filter((s) => s.highlight).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Regular Hours</span>
                <span className="text-2xl font-bold text-cyan-600">
                  {schedule.filter((s) => !s.highlight).length}
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