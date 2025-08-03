import apiClient from "../ApiClient/apiClient";

export const formatBookingData = (travelOrService) => {
  const tanggalHariIni = new Date().toISOString().split("T")[0];

  let formatted = {
    id: travelOrService.id,
    title: travelOrService.nama,
    item_type: travelOrService.item_type?.toLowerCase(),
    country: travelOrService.lokasi?.negara?.nama || "Unknown",
    location: travelOrService.lokasi?.nama || "Unknown",
    image: travelOrService.file_url
      ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${travelOrService.file_url
          .replace(/\\/g, "/")
          .replace(/^uploads\//, "")}`
      : "/public/images/error/No_Image_Available.jpg",
    content: travelOrService.content || [],
    tanggal: tanggalHariIni,
  };

  switch (travelOrService.item_type?.toLowerCase()) {
    case "travel_package":
      formatted.price = travelOrService.harga_dewasa ?? 0;
      formatted.itinerary = travelOrService.itinerary || [];
      formatted.harga_dewasa = travelOrService.harga_dewasa;
      formatted.harga_anak = travelOrService.harga_anak;
      formatted.durasi_hari = travelOrService.durasi_hari;
      break;

    case "akomodasi":
      formatted.room_and_price = travelOrService.room_and_price || [];
      formatted.price = travelOrService.room_and_price?.[0]?.harga ?? 0;
      break;

    case "kendaraan":
      formatted.durasi = travelOrService.durasi || [];
      formatted.tipe = travelOrService.tipe;
      formatted.price = travelOrService.durasi?.[0]?.harga
        ? parseInt(travelOrService.durasi[0].harga)
        : 0;
      break;

    default:
      formatted.price = 0;
  }

  return formatted;
};
