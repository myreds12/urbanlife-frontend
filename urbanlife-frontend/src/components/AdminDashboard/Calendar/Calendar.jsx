import { useState, useCallback } from "react";
import Button from '../../../components/AdminDashboard/Utils/Ui/button/Button'; // Import Button untuk konsistensi

const Calendar = ({ events = {}, onAddEvent, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentView, setCurrentView] = useState('month');
  const [isLoading, setIsLoading] = useState(false); // Tambah loading state
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
  const fullDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const isToday = (day, month = currentDate.getMonth(), year = currentDate.getFullYear()) => {
    return day === todayDay && month === todayMonth && year === todayYear;
  };

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

  const getWeekDays = (date) => {
    const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const currentDay = targetDate.getDay();
    const startOfWeek = new Date(targetDate);
    startOfWeek.setDate(targetDate.getDate() - currentDay);
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const getCurrentDay = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  };

  const getEventsForDay = (day, month = currentDate.getMonth(), year = currentDate.getFullYear()) => {
    if (!day) return [];
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events[dateKey] || [];
  };

  const getEventIndicators = (day, month = currentDate.getMonth(), year = currentDate.getFullYear()) => {
    const dayEvents = getEventsForDay(day, month, year);
    if (dayEvents.length === 0) return null;
    const eventTypes = [...new Set(dayEvents.map(event => event.type))];
    return (
      <div className="flex gap-1 mt-1 justify-center flex-wrap">
        {eventTypes.map((type, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              type === 'accommodation' ? 'bg-red-500' :
              type === 'day tour' ? 'bg-green-500' :
              type === 'rent car' ? 'bg-blue-500' : 'bg-yellow-500'
            }`}
          />
        ))}
      </div>
    );
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const navigateWeek = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction * 7));
      return newDate;
    });
  };

  const navigateDay = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + direction);
      return newDate;
    });
  };

  const handleNavigation = (direction) => {
    if (currentView === 'month') navigateMonth(direction);
    else if (currentView === 'week') navigateWeek(direction);
    else navigateDay(direction);
  };

  const handleDayClick = (day, month = currentDate.getMonth(), year = currentDate.getFullYear()) => {
    if (!day) return;
    setSelectedDay(day);
    setCurrentDate(new Date(year, month, day));
    setShowEventModal(true);
  };

  const handleAddEvent = useCallback(async (e) => {
    e.preventDefault();
    if (!selectedDay || isLoading) return;
    setIsLoading(true);
    try {
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      const newEvent = {
        id: Date.now(), // kat sini id 
        ...eventForm,
        date: dateKey,
        dateDisplay: `${String(selectedDay).padStart(2, '0')} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
      };

      // Kirim ke API
      const response = await fetch('http://localhost:3000/events', { // kat sini gnti endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newEvent.title,
          customer: newEvent.customer,
          type: newEvent.type,
          location: newEvent.location,
          date: newEvent.date,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menambahkan event');
      }

      const savedEvent = await response.json();
      onAddEvent(dateKey, { ...newEvent, id: savedEvent.id || newEvent.id });
      setShowEventModal(false);
      setEventForm({ title: '', type: 'accommodation', customer: '', location: '' });
      setSelectedDay(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menambahkan event');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDay, currentDate, eventForm, onAddEvent, monthNames, isLoading]);

  const handleDeleteEvent = useCallback((day, eventId) => {
    const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDeleteEvent(dateKey, eventId);
  }, [currentDate, onDeleteEvent]);

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const hasEvents = dayEvents.length > 0;
          const todayClass = isToday(day) ? 'bg-blue-500 text-white border-blue-500 shadow-lg' : '';
          const hoverClass = isToday(day) ? 'hover:bg-blue-600' : hasEvents ? 'hover:bg-blue-50' : 'hover:bg-gray-50';
          return (
            <div
              key={index}
              className={`aspect-square p-2 text-center text-sm border border-gray-100 rounded-lg transition-all duration-200 ${
                day ? `cursor-pointer ${hoverClass} hover:border-blue-200 hover:shadow-sm` : ''
              } ${todayClass || (hasEvents && !isToday(day) ? 'bg-blue-50 border-blue-200' : '')}`}
              onClick={() => handleDayClick(day)}
            >
              {day && (
                <div className="h-full flex flex-col justify-between">
                  <div className={`font-medium ${isToday(day) ? 'text-white' : 'text-gray-900'}`}>
                    {day}
                  </div>
                  {!isToday(day) && hasEvents && getEventIndicators(day)}
                  {isToday(day) && hasEvents && (
                    <div className="flex gap-1 mt-1 justify-center flex-wrap">
                      {[...new Set(getEventsForDay(day).map(event => event.type))].map((type, index) => (
                        <div key={index} className="w-2 h-2 rounded-full bg-white opacity-80" />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dayNumber = day.getDate();
          const dayEvents = getEventsForDay(dayNumber, day.getMonth(), day.getFullYear());
          const isTodayDate = day.toDateString() === today.toDateString();
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          return (
            <div
              key={index}
              className={`min-h-32 p-3 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                isTodayDate ? 'bg-blue-500 text-white border-blue-500 shadow-lg hover:bg-blue-600' : 'bg-white hover:bg-gray-50'
              } ${!isCurrentMonth ? 'opacity-50' : ''}`}
              onClick={() => handleDayClick(dayNumber, day.getMonth(), day.getFullYear())}
            >
              <div className={`text-sm font-medium mb-2 ${isTodayDate ? 'text-white' : 'text-gray-900'}`}>
                {dayNumber}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs px-2 py-1 rounded text-white truncate ${
                      isTodayDate ? 'bg-white bg-opacity-20' :
                      event.type === 'accommodation' ? 'bg-red-500' :
                      event.type === 'day tour' ? 'bg-green-500' :
                      event.type === 'rent car' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                  >
                    {event.customer}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className={`text-xs ${isTodayDate ? 'text-white opacity-80' : 'text-gray-500'}`}>
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const currentDay = getCurrentDay();
    const dayEvents = getEventsForDay(currentDay.getDate());
    const isTodayDate = currentDay.toDateString() === today.toDateString();
    return (
      <div className={`rounded-lg border p-6 ${isTodayDate ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className={`text-2xl font-bold ${isTodayDate ? 'text-blue-700' : 'text-gray-900'}`}>
              {fullDaysOfWeek[currentDay.getDay()]}
            </h3>
            {isTodayDate && (
              <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Today
              </span>
            )}
          </div>
          <p className={`text-lg ${isTodayDate ? 'text-blue-600' : 'text-gray-600'}`}>
            {currentDay.getDate()} {monthNames[currentDay.getMonth()]} {currentDay.getFullYear()}
          </p>
        </div>
        <div className="space-y-4">
          {dayEvents.length > 0 ? (
            dayEvents.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg border-l-4 ${
                  event.type === 'accommodation' ? 'border-red-500 bg-red-50' :
                  event.type === 'day tour' ? 'border-green-500 bg-green-50' :
                  event.type === 'rent car' ? 'border-blue-500 bg-blue-50' : 'border-yellow-500 bg-yellow-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{event.customer}</h4>
                    <p className="text-sm text-gray-600">{event.type} - {event.location}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(currentDay.getDate(), event.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No events scheduled for this day</p>
              <button
                onClick={() => {
                  setSelectedDay(currentDay.getDate());
                  setShowEventModal(true);
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Event
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getViewTitle = () => {
    if (currentView === 'day') {
      const day = getCurrentDay();
      return `${day.getDate()} ${monthNames[day.getMonth()]} ${day.getFullYear()}`;
    } else if (currentView === 'week') {
      const weekDays = getWeekDays(currentDate);
      const start = weekDays[0];
      const end = weekDays[6];
      if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()}-${end.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`;
      } else {
        return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]} ${start.getFullYear()}`;
      }
    } else {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };

  return (
    <>
      <div className="relative">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleNavigation(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {getViewTitle()}
                </h2>
                <div className="flex gap-2">
                  {['month', 'week', 'day'].map((view) => (
                    <button
                      key={view}
                      onClick={() => setCurrentView(view)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentView === view
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleNavigation(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedDay(today.getDate());
                  setShowEventModal(true);
                }}
                disabled={isLoading}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium" // Ubah rounded-lg jadi rounded-none
              >
                {isLoading ? 'Loading...' : '+ Add Event'}
              </Button>
            </div>
          </div>
          <div className="p-6">
            {currentView === 'month' && (
              <>
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {daysOfWeek.map(day => (
                    <div key={day} className="p-3 text-center text-sm font-semibold text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>
                {renderMonthView()}
              </>
            )}
            {currentView === 'week' && (
              <>
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {getWeekDays(currentDate).map((day, index) => {
                    const isTodayDate = day.toDateString() === today.toDateString();
                    return (
                      <div key={index} className={`text-center text-sm font-semibold py-2 rounded-lg ${
                        isTodayDate ? 'bg-blue-500 text-white' : 'text-gray-600'
                      }`}>
                        <div>{daysOfWeek[day.getDay()]}</div>
                        <div className="text-lg font-bold">{day.getDate()}</div>
                      </div>
                    );
                  })}
                </div>
                {renderWeekView()}
              </>
            )}
            {currentView === 'day' && renderDayView()}
          </div>
          {currentView !== 'day' && (
            <div className="px-6 pb-6">
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Accommodation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Day tour</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Rent car</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showEventModal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 10000, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setShowEventModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
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
              {getEventsForDay(selectedDay).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-700">Existing Events:</h4>
                  <div className="space-y-3">
                    {getEventsForDay(selectedDay).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{event.customer}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mr-2 ${
                                event.type === 'accommodation' ? 'bg-red-100 text-red-800' :
                                event.type === 'day tour' ? 'bg-green-100 text-green-800' :
                                event.type === 'rent car' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                              }`}
                            >
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
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">Add New Event:</h4>
                <form onSubmit={handleAddEvent}>
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
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                      <select
                        name="type"
                        value={eventForm.type}
                        onChange={(e) => setEventForm(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        disabled={isLoading}
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
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Adding...' : 'Add Event'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEventModal(false)}
                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;