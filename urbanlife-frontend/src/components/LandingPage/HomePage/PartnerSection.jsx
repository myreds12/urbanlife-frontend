import React from 'react';

const PartnerSection = () => {
  const partners = [
    {
      id: 1,
      title: "Ubud Art Market",
      description: "Open daily from 8 am - 6 pm, Ubud Art Market is a traditional market that sells Balinese handicrafts and souvenirs...",
      image: "/images/LandingPage/Partner/UbudArtMarket.png", 
      buttonText: "Read more"
    },
    {
      id: 2,
      title: "Ubud Monkey Forest",
      description: "Ubud Monkey Forest is a nature reserve and temple complex in Ubud area.",
      image: "/images/LandingPage/Partner/UbudMonkeyForest.png",
      buttonText: "Read more"
    },
    {
      id: 3,
      title: "Ubud Art Market",
      description: "Open daily from 8 am - 6 pm, Ubud Art Market is a traditional market that sells Balinese handicrafts and souvenirs...",
      image: "/images/LandingPage/Partner/UbudArtMarket.png",
      buttonText: "Read more"
    },
    {
      id: 4,
      title: "Ubud Monkey Forest",
      description: "Ubud Monkey Forest is a nature reserve and temple complex in Ubud area.",
      image: "/images/LandingPage/Partner/UbudMonkeyForest.png",
      buttonText: "Read more"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
        <h2 className="playfair text-[#071C4D] text-[35px] font-bold text-center mx-auto mb-8">
            Our partner
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="flex bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Image Section */}
              <div className="w-40 h-full flex-shrink-0 flex items-center justify-center bg-gray-50">
                <img
                  src={partner.image}
                  alt={partner.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-5 flex flex-col justify-between min-h-0">
                <div className="flex-1">
                  <h3 className="text-[#071C4D] font-bold text-lg mb-2 line-clamp-1">
                    {partner.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                    {partner.description}
                  </p>
                </div>

                {/* Button */}
                <div className="">
                  <button className="bg-[#0092B8] hover:bg-[#007F9F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                    {partner.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;