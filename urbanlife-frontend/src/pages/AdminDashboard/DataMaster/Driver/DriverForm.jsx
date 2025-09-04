import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const DriverForm = forwardRef((_, ref) => {
  const [guideId, setGuideId] = useState("");
  const [form, setForm] = useState({
    id: "",
    nama: "",
    nomor_hp: "",
    gender: "",
    fluent_english: "",
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
      const { nama, nomor_hp, gender, fluent_english } = form;
      if (!nama || !nomor_hp || !gender || !fluent_english) return null;
      return { ...form };
    },
    setFormData: (data) => {
      setForm({
        id: data.id || "",
        nama: data.nama || "",
        nomor_hp: data.nomor_hp || "",
        gender: data.gender || "",
        fluent_english: data.fluent_english === true ? "yes" : "no",
      });
    },
    resetForm: () => {
      setForm({
        id: "",
        nama: "",
        nomor_hp: "",
        gender: "",
        fluent_english: "",
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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
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
          placeholder="Enter driver name"
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
          placeholder="Enter phone number"
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
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="lg:col-span-1">
        <label className="block text-sm text-gray-600 mb-1">
          Fluent in English
        </label>
        <select
          name="fluent_english"
          value={form.fluent_english}
          onChange={handleChange}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        >
          <option value="">Choose</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    </div>
  );
});

export default DriverForm;
