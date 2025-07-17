import { FiChevronRight, FiX } from "react-icons/fi";

const BookingItemCard = ({
  id,
  tanggal_mulai,
  tanggal_selesai,
  item_type,
  adultCount,
  childCount,
  hargaAnak,
  hargaDewasa,
  durasi,
  selectedDuration,
  selectedRoom,
  totalHarga,
  image,
  location,
  title,
  roomPrice,
  handleChange,
  handleRemove,
}) => {
  const fallbackImage = "https://via.placeholder.com/60?text=No+Image"; 

  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative space-y-4 w-full max-w-md">
      {/* Remove Button */}
      <button
        onClick={() => handleRemove(id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
      >
        <FiX className="w-5 h-5" />
      </button>

      {/* Booking Date */}
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Booking date
        </label>
        <div className="space-y-2">
          <input
            type="date"
            value={tanggal_mulai}
            onChange={(e) => handleChange("tanggal_mulai", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={tanggal_selesai}
            onChange={(e) => handleChange("tanggal_selesai", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Duration or Person Count */}
      <div className="flex justify-between items-end border-b border-gray-300 border-dashed pb-3">
        <div className="text-sm text-gray-600 w-1/2">
          <p className="font-medium mb-1">
            {item_type === "travel_package" ? "Person number" : "Duration"}
          </p>
          {item_type === "travel_package" ? (
            <div className="space-y-5">
              {/* Dewasa */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Adults
                </label>
                <select
                  value={adultCount}
                  onChange={(e) =>
                    handleChange("jumlah_dewasa", parseInt(e.target.value))
                  }
                  className="w-full border rounded-md px-2 py-1 text-sm"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Adult – Rp{" "}
                      {((hargaDewasa || 0) * n).toLocaleString("id-ID")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Anak */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Children
                </label>
                <select
                  value={childCount}
                  onChange={(e) =>
                    handleChange("jumlah_anak", parseInt(e.target.value))
                  }
                  className="w-full border rounded-md px-2 py-1 text-sm"
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {n} Child – Rp{" "}
                      {((hargaAnak || 0) * n).toLocaleString("id-ID")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : item_type === "kendaraan" ? (
            <select
              value={selectedDuration?.durasi}
              onChange={(e) => {
                const selected = durasi.find(
                  (d) => d.durasi === e.target.value
                );
                handleChange("selected_durasi", selected); // Kirim seluruh objek
                handleChange("harga", selected?.harga || 0); // Update harga juga
              }}
              className="w-full border rounded-md px-2 py-1 text-sm"
            >
              <option value="">Choose duration</option>
              {durasi.map((d) => (
                <option key={d.id} value={d.durasi}>
                  {d.durasi}
                </option>
              ))}
            </select>
          ) : (
              item_type === "akomodasi" && (
                <>
                  <div>
                    <select
                      value={selectedRoom?.room}
                      onChange={(e) => {
                        const selected = roomPrice.find(
                          (d) => d.nama === e.target.value
                        );
                        handleChange("selected_room", selected); // Kirim seluruh objek
                        handleChange("harga", selected?.harga || 0); // Update harga juga
                      }}
                      className="w-full border rounded-md px-2 py-1 text-sm"
                    >
                      <option value="">Choose duration</option>
                      {roomPrice.map((d) => (
                        <option key={d.id} value={d.nama}>
                          {d.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Durasi Menginap */}
                  <div className="mt-4">
                    <label className="block text-sm text-gray-600 mb-1">
                      Duration (Nights)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={durasi}
                      onChange={(e) =>
                        handleChange("durasi", parseInt(e.target.value))
                      }
                      className="w-full border rounded-md px-2 py-1 text-sm"
                    />
                  </div>
                </>
              )
            )}
        </div>

        <div className="text-sm text-right w-1/2">
          <p className="text-gray-500 font-medium">Price</p>
          <p className="font-bold text-gray-800 mt-1">
            Rp. {Number(totalHarga).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Tambah Anak */}
      {item_type === "TRAVEL_PACKAGE" && (
        <div className="flex justify-end text-sm text-blue-600">
          <label className="mr-2">+ Add Children:</label>
          <input
            type="number"
            value={childCount}
            min={0}
            onChange={(e) =>
              handleChange("jumlah_anak", parseInt(e.target.value))
            }
            className="w-16 border rounded px-2 py-1"
          />
        </div>
      )}

      {/* Image and Info */}
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt="Thumbnail"
          className="w-14 h-14 object-cover rounded-md aspect-square"
        />
        <div className="flex-1">
          <p className="text-[11px] text-gray-500 truncate">
            Location: {location}
          </p>
          <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
        </div>
      </div>

      {/* Change Package / Unit */}
      <div className="flex items-center text-sm text-red-500 font-medium cursor-pointer hover:underline">
        {item_type === "TRAVEL_PACKAGE" ? "Change package" : "Change unit"}
        <FiChevronRight className="ml-1 w-4 h-4" />
      </div>
    </div>
  );
};

export default BookingItemCard;
