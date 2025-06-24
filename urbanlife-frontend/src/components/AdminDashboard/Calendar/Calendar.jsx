import { useState } from "react";

const Calendar = ({ events = {}, onAddEvent, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5)); // June 2025
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    type: 'accommodation',
    customer: '',
    location: ''
  });
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentDate);
  
  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    return events[dateKey] || [];
  };
  
  const getEventIndicators = (day) => {
    const dayEvents = getEventsForDay(day);
    if (dayEvents.length === 0) return null;
    
    // Group events by type to avoid duplicate indicators
    const eventTypes = [...new Set(dayEvents.map(event => event.type))];
    
    return (
      <div className="flex gap-1 mt-1 justify-center flex-wrap">
        {eventTypes.map((type, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              type === 'accommodation' ? 'bg-orange-500' :
              type === 'day tour' ? 'bg-green-500' :
              type === 'rent car' ? 'bg-blue-500' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    );
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDay(day);
    setShowEventModal(true);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!selectedDay) return;
    
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
    const newEvent = {
      id: Date.now(),
      ...eventForm,
      date: dateKey,
      dateDisplay: `${selectedDay} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    };
    
    onAddEvent(dateKey, newEvent);
    setShowEventModal(false);
    setEventForm({ title: '', type: 'accommodation', customer: '', location: '' });
    setSelectedDay(null);
  };

  const handleDeleteEvent = (day, eventId) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    onDeleteEvent(dateKey, eventId);
  };

  const EventModal = () => {
    if (!showEventModal) return null;
    
    const dayEvents = getEventsForDay(selectedDay);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Events for {selectedDay} {monthNames[currentDate.getMonth()]}
            </h3>
            <button 
              onClick={() => setShowEventModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {/* Existing Events */}
          {dayEvents.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Existing Events:</h4>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-gray-600">{event.customer} - {event.type}</div>
                    </div>
                    <button 
                      onClick={() => handleDeleteEvent(selectedDay, event.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add New Event Form */}
          <form onSubmit={handleAddEvent} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Customer Name</label>
              <input
                type="text"
                value={eventForm.customer}
                onChange={(e) => setEventForm({...eventForm, customer: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Event Type</label>
              <select
                value={eventForm.type}
                onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="accommodation">Accommodation</option>
                <option value="day tour">Day Tour</option>
                <option value="rent car">Rent Car</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={eventForm.location}
                onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Add Event
              </button>
              <button
                type="button"
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-4 mt-2 text-sm">
            <button className="px-3 py-1 bg-gray-100 rounded">month</button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded">week</button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded">day</button>
          </div>
        </div>
        
        <button 
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`aspect-square p-2 text-center text-sm border border-gray-100 hover:bg-gray-50 ${
              day ? 'cursor-pointer' : ''
            } ${getEventsForDay(day).length > 0 ? 'bg-blue-50' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day && (
              <div>
                <div className="font-medium">{day}</div>
                {getEventIndicators(day)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>Accommodation</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Day tour</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Rent car</span>
        </div>
      </div>
      
      <EventModal />
    </div>
  );
};

export default Calendar;