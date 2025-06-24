import React from 'react';
import Schedule from "../../components/LandingPage/Schedule";

const ServicePromoCard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white">
      {/* Card Kiri */}
      <div className="flex-1 bg-[#f8f9fb] p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-[#0d1b39] mb-4">
          Order Now and Try Our Services!
        </h2>
        <p className="text-[#4f4f4f] text-sm leading-relaxed">
          In addition to the transportation services in Bali that we provide, we also offer<br />
          day tour packages that could give you an opportunity to visit different parts of the island, enjoy its beauty and also learn local culture at the same time.
        </p>
      </div>

      {/* Card Kanan */}
      <div className="w-full lg:w-[300px] bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <Schedule />
        <button className="mt-6 w-full bg-[#0593ff] hover:bg-[#007dd1] text-white py-2 px-4 rounded-lg font-semibold transition">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ServicePromoCard;
