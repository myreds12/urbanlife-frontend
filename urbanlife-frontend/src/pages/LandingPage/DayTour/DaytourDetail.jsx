import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TourImage from "../../../components/LandingPage/DayTour/TourImage";
import TourHeader from "../../../components/LandingPage/DayTour/TourHeader";
import TourDescription from "../../../components/LandingPage/DayTour/TourDescription";
import TourItinerary from "../../../components/LandingPage/DayTour/TourItinerary";
import TourPrice from "../../../components/LandingPage/DayTour/TourPrice";
import Navbar from "../../../components/LandingPage/HomePage/Navbar/Navbar";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import "../../../styles/LandingPage/DayTour/DaytourDetail.css";

const DaytourDetail = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Ambil ID dari URL
  const { state } = useLocation(); // Ambil data dari state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        // Coba ambil data dari API berdasarkan ID
        const response = await apiClient.get(`/pemesanan/items/${id}`);
        const data = response.data.data;

        if (data) {
          setTourData({
            id: data.id,
            title: data.nama,
            price: data.harga_dewasa || 0,
            rating: 4.8, // Bisa diganti dengan data dari API jika ada
            reviews: 142, // Bisa diganti dengan data dari API jika ada
            duration: data.durasi_hari
              ? `${data.durasi_hari} Days`
              : "Full Day",
            maxGuests: 8, // Bisa diganti dengan data dari API jika ada
            location: `${data.lokasi?.nama || "Unknown"}, ${
              data.lokasi?.negara?.nama || "Unknown"
            }`,
            images: data.file_url
              ? [
                  `${apiClient.defaults.baseURL.replace(
                    /\/$/,
                    ""
                  )}/public/${data.file_url
                    .replace(/\\/g, "/")
                    .replace(/^uploads\//, "")}`,
                ]
              : ["/public/images/error/No_Image_Available.jpg"],
            description:
              data.content?.description || "No description available.",
            policies: data.content?.policies || [],
            itinerary: data.content?.itinerary || [],
            priceTable: data.content?.priceTable || [], // Jika ada data priceTable
          });
        } else {
          // Fallback ke data dari state jika API gagal
          setTourData({
            ...state,
            images: state.image
              ? [state.image]
              : ["/public/images/error/No_Image_Available.jpg"],
            description:
              state.content?.description || "No description available.",
            policies: state.content?.policies || [],
            itinerary: state.content?.itinerary || [],
            priceTable: state.content?.priceTable || [],
          });
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
        // Gunakan data dari state sebagai fallback
        setTourData({
          ...state,
          images: state.image
            ? [state.image]
            : ["/public/images/error/No_Image_Available.jpg"],
          description:
            state.content?.description || "No description available.",
          policies: state.content?.policies || [],
          itinerary: state.content?.itinerary || [],
          priceTable: state.content?.priceTable || [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, [id, state]);

  const handleBookNow = () => {
    const bookingData = {
      id: tourData.id,
      title: tourData.title,
      type: tourData.type || "travel_package",
      country: tourData.country || "Unknown",
      location: tourData.location || "Unknown",
      image: tourData.images[0],
      content: tourData.content || [],
      tanggal: new Date().toISOString().split("T")[0],
      price: tourData.price || 0,
      harga_dewasa: tourData.price,
      harga_anak: tourData.harga_anak || 0,
      durasi_hari: tourData.durasi_hari || 0,
    };

    console.log("Navigating to OrderDetail with data:", bookingData);
    navigate(`/OrderDetail?type=${bookingData.type}&id=${bookingData.id}`, {
      state: bookingData,
    });
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "itinerary", label: "Itinerary" },
    { id: "price", label: "Price" },
  ];

  if (loading) {
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

      <div className="mt-25">
        {/* Tour Images */}
        <TourImage images={tourData.images} title={tourData.title} />

        {/* Tour Header */}
        <TourHeader
          title={tourData.title}
          price={tourData.price}
          location={tourData.location}
        />

        {/* Tabs Navigation */}
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

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === "description" && (
            <TourDescription
              description={tourData.description}
              policies={tourData.policies}
            />
          )}
          {activeTab === "itinerary" && (
            <TourItinerary itinerary={tourData.itinerary} />
          )}
          {activeTab === "price" && (
            <TourPrice priceTable={tourData.priceTable} />
          )}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleBookNow}
            className="px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaytourDetail;
