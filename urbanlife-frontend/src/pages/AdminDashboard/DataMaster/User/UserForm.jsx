import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

const UserForm = forwardRef((_, ref) => {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nama: "",
    email: "",
    nomor_hp: "",
    password: "",
    role_id: "",
  });

  const fetchRoles = async () => {
    try {
      const res = await apiClient.get("/roles");
      setRoles(res.data.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch roles", err);
      toast.error("Failed to load role");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      const { nama, email, nomor_hp, role_id } = form;
      if (!nama || !email || !nomor_hp || !role_id) {
        toast.error("Please complete all required fields.");
        return null;
      }
      return { ...form };
    },
    setFormData: (data) => {
      setForm({
        id: data.id || "",
        nama: data.nama || "",
        email: data.email || "",
        nomor_hp: data.nomor_hp || "",
        password: "",
        role_id: data.role_id || "",
      });
    },
    resetForm: () => {
      setForm({
        id: "",
        nama: "",
        email: "",
        nomor_hp: "",
        password: "",
        role_id: "",
      });
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      {/* Nama */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">User's Name</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-300 rounded-lg shadow-sm"
          placeholder="user@example.com"
        />
      </div>

      {/* Nomor hp */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
        <input
          type="tel"
          name="nomor_hp"
          value={form.nomor_hp}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-300 rounded-lg shadow-sm"
          placeholder="08xxxxxxxxxx"
        />
      </div>

      {/* Password */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-300 rounded-lg shadow-sm"
          placeholder={form.id ? "Fill in to update" : "Enter Password"}
        />
      </div>

      {/* Role */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Role</label>
        <select
          name="role_id"
          value={form.role_id}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-300 rounded-lg shadow-sm"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.nama}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default UserForm;