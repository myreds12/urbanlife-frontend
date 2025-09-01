import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 max-w-[350px] mx-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md">
          <img
            src={testimonial.image_url}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-[#071C4D] text-lg font-semibold mb-1">
          {testimonial.name}
        </h3>
        <p className="text-gray-400 text-sm italic">
          ({testimonial.occupation})
        </p>
      </div>

      {/* Review */}
      <div className="text-center">
        <p className="text-gray-600 text-base italic leading-loose">
          "{testimonial.description}"
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;