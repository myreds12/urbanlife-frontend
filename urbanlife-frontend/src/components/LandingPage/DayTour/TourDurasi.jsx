import React from "react";

const TourDurasi = ({ durasi }) => {
  if (!durasi || durasi.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-gray-500 italic">Tidak ada data durasi tersedia.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Durasi & Harga</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-cyan-600 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Durasi</th>
              <th className="px-6 py-3 text-left">Harga</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {durasi.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 font-medium text-gray-700">
                  {item.durasi}
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

export default TourDurasi;
