import React from "react";
import DayTourCard from "./DayTourCard";
import { useTranslation } from 'react-i18next';
import "./DaytourGrid.css";
import apiClient from "../../../../../../AdminDashboard/Utils/ApiClient/apiClient";
import { formatBookingData } from "../../../../../../AdminDashboard/Utils/FormatData/bookingFormatData";
import { useNavigate } from "react-router-dom";

const DayTourGrid = ({ cards }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  
  if (!cards || cards.length === 0) {
    return (
      <div className="no-cards text-center py-10">
        <h3 className="text-lg font-semibold">{t("services.nocontent")}</h3>
        <p className="text-gray-500">{t("daytour.nodaytour")}</p>
      </div>
    );
  }

  const handleBookNow = (card) => {
    const bookingData = formatBookingData(card);
    console.log("Handle Booking Data:", bookingData);

    navigate(`/Detail/${card.id}`, { state: bookingData });
    // Kalau mau langsung ke OrderDetail:
    // navigate(`/OrderDetail?type=${card.item_type?.toLowerCase()}&id=${card.id}`, { state: bookingData });
  };

  return (
    <div className="daytour-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
      {cards.map((card) => {
        let image = "";

        if (card.file_url) {
          image = `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${card.file_url
            .replace(/\\/g, "/")
            .replace(/^uploads\//, "")}`;
        } else if (
          card.itinerary?.[0]?.itinerary_files?.[0]?.url
        ) {
          image = `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${card.itinerary[0].itinerary_files[0].url
            .replace(/\\/g, "/")
            .replace(/^uploads\//, "")}`;
        } else {
          image = "/public/images/error/No_Image_Available.jpg";
        }

        const description =
          card.content?.[0]?.deskripsi?.substring(0, 100) + "..." || "";
        return (
          <DayTourCard
            key={card.id}
            image={image}
            title={card.nama}
            duration={card.durasi_hari}
            price={card.harga_dewasa}
            description={description}
            onBookNow={() => handleBookNow(card)} // callback handler
          />
        );
      })}
    </div>
  );
};

export default DayTourGrid;
