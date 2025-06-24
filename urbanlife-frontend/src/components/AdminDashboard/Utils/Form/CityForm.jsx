import { forwardRef, useImperativeHandle, useState } from "react";

const countries = ["Indonesia", "Vietnam"]; // bisa diganti dari props kalau perlu dinamis

const CityForm = forwardRef((_, ref) => {
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      if (!country || !name) return null;
      return {
        id: String(Date.now()).slice(-3), // simulasi ID otomatis
        country,
        name,
      };
    },
    resetForm: () => {
      setCountry("");
      setName("");
    },
  }));

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* City ID - Readonly */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City ID</label>
        <input
          type="text"
          value="Auto"
          disabled
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      {/* Country Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <select
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Choose</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* City name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City name</label>
        <input
          type="text"
          placeholder="Enter city name"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
});

export default CityForm;
