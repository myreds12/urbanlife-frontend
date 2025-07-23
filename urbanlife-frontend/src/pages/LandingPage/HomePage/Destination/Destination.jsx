import { useEffect, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import DestinationCard from "../../../../components/LandingPage/HomePage/DestinationCard";

// Dummy data fallback - copy paste dari kode pertama lu
const dummyDestinations = [
  {
    id: 1,
    nama: "Eastern Bali Tour",
    item_type: "travel_package",
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: {
      nama: "Bali",
      negara: { nama: "Indonesia" }
    },
    file_url: null,
    image: "/images/LandingPage/Destination/EasternBaliTour.png"
  },
  {
    id: 2,
    nama: "Danang",
    item_type: "travel_package", 
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: {
      nama: "Danang",
      negara: { nama: "Vietnam" }
    },
    file_url: null,
    image: "/images/LandingPage/Destination/Danang.png"
  },
  {
    id: 3,
    nama: "Jakarta",
    item_type: "travel_package",
    harga_dewasa: 1200000, 
    durasi_hari: 4,
    lokasi: {
      nama: "Jakarta",
      negara: { nama: "Indonesia" }
    },
    file_url: null,
    image: "/images/LandingPage/Destination/Jakarta.png"
  },
  {
    id: 4,
    nama: "Ho Chi Minh City",
    item_type: "travel_package",
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: {
      nama: "Ho Chi Minh City", 
      negara: { nama: "Vietnam" }
    },
    file_url: null,
    image: "/images/LandingPage/Destination/HoChiMinhCity.png"
  },
    {
    id: 5,
    nama: "Jakarta",
    item_type: "travel_package",
    harga_dewasa: 1200000, 
    durasi_hari: 4,
    lokasi: {
      nama: "Jakarta",
      negara: { nama: "Indonesia" }
    },
    file_url: null,
    image: "/images/LandingPage/Destination/Jakarta.png"
  },
  {
    id: 6,
    nama: "Ho Chi Minh City",
    item_type: "travel_package",
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: {
      nama: "Ho Chi Minh City", 
      negara: { nama: "Vietnam" }
    },
    file_url: null,
    image: "/images/LandingPage/Destination/HoChiMinhCity.png"
  },

];

const Destination = ({ children }) => {
  const [orderItem, setOrderItem] = useState([]);
  const [loading, setLoading] = useState(true); // langsung true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await apiClient.get("/pemesanan/items?is_category=false");
        const rawData = response.data.data;

        if (!rawData || rawData.length === 0) {
          // setOrderItem([]);

          console.warn("⚠️ API returned empty data, using dummy fallback");
          setOrderItem(dummyDestinations);
          return;
        }

        const processed = rawData.map((item) => {
          const rawUrl = item.file_url;
          const imageUrl =
            rawUrl?.trim()
              ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${rawUrl
                  .replace(/\\/g, "/")
                  .replace(/^uploads\//, "")}`
              : "/public/images/error/No_Image_Available.jpg";
          return { ...item, image: imageUrl };
        });

        setOrderItem(processed);
        setError(null); // Reset error state
      } catch (err) {
        // console.error("❌ Gagal mengambil data paket travel", err);
        // setError("Gagal mengambil data paket travel.");


        console.error("❌ API Error - using dummy data fallback:", err);
        setError("API Error - menggunakan data dummy");
        setOrderItem(dummyDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchTravel();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-cyan-600" />
      </div>
    );
  }
  // if (error) {
  //   return <div className="text-red-500 text-center py-4">{error}</div>;
  // }

  // if (orderItem.length === 0) {
  //   return (
  //     <div className="text-gray-500 text-center py-10">
  //       Tidak ada data paket travel tersedia.
  //     </div>
  //   );
  // }

  // return children ? children(orderItem) : null;


  const dataToRender = orderItem.length > 0 ? orderItem : dummyDestinations;
  return children ? children(dataToRender) : null;
};

export default Destination;