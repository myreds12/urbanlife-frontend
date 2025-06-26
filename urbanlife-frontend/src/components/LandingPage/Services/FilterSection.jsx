import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import '../../../styles/LandingPage/Services/FilterSection.css';

const FilterSection = ({ filters, setFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    countries: true,
    cities: true,
    services: true,
    price: true,
  });

  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);
  const MIN = 1000000;
  const MAX = 5000000;
  const STEP = 50000;

  // ====== FILTER OPTIONS ======
  // TODO: These will be replaced with dynamic data from Admin Dashboard
  // For now using static options, but structure is ready for API integration
  const getFilterOptions = () => {
    // TODO: Replace with availableOptions from API when backend is ready
    // const options = availableOptions || {
    //   countries: [],
    //   cities: [],
    //   services: []
    // };
    
    return {
      countries: [
        { name: 'all', displayName: 'All Countries', count: 100 },
        { name: 'indonesia', displayName: 'Indonesia', count: 70 },
        { name: 'vietnam', displayName: 'Vietnam', count: 30 },
      ],
      cities: [
        { name: 'jakarta', displayName: 'Jakarta', count: 1543 },
        { name: 'bali', displayName: 'Bali', count: 923 },
        { name: 'hanoi', displayName: 'Hanoi', count: 45 },
      ],
      services: [
        { name: 'day tour', displayName: 'Day Tour', count: 20 },
        { name: 'rent car', displayName: 'Rent Car', count: 3 },
        { name: 'accommodation', displayName: 'Accommodation', count: 3 },
      ],
    };
  };

  const filterOptions = getFilterOptions();

  // ====== SECTION TOGGLE ======
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // ====== FILTER CHANGE HANDLERS ======
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      countries: [],
      cities: [],
      services: [],
      priceRange: [MIN, MAX],
    });
    setLocalPriceRange([MIN, MAX]);
  };

  // ====== PRICE RANGE HANDLERS ======
  const handlePriceChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = parseInt(value);
    if (newRange[0] > newRange[1]) return; // Prevent range crossing
    setLocalPriceRange(newRange);
    setFilters((prev) => ({ ...prev, priceRange: newRange }));
  };

  // ====== FILTER GROUP COMPONENT ======
  const FilterGroup = ({ title, items, type, expanded }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(type)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-3 hover:text-gray-600 transition-colors"
      >
        {title}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {expanded && (
        <div className="space-y-2">
          {items.map((item) => (
            <label
              key={item.name}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={filters[type].includes(item.name.toLowerCase())}
                onChange={() => handleFilterChange(type, item.name.toLowerCase())}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <span className="text-sm text-gray-600 flex-1">
                {item.displayName || item.name}
              </span>
              <span className="text-xs text-gray-400">{item.count}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  // ====== ACTIVE FILTERS COUNT ======
  const getActiveFiltersCount = () => {
    return filters.countries.length + filters.cities.length + filters.services.length;
  };

  return (
    <div className="filter-section lg:w-80 flex-shrink-0 shadow-md">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
        
        {/* ====== FILTER HEADER ====== */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <h2 className="font-semibold text-gray-800">
              Applied filter
              {getActiveFiltersCount() > 0 && (
                <span className="ml-2 bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">
                  {getActiveFiltersCount()}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
            disabled={getActiveFiltersCount() === 0}
          >
            Clear all
          </button>
        </div>

        {/* ====== FILTER GROUPS ====== */}
        <FilterGroup
          title="Countries"
          items={filterOptions.countries}
          type="countries"
          expanded={expandedSections.countries}
        />
        
        <FilterGroup
          title="Cities"
          items={filterOptions.cities}
          type="cities"
          expanded={expandedSections.cities}
        />
        
        <FilterGroup
          title="Services"
          items={filterOptions.services}
          type="services"
          expanded={expandedSections.services}
        />

        {/* ====== PRICE RANGE SECTION ====== */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-3 hover:text-gray-600 transition-colors"
          >
            Price Range
            {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedSections.price && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-3 font-medium">
                <span>min. Rp {localPriceRange[0].toLocaleString()}</span>
                <span>max. Rp {localPriceRange[1].toLocaleString()}</span>
              </div>
              <div className="relative h-10 flex items-center">
                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={STEP}
                  value={localPriceRange[0]}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  className="range range-thumb-left"
                />
                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={STEP}
                  value={localPriceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  className="range range-thumb-right"
                />
                <div
                  className="absolute h-2 bg-gray-800 z-10 rounded-full"
                  style={{
                    left: `${((localPriceRange[0] - MIN) / (MAX - MIN)) * 100}%`,
                    width: `${((localPriceRange[1] - localPriceRange[0]) / (MAX - MIN)) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ====== SEARCH BUTTON ====== */}
        <button 
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium transition-colors shadow-sm"
          onClick={() => {
            // TODO: Implement search functionality if needed
            // For now, filtering happens automatically via useEffect
            console.log('Search with filters:', filters);
          }}
        >
          Search
        </button>

                {/* ====== ACTIVE FILTERS DISPLAY ====== */}
                <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Selected Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {filters.countries.map((country) => (
              <div
                key={`country-${country}`}
                className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {country}
                <button
                  onClick={() => handleFilterChange('countries', country)}
                  className="text-xs hover:text-red-600"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
            {filters.cities.map((city) => (
              <div
                key={`city-${city}`}
                className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {city}
                <button
                  onClick={() => handleFilterChange('cities', city)}
                  className="text-xs hover:text-red-600"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
            {filters.services.map((service) => (
              <div
                key={`service-${service}`}
                className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {service}
                <button
                  onClick={() => handleFilterChange('services', service)}
                  className="text-xs hover:text-red-600"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
