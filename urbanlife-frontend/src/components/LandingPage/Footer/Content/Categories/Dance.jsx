import React from 'react';
import TicketCard from '../../TicketCard';

const Dance = () => {
  return (
    <TicketCard
      backgroundImage="/images/LandingPage/Footer/content/Dance.png"
      title="Barong Dance"
      subtitle="Dance"
      icon="/images/LandingPage/Footer/iconTicket/Dance.png"
      rightTitle="Southern Bali"
      barcodeImage="/images/LandingPage/Footer/barcode.png"
      linkTo="/blog/barong-dance"
    />
  );
};

export default Dance;