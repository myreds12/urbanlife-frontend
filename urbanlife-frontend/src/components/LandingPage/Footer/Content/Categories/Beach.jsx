import React from 'react';
import TicketCard from '../../TicketCard';

const Beach = () => {
  return (
    <TicketCard
      backgroundImage="/images/LandingPage/Footer/content/Beach.png"
      title="Padang Padang Beach"
      subtitle="Beach"
      icon="/images/LandingPage/Footer/iconTicket/Beach.png"
      rightTitle="Southern Bali"
      barcodeImage="/images/LandingPage/Footer/barcode.png"
      linkTo="/blog/padang-padang-beach"
    />
  );
};

export default Beach;