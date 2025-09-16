import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import FilterSection from "../../../components/LandingPage/Services/FilterSection";
import ServiceCard from "../../../components/LandingPage/Services/ServiceCard";
import ServiceHeader from "../../../components/LandingPage/Services/ServiceHeader";
import "../../../styles/LandingPage/Services/Services.css";
import Navbar from "../../../components/LandingPage/HomePage/Navbar/Navbar";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const Services = () => {
  const [filters, setFilters] = useState({
    countries: [],
    cities: [],
    services: [],
    priceRange: [0, 15000000],
  });

  const [serviceData, setServiceData] = useState([]); // Semua data hasil fetch awal
  const [filteredServices, setFilteredServices] = useState([]); // Data hasil filter/search
  const [totalServices, setTotalServices] = useState(0); // Total dari API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const services = await apiClient.get("/pemesanan/items");
        setServiceData(services.data.data || []);
        setFilteredServices(services.data.data || []);
        setTotalServices(services.data.total || services.data.data.length || 0);
      } catch (err) {
        console.log(err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);

      // Build params
      const params = {
        take: 100,
        page: 1,
        type: filters.services[0] || "", // ambil 1 jenis layanan
        harga_min: filters.priceRange[0],
        harga_max: filters.priceRange[1],
      };

      // Tambahkan negara_ids[]
      filters.countries.forEach((id) => {
        if (!params["negara_ids"]) params["negara_ids"] = [];
        params["negara_ids"].push(id);
      });

      // Tambahkan lokasi_ids[]
      filters.cities.forEach((id) => {
        if (!params["lokasi_ids"]) params["lokasi_ids"] = [];
        params["lokasi_ids"].push(id);
      });

      const response = await apiClient.get("/pemesanan/items", {
        params,
        paramsSerializer: (params) => {
          const query = new URLSearchParams();
          Object.keys(params).forEach((key) => {
            if (Array.isArray(params[key])) {
              params[key].forEach((val) => query.append(key, val));
            } else {
              query.append(key, params[key]);
            }
          });
          return query.toString();
        },
      });

      setFilteredServices(response.data.data || []);
      setTotalServices(response.data.total || (response.data.data?.length || 0));
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch filtered services.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <p className="text-red-600 text-lg mb-4">
                Error loading services: {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ServiceHeader />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <FilterSection
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />

          {/* Content */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600 font-medium">
                {loading
                  ? "Loading services..."
                  : `Showing ${filteredServices.length} of ${totalServices} services`}
              </p>
            </div>

            {/* Loading Skeleton */}
            {loading && (
              <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
                  >
                    <div className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Service List */}
            {!loading && filteredServices.length > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={`${service.id} ${service.item_type}`}
                    service={service}
                  />
                ))}
              </div>
            )}

            {/* No Result */}
            {!loading && filteredServices.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                  <p className="text-gray-500 text-lg mb-4">
                    {t("servicepage.noservice")}
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        countries: [],
                        cities: [],
                        services: [],
                        priceRange: [1000000, 5000000],
                      });
                      setFilteredServices(serviceData);
                      setTotalServices(serviceData.length);
                    }}
                    className="text-cyan-600 hover:text-cyan-700 font-medium px-4 py-2 rounded-md hover:bg-cyan-50 transition-colors"
                  >
                    {t("servicepage.clearfilter")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;


