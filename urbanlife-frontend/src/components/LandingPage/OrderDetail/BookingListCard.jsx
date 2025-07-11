import { useState } from "react";
import BookingItemCard from "./BookingItemCard";
import { FiChevronDown } from "react-icons/fi";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const BookingListCard = ({
  orderItems,
  onRemoveItem,
  onAddService,
  onUpdateItem,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const serviceTypes = [
    { key: "KENDARAAN", label: "Kendaraan", apiKey: "kendaraan" },
    { key: "TRAVEL_PACKAGE", label: "Paket Wisata", apiKey: "travel_package" },
    { key: "AKOMODASI", label: "Akomodasi", apiKey: "akomodasi" },
  ];

  // Pastikan item_type dibandingkan secara lowercase
  const existingTypes = orderItems.map((item) =>
    (item.item_type || "").toLowerCase()
  );

  // Filter tipe layanan yang belum ditambahkan
  const availableTypes = serviceTypes.filter(
    (type) => !existingTypes.includes(type.key.toLowerCase())
  );

  const handleAddClick = async (typeKey) => {
    setShowDropdown(false);
    setLoading(true);

    try {
      const response = await apiClient.get("/pemesanan/items?is_category=true");
      const result = response?.data?.data;

      if (!result) throw new Error("Result kosong dari API");

      const matchedService = serviceTypes.find(
        (s) => s.key.toLowerCase() === typeKey.toLowerCase()
      );

      if (!matchedService) {
        alert(`Service tidak ditemukan untuk tipe '${typeKey}'.`);
        return;
      }

      const items = result[matchedService.apiKey];

      if (onAddService) {
        onAddService({
          type: matchedService.key,
          items: items || [],
        });
      }
    } catch (error) {
      console.error("Failed to fetch service items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const item = orderItems[index];

    const updatedItem = {
      ...item,
      [field]: value,
    };

    if (field === "selected_durasi") {
      updatedItem.selected_durasi = { ...value }; // <-- penting!
    }

    if (field === "selected_room") {
      updatedItem.selected_room = { ...value }; // <-- penting!
    }

    onUpdateItem(item.item_id, updatedItem);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Booking</h2>

      {orderItems.length === 0 ? (
        <p className="text-gray-500 text-sm">No items added yet.</p>
      ) : (
        orderItems.map((item, index) => (
          <BookingItemCard
            key={item.id || index}
            id={item.item_id || index}
            tanggal_mulai={item.tanggal_mulai || ""}
            tanggal_selesai={item.tanggal_selesai || ""}
            adultCount={item.jumlah_dewasa || 1}
            childCount={item.jumlah_anak || 0}
            hargaAnak={item.harga_anak || 0}
            hargaDewasa={item.harga_dewasa || 0}
            durasi={item.durasi || []}
            selectedDuration={item.selected_durasi || ""}
            selectedRoom={item.selected_room || ""}
            totalHarga={item.total_harga || 0}
            image={item.image}
            location={item.lokasi || item.location}
            title={item.title || item.nama}
            roomPrice={item.room_and_price || []}
            item_type={item.item_type}
            handleChange={(field, value) =>
              handleFieldChange(index, field, value)
            }
            handleRemove={() => onRemoveItem(item.item_id)}
          />
        ))
      )}

      {/* Dropdown Add Service */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          disabled={availableTypes.length === 0 || loading}
          className="w-full py-2 px-4 rounded-md border bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-between"
        >
          {loading ? "Loading..." : "Tambah Layanan"}
          <FiChevronDown className="ml-2" />
        </button>

        {showDropdown && (
          <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow z-10">
            {availableTypes.length === 0 ? (
              <p className="px-4 py-2 text-sm text-gray-500">
                Semua layanan sudah ditambahkan
              </p>
            ) : (
              availableTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => handleAddClick(type.key)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {type.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingListCard;
