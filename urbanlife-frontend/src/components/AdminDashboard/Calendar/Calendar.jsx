import { useState, useCallback } from "react";

const EventModal = ({ showEventModal, setShowEventModal, selectedDay, currentDate, eventForm, setEventForm, handleAddEvent, handleDeleteEvent, getEventsForDay }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayEvents = getEventsForDay(selectedDay);

  if (!showEventModal) return null;

  const handleInputChange = useCallback((e) => {
    setEventForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, [setEventForm]);

  const handleModalClick = (e) => {
    // Prevent modal from closing when clicking inside the modal content
    e.stopPropagation();
  };

  const handleBackdropClick = () => {
    setShowEventModal(false);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={handleModalClick}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Events for {selectedDay} {monthNames[currentDate.getMonth()]}
            </h3>
            <button 
              onClick={() => setShowEventModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Existing Events */}
          {dayEvents.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-gray-700">Existing Events:</h4>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{event.customer}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                          event.type === 'accommodation' ? 'bg-orange-100 text-orange-800' :
                          event.type === 'day tour' ? 'bg-green-100 text-green-800' :
                          event.type === 'rent car' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.type}
                        </span>
                        {event.location}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteEvent(selectedDay, event.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add New Event Form */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3 text-gray-700">Add New Event:</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  name="customer"
                  value={eventForm.customer}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter customer name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select
                  name="type"
                  value={eventForm.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="accommodation">Accommodation</option>
                  <option value="day tour">Day Tour</option>
                  <option value="rent car">Rent Car</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={eventForm.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter location"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
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

  const handleAddEvent = useCallback((e) => {
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
  }, [selectedDay, currentDate, eventForm, onAddEvent]);

  const handleDeleteEvent = useCallback((day, eventId) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    onDeleteEvent(dateKey, eventId);
  }, [currentDate, onDeleteEvent]);

  return (
    <>
      <div className="relative">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-4 mt-2 text-sm">
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">month</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded-lg transition-colors">week</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded-lg transition-colors">day</button>
            </div>
          </div>
          
          <button 
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`aspect-square p-2 text-center text-sm border border-gray-100 rounded-lg transition-colors ${
                day ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-200' : ''
              } ${getEventsForDay(day).length > 0 ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
              onClick={() => handleDayClick(day)}
            >
              {day && (
                <div className="h-full flex flex-col justify-between">
                  <div className="font-medium text-gray-900">{day}</div>
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
            <span className="text-gray-600">Accommodation</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Day tour</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Rent car</span>
          </div>
        </div>
              </div>
      </div>
      
      {/* Modal - Rendered at root level to avoid z-index conflicts */}
      {showEventModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ 
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }}
          onClick={() => setShowEventModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Events for {selectedDay} {monthNames[currentDate.getMonth()]}
                </h3>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Existing Events */}
              {getEventsForDay(selectedDay).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-700">Existing Events:</h4>
                  <div className="space-y-2">
                    {getEventsForDay(selectedDay).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">{event.customer}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                              event.type === 'accommodation' ? 'bg-orange-100 text-orange-800' :
                              event.type === 'day tour' ? 'bg-green-100 text-green-800' :
                              event.type === 'rent car' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {event.type}
                            </span>
                            {event.location}
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteEvent(selectedDay, event.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add New Event Form */}
              <div >
                <h4 className="font-medium mb-3 text-gray-700">Add New Event:</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                    <input
                      type="text"
                      name="customer"
                      value={eventForm.customer}
                      onChange={(e) => setEventForm(prev => ({ ...prev, customer: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                    <select
                      name="type"
                      value={eventForm.type}
                      onChange={(e) => setEventForm(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="accommodation">Accommodation</option>
                      <option value="day tour">Day Tour</option>
                      <option value="rent car">Rent Car</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={eventForm.location}
                      onChange={(e) => setEventForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter location"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAddEvent}
                      className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Add Event
                    </button>
                    <button
                      onClick={() => setShowEventModal(false)}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Demo component to show the calendar in action
const CalendarDemo = () => {
  const [events, setEvents] = useState({
    '2025-6-15': [
      { id: 1, customer: 'John Doe', type: 'accommodation', location: 'Bali Resort' },
      { id: 2, customer: 'Jane Smith', type: 'day tour', location: 'Ubud Tour' }
    ],
    '2025-6-20': [
      { id: 3, customer: 'Bob Wilson', type: 'rent car', location: 'Airport Pickup' }
    ]
  });

  const handleAddEvent = (dateKey, newEvent) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent]
    }));
  };

  const handleDeleteEvent = (dateKey, eventId) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter(event => event.id !== eventId)
    }));
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto">
        <Calendar 
          events={events}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
};

export default CalendarDemo;