import { X, Star } from "lucide-react";

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

  const renderItemDetails = (item) => {
    switch (item.item_type) {
      case "KENDARAAN":
        return (
          <>
            <p className="text-sm text-gray-500 mb-1">
              Model: {item.model || "Tanpa model"}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              Kapasitas: {item.kapasitas || "-"}
            </p>
          </>
        );

      case "AKOMODASI":
        return (
          <>
            <p className="text-sm text-gray-500 mb-1 font-semibold">Ruangan:</p>
            <ul className="text-sm text-gray-500 list-disc list-inside mb-1">
              {item.room_and_price?.map((room) => (
                <li key={room.id}>
                  {room.nama} – {formatPrice(room.harga)}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mb-1 font-semibold">Fasilitas:</p>
            <ul className="text-sm text-gray-500 list-disc list-inside">
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
            <p className="text-sm text-gray-500 mb-1">
              Destinasi: {item.itinerary?.length || 0} lokasi
            </p>
            <ul className="text-sm text-gray-500 list-disc list-inside">
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                Search Results ({searchResults.length})
              </h3>
              <div className="text-sm text-gray-500">
                {country &&
                  cities[country]?.find((c) => c.value === city)?.label}{" "}
                • {services.find((s) => s.value === service)?.label}
              </div>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      {getImageSrc(result.file_url) ? (
                        <img
                          src={getImageSrc(result.file_url)}
                          alt={result.nama}
                          className="w-32 h-32 object-cover rounded-md flex-shrink-0"
                        />
                      ) : (
                        <div className="text-4xl w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
                          No image
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg text-gray-800 mb-1">
                              {result.nama}
                            </h4>
                            <p className="text-gray-600 text-sm mb-2">
                              Lokasi: {result.lokasi?.nama},{" "}
                              {result.lokasi?.negara?.nama}
                            </p>
                            <div className="text-sm text-gray-500">
                              {renderItemDetails(result)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-cyan-600">
                              {formatPrice(getItemPrice(result))}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Star
                                size={16}
                                className="text-yellow-500 fill-current"
                              />
                              <span>5.0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-gray-500">
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