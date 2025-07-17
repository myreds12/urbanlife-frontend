import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const GuideForm = forwardRef((_, ref) => {
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
      const res = await apiClient.get("/guide/next-code");
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
      if (!guideId || !nama || !nomor_hp || !gender || fluent_english === "")
        return null;

      return {
        id: guideId,
        nama,
        nomor_hp,
        gender,
        fluent_english: fluent_english === "yes",
      };
    },
    setFormData: (data) => {
      setForm({
        id: data.id || "",
        nama: data.nama || "",
        nomor_hp: data.nomor_hp || "",
        gender: data.gender || "",
        fluent_english: data.fluent_english === true ? "yes" : "no",
      });
      setGuideId(data.id || "");
    },
    resetForm: () => {
      setForm({
        nama: "",
        nomor_hp: "",
        gender: "",
        fluent_english: "",
      });
      fetchNextGuideId();
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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Guide ID</label>
        <input
          type="text"
          value={!form.id ? guideId : form.id}
          disabled
          readOnly
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm bg-gray-100 text-gray-600"
        />
      </div>

      <div className="lg:col-span-1">
        <label className="block text-sm text-gray-600 mb-1">Guide Name</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Enter guide name"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      <div className="lg:col-span-1">
        <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
        <input
          type="text"
          name="nomor_hp"
          value={form.nomor_hp}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      <div className="lg:col-span-1">
        <label className="block text-sm text-gray-600 mb-1">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        >
          <option value="">Choose</option>
          <option value="Laki - laki">Laki - laki</option>
          <option value="Perempuan">Perempuan</option>
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

export default GuideForm;
