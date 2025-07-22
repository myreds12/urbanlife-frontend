import { useState, useEffect } from "react";
import Calendar from "../../../components/AdminDashboard/Calendar/Calendar";
import CurrentOrderList from "../../../components/AdminDashboard/Calendar/CurrentOrderList";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import dummyEvents from "../../../components/AdminDashboard/Calendar/dummyEvents";

const CalendarPage = () => {
  const [events, setEvents] = useState({});

  // Fetch events dari API saat komponen dimount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get("/events");
        const data = response.data.data || response.data;
        // Transformasi data API ke format events
        const formattedEvents = data.reduce((acc, event) => {
          const dateKey = event.date;
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push({
            id: event.id,
            title: event.title,
            type: event.type,
            customer: event.customer,
            location: event.location,
            date: event.date,
            dateDisplay: event.dateDisplay || new Date(event.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          });
          return acc;
        }, {});
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to fetch events, using dummy data:", error);
        setEvents(dummyEvents); // Fallback ke dummy data
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async (dateKey, newEvent) => {
    try {
      const response = await apiClient.post("/events", {
        title: newEvent.title,
        customer: newEvent.customer,
        type: newEvent.type,
        location: newEvent.location,
        date: newEvent.date,
        dateDisplay: newEvent.dateDisplay,
      });
      const savedEvent = response.data.data || response.data;
      setEvents((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), { ...newEvent, id: savedEvent.id }],
      }));
    } catch (error) {
      console.error("Failed to add event:", error);
      setEvents((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent],
      }));
      alert("Failed to add event to server, saved locally.");
    }
  };

  const handleDeleteEvent = async (dateKey, eventId) => {
    try {
      await apiClient.delete(`/events/${eventId}`);
      setEvents((prev) => ({
        ...prev,
        [dateKey]: prev[dateKey]?.filter((event) => event.id !== eventId) || [],
      }));
    } catch (error) {
      console.error("Failed to delete event:", error);
      setEvents((prev) => ({
        ...prev,
        [dateKey]: prev[dateKey]?.filter((event) => event.id !== eventId) || [],
      }));
      alert("Failed to delete event from server, deleted locally.");
    }
  };

  const getAllOrders = () => {
    const allOrders = [];
    Object.values(events).forEach((dayEvents) => {
      dayEvents.forEach((event) => {
        allOrders.push({
          id: event.id,
          customerName: event.customer,
          orderType: event.type,
          location: event.location,
          date: event.dateDisplay,
          status: event.type,
        });
      });
    });
    return allOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Calendar events={events} onAddEvent={handleAddEvent} onDeleteEvent={handleDeleteEvent} />
          </div>
          <div className="lg:col-span-1">
            <CurrentOrderList orders={getAllOrders()} />
          </div>
        </div>
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