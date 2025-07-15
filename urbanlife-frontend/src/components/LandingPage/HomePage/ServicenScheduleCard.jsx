import React from "react";
import { Clock } from "lucide-react";

const ServiceScheduleCard = () => {
  const schedule = [
    { day: "MONDAY", time: "08.00 - 17.00" },
    { day: "TUESDAY", time: "08.00 - 17.00" },
    { day: "WEDNESDAY", time: "08.00 - 17.00" },
    { day: "THURSDAY", time: "08.00 - 17.00" },
    { day: "FRIDAY", time: "08.00 - 17.00" },
    { day: "SATURDAY", time: "08.00 - 17.00" },
    { day: "SUNDAY", time: "08.00 - 17.00", highlight: true },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="flex flex-col lg:flex-row items-start gap-y-10 lg:gap-x-12">
        {/* Kiri - Teks */}
        <div className="w-full lg:w-[60%]">
          <h2 className="playfair text-3xl font-bold text-[#071C4D] mb-4 leading-tight">
            Order Now and Try Our Services!
          </h2>
          <p className="text-[#4f4f4f] text-base leading-relaxed">
            In addition to the transportation services in Bali that we provide, we
            also offer day tour packages that could give you an opportunity to visit
            different parts of the island, enjoy its beauty and also learn local
            culture at the same time.
          </p>
        </div>

        {/* Kanan - Schedule */}
        <div className="w-full lg:w-[40%]">
          <div className="space-y-2 mb-4">
            {schedule.map(({ day, time, highlight }) => ( 
              <div key={day} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#071C4D]" />
                  <span className="text-[#071C4D] font-semibold text-sm uppercase">
                    {day}
                  </span>
                </div>
                <span className={`text-sm font-medium ${highlight ? "text-red-500" : "text-gray-700"}`}>
                  {time}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full bg-[#0092B8] hover:bg-[#007F9F] text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>

  );
};

export default ServiceScheduleCard;