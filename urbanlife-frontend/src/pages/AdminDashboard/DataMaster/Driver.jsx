import { useEffect, useRef, useState } from "react";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import DriverForm from "../../../components/AdminDashboard/Utils/Form/DriverForm";
import DriverTable from "../../../components/AdminDashboard/Utils/Table/DriverTable";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const [searchTerm, setSearchTerm] = useState('');
  const isEditing = Boolean(editingId);

  const formRef = useRef(null);

  const fetchGuides = async () => {
    try {
      const res = await apiClient.get("/driver");
      setDrivers(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch guides", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const newData = formRef.current?.getFormData();
    if (!newData) return;

    const payload = {
      nama: newData.nama,
      nomor_hp: newData.nomor_hp,
      gender: newData.gender,
      tanggal_periode_berakhir: newData.tanggal_periode_berakhir,
    };
    setSaving(true);
    try {
      if (isEditing) {
        // UPDATE driver
        await apiClient.patch(`/driver/${editingId}`, payload);
        toast.success("Driver berhasil diperbarui");
      } else {
        // CREATE driver
        const res = await apiClient.post("/driver", payload);
        if (res.status !== 201) {
          toast.error(res.data.message);
        } else {
          toast.success("Driver berhasil ditambahkan");
        }
      }

      await fetchGuides();
      formRef.current?.resetForm?.();
      setSearchParams({});
    } catch (err) {
      console.error("Failed to save driver:", err);
      toast.error("Terjadi kesalahan saat menyimpan driver");
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    setSearchParams({});
  };

  const handleEdit = (driver) => {
    if (!driver || !driver.id) {
      console.warn("Driver ID undefined!", driver);
      return;
    }
    setSearchParams({ edit: driver.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Kota?",
      text: "Apakah kamu yakin ingin menghapus kota ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/driver/${id}`);
      toast.success("Kota berhasil dihapus");
      fetchGuides();
    } catch (error) {
      console.error("❌ Failed to delete driver", error);
      toast.error(error.response?.data?.message || "Gagal menghapus driver");
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    if (editingId && drivers.length > 0) {
      const driver = drivers.find((c) => c.id === Number(editingId));
      if (driver) {
        formRef.current.setFormData({
          id: driver.id,
          nama: driver.nama,
          nomor_hp: driver.nomor_hp,
          gender: driver.gender,
          tanggal_periode_berakhir: driver.tanggal_periode_berakhir,
        });
      }
    } else {
      formRef.current.resetForm();
    }
  }, [editingId, drivers]);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Driver</h3>

        <DriverForm ref={formRef} />

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
            className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            {editingId ? "Update Driver" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">List Driver Unit</h3>
          <div className="flex gap-2">
            <div className="w-64">
              <Search
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              <i className="fa-solid fa-sliders mr-2"></i>Filter
            </button>
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              Download<i className="fa-solid fa-download ml-2"></i>
            </button>
          </div>
        </div>
        <DriverTable
          drivers={drivers}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Driver;
