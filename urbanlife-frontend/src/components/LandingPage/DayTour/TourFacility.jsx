import React from "react";
import { useTranslation } from "react-i18next";

const TourFacilities = ({ facilities }) => {
  const { t } = useTranslation();

  // Filter for hotel facilities (type 2)
  const hotelFacilities = facilities.filter(f => f.type === 2);
  
  // Get all facility items from hotel facility groups
  const allFacilities = hotelFacilities.flatMap(group => 
    group.fasilitas?.map(f => ({ nama: f.nama })) || []
  );

  return (
    <div className="space-y-4 bg-white p-4 rounded-md shadow-sm">
      <div className="space-y-1">
        <p className="font-bold text-gray-900">{t("detail.hotelfacility")}</p>
        <div className="space-y-2">
          {allFacilities.map((item, index) => (
            <div key={index} className="flex gap-2">
              <p className="text-gray-700">•</p>
              <p className="text-gray-700">{item.nama}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourFacilities;