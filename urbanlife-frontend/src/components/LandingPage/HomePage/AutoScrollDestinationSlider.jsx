import React from "react";
import DestinationCard from "../../../components/LandingPage/HomePage/DestinationCard";
import "../../../styles/LandingPage/HomePage/AutoScrollDestinationSlider.css"; // custom animasi

const destinations = [
  {
    country: "Indonesia",
    title: "Eastern Bali Tour",
    destinations: "4 Destination",
    price: "1,200,000",
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
  {
    country: "Vietnam",
    title: "Danang",
    destinations: "4 Destination",
    price: "1,200,000",
    image: "/images/LandingPage/Destination/Danang.png",
  },
  {
    country: "Indonesia",
    title: "Jakarta",
    destinations: "4 Destination",
    price: "1,200,000",
    image: "/images/LandingPage/Destination/Jakarta.png",
  },
  {
    country: "Vietnam",
    title: "Ho Chi Minh City",
    destinations: "4 Destination",
    price: "1,200,000",
    image: "/images/LandingPage/Destination/HoChiMinhCity.png",
  },
  {
    country: "Malaysia",
    title: "Langkawi",
    destinations: "5 Destination",
    price: "1,500,000",
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
  {
    country: "Thailand",
    title: "Bangkok City Tour",
    destinations: "6 Destination",
    price: "1,000,000",
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
  {
    country: "Japan",
    title: "Kyoto Tour",
    destinations: "3 Destination",
    price: "2,000,000",
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
  {
    country: "Singapore",
    title: "City Sightseeing",
    destinations: "5 Destination",
    price: "1,600,000",
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
  {
    country: "Indonesia",
    title: "Bandung Tour",
    destinations: "4 Destination",
    price: "1,100,000",
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
  {
    country: "Vietnam",
    title: "Hanoi Trip",
    destinations: "3 Destination",
    price: "1,250,000",
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
];

const AutoScrollDestinationSlider = () => {
  const combinedDestinations = [...destinations, ...destinations];

  return (
    <div className="auto-scroll-wrapper">
      <div className="auto-scroll-track">
        {combinedDestinations.map((item, index) => (
          <DestinationCard key={index} {...item} />
        ))}
      </div>
    </div>
    
  );
};

export default AutoScrollDestinationSlider;
