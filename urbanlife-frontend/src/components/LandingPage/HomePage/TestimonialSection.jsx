import React from 'react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Angga",
      role: "Doctor",
      location: "Jakarta",
      image: "/images/LandingPage/Testimonials/People.png", // blm disesuaiin, masi brantakan difoldernyh
      review: "Really satisfied with the service, the driver was so supportive and helpful and the car was also nice, very good.",
      tour: "Eastern Bali Tour"
    },
    {
      id: 2,
      name: "Lily",
      role: "Doctor",
      location: "Jakarta",
      image: "/images/LandingPage/Testimonials/People.png", // blm disesuaiin, masi brantakan difoldernyh
      review: "Really satisfied with the service, the driver was so supportive and helpful and the car was also nice, very good.",
      tour: "Eastern Bali Tour"
    },
    {
      id: 3,
      name: "Melati",
      role: "Dentist",
      location: "Jakarta",
      image: "/images/LandingPage/Testimonials/People.png", // blm disesuaiin, masi brantakan difoldernyh
      review: "urbanlife made my life easier, the hotel was wonderful, the car was clean and the driver was so nice and helpful. I will definitely recommend urbanlife to my friends and family.",
      tour: "Western Nusa Penida Tour"
    }
  ];

  return (
    <div className="pt-6 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="playfair text-[#071C4D] text-[32px] font-bold mb-4">
            They Are Loving Us
          </h2>
          <p className="text-gray-600 text-lg">
            Moments were giving them<br />
            the best experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              {/* Profile Section */}
              <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-[#071C4D] text-lg font-semibold mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-gray-400 text-sm italic">
                  ( {testimonial.role} / {testimonial.location} )
                </p>
              </div>

              {/* Review */}
              <div className="text-center mb-6">
                <p className="text-gray-600 text-base italic leading-loose text-center">
                  "{testimonial.review}"
                </p>
              </div>

              {/* Tour Info */}
              <div className="text-center">
                <p className="text-gray-600 font-medium">
                  {testimonial.tour}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;