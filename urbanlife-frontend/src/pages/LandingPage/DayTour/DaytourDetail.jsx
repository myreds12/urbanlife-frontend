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
import { normalizeLanguageField } from '../../../components/AdminDashboard/Utils/Language/languageUtils';
import TourFacilities from "../../../components/LandingPage/DayTour/TourFacility";

const Detail = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  console.log('Current language:', i18n.language);
  console.log('State:', state);

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
          state.item_type === 'travel_package' ? 'travel-package' : state.item_type.toLowerCase();
        console.log(`Fetching data from endpoint: /${endpointType}/${state.id}`);
        const response = await apiClient.get(`/${endpointType}/${state.id}`);
        const data = response.data?.data;

        if (!data) {
          console.error("No data received from API");
          setLoading(false);
          return;
        }

        let images = [];
        let description = { en: 'No description available.', id: 'Tidak ada deskripsi tersedia.' };
        let policies = { en: '', id: '' };
        let itinerary = [];
        let priceTable = [];
        let roomAndPrice = [];
        let durasi = [];
        let price = data.harga || '0';
        let location = data.location || data.lokasi?.nama || '';
        let title = { en: data.nama || data.title || '', id: data.nama || data.title || '' };
        let package_prices = [];
        let facility = [];

        // Debug log data
        console.log('Raw data:', data);

        // normalisasi title kalo ada field terpisah (misal title_en, title_id)
        if (data.title_en && data.title_id) {
          title = normalizeLanguageField(data, 'title');
        }

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
            : ['/public/images/error/No_Image_Available.jpg'];

          // normalisasi deskripsi dan kebijakan
          description = normalizeLanguageField(data, 'kendaraan_content', true, 'deskripsi');
          policies = normalizeLanguageField(data, 'kendaraan_content', true, 'kebijakan');
          durasi = Array.isArray(data.kendaraan_durasi) ? data.kendaraan_durasi : [];
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
          description = normalizeLanguageField(data, 'akomodasi_content', true, 'deskripsi');
          policies = normalizeLanguageField(data, 'akomodasi_content', true, 'kebijakan');
          price = roomAndPrice[0]?.harga || price;
          facility = Array.isArray(data.akomodasi_facility_group) 
            ? data.akomodasi_facility_group
            : [];
        }

        if (state.item_type === 'travel_package') {
          images = Array.isArray(data.travel_package_itinerary)
            ? data.travel_package_itinerary[0].itinerary_files.map(
                (file) =>
                  `${apiClient.defaults.baseURL.replace(/\/$/, '')}/public/${file.url
                    .replace(/\\/g, '/')
                    .replace(/^uploads\//, '')}`
              )
            : ['/public/images/error/No_Image_Available.jpg'];

          description = normalizeLanguageField(data, 'travel_package_content', true, 'deskripsi');
          policies = normalizeLanguageField(data, 'travel_package_content', true, 'kebijakan');
          itinerary = Array.isArray(data.travel_package_itinerary)
            ? data.travel_package_itinerary
            : [];
          priceTable = [
            { id: 1, label: 'adult', harga: data.harga_dewasa || '0' },
            { id: 2, label: 'children', harga: data.harga_anak || '0' },
          ];
          price = data.harga_dewasa || price;

          package_prices = Array.isArray(data.travel_package_prices)
            ? data.travel_package_prices
            : [];
          durasi = data.durasi
        }

        const normalizedData = {
          ...data,
          images,
          title,
          price,
          location,
          durasi,
          type: state.item_type,
          description,
          policies,
          itinerary,
          priceTable,
          room_and_price: roomAndPrice,
          package_prices,
          facility: facility
        };

        console.log('Normalized tourData:', normalizedData);
        setTourData(normalizedData);
      } catch (error) {
        console.error('Error fetching detail:', error);
        // navigate('/not-found');
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
      ...(tourData?.type === "akomodasi" && tourData.facility.length > 0
      ? [{ id: "facilities", label: t("detail.facility") }]
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
        <TourImage images={tourData.images} itinerary_images={tourData.itinerary} title={tourData.title[i18n.language]} type={tourData.type} location={tourData.location} />
        <TourHeader
          title={tourData.title[i18n.language]}
          price={tourData.price}
          location={tourData.location}
          id={tourData.id}
          type={tourData.type}
          image={tourData.images?.[0]}
          content={{
            description: tourData.description[i18n.language],
            policies: tourData.policies[i18n.language],
            itinerary: tourData.itinerary,
            priceTable: tourData.priceTable,
            package_prices: tourData.travel_package_prices,
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
            <TourDescription description={tourData.description[i18n.language]} />
          )}
          {activeTab === "itinerary" && <TourItinerary itinerary={tourData.itinerary} />}
          {activeTab === "price" && <TourPrice priceTable={tourData.priceTable} package_prices={tourData.travel_package_prices} />}
          {activeTab === "facilities" && (
            <TourFacilities facilities={tourData.facility} />
          )}
          {activeTab === "room_and_price" && (
            <TourRoomAndPrice roomAndPrice={tourData.room_and_price} facilities={tourData.facility} />
          )}
          {activeTab === "durasi" && <TourDurasi durasi={tourData.durasi} />}
          {activeTab === "policies" && (
            <TourPolicies policies={tourData.policies[i18n.language]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
