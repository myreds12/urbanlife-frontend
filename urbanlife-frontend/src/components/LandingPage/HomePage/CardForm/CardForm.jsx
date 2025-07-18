import { useEffect, useState } from "react";
import { Calendar, Search, X } from "lucide-react";
import SearchResultsModal from "./SearchResultsModal";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const CardForm = () => {
  const [formData, setFormData] = useState({
    countryId: "",
    cityId: "",
    service: "",
    fromDate: "",
    toDate: "",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  console.log(searchResults, "SHOW RESULTS");

  const services = [
    { label: "Accomodation", value: "AKOMODASI" },
    { label: "Rent Car", value: "KENDARAAN" },
    { label: "Day Tour", value: "TRAVEL_PACKAGE" },
  ];

  // Fetch all countries
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const res = await apiClient.get("/negara");
        const mapped = res.data.data.map((n) => ({
          label: n.nama,
          value: n.id,
        }));
        setCountries(mapped);
      } catch (err) {
        console.error("Error fetching countries:", err);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Fetch cities when country changes
  useEffect(() => {
    if (!formData.countryId) return;

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const res = await apiClient.get(
          `/lokasi?negara_id=${formData.countryId}`
        );
        const mapped = res.data.data.map((c) => ({
          label: c.nama,
          value: c.id,
        }));
        setCities(mapped);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [formData.countryId]);

  // Input handler
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "countryId" && { cityId: "" }),
    }));
  };

  const handleSearch = async () => {
    const { countryId, cityId, service, fromDate, toDate } = formData;

    if (!countryId || !cityId || !service || !fromDate || !toDate) {
      alert("Please fill in all required fields!");
      return;
    }

    setIsSearching(true);
    setShowResults(false);

    try {
      const res = await apiClient.get("/pemesanan/items", {
        params: {
          date_from: fromDate,
          date_to: toDate,
          lokasi_id: cityId,
          negara_id: countryId,
          type: service,
        },
      });

      setSearchResults(res.data?.data || []);
      setShowResults(true);
    } catch (err) {
      console.error("Search API error:", err);
      alert("Failed to fetch search results.");
    } finally {
      setIsSearching(false);
    }
  };

  const clearForm = () => {
    setFormData({
      countryId: "",
      cityId: "",
      service: "",
      fromDate: "",
      toDate: "",
    });
    setCities([]);
    setSearchResults([]);
    setShowResults(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Select date";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full max-w-[400px] ml-auto mr-50 space-y-1 px-2 sm:px-0 pt-8">
      {/* Country */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <select
          className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white"
          value={formData.countryId}
          onChange={(e) => handleChange("countryId", e.target.value)}
        >
          <option value="" disabled>
            {loadingCountries ? "Loading countries..." : "Select country"}
          </option>
          {countries.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="bg-white rounded-xl shadow-md p-2">
        <select
          className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white"
          value={formData.cityId}
          onChange={(e) => handleChange("cityId", e.target.value)}
          disabled={!formData.countryId || loadingCities}
        >
          <option value="" disabled>
            {loadingCities
              ? "Loading cities..."
              : formData.countryId
              ? "Select city"
              : "Select country first"}
          </option>
          {cities.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Service, Dates, Buttons */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
        <select
          className="w-full p-2  bg-gray-100 border-0 rounded-md text-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white"
          value={formData.service}
          onChange={(e) => handleChange("service", e.target.value)}
        >
          <option value="" disabled>
            Select services
          </option>
          {services.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          {/* From */}
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              From
            </label>
            <div className="relative cursor-pointer">
              <input
                type="date"
                id="fromDateInput"
                value={formData.fromDate}
                onChange={(e) => handleChange("fromDate", e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div
                className="w-full p-2 bg-gray-100 rounded-md text-gray-700 text-sm flex items-center gap-2"
                onClick={() =>
                  document.getElementById("fromDateInput")?.showPicker()
                }
              >
                <Calendar size={14} className="text-gray-400" />
                {formatDate(formData.fromDate)}
              </div>
            </div>
          </div>

          {/* To */}
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              To
            </label>
            <div className="relative cursor-pointer">
              <input
                type="date"
                id="toDateInput"
                value={formData.toDate}
                onChange={(e) => handleChange("toDate", e.target.value)}
                min={formData.fromDate}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div
                className="w-full p-2 bg-gray-100 rounded-md text-gray-700 text-sm flex items-center gap-2"
                onClick={() =>
                  document.getElementById("toDateInput")?.showPicker()
                }
              >
                <Calendar size={14} className="text-gray-400" />
                {formatDate(formData.toDate)}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="flex-1 bg-cyan-600 text-white p-2 rounded-md text-sm font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Searching...
              </>
            ) : (
              <>
                <Search size={16} />
                Search
              </>
            )}
          </button>

          {Object.values(formData).some((v) => v) && (
            <button
              onClick={clearForm}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Clear form"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Result Modal */}
      <SearchResultsModal
        showResults={showResults}
        setShowResults={setShowResults}
        searchResults={searchResults}
        service={formData.service}
        services={services}
      />
    </div>
  );
};

export default CardForm;
