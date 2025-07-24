import { useEffect, useState, useRef } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import DestinationCard from "../DestinationCard";

const dummyDestinations = [
  {
    id: 1,
    nama: "Eastern Bali Tour",
    item_type: "travel_package",
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: { nama: "Bali", negara: { nama: "Indonesia" } },
    file_url: null,
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
  {
    id: 2,
    nama: "Danang",
    item_type: "travel_package",
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: { nama: "Danang", negara: { nama: "Vietnam" } },
    file_url: null,
    image: "/images/LandingPage/Destination/Danang.png",
  },
  {
    id: 3,
    nama: "Jakarta",
    item_type: "travel_package",
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: { nama: "Jakarta", negara: { nama: "Indonesia" } },
    file_url: null,
    image: "/images/LandingPage/Destination/Jakarta.png",
  },
  {
    id: 4,
    nama: "Ho Chi Minh City",
    item_type: "travel_package",
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: { nama: "Ho Chi Minh City", negara: { nama: "Vietnam" } },
    file_url: null,
    image: "/images/LandingPage/Destination/HoChiMinhCity.png",
  },
  {
    id: 5,
    nama: "Jakarta",
    item_type: "travel_package",
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: { nama: "Jakarta", negara: { nama: "Indonesia" } },
    file_url: null,
    image: "/images/LandingPage/Destination/Jakarta.png",
  },
  {
    id: 6,
    nama: "Ho Chi Minh City",
    item_type: "travel_package",
    harga_dewasa: 1200000,
    durasi_hari: 4,
    lokasi: { nama: "Ho Chi Minh City", negara: { nama: "Vietnam" } },
    file_url: null,
    image: "/images/LandingPage/Destination/HoChiMinhCity.png",
  },
];

const Destination = () => {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await apiClient.get("/pemesanan/items?is_category=false");
        const rawData = response.data.data;

        if (!rawData || rawData.length === 0) {
          console.warn("⚠️ API returned empty data, using dummy fallback");
          setTravelData(dummyDestinations);
          return;
        }

        const processed = rawData.map((item) => ({
          ...item,
          image: item.file_url
            ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${item.file_url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`
            : "/public/images/error/No_Image_Available.jpg",
        }));
        setTravelData(processed);
      } catch (err) {
        console.error("❌ API Error - using dummy data fallback:", err);
        setTravelData(dummyDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchTravel();

    // Auto-scroll setup
    const itemsPerView = window.innerWidth > 768 ? 4 : window.innerWidth > 480 ? 2 : 1;
    const totalItems = travelData.length;
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    if (totalItems > itemsPerView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [travelData.length]);

  const cardWidth = window.innerWidth > 768 ? 275 : window.innerWidth > 480 ? 212 : window.innerWidth - 120;
  const translateX = -currentIndex * cardWidth;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-cyan-600" />
      </div>
    );
  }

  return (
    <div className="destination-slider-container mt-[-150px] mb-10 relative w-full max-w-[1200px] mx-auto px-4 z-10">
      <div
        className="auto-scroll-wrapper overflow-hidden"
        ref={sliderRef}
        onMouseEnter={() => clearInterval(intervalRef.current)}
        onMouseLeave={() =>
          (intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
          }, 4000))
        }
      >
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {travelData.map((item) => (
            <div key={item.id} className="flex-none w-[275px]">
              <DestinationCard travel={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destination;