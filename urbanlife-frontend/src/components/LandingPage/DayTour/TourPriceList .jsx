import React from "react";
import { useTranslation } from "react-i18next";

const TourPriceList  = ({ price_list }) => {
  const { t } = useTranslation()

  if (!price_list || price_list.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-gray-500 italic">{t("rentcar.not_found")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("airport.description_price")}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-cyan-600 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">{t("airport.description")}</th>
              <th className="px-6 py-3 text-left">{t("airport.price")}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {price_list.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 font-medium text-gray-700">
                  {item.nama}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {parseInt(item.harga).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourPriceList ;
