import { forwardRef, useImperativeHandle, useState } from "react";

const CarForm = forwardRef(({ carId }, ref) => {
  const [form, setForm] = useState({
    id: "",
    nama: "",
    model: "",
    plat_nomor: "",
    status_pajak: true,
    tanggal_pajak_berakhir: "", // Default to today
  });


  // Helper untuk update field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // expose fungsi untuk parent
  useImperativeHandle(ref, () => ({
    setFormData: (data) => {
      setForm({
        id: data.id || "",
        model: data.model || "",
        nama: data.nama || "",
        plat_nomor: data.plat_nomor || "",
        status_pajak: data.status_pajak ,
        tanggal_pajak_berakhir: new Date(data.tanggal_pajak_berakhir).toISOString().split("T")[0] || "", // Format to YYYY-MM-DD
      });
    },
    getFormData: () => {
      const { nama, model, plat_nomor, tanggal_pajak_berakhir } = form;
      if (!nama || !model || !plat_nomor || !tanggal_pajak_berakhir)
        return null;
      return {
        ...form,
      };
    },
    resetForm: () => {
      setForm({
        nama: "",
        model: "",
        plat_nomor: "",
        status_pajak: "",
        tanggal_pajak_berakhir: "",
      });
    },
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Auto ID */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Unit ID</label>
        <input
          type="text"
          disabled
          value={!form.id ? carId : form.id}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Brand</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Enter brand"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      {/* Model */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Model</label>
        <input
          type="text"
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Enter model"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Police number
        </label>
        <input
          type="text"
          name="plat_nomor"
          value={form.plat_nomor}
          onChange={handleChange}
          placeholder="Enter police number"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      {/* Tax Status */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Vehicle tax status
        </label>
        <select
          name="status_pajak"
          value={
            form.status_pajak === true
              ? "true"
              : form.status_pajak === false
              ? "false"
              : ""
          }
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              status_pajak: e.target.value === "true" ? true : false,
            }))
          }
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        >
          <option value="">Choose</option>
          <option value="true">Active</option>
          <option value="false">Expired</option>
        </select>
      </div>

      {/* Tax Expiry */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Tax expiry period
        </label>
        <input
          type="date"
          name="tanggal_pajak_berakhir"
          value={form.tanggal_pajak_berakhir}
          onChange={handleChange}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>
    </div>
  );
});

export default CarForm;
