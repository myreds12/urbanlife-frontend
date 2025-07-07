import { useEffect, useRef, useState } from "react";
import GuideForm from "../../../components/AdminDashboard/Utils/Form/GuideForm";
import GuideTable from "../../../components/AdminDashboard/Utils/Table/GuideTable";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const Guide = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const formRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const isEditing = Boolean(editingId);

  const fetchGuides = async () => {
    try {
      const res = await apiClient.get("/guide");
      setGuides(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch guides", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const newData = formRef.current?.getFormData();
    console.log(newData, 'NEW DATA')
    if (!newData) return;

    const payload = {
      nama: newData.nama,
      nomor_hp: newData.nomor_hp,
      gender: newData.gender,
      fluent_english: newData.fluent_english, // true / false
    };
    console.log(payload)
    setSaving(true);
    try {
      if (isEditing) {
        await apiClient.patch(`/guide/${editingId}`, payload);
        toast.success("Guide berhasil diperbarui");
      } else {
        await apiClient.post("/guide", payload);
        toast.success("Guide berhasil ditambahkan");
      }
      await fetchGuides();
      formRef.current?.resetForm?.();
      setSearchParams({});
    } catch (err) {
      console.error("Failed to create guide", err);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm?.();
    setSearchParams({});
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    if (editingId && guides.length > 0) {
      const guide = guides.find((c) => c.id === Number(editingId));
      if (guide) {
        formRef.current.setFormData({
          id: guide.id,
          negara_id: guide.negara_id,
          nama: guide.nama,
        });
      }
    } else {
      formRef.current.resetForm();
    }
  }, [editingId, guides]);

  const handleEdit = (guide) => {
    if (!guide || !guide.id) {
      console.warn("Guide ID undefined!", guide);
      return;
    }
    setSearchParams({ edit: guide.id });
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
      await apiClient.delete(`/guide/${id}`);
      fetchGuides();
      toast.success("Guide berhasil dihapus");
    } catch (error) {
      console.error("❌ Failed to delete guide", error);
      toast.error(error.response?.data?.message || "Gagal menghapus guide");
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Guide</h3>

          <GuideForm ref={formRef} editId={editingId} />

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

        <GuideTable
          guides={guides}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Guide;
