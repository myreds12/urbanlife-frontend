import React from 'react';
// import { FaClockO } from "react-icons/fa"; // Font Awesome (react-icons)

const Schedule = () => {
  const schedule = [
    { day: "Monday", time: "08.00 - 17.00" },
    { day: "Tuesday", time: "08.00 - 17.00" },
    { day: "Wednesday", time: "08.00 - 17.00" },
    { day: "Thursday", time: "08.00 - 17.00" },
    { day: "Friday", time: "08.00 - 17.00" },
    { day: "Saturday", time: "08.00 - 17.00" },
    { day: "Sunday", time: "08.00 - 17.00", highlight: true },
  ];

  return (
    <ul className="space-y-2 text-sm text-[#0d1b39] font-semibold">
      {schedule.map(({ day, time, highlight }) => (
        <li key={day} className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <FaClockO className="text-blue-900" />
            {day}
          </span>
          <span className={highlight ? "text-red-500 font-bold" : ""}>{time}</span>
        </li>
      ))}
    </ul>
  );
};

export default Schedule;