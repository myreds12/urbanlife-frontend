import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

const FilterSection = ({ filters, setFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    countries: true,
    cities: true,
    services: true,
    price: true
  });

  const filterOptions = {
    countries: [
      { name: "All", count: 100 },
      { name: "Indonesia", count: 70 },
      { name: "Vietnam", count: 30 }
    ],
    cities: [
      { name: "Jakarta", count: 1543 },
      { name: "Bali", count: 923 }
    ],
    services: [
      { name: "Day tour", count: 20 },
      { name: "Rent car", count: 3 },
      { name: "Accommodation", count: 3 }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      countries: [],
      cities: [],
      services: [],
      priceRange: [1000000, 5000000]
    });
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
        <div className="space-y-3">
          {items.map((item) => (
            <label key={item.name} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters[type].includes(item.name)}
                onChange={() => handleFilterChange(type, item.name)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 group-hover:border-teal-400"
              />
              <span className="text-sm text-gray-700 flex-1 group-hover:text-gray-900">{item.name}</span>
              <span className="text-sm text-gray-400">{item.count}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-8">
        {/* Applied Filter Header with Blue Background */}
        <div className="bg-blue-50 border-b border-blue-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <h2 className="font-semibold text-gray-800">Applied filter</h2>
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium px-3 py-1 rounded-md hover:bg-white/50 transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-6">
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
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="font-medium">min. Rp. 1.000.000</span>
                  <span className="font-medium">max. Rp. 5.000.000</span>
                </div>
                <div className="relative mb-6">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gray-800 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="absolute -top-1 left-0">
                    <div className="w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-sm"></div>
                  </div>
                  <div className="absolute -top-1 right-0">
                    <div className="w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium transition-colors shadow-sm">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};


export default FilterSection;