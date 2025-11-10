import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";
import "../Services/Accomodation/AccoDetail.css";

const TourRoomAndPrice = ({ roomAndPrice, facilities = [] }) => {
  const { t } = useTranslation();
  const [roomImageIndices, setRoomImageIndices] = useState({});

  useEffect(() => {
    const initialIndices = roomAndPrice.reduce(
      (acc, room) => ({
        ...acc,
        [room.nama]: 0,
      }),
      {}
    );
    setRoomImageIndices(initialIndices);
  }, [roomAndPrice]);

  const handleRoomThumbnailClick = (roomName, index) => {
    setRoomImageIndices((prev) => ({
      ...prev,
      [roomName]: index,
    }));
  };

  const formatFileUrl = (path) => {
    if (!path) return "/public/images/error/No_Image_Available.jpg";
    return `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${path
      .replace(/\\/g, "/")
      .replace(/^uploads\//, "")}`;
  };

  // Ambil amenities per room (type 1) berdasarkan nama room
  const getRoomAmenities = (roomName) => {
    if (!facilities || !Array.isArray(facilities)) return [];
    
    // Find facility group with type 1 and matching room name
    const roomFacility = facilities.find(f => f.type === 1 && f.nama === roomName);
    return roomFacility ? roomFacility.fasilitas : [];
  };

  return (
    <div className="">
      {roomAndPrice.length === 0 ? (
        <p className="text-gray-500 italic">{t("detail.noroom")}</p>
      ) : (
        <div className="space-y-4">
          {roomAndPrice.map((room, idx) => {
            const currentImageIndex = roomImageIndices[room.nama] || 0;
            const roomImages = room.AkomodasiFile || [];
            const displayImage =
              roomImages[currentImageIndex]?.url
                ? formatFileUrl(roomImages[currentImageIndex].url)
                : "/public/images/error/No_Image_Available.jpg";

            // Dapatkan amenities untuk room ini
            const roomAmenities = getRoomAmenities(room.nama);

            return (
              <div
                key={idx}
                className="room-card border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row"
              >
                <div className="room-image-box md:w-1/3">
                  <img
                    src={displayImage}
                    alt={`${room.nama} preview`}
                    className="w-full h-48 object-cover"
                  />
                  {roomImages.length > 1 && (
                    <div className="room-thumbnails flex gap-2 mt-2 p-2">
                      {roomImages.slice(0, 3).map((file, index) => (
                        <img
                          key={index}
                          src={formatFileUrl(file.url)}
                          alt={`Thumb ${index + 1}`}
                          className={`w-16 h-16 rounded-lg border-2 ${
                            currentImageIndex === index
                              ? "border-cyan-500"
                              : "border-gray-200 hover:border-cyan-500"
                          } cursor-pointer`}
                          onClick={() => handleRoomThumbnailClick(room.nama, index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="room-detail flex-1 p-4">
                  <div className="room-header flex justify-between items-center mb-2">
                    <h4 className="room-name text-lg font-semibold text-gray-800">
                      {t("detail.room", { room: room.nama })}
                    </h4>
                    <p className="room-price text-cyan-700 font-bold">
                      Rp. {Number(room.harga).toLocaleString("id-ID")} {t("detail.night")}
                    </p>
                  </div>
                  {roomAmenities.length > 0 && (
                    <>
                      <p className="facility-title font-medium text-gray-700">
                        {t("detail.amenities")}
                      </p>
                      <ul className="room-facilities list-disc pl-5 mt-1 text-gray-700 text-sm">
                        {roomAmenities.map((facility, index) => (
                          <li key={index}>• {facility.nama}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TourRoomAndPrice;