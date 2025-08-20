import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";
import Dropzone from "../../../../components/AdminDashboard/Utils/Form/DropZone";

const UserForm = forwardRef((_, ref) => {
  const [form, setForm] = useState({
    id: "",
    nama: "",
    email: "",
    nomor_hp: "",
    password: "",
    role_id: "",
  });

  const [roles, setRoles] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [existingImage, setExistingImage] = useState([]);

  // 🔹 Fetch Role
  const fetchRoles = async () => {
    try {
      const res = await apiClient.get("/role");
      setRoles(res.data.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch roles", err);
      toast.error("Failed to load role");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // 🔹 Imperative Handle
  useImperativeHandle(ref, () => ({
    setFormData(data) {
      setForm({
        nama: data.nama || "",
        email: data.email || "",
        nomor_hp: data.nomor_hp || "",
        password: "", // kosongkan saat edit
        role_id: data.role_id || "",
      });

      // Jika ada foto dari backend
      if (data.profile) {
        const fullImageUrl = `${
          apiClient.defaults.baseURL
        }/public/${data.profile.replace("uploads\\", "")}`;

        const mockFile = {
          name: "profile.png",
          preview: fullImageUrl,
          url: fullImageUrl,
        };
        setExistingImage([mockFile]);
      } else {
        setExistingImage([]);
      }

      setImageFile([]);
    },

    getFormData() {
      const { id, nama, email, nomor_hp, password, role_id } = form;
      if (!nama || !email || !nomor_hp || !role_id) {
        toast.error("Please complete all required fields.");
        return null;
      }

      // payload sesuai kebutuhan API
      const payload = {
        id: id || undefined, // hanya dikirim kalau edit
        nama,
        email,
        nomor_hp,
        role_id,
        file: imageFile.length > 0 ? imageFile[0] : null,
      };

      // password hanya ikut kalau diisi
      if (password) {
        payload.password = password;
      }

      return payload;
    },

    resetForm() {
      setForm({
        id: "",
        nama: "",
        email: "",
        nomor_hp: "",
        password: "",
        role_id: "",
      });
      setImageFile([]);
      setExistingImage([]);
    },
  }));

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Bagian kiri: form fields */}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nama */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            User's Name
          </label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Enter name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="user@example.com"
          />
        </div>

        {/* Nomor hp */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Phone Number
          </label>
          <input
            type="tel"
            name="nomor_hp"
            value={form.nomor_hp}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="08xxxxxxxxxx"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            placeholder={form.id ? "Fill in to update" : "Enter Password"}
          />
        </div>

        {/* Role */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Role
          </label>
          <select
            name="role_id"
            value={form.role_id}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bagian kanan: upload foto */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Profile Photo
        </label>
        <Dropzone
          files={imageFile}
          setFiles={setImageFile}
          multiple={false}
          existingFiles={existingImage}
        />
      </div>
    </div>
  );
});

export default UserForm;
