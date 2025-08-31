import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import { useTranslation } from "react-i18next";
import "../../../styles/LandingPage/HomePage/PartnerCard1.css";

const PartnerCard1 = () => {
  const { t } = useTranslation();
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
        console.log("API Response Data:", data); // Debug: Cek data yang diterima
        setPartners(data);
      } else {
        setError("Failed to fetch partners data");
      }
    } catch (err) {
      setError("Error fetching data: " + err.message);
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
            <div key={i} className="partner1-card">
              <div className="image-partner1">
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
            {t("discover.try") || "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  if (!partners.length) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-10 mb-1">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-gray-500 italic">No partners available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-10 mb-1">
      <div className="flex flex-wrap justify-center gap-14 mb-10">
        {partners.map((partner) => (
          <div key={partner.id} className="partner1-card">
            <div className="image-partner1">
              <img
                src={
                  partner.file
                    ? `${import.meta.env.VITE_API_URL}/public/${partner.file
                        .replace(/\\/g, "/")
                        .replace(/^uploads\//, "")
                        .replace(/^.\//, "")}` // Hapus ./ dari path lokal
                    : "/images/error/No_Images_Available.jpg"
                }
                alt={partner.nama || "Partner"}
                onError={(e) => {
                  console.log("Image load failed for:", partner.file); // Debug
                  e.target.src = "/images/error/No_Images_Available.jpg";
                  e.target.alt = partner.nama || "Partner Image";
                }}
                className="w-full h-full object-cover"
              />
              {partner.nama && (
                <p className="text-center text-sm mt-2 text-gray-700">
                  {partner.nama}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCard1;