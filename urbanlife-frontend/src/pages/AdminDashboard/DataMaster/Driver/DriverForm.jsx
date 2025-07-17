import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const DriverForm = forwardRef((_, ref) => {
  const [guideId, setGuideId] = useState("");
  const [form, setForm] = useState({
    id: "",
    nama: "",
    nomor_hp: "",
    gender: "",
    tanggal_periode_berakhir: "",
  });

  const fetchNextGuideId = async () => {
    try {
      const res = await apiClient.get("/driver/next-code");
      setGuideId(res.data?.data.code || "");
    } catch (err) {
      console.error("Failed to fetch next guide ID", err);
    }
  };

  useEffect(() => {
    fetchNextGuideId();
  }, []);

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      const { nama, nomor_hp, gender, tanggal_periode_berakhir } = form;
      if (!nama || !nomor_hp || !gender || !tanggal_periode_berakhir) return null;
      return { ...form };
    },
    setFormData: (data) => {
      setForm({
        id: data.id || "",
        nama: data.nama || "",
        nomor_hp: data.nomor_hp || "",
        gender: data.gender || "",
        tanggal_periode_berakhir: data.tanggal_periode_berakhir || "",
      });
    },
    resetForm: () => {
      setForm({
        id: "",
        nama: "",
        nomor_hp: "",
        gender: "",
        tanggal_periode_berakhir: "",
      });
      fetchNextGuideId(); // optionally regenerate guide ID
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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Driver ID */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Driver ID</label>
        <input
          type="text"
          value={guideId}
          disabled
          readOnly
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm bg-gray-100 text-gray-600"
        />
      </div>

      {/* Nama */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Name</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-300 rounded-lg shadow-sm"
          placeholder="Driver Name"
        />
      </div>

      {/* Nomor HP */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Phone</label>
        <input
          type="text"
          name="nomor_hp"
          value={form.nomor_hp}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-300 rounded-lg shadow-sm"
          placeholder="08xxxxxxxx"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-300 rounded-lg shadow-sm"
        >
          <option value="">Select</option>
          <option value="Laki - laki">Laki - laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      {/* Expiry Date */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Expired Date</label>
        <input
          type="date"
          name="tanggal_periode_berakhir"
          value={form.tanggal_periode_berakhir}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
});

export default DriverForm;
