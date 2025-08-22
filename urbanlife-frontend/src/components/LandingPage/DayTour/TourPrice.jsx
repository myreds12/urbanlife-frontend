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
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Harga Paket</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-cyan-600 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Kategpri</th>
              <th className="px-6 py-3 text-left">Harga (Rp) </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {priceTable.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 font-medium text-gray-700">
                  {iconForLabel(row.label)} {row.label}
                </td>
                <td className="px-6 py-4 text-gray-600">
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
