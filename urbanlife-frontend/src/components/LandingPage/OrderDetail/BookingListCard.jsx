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
    <div className="pl-4 space-y-6">
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
    className={`
      w-full py-3 px-4 rounded-lg shadow-sm border-2 transition-all duration-300 ease-in-out
      flex items-center justify-between font-bold text-md
      ${availableTypes.length === 0 || loading 
        ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
        : 'border-cyan-500 bg-white text-cyan-600 hover:bg-cyan-50 hover:border-cyan-600 hover:shadow-md active:scale-[0.98]'
      }
      ${showDropdown ? 'border-cyan-600 bg-cyan-50' : ''}
    `}
  >
    <span className="flex items-center">
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Add Other Services
        </>
      )}
    </span>
    
    <FiChevronDown 
      className={`ml-2 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
    />
  </button>

  {/* Dropdown Menu */}
  {showDropdown && (
    <div className="absolute left-0 right-0 mt-2 border border-cyan-200 bg-white rounded-xl shadow-md z-20 overflow-hidden animate-in slide-in-from-top-2 duration-200">
      {availableTypes.length === 0 ? (
        <div className="px-4 py-6 text-center">
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p className="text-sm font-medium text-gray-500">
              Semua layanan sudah ditambahkan
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Tidak ada layanan lain yang tersedia
            </p>
          </div>
        </div>
      ) : (
        <div className="py-2">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Available Services
            </p>
          </div>
          
          {availableTypes.map((type, index) => (
            <button
              key={type.key}
              onClick={() => handleAddClick(type.key)}
              className={`
                w-full text-left px-4 py-3 transition-all duration-200
                hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50
                hover:border-l-4 hover:border-cyan-500
                focus:outline-none focus:bg-cyan-50 focus:border-l-4 focus:border-cyan-500
                flex items-center justify-between group
                ${index !== availableTypes.length - 1 ? 'border-b border-gray-50' : ''}
              `}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-cyan-700">
                  {type.label}
                </span>
              </div>
              
              <svg 
                className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 transform group-hover:translate-x-1 transition-all duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )}
  
  {/* nutup dropdown pas klik di luar */}
  {showDropdown && (
    <div 
      className="fixed inset-0 z-10" 
      onClick={() => setShowDropdown(false)}
    />
  )}
</div>    </div>
  );
};

export default BookingListCard;
