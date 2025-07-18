import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../styles/LandingPage/HomePage/DiscoverCard.css";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const DiscoverCard = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get("/negara?take=10&page=1");
      if (response.data.status === 200) {
        // Filter status: true dan ambil 3 item pertama
        const filteredCountries = response.data.data
          .filter((country) => country.status)
          .slice(0, 3);
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

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="discover-card">
            <div className="image-container">
              <div className="animate-pulse bg-gray-300 h-48 w-full"></div>
              <div className="description">
                <div className="animate-pulse bg-gray-300 h-6 w-24 mb-2"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-16 mb-2"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-32"></div>
              </div>
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
          Try Again
        </button>
      </div>
    );
  }

  if (!countries.length) {
    return <p>No data available</p>;
  }

  return (
    <>
      {countries.map((country) => (
        <div className="discover-card" key={country.id}>
          <div className="image-container">
            <img
              src={
                country.url
                  ? `${import.meta.env.VITE_API_URL}/${country.url.replace(
                      /\\/g,
                      "/"
                    )}`
                  : "/images/LandingPage/Discover/default.png"
              }
              alt={country.nama}
            />
            <div className="description">
              <div className="country-title">{country.nama}</div>
              <h2 className="city-title">{`${country.total_lokasi} Cities`}</h2>
              <p className="desc-text">{`${country.total_lokasi} Destinations, ${country.total_akomodasi} Hotels, ${country.total_kendaraan} Vehicles`}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DiscoverCard;