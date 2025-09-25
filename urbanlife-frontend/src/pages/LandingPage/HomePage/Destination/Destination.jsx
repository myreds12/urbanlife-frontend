import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./swiper.css";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import DestinationCard from "../../../../components/LandingPage/HomePage/DestinationCard";

const Destination = () => {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await apiClient.get("/pemesanan/items?is_category=false");
        const rawData = response.data.data;

        const processed = rawData.map((item) => ({
          ...item,
          image: item.file_url
            ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${item.file_url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`
            : "/public/images/error/No_Image_Available.jpg",
        }));
        console.log(processed)
        setTravelData(processed);
      } catch (err) {
        console.error("❌ API Error:", err);
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
    <div className="destination-slider-container mt-[-130px] md:mt-[-150px] mb-10 relative w-full max-w-[1200px] mx-auto px-10 z-10">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          641: { slidesPerView: 2 },
          1025: { slidesPerView: 4 },
        }}
        loop={false}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        speed={800} // Meningkatkan durasi transisi menjadi 800ms untuk pergerakan lebih lambat
        resistanceRatio={0.5} // Mengurangi sensitivitas drag untuk kontrol lebih baik
        className="embla-swiper"
      >
        {travelData.map((item, index) => (
          <SwiperSlide key={index}>
            <DestinationCard travel={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigasi Manual */}
      <button
        className="custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="custom-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
};

export default Destination;