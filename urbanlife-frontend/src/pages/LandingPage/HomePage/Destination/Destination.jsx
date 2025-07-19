import { useEffect, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import DestinationCard from "../../../../components/LandingPage/HomePage/DestinationCard";

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
          setOrderItem([]);
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
      } catch (err) {
        console.error("❌ Gagal mengambil data paket travel", err);
        setError("Gagal mengambil data paket travel.");
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

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (orderItem.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        Tidak ada data paket travel tersedia.
      </div>
    );
  }

  return children ? children(orderItem) : null;
};

export default Destination;