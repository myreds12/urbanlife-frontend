import { useEffect, useState } from "react";
import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";
import PartnerCard from "./PartnerCard";
import Carousel from "../../../AdminDashboard/Utils/Ui/Carousel";
import "../../../../styles/LandingPage/HomePage/PartnerCard.css";

const PartnerSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get("/our-partner", {
        params: { page: 1, take: 10 },
      });
      if (response.data.status === 200) {
        const data = response.data.data || [];
        setPartners(data);
      } else {
        setError("Gagal mengambil data partner");
      }
    } catch (err) {
      setError("Error mengambil data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-10 mb-1">
        <div className="flex flex-wrap justify-center gap-14 mb-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="partner-card">
              <div className="image-partner">
                <div className="animate-pulse bg-gray-300 h-48 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-10 mb-1">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchPartners}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!partners.length) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-10 mb-1">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-gray-500 italic">Tidak ada partner tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-15">
      <Carousel
        items={partners}
        gap={14}
        renderItem={(partner) => (
          <PartnerCard
            key={partner.id}
            image={
              partner.file
                ? `${import.meta.env.VITE_API_URL}/public/${partner.file
                    .replace(/\\/g, "/")
                    .replace(/^uploads\//, "")
                    .replace(/^.\//, "")}`
                : "/images/error/No_Images_Available.jpg"
            }
          />
        )}
      />
    </div>
  );
};

export default PartnerSection;
