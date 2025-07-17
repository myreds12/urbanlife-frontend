import { useEffect, useRef, useState } from "react";
import Dropzone from "../../../../components/AdminDashboard/Utils/Form/DropZone";
import CountryForm from "./CountryForm";
import CountryTable from "./CountryTable";
import { useSearchParams } from "react-router-dom";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const formRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");

  const isEditing = !!editingId;

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get("/negara");
      setCountries(data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch countries", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (editingId && countries.length > 0) {
      const country = countries.find((c) => c.id === Number(editingId));
      if (country) {
        formRef.current?.setFormData({
          id: country.id,
          kode: country.kode,
          nama: country.nama,
          url: country.url,
          nama_file: country.nama_file,
        });
      }
    } else {
      formRef.current?.resetForm();
    }
  }, [editingId, countries]);

  const handleSave = async () => {
    const formDataState = formRef.current?.getFormData();
    if (!formDataState) return;


    const { nama, kode, file } = formDataState;

    if (!nama.trim() || !kode.trim()) {
      toast.error("Nama atau kode negara tidak boleh kosong");
      return;
    }

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("kode", kode);

    if (file) {
      formData.append("file", file); // hanya kirim jika ada file baru
    }

    setSaving(true);
    try {
      if (isEditing) {
        await apiClient.patch(`/negara/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await apiClient.post(`/negara`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchCountries();
      formRef.current?.resetForm();
      setSearchParams();

      toast.success(
        isEditing
          ? "Data negara berhasil diperbarui"
          : "Negara berhasil ditambahkan"
      );
    } catch (error) {
      console.error("❌ Failed to save country", error);
      toast.error(
        error.response?.data?.message || "Gagal menyimpan data negara"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (country) => {
    setSearchParams({ edit: country.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    setSearchParams(); // clear query param
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Negara?",
      text: "Apakah kamu yakin ingin menghapus negara ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0092B8", // warna hijau teal
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/negara/${id}`);

      await fetchCountries();
      toast.success("Negara berhasil dihapus");
    } catch (error) {
      console.error("❌ Failed to delete country", error);
      toast.error(error.response?.data?.message || "Gaga; menghapus negara");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEditing ? "Edit Country" : "Add Country"}
          </h3>

          <CountryForm ref={formRef} />

          <div className="flex justify-end gap-4">
            {isEditing && (
              <button
                onClick={handleCancel}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Table Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Countries List
            </h3>
            <div className="w-64">
              <Search
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CountryTable
            countries={countries}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Country;
