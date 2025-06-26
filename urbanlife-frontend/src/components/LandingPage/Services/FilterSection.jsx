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

  const filterOptions = {
    countries: [
      { name: 'All', count: 100 },
      { name: 'Indonesia', count: 70 },
      { name: 'Vietnam', count: 30 },
    ],
    cities: [
      { name: 'Jakarta', count: 1543 },
      { name: 'Bali', count: 923 },
    ],
    services: [
      { name: 'Day tour', count: 20 },
      { name: 'Rent car', count: 3 },
      { name: 'Accommodation', count: 3 },
    ],
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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

  const handlePriceChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = parseInt(value);
    if (newRange[0] > newRange[1]) return; // avoid cross
    setLocalPriceRange(newRange);
    setFilters((prev) => ({ ...prev, priceRange: newRange }));
  };

  const FilterGroup = ({ title, items, type, expanded }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(type)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-3"
      >
        {title}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {expanded && (
        <div className="space-y-2">
          {items.map((item) => (
            <label
              key={item.name}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters[type].includes(item.name)}
                onChange={() => handleFilterChange(type, item.name)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600 flex-1">{item.name}</span>
              <span className="text-xs text-gray-400">{item.count}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="filter-section lg:w-80 flex-shrink-0 shadow-md">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <h2 className="font-semibold text-gray-800">Applied filter</h2>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            Clear all
          </button>
        </div>

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

        {/* Price Range */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-3"
          >
            Price
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

        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium transition-colors">
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
