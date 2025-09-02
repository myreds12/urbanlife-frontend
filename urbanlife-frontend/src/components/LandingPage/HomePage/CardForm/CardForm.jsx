import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { DateInput } from "./DateInput";
import SearchResultsModal from "./SearchResultsModal";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import { useTranslation } from 'react-i18next';


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
  const { t } = useTranslation();

  console.log(searchResults, "SHOW RESULTS");

  const services = [
    { label: "Accomodation", value: "AKOMODASI" },
    { label: "Rent A Car", value: "KENDARAAN" },
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

  // const formatDate = (dateString) => {
  //   if (!dateString) return "Pilih tanggal";
  //   return new Date(dateString).toLocaleDateString("id-ID", {
  //     weekday: "short",
  //     day: "numeric",
  //     month: "short",
  //     year: "numeric",
  //   });
  // };

  return (
    <div className="w-full max-w-[360px] mr-40 sm:max-w-[400px] mx-auto space-y-2 px-4 sm:px-4 pt-2 sm:pt-6">
      {/* Country */}
      <div className="bg-white rounded-xl shadow-md p-3">
        <select
          className="w-full p-2.5 bg-gray-100 border-0 rounded-md text-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white"
          value={formData.countryId}
          onChange={(e) => handleChange("countryId", e.target.value)}
        >
          <option value="" disabled>
            {loadingCountries ? t("cardform.loading_countries") : t("cardform.select_country")}
          </option>
          {countries.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="bg-white rounded-xl shadow-md p-3">
        <select
          className="w-full p-2.5 bg-gray-100 border-0 rounded-md text-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white"
          value={formData.cityId}
          onChange={(e) => handleChange("cityId", e.target.value)}
          disabled={!formData.countryId || loadingCities}
        >
          <option value="" disabled>
            {loadingCities
              ? t("cardform.loading_city")
              : formData.countryId
              ? t("cardform.select_city")
              : t("cardform.select_city_first")}
          </option>
          {cities.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Service, Dates, Buttons */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
        <select
          className="w-full p-2.5 bg-gray-100 border-0 rounded-md text-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white"
          value={formData.service}
          onChange={(e) => handleChange("service", e.target.value)}
        >
          <option value="" disabled>
            {t("cardform.select_services")}
          </option>
          {services.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            <DateInput
              label={t("cardform.from")}
              selected={formData.fromDate}
              onChange={(date) => handleChange("fromDate", date)}
            />

            <DateInput
              label={t("cardform.to")}
              selected={formData.toDate}
              minDate={formData.fromDate}
              onChange={(date) => handleChange("toDate", date)}
            />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="flex-1 bg-cyan-600 text-white p-2.5 rounded-md text-sm font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                {t("cardform.searching")}
              </>
            ) : (
              <>
                <Search size={16} />
                {t("cardform.search")}
              </>
            )}
          </button>

          {Object.values(formData).some((v) => v) && (
            <button
              onClick={clearForm}
              className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title={t("cardform.clear_form")}
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
        country={formData.countryId}
        city={formData.cityId}
        service={formData.service}
        cities={{ [formData.countryId]: cities }}
        services={services}
      />
    </div>
  );
};

export default CardForm;