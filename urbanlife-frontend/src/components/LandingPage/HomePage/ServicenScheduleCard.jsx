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
    <div className="flex flex-col lg:flex-row gap-2 p-6 bg-white">
      {/* Card Kiri - Service Info */}
      <div className="flex-1  p-8 rounded-2xl">
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

      {/* Card Kanan - Schedule */}
      <div className="w-full lg:w-[320px]  rounded-2xl p-6">
        <div className="space-y-3 mb-6">
          {schedule.map(({ day, time, highlight }) => (
            <div key={day} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#071C4D]" />
                <span className="text-[#071C4D] font-semibold text-sm uppercase">
                  {day}
                </span>
              </div>
              <span className={`text-sm font-medium ${
                highlight ? "text-red-500" : "text-gray-700"
              }`}>
                {time}
              </span>
            </div>
          ))}
        </div>
        
        <button className="w-full bg-[#0092B8] hover:bg-[#007F9F] text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ServiceScheduleCard;