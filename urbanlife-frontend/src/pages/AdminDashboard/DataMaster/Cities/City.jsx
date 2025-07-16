import { useEffect, useRef, useState} from "react";
import CityForm from "./CityForm";
import CityTable from "./CityTable";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import { useSearchParams } from "react-router-dom";

const City = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [nextId, setNextId] = useState(0); // For auto-incrementing IDs
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const formRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const isEditing = Boolean(editingId);

  // Helpers
  const fetchData = async (endpoint, setter, label) => {
    try {
      const { data } = await apiClient.get(endpoint);
      setter(data.data || []);
    } catch (error) {
      console.error(`❌ Failed to fetch ${label}`, error);
    }
  };
  

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchData("/lokasi", setCities, "cities"),
      fetchData("/negara", setCountries, "countries"),
      fetchData("/lokasi/next-code", (data) => setNextId(data.code), "City ID"),

    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (editingId && cities.length > 0) {
      const city = cities.find((c) => c.id === Number(editingId));
      if (city) {
        formRef.current.setFormData({
          id: city.id,
          negara_id: city.negara_id,
          nama: city.nama,
        });
      }
    } else {
      formRef.current.resetForm();
    }
  }, [editingId, cities]);

  const handleSave = async () => {
    const formData = formRef.current?.getFormData();
    if (!formData) return;

    const { nama, negara_id } = formData;
    if (!nama.trim() || !negara_id) {
      toast.error("Nama atau negara tidak boleh kosong");
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await apiClient.put(`/lokasi/${editingId}`, formData);
        toast.success("Kota berhasil diperbarui");
      } else {
        await apiClient.post("/lokasi", formData);
        toast.success("Kota berhasil ditambahkan");
      }

      await fetchData("/lokasi", setCities, "cities");
      formRef.current?.resetForm();
      setSearchParams({});
    } catch (error) {
      console.error("❌ Failed to save city", error);
      toast.error(error.response?.data?.message || "Gagal menyimpan kota");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (city) => {
    if (!city || !city.id) {
    console.warn("City ID undefined!", city);
    return;
  }
    setSearchParams({ edit: city.id });
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
      await apiClient.delete(`/lokasi/${id}`);
      await fetchData("/lokasi", setCities, "cities");
      toast.success("Kota berhasil dihapus");
    } catch (error) {
      console.error("❌ Failed to delete city", error);
      toast.error(error.response?.data?.message || "Gagal menghapus kota");
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Cities</h3>
          <CityForm ref={formRef} countries={countries} cityId={nextId} />
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
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">List Cities</h3>
            <div className="flex gap-2">
              <div  className="w-64">
              <Search
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
            </div>
          </div>
          <CityTable
            cities={cities}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default City;
