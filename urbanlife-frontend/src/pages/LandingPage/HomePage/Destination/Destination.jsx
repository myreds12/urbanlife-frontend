import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import DestinationCard from "../../../../components/LandingPage/HomePage/DestinationCard";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    slideSpacing: "1.5rem",
    containScroll: "trimSnaps",
    breakpoints: {
      "(max-width: 640px)": { slidesToShow: 1 },
      "(min-width: 641px) and (max-width: 1024px)": { slidesToShow: 2 },
      "(min-width: 1025px)": { slidesToShow: 4 },
    },
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-cyan-600" />
      </div>
    );
  }

  return (
    <div className="destination-slider-container mt-[-60px] md:mt-[-150px] mb-10 relative w-full max-w-[1200px] mx-auto px-4 md:px-15 z-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {travelData.map((item) => (
            <div key={item.id} className="embla__slide flex-none">
              <DestinationCard travel={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay untuk opacity sisi kiri-kanan */}
      {/* desktop */}
      <div className="absolute inset-y-0 left-5 w-12 backdrop-blur-sm z-10 pointer-events-none hidden md:block"></div>
      <div className="absolute inset-y-0 right-5 w-12 backdrop-blur-sm z-10 pointer-events-none hidden md:block"></div>

      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
        onClick={scrollPrev}
      >
        ‹
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
        onClick={scrollNext}
      >
        ›
      </button>
    </div>
  );
};

export default Destination;