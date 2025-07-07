import { useEffect, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import DestinationCard from "../../../../components/LandingPage/HomePage/DestinationCard";

const Destination = () => {
  const [orderItem, setOrderItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTravel = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        "/pemesanan/items?is_category=false"
      );

      console.log(response.data);

      const processed = response.data.data.map((item) => {
        const rawUrl = item.file_url;

        const imageUrl =
          rawUrl && rawUrl.trim() !== ""
            ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${rawUrl
                .replace(/\\/g, "/") 
                .replace(/^uploads\//, "")}`
            : "/images/default-thumbnail.png";

        return {
          ...item,
          image: imageUrl,
        };
      });

      setOrderItem(processed);
    } catch (err) {
      setError("❌ Gagal mengambil data paket travel");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravel();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="flex justify-center gap-6 flex-wrap">
      {orderItem.map((item) => (
        <DestinationCard key={`${item.item_type}-${item.id}`} travel={item} />
      ))}
    </div>
  );
};

export default Destination;
