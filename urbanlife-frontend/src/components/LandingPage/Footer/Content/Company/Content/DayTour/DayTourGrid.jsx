import React from "react";
import DayTourCard from "./DayTourCard";
import { useTranslation } from 'react-i18next';
import "./DaytourGrid.css";
import apiClient from "../../../../../../AdminDashboard/Utils/ApiClient/apiClient";

const DayTourGrid = ({ cards }) => {
  const { t } = useTranslation();
  
  if (!cards || cards.length === 0) {
    return (
      <div className="no-cards text-center py-10">
        <h3 className="text-lg font-semibold">{t("services.nocontent")}</h3>
        <p className="text-gray-500">{t("daytour.nodaytour")}</p>
      </div>
    );
  }

  return (
    <div className="daytour-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
      {cards.map((card) => {
        const image =
          card.file_url && card.file_url !== ""
            ? `${apiClient.defaults.baseURL.replace(
                /\/$/,
                ""
              )}/public/${card.file_url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`
            : "/public/images/error/No_Image_Available.jpg";
          const description = card.content?.[0]?.deskripsi?.substring(0, 100) + "..." || ""
        return (
          <DayTourCard
            key={card.id}
            image={image}
            title={card.nama}
            duration={card.durasi_hari}
            price={card.harga_dewasa}
            description={description}
            linkTo={`/day-tour/${card.id}`}  //TODO: Ubah rute ke OrderDetail langsung . Sesuaikan jika pakai slug
          />
        );
      })}
    </div>
  );
};

export default DayTourGrid;
