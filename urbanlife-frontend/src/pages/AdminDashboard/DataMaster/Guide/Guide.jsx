import { useEffect, useRef, useState, useMemo } from "react";
import GuideForm from "./GuideForm";
import GuideTable from "./GuideTable";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import Export from "../../../../components/AdminDashboard/Utils/Ui/button/Export";
import FilterBar from "../../../../components/AdminDashboard/Utils/Ui/button/FilterBar";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
//import dummyGuides from "./dummyGuide"; // Uncomment for testing with dummy data

const Guide = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const formRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const isEditing = Boolean(editingId);

  // Fetch guides from API, comment if testing with dummy data
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

  // Uncomment for testing with dummy data
  // const fetchGuides = async () => {
  //   setGuides(dummyGuides);
  //   setLoading(false);
  // };

  const handleSave = async () => {
    const newData = formRef.current?.getFormData();
    console.log(newData, "NEW DATA");
    if (!newData) return;

    const payload = {
      nama: newData.nama,
      nomor_hp: newData.nomor_hp,
      gender: newData.gender,
      fluent_english: newData.fluent_english, // true / false
    };
    console.log(payload);
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

  const filteredData = useMemo(() => {
    return guides.filter((guide) => {
      const matchesSearch = Object.values(guide).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesStatus = selectedStatus
        ? String(guide.status).toLowerCase() === selectedStatus.toLowerCase()
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [guides, searchTerm, selectedStatus]);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 darktitle">Guide</h3>

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

      {/* Table Section */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 darktitle">Guide List</h3>
          <div className="flex gap-2">
            <div className="w-64">
              <Search
                searchTerm={searchTerm}
                onSearchChange={(value) => setSearchTerm(value)}
              />
            </div>
            <FilterBar
              filters={[
                {
                  type: "select",
                  value: selectedStatus,
                  onChange: setSelectedStatus,
                  options: [
                    { value: "", label: "All Statuses" },
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ],
                },
              ]}
            />
            <Export
              data={filteredData}
              filename="guide.csv"
              buttonText="Download"
            />
          </div>
        </div>
        <GuideTable
          guides={filteredData}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Guide;
