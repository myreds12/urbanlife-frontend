import React from "react";

const TourRoomAndPrice = ({ roomAndPrice }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Room & Price</h2>

      {roomAndPrice.length === 0 ? (
        <p className="text-gray-500 italic">No room and price data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-cyan-600 text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Room Type</th>
                <th className="px-6 py-3 text-left">Price (Rp)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {roomAndPrice.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {room.nama}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {Number(room.harga).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TourRoomAndPrice;
