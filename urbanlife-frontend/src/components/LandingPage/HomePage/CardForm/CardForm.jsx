import React, { useState } from "react";
import { Calendar, MapPin, Search, X } from "lucide-react";
import SearchResultsModal from "./SearchResultsModal";
import { dummyResults, countries, cities, services } from "./DummyData";

const CardForm = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!country || !city || !service) {
      alert("Please fill in all required fields!");
      return;
    }

    setIsSearching(true);
    setShowResults(false);

    // Simulate API call
    setTimeout(() => {
      const results = dummyResults[service] || [];
      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    }, 1500);
  };

  const clearForm = () => {
    setFromDate("");
    setToDate("");
    setCountry("");
    setCity("");
    setService("");
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
    <div className="w-full max-w-[400px] ml-auto mr-0 space-y-1 px-2 sm:px-0 pt-8">
      <div className="bg-white rounded-xl shadow-md p-2">
        <select
          className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setCity("");
          }}
        >
          <option value="" disabled>
            Select country
          </option>
          {countries.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-md p-2">
        <select
          className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!country}
        >
          <option value="" disabled>
            {country ? "Select city" : "Select country first"}
          </option>
          {country &&
            cities[country]?.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
        <select
          className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
          value={service}
          onChange={(e) => setService(e.target.value)}
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
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              From
            </label>
            <div className="relative cursor-pointer">
              <input
                type="date"
                id="fromDateInput"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div
                className="w-full p-2 bg-gray-100 rounded-md text-gray-700 text-sm flex items-center gap-2"
                onClick={() => document.getElementById("fromDateInput")?.showPicker()}
              >
                <Calendar size={14} className="text-gray-400" />
                {formatDate(fromDate)}
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              To
            </label>
            <div className="relative cursor-pointer">
              <input
                type="date"
                id="toDateInput"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                min={fromDate}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div
                className="w-full p-2 bg-gray-100 rounded-md text-gray-700 text-sm flex items-center gap-2"
                onClick={() => document.getElementById("toDateInput")?.showPicker()}
              >
                <Calendar size={14} className="text-gray-400" />
                {formatDate(toDate)}
              </div>
            </div>
          </div>
        </div>

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

          {(country || city || service || fromDate || toDate) && (
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

      <SearchResultsModal
        showResults={showResults}
        setShowResults={setShowResults}
        searchResults={searchResults}
        country={country}
        city={city}
        service={service}
        cities={cities}
        services={services}
      />
    </div>
  );
};

export default CardForm;