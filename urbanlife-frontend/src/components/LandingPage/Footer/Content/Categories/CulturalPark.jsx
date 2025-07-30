import React from 'react';
import TicketCard from '../../TicketCard';

const CulturalPark = () => {
  return (
    <TicketCard
      backgroundImage="/images/LandingPage/Footer/content/CulturalPark.png"
      title="Garuda Wisnu Kencana"
      subtitle="Cultural Park"
      icon="/images/LandingPage/Footer/iconTicket/CulturalPark.png"
      rightTitle="Southern Bali"
      barcodeImage="/images/LandingPage/Footer/barcode.png"
      linkTo="/blog/garuda-wisnu-kencana"
    />
  );
};

export default CulturalPark;