import React from 'react';
import TicketCard from '../../TicketCard';

const ArtMarket = () => {
  return (
    <TicketCard
      backgroundImage="/images/LandingPage/Footer/content/ArtMarket.png"
      title="Ubud Art Market"
      subtitle="Art Market"
      icon="/images/LandingPage/Footer/iconTicket/ArtMarket.png"
      rightTitle="North-eastern Bali"
      barcodeImage="/images/LandingPage/Footer/barcode.png"
      linkTo="/blog/ubud-art-market"
    />
  );
};

export default ArtMarket;