import React from 'react';
import TicketCard from '../../TicketCard';

const WaterPalace = () => {
  return (
    <TicketCard
      backgroundImage="/images/LandingPage/Footer/content/WaterPalace.png"
      title="Tirta Gangga Water Palace"
      subtitle="Water Palace"
      icon="/images/LandingPage/Footer/iconTicket/WaterPalace.png"
      rightTitle="Eastern Bali"
      barcodeImage="/images/LandingPage/Footer/barcode.png"
      linkTo="/blog/tirta-gangga"      
    />
  );
};

export default WaterPalace;