import React from "react";

const FilterBar = ({ filters = [] }) => {
  return (
    <div className="flex gap-2 items-center">
      {filters.map((filter, index) => {
        if (filter.type === "select") {
          return (
            <select
              key={index}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="w-30 h-[38px] px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-700"
            >
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          );
        }
        return null;
      })}
    </div>
  );
};

export default FilterBar;
