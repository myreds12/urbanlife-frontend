import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "../../../AdminDashboard/Utils/Ui/Carousel";
import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";
import DiscoverCard from "./DiscoverCard";

const DiscoverSection = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  // Fetch data
  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get("/negara?take=10&page=1&orderByMostItems=true");
      if (response.data.status === 200) {
        const filteredCountries = response.data.data.slice(0, 6); // Max 6
        setCountries(filteredCountries);
      } else {
        setError("Failed to fetch countries data");
      }
    } catch (err) {
      setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="flex gap-4 px-4 md:px-8 lg:px-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="discover-card">
            <div className="image-container">
              <div className="animate-pulse bg-gray-300 h-48 w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchCountries}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {t("discover.try")}
        </button>
      </div>
    );
  }

  if (!countries.length) {
    return <p className="text-center text-gray-500 italic">No data available</p>;
  }

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-15">
      <Carousel
        items={countries}
        gap={14}
        renderItem={(country) => <DiscoverCard key={country.id} country={country} />}
      />
      <div className="hidden md:block pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white via-white/70 to-transparent z-10"></div>
    </div>
  );
};

export default DiscoverSection;