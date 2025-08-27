import React from "react";

const TourRoomAndPrice = ({ roomAndPrice }) => {
  // Fungsi format URL file (sama kayak di AccoDetail)
  const formatFileUrl = (path) => {
    if (!path) return "/public/images/error/No_Image_Availa ble.jpg";
    return `http://your-api-base-url/public/${path
      .replace(/\\/g, "/")
      .replace(/^uploads\//, "")}`;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Room & Price</h2> */}

      {roomAndPrice.length === 0 ? (
        <p className="text-gray-500 italic">No room and price data available.</p>
      ) : (
        <div className="space-y-4">
          {roomAndPrice.map((room, idx) => (
            <div
              key={idx}
              className="room-card border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row"
            >
              {/* Bagian Gambar */}
              <div className="room-image-box md:w-1/3">
                <img
                  src={formatFileUrl(room.AkomodasiFile?.[0]?.url)}
                  alt={`${room.nama} preview`}
                  className="w-full h-48 object-cover"
                />
                {/* Thumbnail (opsional, kalo ada lebih dari 1 gambar) */}
                {room.AkomodasiFile?.length > 1 && (
                  <div className="room-thumbnails flex gap-2 mt-2 p-2">
                    {room.AkomodasiFile.slice(0, 3).map((file, index) => (
                      <img
                        key={index}
                        src={formatFileUrl(file.url)}
                        alt={`Thumb ${index + 1}`}
                        className="w-16 h-16 rounded-lg border-2 border-gray-200 hover:border-cyan-500 cursor-pointer"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Bagian Detail Room */}
              <div className="room-detail flex-1 p-4">
                <div className="room-header flex justify-between items-center mb-2">
                  <h4 className="room-name text-lg font-semibold text-gray-800">{room.nama}</h4>
                  <p className="room-price text-cyan-700 font-bold">
                    IDR {Number(room.harga).toLocaleString("id-ID")} /night
                  </p>
                </div>
                {/* Amenity (opsional, kalo ada data) */}
                {room.amenity?.length > 0 && (
                  <>
                    <p className="facility-title font-medium text-gray-700">Amenities:</p>
                    <ul className="room-facilities list-disc pl-5 mt-1 text-gray-700 text-sm">
                      {room.amenity.map((fac, index) => (
                        <li key={index}>• {fac.nama}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourRoomAndPrice;
//TODO: Image per room nya blm diberesin