import { X, Star, ShoppingCart } from "lucide-react";
import { formatBookingData } from "../../../AdminDashboard/Utils/FormatData/bookingFormatData";
import { useNavigate } from "react-router-dom";

const SearchResultsModal = ({
  showResults,
  setShowResults,
  searchResults,
  country,
  city,
  service,
  cities,
  services,
}) => {
  const navigate = useNavigate();
  const formatPrice = (harga) => {
    const parsed = parseInt(harga);
    return parsed > 0 ? `Rp ${parsed.toLocaleString("id-ID")}` : "Gratis";
  };

  const getImageSrc = (url) => {
    if (!url || url === "") return null;
    const cleanedUrl = url.replace(/^uploads[\\/]/, "").replace(/\\/g, "/");
    return `${import.meta.env.VITE_API_URL}/public/${cleanedUrl}`;
  };

  const getItemPrice = (item) => {
    switch (item.item_type) {
      case "KENDARAAN":
        return item.durasi?.[0]?.harga || 0;
      case "AKOMODASI":
        return item.room_and_price?.[0]?.harga || 0;
      case "TRAVEL_PACKAGE":
        return item.harga_dewasa || 0;
      default:
        return item.harga || 0;
    }
  };

  const handleOrderClick = (item) => {
    console.log(item, "clicked");
    const bookingData = formatBookingData(item);

    navigate(`/Detail/${item.id}`, { state: bookingData });
  };

  const renderItemDetails = (item) => {
    switch (item.item_type) {
      case "KENDARAAN":
        return (
          <>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">
              Model: {item.model || "Tanpa model"}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">
              Kapasitas: {item.kapasitas || "-"}
            </p>
          </>
        );

      case "AKOMODASI":
        return (
          <>
            <p className="text-xs sm:text-sm text-gray-500 mb-1 font-semibold">
              Ruangan:
            </p>
            <ul className="text-xs sm:text-sm text-gray-500 list-disc list-inside mb-1">
              {item.room_and_price?.map((room) => (
                <li key={room.id}>
                  {room.nama} – {formatPrice(room.harga)}
                </li>
              ))}
            </ul>
            <p className="text-xs sm:text-sm text-gray-500 mb-1 font-semibold">
              Fasilitas:
            </p>
            <ul className="text-xs sm:text-sm text-gray-500 list-disc list-inside">
              {item.facility_group?.flatMap((group) =>
                group.fasilitas?.map((fasilitas) => (
                  <li key={fasilitas.id}>
                    {group.nama}: {fasilitas.nama}
                  </li>
                ))
              )}
            </ul>
          </>
        );

      case "TRAVEL_PACKAGE":
        return (
          <>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">
              Destinasi: {item.itinerary?.length || 0} lokasi
            </p>
            <ul className="text-xs sm:text-sm text-gray-500 list-disc list-inside">
              {item.itinerary?.map((dest) => (
                <li key={dest.id}>{dest.nama}</li>
              ))}
            </ul>
          </>
        );

      default:
        return null;
    }
  };

  return (
    showResults && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
        <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl h-full sm:h-auto sm:max-h-[85vh] sm:mt-20 mt-20 max-h-120 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:px-6 border-b border-b-gray-300 shrink-0">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 truncate">
                Search Results ({searchResults.length})
              </h3>
              <div className="text-xs sm:text-sm text-gray-500 truncate">
                {country &&
                  cities[country]?.find((c) => c.value === city)?.label}{" "}
                • {services.find((s) => s.value === service)?.label}
              </div>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2 shrink-0"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 relative">
            {searchResults.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow relative"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      {/* Image */}
                      {getImageSrc(result.file_url) ? (
                        <img
                          src={getImageSrc(result.file_url)}
                          alt={result.nama}
                          className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-md shrink-0"
                        />
                      ) : (
                        <div className="w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs sm:text-sm shrink-0">
                          No image
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 w-full sm:w-auto">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                          {/* Main info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-1 line-clamp-2">
                              {result.nama}
                            </h4>
                            <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-1">
                              Lokasi: {result.lokasi?.nama},{" "}
                              {result.lokasi?.negara?.nama}
                            </p>
                            <div className="text-xs sm:text-sm text-gray-500 mb-3">
                              {renderItemDetails(result)}
                            </div>
                          </div>

                          {/* Price and rating */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1 shrink-0">
                            <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                              <div className="font-bold text-base sm:text-lg text-cyan-600">
                                {formatPrice(getItemPrice(result))}
                              </div>
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                                <Star
                                  size={14}
                                  className="sm:w-4 sm:h-4 text-yellow-500 fill-current"
                                />
                                <span>5.0</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Order button positioned at bottom right */}
                    <button
                      onClick={() => handleOrderClick(result)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap absolute bottom-4 right-4"
                    >
                      <ShoppingCart
                        size={14}
                        className="sm:w-4 sm:h-4"
                      />
                      Order
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="text-3xl sm:text-4xl mb-4">🔍</div>
                <p className="text-gray-500 text-sm sm:text-base">
                  No results found for your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SearchResultsModal;