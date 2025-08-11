import React from 'react';
import { FaChild, FaUser } from 'react-icons/fa';

const iconForLabel = (label) => {
  if (label.toLowerCase().includes("anak")) return <FaChild className="inline mr-1 text-blue-500" />;
  if (label.toLowerCase().includes("dewasa")) return <FaUser className="inline mr-1 text-green-500" />;
  return null;
};

const TourPrice = ({ priceTable }) => {
  if (!priceTable || priceTable.length === 0) {
    return (
      <div className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500 text-center">No price information available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Harga Paket</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-cyan-50 text-cyan-700 uppercase text-xs tracking-wider">
              <th className="p-3 border-b">Kategori</th>
              <th className="p-3 border-b text-right">Harga (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {priceTable.map((row) => (  
              <tr
                key={row.id}
                className="hover:bg-cyan-50 transition-colors duration-150"
              >
                <td className="p-3 border-b font-medium text-gray-700">
                  {iconForLabel(row.label)} {row.label}
                </td>
                <td className="p-3 border-b text-right font-semibold text-gray-800">
                  {Number(row.harga).toLocaleString("id-ID", {
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

export default TourPrice;
