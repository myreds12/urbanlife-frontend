import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 max-w-[350px] mx-auto flex flex-col items-center">
      {/* Profile Section tanpa gambar */}
      <h3 className="text-[#071C4D] text-xl font-semibold mb-1">{testimonial.name}</h3>
      <p className="text-blue-600 text-sm italic mb-6">({testimonial.occupation})</p>

      {/* Divider */}
      <hr className="w-12 border-blue-600 mb-6" />

      {/* Review dengan ikon kutipan */}
      <div className="text-center text-gray-700 text-base italic leading-relaxed relative px-4">
        <svg
          className="w-6 h-6 text-blue-200 absolute top-0 left-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7.17 6A5.002 5.002 0 002 11v5a2 2 0 002 2h3a2 2 0 002-2v-5a5.002 5.002 0 00-2.83-5zM17.17 6A5.002 5.002 0 0012 11v5a2 2 0 002 2h3a2 2 0 002-2v-5a5.002 5.002 0 00-2.83-5z" />
        </svg>
        "{testimonial.description}"
      </div>
    </div>
  );
};

export default TestimonialCard;
