import { forwardRef, useImperativeHandle, useState } from "react";

const CityForm = forwardRef(({ countries = [], cityId }, ref) => {
  const [form, setForm] = useState({
    id: "",
    negara_id: "",
    nama: "",
  });

  useImperativeHandle(ref, () => ({
    setFormData: (data) => {
      setForm({
        id: data.id || "",
        negara_id: data.negara_id || "",
        nama: data.nama || "",
      });
    },
    getFormData: () => {
      if (!form.negara_id || !form.nama.trim()) return null;
      return {
        negara_id: parseInt(form.negara_id),
        nama: form.nama.trim(),
      };
    },
    resetForm: () => {
      setForm({ id: "" ,negara_id: "", nama: "" });
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* City ID - Readonly */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City ID
        </label>
        <input
          type="text"
          value={!form.id ? cityId : form.id}
          disabled
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      {/* Country Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <select
          name="negara_id"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          value={form.negara_id}
          onChange={handleChange}
        >
          <option value="">Choose</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.nama}
            </option>
          ))}
        </select>
      </div>

      {/* City name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City name
        </label>
        <input
          type="text"
          name="nama"
          placeholder="Enter city name"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          value={form.nama}
          onChange={handleChange}
        />
      </div>
    </div>
  );
});

export default CityForm;
