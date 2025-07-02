import { useState, useEffect } from "react";

export default function CardWelcome() {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      day: "numeric",
      month: "long",
    })
  );
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
      setCurrentDate(
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          day: "numeric",
          month: "long",
        })
      );
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);


  return (
    <div className="h-full w-full">
      <div className="inline-flex justify-between h-full w-full rounded-2xl border border-gray-200 bg-white p-5">

       <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold">Welcome Back, <span className="text-cyan-600">Angela</span> !</h1>
            <span className="flex items-center space-x-1">
                <p className="text-gray-600 font-">Great to see you again! Your Admin Dashboard awaits</p>
            </span>
       </div>

       <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-bold">{currentDate}</h1>
            <span className="flex items-center space-x-3 justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 555 500" className="w-5 h-5 " fill="currentColor">
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
              </svg>
              <p className="text-xl font-bold">{currentTime}</p>
            </span>
       </div>

      </div>
    </div>
  );
}