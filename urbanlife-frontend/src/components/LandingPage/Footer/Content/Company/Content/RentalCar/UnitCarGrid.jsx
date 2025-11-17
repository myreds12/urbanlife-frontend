import React from 'react';
import UnitCarItem from './UnitCarItem';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './UnitCarGrid.css';
import apiClient from '../../../../../../AdminDashboard/Utils/ApiClient/apiClient';
import { formatBookingData } from '../../../../../../AdminDashboard/Utils/FormatData/bookingFormatData';

const UnitCarGrid = ({ cards }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (!cards || cards.length === 0) {
    return (
      <div className="no-cards text-center py-10 text-gray-500">
        <h3 className="text-lg font-semibold">{t("services.nocontent")}</h3>
        <p>{t("unitcar.norentcar")}.</p>
      </div>
    );
  }

  const handleBookNow = (card) => {
    const bookingData = formatBookingData(card);
    console.log("Handle Booking Data:", bookingData);

    navigate(`/Detail/${card.id}`, { state: bookingData });
    // Alternatively, to go directly to OrderDetail:
    // navigate(`/OrderDetail?type=${card.item_type?.toLowerCase()}&id=${card.id}`, { state: bookingData });
  };

  return (
    <div className="cards-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const image =
          card.file_url && card.file_url !== ""
            ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${card.file_url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`
            : "/public/images/error/No_Image_Available.jpg";

        // const deskripsi = card?.content?.[0]?.deskripsi || "Deskripsi tidak tersedia.";
        const language = i18n.language === "en" ? "ENGLISH" : "INDONESIA";
        const data_desc = card?.content.filter((item) => item.bahasa === language);
        const deskripsi = data_desc[0].deskripsi;
        const harga = card?.durasi?.[0]?.harga ? parseInt(card.durasi[0].harga) : 0;
        const kapasitas = card?.kapasitas.replace('persons', t('detail.persons')) || "-";

        return (
          <UnitCarItem
            key={card.id}
            image={image}
            unit={card.model || "-"}
            people={kapasitas}
            title={card.nama || "Tanpa Nama"}
            startsPrice={harga}
            description={deskripsi}
            duration={card.durasi}
            onBookNow={() => handleBookNow(card)}
            location={card.lokasi?.nama}
          />
        );
      })}
    </div>
  );
};

export default UnitCarGrid;