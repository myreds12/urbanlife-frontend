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
  const [nextId, setNextId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const isEditing = Boolean(editingId);

  console.log(partners, "partners");

  const fetchData = async (endpoint, setter, label) => {
    try {
      const { data } = await apiClient.get(endpoint);
      setter(data.data || []);
    } catch (error) {
      console.error(`❌ Failed to fetch ${label}`, error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchData("/our-partner", setPartners, "partners"),
        fetchData("/our-partner/next-id", setNextId, "Partner ID"),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (!formRef.current || partners.length === 0) return;

    const partner = partners.find((p) => p.id === Number(editingId));
    if (editingId && partner) {
      formRef.current.setFormData?.({
        id: partner.id,
        nama: partner.nama,
        file: partner.file, // existing image URL
      });
    } else {
      formRef.current.resetForm?.();
    }
  }, [editingId, partners]);

  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const values = [partner.id, partner.nama, partner.status];
      return values.some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [partners, searchTerm]);

  const handleSave = async () => {
    const formData = formRef.current?.getFormData?.();
    if (!formData) return;

    const { nama, file } = formData;
    if (!nama.trim()) {
      toast.error("Partner name cannot be empty");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append("nama", nama.trim());
    if (file && file instanceof File) {
      submitData.append("file", file);
    }

    setSaving(true);
    try {
      if (isEditing) {
        await apiClient.patch(`/our-partner/${editingId}`, submitData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Partner updated successfully");
      } else {
        await apiClient.post("/our-partner", submitData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Partner added successfully");
      }

      await fetchData("/our-partner", setPartners, "partners");
      formRef.current?.resetForm();
      setSearchParams({});
    } catch (error) {
      console.error("❌ Failed to save partner", error);
      toast.error(error.response?.data?.message || "Failed to save partner");
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
      await fetchData("/our-partner", setPartners, "partners");
      toast.success("Partner deleted successfully");
    } catch (error) {
      console.error("❌ Failed to delete partner", error);
      toast.error(error.response?.data?.message || "Failed to delete partner");
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm?.();
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
        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Our Partners</h3>
          <PartnerForm ref={formRef} partnerId={nextId} />
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
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Table + Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">List Partners</h3>
            <div className="w-64">
              <Search
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <PartnerTable
            partners={filteredPartners}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Partner;