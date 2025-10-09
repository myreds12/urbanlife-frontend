import React from "react";
import { useTranslation } from "react-i18next";
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";

const TourItinerary = ({ itinerary }) => {
  const { t, i18n } = useTranslation();

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="bg-white p-4 rounded-md shadow-sm">
        <p className="text-gray-500">{t("Detail.noitinerary")}</p>
      </div>
    );
  }

  const langMap = {
    en: "ENGLISH",
    id: "INDONESIA",
  };

  const currentLang = i18n.language.split("-")[0];
  const targetLang = langMap[currentLang] || "INDONESIA";

  const filteredItinerary = itinerary.filter(
    (item) => item.bahasa === targetLang
  );

  const formatFileUrl = (path) => {
    return `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${path
      .replace(/\\/g, "/")
      .replace(/^uploads\//, "")}`;
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      <div className="space-y-6">
        {filteredItinerary.map((item, index) => (
          <div
          key={item.id || index}
          className="flex items-start justify-between gap-6 p-4 border-b border-gray-200"
        >
          <div className="flex gap-4 flex-1">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              {index < filteredItinerary.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">{item.nama}</h4>
              <p className="text-gray-700 text-md">{item.deskripsi}</p>
            </div>
          </div>

          <div className="w-40 md:w-56 flex-shrink-0">
            <img
              src={
                item.itinerary_files?.length > 0
                  ? formatFileUrl(item.itinerary_files[0].url)
                  : "/public/images/error/No_Image_Available.jpg"
              }
              alt="preview"
              className="w-full h-32 md:h-48 object-cover rounded-md"
            />
          </div>
        </div>

        ))}
      </div>
    </div>
  );
};

export default TourItinerary;
