import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TourImage from "../../DayTour/TourImage";
import TourHeader from "../../DayTour/TourHeader";
import TourDescription from "../../DayTour/TourDescription";
import TourRoomAndPrice from "../../DayTour/TourRoomAndPrice";
import TourPolicies from "../../DayTour/TourPolicies";
import Navbar from "../../HomePage/Navbar/Navbar";
import Footer from "../../HomePage/Footer";
import "../../../../styles/LandingPage/DayTour/DaytourDetail.css";
import "./AccoDetail.css";
import TourFacilities from "../../DayTour/TourFacility";
import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";

const AccoDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const formatFileUrl = (path) => {
    if (!path) return "/public/images/error/No_Image_Available.jpg";
    return `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${path
      .replace(/\\/g, "/")
      .replace(/^uploads\//, "")}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/akomodasi/${id}`);
        const accommodation = res.data.data;

        if (!accommodation) {
          setTourData(null);
          return;
        }

        // Transform data sesuai struktur API
        const transformedData = {
          id: accommodation.id,
          title: accommodation.nama,
          type: "akomodasi",
          price: accommodation.akomodasi_room_and_price?.[0]?.harga || "0",
          location: accommodation.lokasi?.nama || "",
          images: accommodation.akomodasi_file?.map(file => formatFileUrl(file.url)) || [],
          description:
            accommodation.akomodasi_content?.find(c => c.bahasa === "ENGLISH")?.deskripsi ||
            accommodation.akomodasi_content?.[0]?.deskripsi ||
            "Tidak ada deskripsi.",
          facilities: accommodation.akomodasi_facility_group || [],
          policies: accommodation.akomodasi_content?.[0]?.kebijakan
            ? accommodation.akomodasi_content[0].kebijakan.split("\n").map(p => ({ policyname: p }))
            : [],
          room_and_price:
            accommodation.akomodasi_room_and_price?.map(room => ({
              nama: room.nama,
              harga: room.harga,
              AkomodasiFile: room.AkomodasiFile || [],
              amenity: room.amenity?.map(f => ({ nama: f })) || [],
            })) || [],
        };

        setTourData(transformedData);
      } catch (err) {
        console.error("Error fetching accommodation:", err);
        setTourData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const tabs = [
    { id: "description", label: t("detail.description") },
    { id: "facilities", label: t("detail.facility") },
    ...(tourData?.room_and_price?.length > 0
      ? [{ id: "room_and_price", label: t("detail.roomnprice") }]
      : []),
    { id: "policies", label: t("detail.policy") },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-cyan-600" />
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen pt-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("detail.noaccomodation")}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {t("detail.backtohome")}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto p-6 space-y-8 pt-24">
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
            itinerary: [],
            priceTable: [],
          }}
          room_and_price={tourData.room_and_price}
        />
        <div className="mt-8 mb-1">
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
          {activeTab === "facilities" && (
            <TourFacilities facilities={tourData.facilities} />
          )}
          {activeTab === "room_and_price" && (
            <TourRoomAndPrice 
              roomAndPrice={tourData.room_and_price} 
              facilities={tourData.facilities} 
            />
          )}
          {activeTab === "policies" && (
            <TourPolicies policies={tourData.policies} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccoDetail;