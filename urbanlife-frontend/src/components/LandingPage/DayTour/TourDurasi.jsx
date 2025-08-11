import React from "react";

const TourDurasi = ({ durasi }) => {
  if (!durasi || durasi.length === 0) {
    return (
      <div className="bg-white p-4 rounded-md shadow-sm">
        <p className="text-gray-600">Tidak ada data durasi tersedia.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Durasi & Harga</h3>
      <table className="w-full text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border border-gray-200">Durasi</th>
            <th className="p-2 border border-gray-200">Harga</th>
          </tr>
        </thead>
        <tbody>
          {durasi.map((item) => (
            <tr key={item.id} className="text-gray-800">
              <td className="p-2 border border-gray-200">{item.durasi}</td>
              <td className="p-2 border border-gray-200">
                Rp {parseInt(item.harga).toLocaleString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourDurasi;
