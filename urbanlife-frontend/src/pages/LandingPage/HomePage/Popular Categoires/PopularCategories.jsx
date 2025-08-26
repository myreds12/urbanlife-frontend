import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import CategoriesCard from "../../../../components/LandingPage/HomePage/CategoriesCard";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const defaultPopularCategories = [
  {
    id: "default-1",
    country: "Indonesia",
    title: "Eastern Bali Tour",
    destinations: "4 Destinations",
    price: "1,200,000",
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
  {
    id: "default-2",
    country: "Vietnam",
    title: "Toyota Alphard",
    destinations: "1 - 4 hours",
    price: "1,200,000",
    image: "/images/LandingPage/Categories/Alphard.png",
  },
  {
    id: "default-3",
    country: "Indonesia",
    title: "Fourteen Roses Boutique Hotel",
    destinations: "Single Bed",
    price: "1,200,000/night",
    image: "/images/LandingPage/Categories/Fourteenroses.png",
  },
];

const PopularCategoriesSection = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [fetchFailed, setFetchFailed] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const res = await apiClient.get("/pemesanan/popular-items?take=4");
        const items = res.data.data.map((item) => {
          const image = item.file_url
            ? `${apiClient.defaults.baseURL}/public/${item.file_url.replace(/\\/g, "/").replace(/^uploads\//, "")}`
            : "/public/images/error/No_Image_Available.jpg";

          let destinations = "";
          let price = "";

          switch (item.item_type) {
            case "AKOMODASI":
              destinations = item?.room_and_price[0]?.nama || "Akomodasi";
              price = `${Number(item.room_and_price[0].harga).toLocaleString("id-ID")}/night`;
              break;
            case "TRAVEL_PACKAGE":
              destinations = item?.itinerary[0]?.nama || "Destinations";
              price = `${(item.harga_dewasa || item.harga_anak || 0).toLocaleString("id-ID")}`;
              break;
            case "KENDARAAN":
              destinations = item.durasi?.[0]?.durasi || "Durasi tidak tersedia";
              price = `${(Number(item.durasi?.[0]?.harga) || 0).toLocaleString("id-ID")}`;
              break;
            default:
              destinations = "Kategori Tidak Diketahui";
              price = "0";
          }

          return {
            id: item.id,
            country: item.lokasi?.negara?.nama || "Unknown",
            title: item.nama,
            destinations,
            price,
            image,
          };
        });

        setPopularItems(items);
      } catch (err) {
        console.error("Gagal fetch data populer:", err);
        setFetchFailed(true);
      }
    };

    fetchPopularItems();
  }, []);

  const dataToRender = fetchFailed || popularItems.length === 0 ? defaultPopularCategories : popularItems;

  return (
    <div className="popular-categories-slider-container relative w-full max-w-[1200px] mx-auto px-4 md:px-15">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {dataToRender.map((item) => (
            <div key={`${item.id}-${item.title}`} className="embla__slide flex-none px-2">
              <CategoriesCard
                country={item.country}
                title={item.title}
                destinations={item.destinations}
                price={item.price}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* overlay */}
      <div className="absolute inset-y-0 left-5 w-12 backdrop-blur-sm z-10 pointer-events-none hidden md:block"></div>
      <div className="absolute inset-y-0 right-5 w-12 backdrop-blur-sm z-10 pointer-events-none hidden md:block"></div>

      {/* tombol prev/next */}
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

export default PopularCategoriesSection;
