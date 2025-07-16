import React, { useState } from 'react';
import TourImage from '../../../components/LandingPage/DayTour/TourImage';
import TourHeader from '../../../components/LandingPage/DayTour/TourHeader';
import TourDescription from '../../../components/LandingPage/DayTour/TourDescription';
import TourItinerary from '../../../components/LandingPage/DayTour/TourItinerary';
import TourPrice from '../../../components/LandingPage/DayTour/TourPrice';
import Navbar from '../../../components/LandingPage/HomePage/Navbar/Navbar';
import '../../../styles/LandingPage/DayTour/DaytourDetail.css'

const DaytourDetail = () => {
  const [activeTab, setActiveTab] = useState('description');
  
  const tourData = {
    title: "Western and Eastern Nusa Penida Tour",
    price: 1050000,
    rating: 4.8,
    reviews: 142,
    duration: "Full Day",
    maxGuests: 8,
    location: "Nusa Penida, Bali",
    images: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop"
    ],
    description: "Suitable for traveling with a small group. This car can accomodate 4 - 6 passengers. The service that we offer is the car with driver included as a package and to be used within Jakarta area only. We do not providee car rental with no driver included and to be used outside Jakarta area.",
    policies: [
      {description : "This service needs to be booked at least 3 days before the selected date of the service being provided to you and the payment of the service booked needs to be made within 1 day (1×24 hours) after the booking made."},
      {description : "The payment link will be provided in the booking confirmation email sent to your email address once you have made the booking."},
      {description : "We have the right to cancel your booking if it is made less than 3 days before the selected date of the service being provided to you or the payment has not been received within 1 day (1×24 hours) after the booking made due to the time needed to process and prepare the service to be provided to you."},
      {description : "Shall the service needs to be cancelled due to force majeure, the available options are either to get full refund or re-arrange the date of the service being used without any additional charge applied and valid within 6 months from the original date of the service supposedly being used."},
      {description : "Shall the service needs to be cancelled due to other reasons, the available option is to re-arrange the date of the service being used without any additional charge applied and valid within 6 months from the original date of the service supposedly being used."}
    ],
    itinerary: [
      {
        title: "1st Destination Kelingking Beach",
        description: "Kelingking Beach is the most iconic spot in Nusa Penida. The highlight of this beach is the big cliff next to it that looks like a shape of a dinosaur's head (T-Rex's head) if it is seen from the top. The word 'Kelingking' itself is the Indonesian language for pinky finger, which is called so due to the size of the beach that is small like the pinky finger. Visitors could go down onto the beach through the steep stairs which connect to a narrow path on the cliff that goes down to the bottom. It is however not very safe to swim on this beach because of the strong current."
      },
      {
        title: "2nd Destination Atuh Beach",
        description: "With the big elephant shaped rock in the sea as the main feature of the beach, Atuh Beach is one of the most beautiful beach that Nusa Penida has. Visitors can see a spectacular view of the beach from the top of the stairs that go down to it. Swimming is allowed here, while cliff jumping into the sea from the rock can also be found on this location. Several beanbags, sunbeds, and food and drink stalls are available around the shore, plus its quiet environment, white sand, and blue waters from the sea, that make this beach a great spot for chilling."
      },
      {
        title: "3rd Destination Diamond Beach",
        description: "Diamond Beach is one of the most picturesque spots in Nusa Penida. The beach is still natural, pretty, has soft white sand and offers a breathtaking view due to its location and surroundings. The crystal blue water, palm trees and limestone encircling the beach add the elements that make this location a dream destination. The name Diamond Beach refers to the huge diamond shaped rock in the shallows of the water nearby the beach. Unfortunately, this beach is not for swimming and visitors are only allowed to go down onto the beach during low tide, as the wave contains rocks, the rip current is strong and there are a lot of corals around the beach that make it dangerous to swim and visit during high tide."
      }
    ],
   };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'price', label: 'Price' }
  ];



  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
       <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

       <div className='mt-25'>
              {/* Tour Images */}
              <TourImage images={tourData.images} title={tourData.title} />
              
              {/* Tour Header */}
              <TourHeader 
                     title={tourData.title}
                     price={tourData.price}
                     location={tourData.location}
              />
              
              {/* Tabs Navigation */}
              <div className="mt-5 mb-1">
                     <nav className="flex space-x-7">
                     {tabs.map((tab) => (
                     <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-1 font-medium text-lg navbar-menu-item relative ${
                              activeTab === tab.id ? 'active' : ''
                            }`}
                            
                     >
                            {tab.label}
                     </button>
                     ))}
                     </nav>
              </div>
              
              {/* Tab Content */}
              <div className="min-h-96">
                     {activeTab === 'description' && (
                     <TourDescription 
                     description={tourData.description}
                     policies={tourData.policies}
                     />
                     )}
                     
                     {activeTab === 'itinerary' && (
                     <TourItinerary itinerary={tourData.itinerary} />
                     )}
                     
                     {activeTab === 'price' && (
                     <TourPrice priceTable={tourData.priceTable} />
                     )}
              </div>

       </div>

    </div>
  );
};

export default DaytourDetail;