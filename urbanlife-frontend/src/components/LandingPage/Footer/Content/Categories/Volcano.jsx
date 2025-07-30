import React from 'react';
import TicketCard from '../../TicketCard';

const Volcano = () => {
  return (
    <TicketCard
      backgroundImage="/images/LandingPage/Footer/content/Volcano.png"
      title="Batur Volcano View and Lake"
      subtitle="Volcano"
      icon="/images/LandingPage/Footer/iconTicket/Volcano.png"
      rightTitle="North-eastern Bali"
      barcodeImage="/images/LandingPage/Footer/barcode.png"
      linkTo="/blog/batur-volcano"      
    />
  );
};

export default Volcano;