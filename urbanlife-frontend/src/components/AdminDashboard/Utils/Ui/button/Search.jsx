import React from 'react';

const Search = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  className = "",
  width = "w-full sm:w-[250px]"
}) => {
  return (
    <div className={`relative ${width}`}>
      <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className={`pl-10 border border-gray-300 rounded-md px-3 py-2 text-sm w-full ${className}`}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
