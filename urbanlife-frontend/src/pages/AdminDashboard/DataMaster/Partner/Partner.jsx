import { useEffect, useRef, useState, useMemo } from "react";
import PartnerForm from "./PartnerForm";
import PartnerTable from "./PartnerTable";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import { useSearchParams } from "react-router-dom";

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const editingId = searchParams.get("edit");
  const isEditing = Boolean(editingId);
  const formRef = useRef(null);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get("/our-partner", {
        params: { page: 1, take: 10 },
      });
      setPartners(data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch partners", error);
      toast.error("Failed to load partners data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    if (editingId && partners.length > 0) {
      const partner = partners.find((p) => p.id === Number(editingId));
      if (partner) {
        formRef.current.setFormData?.({
          nama: partner.nama, // Ubah dari name ke nama
          file: partner.file, // Ubah dari image ke file
        });
      }
    } else if (!isEditing) {
      formRef.current?.resetForm?.();
    }
  }, [editingId, partners, isEditing]);

  const filteredPartners = useMemo(() => {
    return partners.filter((partner) =>
      Object.values(partner).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [partners, searchTerm]);

  const handleSave = async () => {
    const formData = formRef.current?.getFormData?.();
    if (!formData) return;

    const { nama, file } = formData; // Ubah dari name, image ke nama, file
    if (!nama.trim()) {
      toast.error("Partner name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append("nama", nama); // Ubah dari name ke nama
      if (file) dataToSend.append("file", file); // Ubah dari image ke file

      if (isEditing) {
        console.log("Editing partner id:", editingId);

        await apiClient.patch(`/our-partner/${editingId}`, { nama }); // Ubah dari name ke nama
        if (file) {
          const formData = new FormData();
          formData.append("file", file); // Ubah dari image ke file
          await apiClient.post(
            `/our-partner/${editingId}/upload-image`,
            formData
          );
        }
      } else {
        await apiClient.post("/our-partner", dataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Partner added successfully");
      }

      await fetchPartners();
      formRef.current?.resetForm?.();
      setSearchParams({});
    } catch (error) {
      console.error("❌ Failed to save partner", error);
      toast.error(
        error.response?.data?.message ||
          "Could not save the partner. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };
  const handleEdit = (partner) => {
    if (!partner?.id) {
      console.warn("Partner ID undefined!", partner);
      return;
    }
    setSearchParams({ edit: partner.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Partner",
      text: "Are you sure you want to delete this partner?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/our-partner/${id}`);
      toast.success("Partner was successfully deleted");
      fetchPartners();
    } catch (error) {
      console.error("❌ Failed to delete partner", error);
      toast.error("Could not delete the partner. Please try again.");
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm?.();
    setSearchParams({});
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Partner Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEditing ? "Edit Partner" : "Add New Partner"}
          </h3>
          <PartnerForm ref={formRef} />
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
              Save Changes
            </button>
          </div>
        </div>

        {/* Right: Partners List */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Partners List
            </h3>
            <Search
              searchTerm={searchTerm}
              onSearchChange={(value) => setSearchTerm(value)}
            />
          </div>
          <PartnerTable
            partners={filteredPartners}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Partner;