// pages/Calendar.jsx
import { useState } from "react";
import Calendar from "../../../components/AdminDashboard/Calendar/Calendar";
import CurrentOrderList from "../../../components/AdminDashboard/Calendar/CurrentOrderList";

const CalendarPage = () => {
  // State untuk menyimpan events di calendar
  const [events, setEvents] = useState({
    // Sample initial data
  });

  // Function untuk menambah event baru
  const handleAddEvent = (dateKey, newEvent) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent]
    }));
  };

  // Function untuk menghapus event
  const handleDeleteEvent = (dateKey, eventId) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey]?.filter(event => event.id !== eventId) || []
    }));
  };

  // Convert events ke format yang dibutuhkan CurrentOrderList
  const getAllOrders = () => {
    const allOrders = [];
    Object.values(events).forEach(dayEvents => {
      dayEvents.forEach(event => {
        allOrders.push({
          id: event.id,
          customerName: event.customer,
          orderType: event.type,
          location: event.location,
          date: event.dateDisplay,
          status: event.type
        });
      });
    });
    return allOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Calendar 
              events={events}
              onAddEvent={handleAddEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
          
          {/* Current Order List Section */}
          <div className="lg:col-span-1">
            <CurrentOrderList orders={getAllOrders()} />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click on any date in the calendar to add a new event</li>
            <li>• Events will automatically appear in the "Current order list"</li>
            <li>• You can delete events by clicking on a date and selecting delete</li>
            <li>• Different event types are color-coded with indicators</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;