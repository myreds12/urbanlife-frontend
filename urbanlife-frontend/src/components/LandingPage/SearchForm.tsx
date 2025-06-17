import { useState } from "react";

const SearchForm = () => {
  const [category, setCategory] = useState("Day Tour");

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <div className="tabs tabs-boxed">
        <a
          className={`tab ${category === "Day Tour" ? "tab-active" : ""}`}
          onClick={() => setCategory("Day Tour")}
        >
          Day Tour
        </a>
        <a
          className={`tab ${category === "Rent Car" ? "tab-active" : ""}`}
          onClick={() => setCategory("Rent Car")}
        >
          Rent Car
        </a>
      </div>
      {category === "Rent Car" && (
        <select className="select select-bordered w-full mt-2">
          <option>Car rent location</option>
          {/* Tambah opsi lain jika perlu */}
        </select>
      )}
      <div className="flex space-x-2 mt-2">
        <input type="date" className="input input-bordered w-full" />
        <input type="date" className="input input-bordered w-full" />
      </div>
      {category === "Rent Car" && (
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            value="1 Day"
            className="input input-bordered w-full bg-base-200"
            readOnly
          />
          <input
            type="text"
            value="Rent duration 12 hrs/day"
            className="input input-bordered w-full bg-base-200"
            readOnly
          />
        </div>
      )}
      <button className="btn bg-teal-500 text-white w-full mt-2">Search</button>
    </div>
  );
};

export default SearchForm;