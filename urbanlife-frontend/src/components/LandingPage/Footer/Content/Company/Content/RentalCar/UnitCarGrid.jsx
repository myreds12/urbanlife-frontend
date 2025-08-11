import React from 'react';
import UnitCarItem from './UnitCarItem';
import './UnitCarGrid.css';
import apiClient from '../../../../../../AdminDashboard/Utils/ApiClient/apiClient';

const UnitCarGrid = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return (
      <div className="no-cards text-center py-10 text-gray-500">
        <h3 className="text-lg font-semibold">No Content Available</h3>
        <p>No cards found for the selected category.</p>
      </div>
    );
  }

  return (
    <div className="cards-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const image =
          card.file_url && card.file_url !== ""
            ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${card.file_url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`
            : "/public/images/error/No_Image_Available.jpg";

        const deskripsi = card?.content?.[0]?.deskripsi || "Deskripsi tidak tersedia.";
        const harga = card?.durasi?.[0]?.harga ? parseInt(card.durasi[0].harga) : 0;
        const kapasitas = card?.kapasitas || "-";

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
          />
        );
      })}
    </div>
  );
};


export default UnitCarGrid;