import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TourImage from "../../../components/LandingPage/DayTour/TourImage";
import TourHeader from "../../../components/LandingPage/DayTour/TourHeader";
import TourDescription from "../../../components/LandingPage/DayTour/TourDescription";
import TourPolicies from "../../../components/LandingPage/DayTour/TourPolicies";
import TourItinerary from "../../../components/LandingPage/DayTour/TourItinerary";
import TourPrice from "../../../components/LandingPage/DayTour/TourPrice";
import Navbar from "../../../components/LandingPage/HomePage/Navbar/Navbar";
import "../../../styles/LandingPage/DayTour/DaytourDetail.css";
import TourRoomAndPrice from "../../../components/LandingPage/DayTour/TourRoomAndPrice";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import TourDurasi from "../../../components/LandingPage/DayTour/TourDurasi";

const Detail = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [tourData, setTourData] = useState(null);
  console.log(tourData, "tour data");
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log(state, "state detail");

  useEffect(() => {
    const fetchData = async () => {
      if (!state?.item_type || !state?.id) {
        console.log("Invalid state:", state);
        navigate("/not-found");
        return;
      }

      setLoading(true);

      try {
        const endpointType =
          state.item_type === "travel_package"
            ? "travel-package"
            : state.item_type.toLowerCase();

        console.log(
          `Fetching data from endpoint: /${endpointType}/${state.id}`
        );

        const response = await apiClient.get(`/${endpointType}/${state.id}`);
        const data = response.data?.data;

        if (!data) {
          console.error("No data received from API");
          setLoading(false);
          return;
        }

        let images = [];
        let description = "No description available.";
        let policies = "";
        let itinerary = [];
        let priceTable = [];
        let roomAndPrice = [];
        let durasi = [];
        let price = data.harga || "0";
        let location = data.location || data.lokasi?.nama || "";

        // Debug log data
        console.log("Raw data:", data);

        if (state.item_type === "kendaraan") {
          images = Array.isArray(data.kendaraan_file)
            ? data.kendaraan_file.map(
                (file) =>
                  `${apiClient.defaults.baseURL.replace(
                    /\/$/,
                    ""
                  )}/public/${file.url
                    .replace(/\\/g, "/")
                    .replace(/^uploads\//, "")}`
              )
            : ["/public/images/error/No_Image_Available.jpg"];

          if (
            Array.isArray(data.kendaraan_content) &&
            data.kendaraan_content[0]?.kebijakan
          ) {
            policies = data.kendaraan_content[0].kebijakan;
          }

          durasi = Array.isArray(data.kendaraan_durasi)
            ? data.kendaraan_durasi
            : [];
          price = durasi[0]?.harga || price;
        }

        if (state.item_type === "akomodasi") {
          images = Array.isArray(data.akomodasi_file)
            ? data.akomodasi_file.map(
                (file) =>
                  `${apiClient.defaults.baseURL.replace(
                    /\/$/,
                    ""
                  )}/public/${file.url
                    .replace(/\\/g, "/")
                    .replace(/^uploads\//, "")}`
              )
            : ["/public/images/error/No_Image_Available.jpg"];

          roomAndPrice = Array.isArray(data.akomodasi_room_and_price)
            ? data.akomodasi_room_and_price
            : [];
          description = data.akomodasi_content?.[0]?.deskripsi || description;

          if (
            Array.isArray(data.akomodasi_content) &&
            data.akomodasi_content[0]?.kebijakan
          ) {
            policies = data.akomodasi_content[0].kebijakan;
          }

          price = roomAndPrice[0]?.harga || price;
        }

        if (state.item_type === "travel_package") {
          images = Array.isArray(data.travelPackageFile)
            ? data.travelPackageFile.map(
                (file) =>
                  `${apiClient.defaults.baseURL.replace(
                    /\/$/,
                    ""
                  )}/public/${file.url
                    .replace(/\\/g, "/")
                    .replace(/^uploads\//, "")}`
              )
            : ["/public/images/error/No_Image_Available.jpg"];

          description =
            data.travel_package_content?.[0]?.deskripsi || description;
          itinerary = Array.isArray(data.travel_package_itinerary)
            ? data.travel_package_itinerary
            : [];

          if (
            Array.isArray(data.travel_package_content) &&
            data.travel_package_content[0]?.kebijakan
          ) {
            policies = data.travel_package_content[0].kebijakan;
          }

          priceTable = [
            {
              id: 1,
              label: "Adult",
              harga: data.harga_dewasa || "0",
            },
            {
              id: 2,
              label: "Children",
              harga: data.harga_anak || "0",
            },
          ];

          price = data.harga_dewasa || price;
        }

        const fallbackData = {
          ...data,
          images,
          title: data.nama || data.title || "",
          price,
          location,
          durasi,
          type: state.item_type,
          description,
          policies,
          itinerary,
          priceTable,
          room_and_price: roomAndPrice,
        };

        console.log("Formatted fallbackData:", fallbackData);

        setTourData(fallbackData);
      } catch (error) {
        console.error("Error fetching detail:", error);
        // navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state, navigate]);

  const tabs = [
    { id: "description", label: t("detail.description") },
    ...(tourData?.type === "travel_package" && tourData.itinerary.length > 0
      ? [{ id: "itinerary", label: t("detail.itinerary") }]
      : []),
    ...(tourData?.type === "travel_package" && tourData.priceTable.length > 0
      ? [{ id: "price", label: t("detail.priceadultandchild") }]
      : []),
    ...(tourData?.type === "akomodasi" && tourData.room_and_price.length > 0
      ? [{ id: "room_and_price", label: t("detail.roomnprice") }]
      : []),
    ...(tourData?.type === "kendaraan" && tourData.durasi.length > 0
      ? [{ id: "durasi", label: t("detail.duration") }]
      : []),
    { id: "policies", label: t("detail.policy") },
  ];

  if (loading || !tourData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-cyan-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="mt-24">
        <TourImage images={tourData.images} title={tourData.title} />
        <TourHeader
          title={tourData.title}
          price={tourData.price}
          location={tourData.location}
          id={tourData.id}
          type={tourData.type}
          image={tourData.images?.[0]}
          content={{
            description: tourData.description,
            policies: tourData.policies,
            itinerary: tourData.itinerary,
            priceTable: tourData.priceTable,
          }}
          harga_dewasa={tourData.harga_dewasa}
          harga_anak={tourData.harga_anak}
          durasi_hari={tourData.durasi_hari}
          room_and_price={tourData.room_and_price}
          durasi={tourData.durasi}
          tipe={tourData.tipe}
        />

        <div className="mt-5 mb-1">
          <nav className="flex space-x-7">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-1 font-medium text-lg navbar-menu-item relative ${
                  activeTab === tab.id ? "active" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="min-h-96">
          {activeTab === "description" && (
            <TourDescription description={tourData.description} />
          )}
          {activeTab === "itinerary" && (
            <TourItinerary itinerary={tourData.itinerary} />
          )}
          {activeTab === "price" && (
            <TourPrice priceTable={tourData.priceTable} />
          )}
          {activeTab === "room_and_price" && (
            <TourRoomAndPrice roomAndPrice={tourData.room_and_price} />
          )}
          {activeTab === "durasi" && <TourDurasi durasi={tourData.durasi} />}
          {activeTab === "policies" && (
            <TourPolicies policies={tourData.policies} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
