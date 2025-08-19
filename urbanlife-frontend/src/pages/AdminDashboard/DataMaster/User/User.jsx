import { useEffect, useRef, useState, useMemo } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import Export from "../../../../components/AdminDashboard/Utils/Ui/button/Export";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import dummyUsers from "./dummyUser";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const [searchTerm, setSearchTerm] = useState("");
  const isEditing = Boolean(editingId);
  const formRef = useRef(null);

  // bener atau salah...?
  //   const fetchUsers = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await apiClient.get("/users");
  //       setUsers(res.data.data || []);
  //     } catch (err) {
  //       console.error("❌ Failed to fetch users", err);
  //       toast.error("Failed to load users data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const fetchUsers = async () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(dummyUsers);
      setLoading(false);
    }, 500);
  };

  const handleSave = async () => {
    const newData = formRef.current?.getFormData();
    if (!newData) return;

    const payload = {
      nama: newData.nama,
      email: newData.email,
      nomor_hp: newData.nomor_hp,
      role_id: Number(newData.role_id),
    };

    if (newData.password) {
      payload.password = newData.password;
    }

    // create = password wajib diisi
    if (!isEditing && !payload.password) {
      toast.error("Password is required for new user");
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        // UPDATE user
        await apiClient.patch(`/users/${editingId}`, payload);
        toast.success("User updated successfully");
      } else {
        // CREATE user
        await apiClient.post("/users", payload);
        toast.success("User added successfully");
      }

      await fetchUsers();
      formRef.current?.resetForm?.();
      setSearchParams({});
    } catch (err) {
      console.error("❌ Failed to save user:", err);
      toast.error(
        err.response?.data?.message || "Failed to save user data"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    setSearchParams({});
  };

  const handleEdit = (user) => {
    if (!user || !user.id) return;
    setSearchParams({ edit: user.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User",
      text: "Are you sure want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/users/${id}`);
      toast.success("User was successfully deleted");
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (editingId && users.length > 0) {
      const user = users.find((u) => u.id === Number(editingId));
      if (user) {
        formRef.current.setFormData({
          id: user.id,
          nama: user.nama,
          email: user.email,
          nomor_hp: user.nomor_hp,
          role_id: user.role_id || user.role.id,
        });
      }
    } else if (!isEditing) {
      formRef.current?.resetForm();
    }
  }, [editingId, users, isEditing]);

  const filteredData = useMemo(() => {
    return users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {isEditing ? "Edit User" : "Add New User"}
        </h3>

        <UserForm ref={formRef} />

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : isEditing ? "Update User" : "Save"}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Users List</h3>
          <div className="flex gap-5">
            <div className="w-64">
              <Search
                searchTerm={searchTerm}
                onSearchChange={(value) => setSearchTerm(value)}
              />
            </div>
            <Export
              data={filteredData}
              filename="users.csv"
              buttonText="Download"
            />
          </div>
        </div>
        <UserTable
          users={filteredData}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default User;
