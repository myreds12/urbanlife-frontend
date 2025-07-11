import React from "react";
import DestinationCard from "../../../components/LandingPage/HomePage/DestinationCard";
import "../../../styles/LandingPage/HomePage/AutoScrollDestinationSlider.css";

const AutoScrollDestinationSlider = ({ travelData }) => {
  const combinedDestinations = [...travelData, ...travelData]; // Duplikat untuk efek looping

  return (
    <div className="auto-scroll-wrapper">
      <div className="auto-scroll-track">
        {combinedDestinations.map((item, index) => (
          <DestinationCard key={`${item.id}-${index}`} travel={item} />
        ))}
      </div>
    </div>
  );
};

export default AutoScrollDestinationSlider;