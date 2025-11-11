import { useEffect, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import PopularCard from "./PopularCard";
import Carousel from "../../../AdminDashboard/Utils/Ui/Carousel";
import { useTranslation } from "react-i18next";

const defaultPopularCategories = [
  {
    id: "default-1",
    country: "Indonesia",
    nama: "Eastern Bali Tour",
    destinations: "4 Destinations",
    price: "1,200,000",
    image: "/images/LandingPage/Destination/EasternBaliTour.png",
  },
  {
    id: "default-2",
    country: "Vietnam",
    nama: "Toyota Alphard",
    destinations: "1 - 4 hours",
    price: "1,200,000",
    image: "/images/LandingPage/Categories/Alphard.png",
  },
  {
    id: "default-3",
    country: "Indonesia",
    nama: "Fourteen Roses Boutique Hotel",
    destinations: "Single Bed",
    price: "1,200,000/night",
    image: "/images/LandingPage/Categories/Fourteenroses.png",
  },
];

const PopularSection = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        // const res = await apiClient.get("/pemesanan/popular-items?take=4");
        const getPopularData = async (endpoint) => {
          const response = await apiClient.get(endpoint);
          return response.data.data.filter(item => item.is_popular);
        };

        const [filteredTravelPackage, filteredKendaraan, filteredAkomodasi] = await Promise.all([
          getPopularData("/travel-package"),
          getPopularData("/kendaraan"),
          getPopularData("/akomodasi")
        ]);

        const travelPackageWithType = filteredTravelPackage.map(item => ({
          ...item,
          item_type: "travel_package"
        }));

        const kendaraanWithType = filteredKendaraan.map(item => ({
          ...item,
          item_type: "kendaraan"
        }));

        const akomodasiWithType = filteredAkomodasi.map(item => ({
          ...item,
          item_type: "akomodasi"
        }));

        const allData = [...travelPackageWithType, ...kendaraanWithType, ...akomodasiWithType];
        console.log(allData, 'all data')
        const items = allData.map((item) => {
          let image = "";

          if (item.kendaraan_file && item.kendaraan_file.length != 0) {
            image = `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${item.kendaraan_file[0].url
              .replace(/\\/g, "/")
              .replace(/^uploads\//, "")}`;
          } else if (item.akomodasi_file && item.akomodasi_file != 0) {
            image = `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${item.akomodasi_file[0].url
              .replace(/\\/g, "/")
              .replace(/^uploads\//, "")}`;
          } else if (
            item.travel_package_itinerary?.[0]?.itinerary_files?.[0]?.url
          ) {
            image = `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${item.travel_package_itinerary[0].itinerary_files[0].url
              .replace(/\\/g, "/")
              .replace(/^uploads\//, "")}`;
          } else {
            image = "/public/images/error/No_Image_Available.jpg";
          }

          let destinations = "";
          let price = "";
          const language = i18n.language === "en" ? "ENGLISH" : "INDONESIA";

          switch (item.item_type) {
            case "akomodasi":
              destinations = item?.akomodasi_room_and_price[0]?.nama || "Akomodasi";
              price = `${Number(item.akomodasi_room_and_price[0].harga).toLocaleString(
                "id-ID"
              )}/night`;
              break;
            case "travel_package":
              // destinations = item?.travel_package_itinerary[0]?.nama || "Destinations";
              const data_dest = item?.travel_package_itinerary.filter((i) => i.bahasa === language)
              destinations = data_dest[0].nama
              price = `${(
                item.harga_dewasa ||
                item.harga_anak ||
                0
              ).toLocaleString("id-ID")}`;
              break;
            case "kendaraan":
              destinations =
                item.kendaraan_durasi?.[0]?.durasi.replace("hours", t("rentcar.hours")) || t("cardform.duration_not_available");
              price = `${(Number(item.kendaraan_durasi?.[0]?.harga) || 0).toLocaleString(
                "id-ID"
              )}`;
              break;
            default:
              destinations = "Kategori Tidak Diketahui";
              price = "0";
          }

          // return {
          //   id: item.id,
          //   country: item.lokasi?.negara?.nama || "Unknown",
          //   nama: item.nama,
          //   destinations,
          //   price,
          //   image,
          // };
          return {
            ...item,
            destinations: destinations,
            image: image,
          }
        });
        console.log(items, "ITEMS")

        setPopularItems(items);
      } catch (err) {
        console.error("Gagal fetch data populer:", err);
        setFetchFailed(true);
      }
    };

    fetchPopularItems();
  }, [i18n.language]);

  const dataToRender =
    fetchFailed || popularItems.length === 0
      ? defaultPopularCategories
      : popularItems;

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-15">
      {/* <Carousel
        items={dataToRender}
        gap={14}
        renderItem={(item) => (
          <PopularCard key={`${item.id}-${item.nama}`} item={item} />
        )}
      /> */}
      {dataToRender.map(item => (
        <PopularCard key={`${item.id}-${item.nama}`} item={item} />
      ))}
    </div>
  );
};

export default PopularSection;
