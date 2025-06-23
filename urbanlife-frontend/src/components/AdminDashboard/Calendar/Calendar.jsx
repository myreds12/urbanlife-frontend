import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = ({ events }) => {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(arg) => (
          <div>
            <div className={`event ${arg.event.classNames[0]}`}>
              {arg.event.title.split(' - ')[0]}
            </div>
          </div>
        )}
        dayMaxEvents={true}
        height={500}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        eventDidMount={(info) => {
          info.el.style.borderLeft = `4px solid ${
            info.event.classNames[0] === 'accommodation' ? '#ffeeba' :
            info.event.classNames[0] === 'daytour' ? '#c3e6cb' :
            info.event.classNames[0] === 'rentcar' ? '#b8daff' : '#ccc'
          }`;
        }}
      />
    </div>
  );
};

export default Calendar;