import React from 'react';

const PartnerSection = () => {
  const partners = [
    {
      id: 1,
      title: "Ubud Art Market",
      description: "Open daily from 8 am - 6 pm, Ubud Art Market is a traditional market that sells Balinese handicrafts and souvenirs...",
      image: "/images/ubud-art-market.jpg", // blm disesuaiin, masi brantakan difoldernyh
      buttonText: "Read more"
    },
    {
      id: 2,
      title: "Ubud Monkey Forest",
      description: "Ubud Monkey Forest is a nature reserve and temple complex in Ubud area.",
      image: "/images/ubud-monkey-forest.jpg", // blm disesuaiin, masi brantakan difoldernyh
      buttonText: "Read more"
    },
    {
      id: 3,
      title: "Ubud Art Market",
      description: "Open daily from 8 am - 6 pm, Ubud Art Market is a traditional market that sells Balinese handicrafts and souvenirs...",
      image: "/images/ubud-art-market-2.jpg",// blm disesuaiin, masi brantakan difoldernyh
      buttonText: "Read more"
    },
    {
      id: 4,
      title: "Ubud Monkey Forest",
      description: "Ubud Monkey Forest is a nature reserve and temple complex in Ubud area.",
      image: "/images/ubud-monkey-forest-2.jpg", // blm disesuaiin, masi brantakan difoldernyh
      buttonText: "Read more"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h2 className="playfair text-[#071C4D] text-[32px] font-bold ml-4">
            Our partner
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <div key={partner.id} className="flex bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image Section */}
              <div className="w-48 h-32 flex-shrink-0">
                <img
                  src={partner.image}
                  alt={partner.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-[#071C4D] font-bold text-lg mb-3">
                    {partner.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {partner.description}
                  </p>
                </div>

                {/* Button */}
                <div>
                  <button className="bg-[#00B4DB] hover:bg-[#0099CC] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300">
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