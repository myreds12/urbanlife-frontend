import React from 'react';
import TicketCard from '../../TicketCard';

const MonkeyForest = () => {
  return (
    <TicketCard
      backgroundImage="/images/LandingPage/Footer/content/MonkeyForest.png"
      title="Ubud Monkey Forest"
      subtitle="Monkey Forest"
      icon="/images/LandingPage/Footer/iconTicket/MonkeyForest.png"
      rightTitle="North-eastern Bali"
      barcodeImage="/images/LandingPage/Footer/barcode.png"
      linkTo="/blog/ubud-monkey-forest"
    />
  );
};

export default MonkeyForest;