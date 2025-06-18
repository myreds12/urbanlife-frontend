import React, { useState } from 'react';
import CalendarComponent from '../../../components/AdminDashboard/Calendar/Calendar';
import CurrentOrderList from '../../../components/AdminDashboard/Calendar/CurrentOrderList';
import '../../../styles/AdminDashboard/Calendar/Calendar.css';

const Calendar = () => {
  const [events] = useState([
    { title: 'Accommodation - Selena gomes - Bali - Fourteen Roses Boutique Hotel', date: '2025-06-17', className: 'accommodation' },
    { title: 'Day tour - Ahmad dhani - Bali - Eastern Nusa Penida Tour', date: '2025-06-17', className: 'daytour' },
    { title: 'Rent car - Ahmad dhani - Jakarta - Toyota Alphard', date: '2025-06-17', className: 'rentcar' },
  ]);

  return (
    <div className="calendar-page">
      <div className="calendar-layout">
        <div className="calendar-section">
          <CalendarComponent events={events} />
        </div>
        <div className="order-list-section">
          <CurrentOrderList />
        </div>
      </div>
    </div>
  );
};

export default Calendar;