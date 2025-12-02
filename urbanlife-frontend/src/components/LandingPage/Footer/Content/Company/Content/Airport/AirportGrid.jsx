import React from "react";
import AirportCard from "./AirportCard";
import { useTranslation } from 'react-i18next';
import "../DayTour/DayTourGrid";
import apiClient from "../../../../../../AdminDashboard/Utils/ApiClient/apiClient";
import { formatBookingData } from "../../../../../../AdminDashboard/Utils/FormatData/bookingFormatData";
import { useNavigate } from "react-router-dom";

const AirportGrid = ({ cards }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  
  if (!cards || cards.length === 0) {
    return (
      <div className="no-cards text-center py-10">
        <h3 className="text-lg font-semibold">{t("services.nocontent")}</h3>
        <p className="text-gray-500">{t("airport.noairport")}</p>
      </div>
    );
  }

  const handleBookNow = (card) => {
    const bookingData = formatBookingData(card);
    console.log("Handle Booking Data:", bookingData);

    navigate(`/Detail/${card.id}`, { state: bookingData });
  };

  return (
    <div className="daytour-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
      {cards.map((card) => {
        const image = card.file_url ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${card.file_url
            .replace(/\\/g, "/")
            .replace(/^uploads\//, "")}` : "/public/images/error/No_Image_Available.jpg"

        const description =
          card.content?.[0]?.deskripsi?.substring(0, 100) + "..." || "";
        return (
          <AirportCard
            key={card.id}
            image={image}
            title={card.nama}
            duration={card.durasi_hari}
            price={card.harga}
            description={description}
            onBookNow={() => handleBookNow(card)} // callback handler
          />
        );
      })}
    </div>
  );
};

export default AirportGrid;
