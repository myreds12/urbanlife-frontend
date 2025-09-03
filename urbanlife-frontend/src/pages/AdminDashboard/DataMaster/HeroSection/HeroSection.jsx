import { useEffect, useRef, useState, useMemo } from "react";
import HeroForm from "./HeroForm";
import HeroTable from "./HeroTable";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import { useSearchParams } from "react-router-dom";
// import dummyHeroImages from "./dummyHero";

const HeroSection = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const isEditing = Boolean(editingId);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get("/hero-section");
      setHeroImages(data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch hero images", error);
      toast.error("Failed to fetch hero images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!formRef.current || heroImages.length === 0) return;

    const heroImage = heroImages.find((h) => h.id === Number(editingId));
    if (editingId && heroImage) {
      formRef.current.setFormData?.({
        id: heroImage.id,
        title: heroImage.title,
        description: heroImage.description,
        image_url: heroImage.url,
        is_active: heroImage.status,
      });
    } else {
      formRef.current.resetForm?.();
    }
  }, [editingId, heroImages]);

  const filteredHeroImages = useMemo(() => {
    return heroImages.filter((hero) => {
      const values = [hero.id, hero.title, hero.description, hero.status];
      return values.some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [heroImages, searchTerm]);

  const handleSave = async () => {
    const formData = formRef.current?.getFormData?.();
    if (!formData) {
      toast.error("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await apiClient.patch(`/hero-section/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Hero image updated successfully");
      } else {
        await apiClient.post("/hero-section", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Hero image added successfully");
      }

      await fetchData();
      formRef.current?.resetForm();
      setSearchParams({});
    } catch (error) {
      console.error("❌ Failed to save hero image", error);
      toast.error(error.response?.data?.message || "Failed to save hero image");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (heroImage) => {
    if (!heroImage?.id) {
      console.warn("Hero image ID undefined!", heroImage);
      return;
    }
    setSearchParams({ edit: heroImage.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Hero Image",
      text: "Are you sure you want to delete this hero image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/hero-section/${id}`);

      await fetchData();
      toast.success("Hero image deleted successfully");
    } catch (error) {
      console.error("❌ Failed to delete hero image", error);
      toast.error(
        error.response?.data?.message || "Failed to delete hero image"
      );
    }
  };

  const handleSetActive = async (id, isActive) => {
    const result = await Swal.fire({
      title: "Set as Active Hero",
      text: "This will deactivate the current active hero image. Continue?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, set active!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      // Balik status berdasarkan nilai isActive saat ini
      const newStatus = !isActive;
      console.log("New status:", newStatus);

      // Membuat FormData dan mengisi field status
      const formData = new FormData();
      formData.append("status", newStatus);

      // Mengirim PATCH request dengan FormData sebagai payload
      await apiClient.patch(`/hero-section/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Tentukan content-type supaya menjadi form data
        },
      });

      await fetchData();
      toast.success("Hero image status updated successfully");
    } catch (error) {
      console.error("❌ Failed to update hero image status", error);
      toast.error(
        error.response?.data?.message || "Failed to update hero image status"
      );
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

  const activeHeroImage = heroImages.find((hero) => hero.is_active);

  return (
    <div className="p-6">
      {/* Current Active Hero Banner */}
      {activeHeroImage && (
        <div className="mb-6 bg-cyan-50 rounded-2xl border border-cyan-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-cyan-800 mb-1">
                🎯 Currently Active Hero Section
              </h2>
              <p className="text-cyan-600">
                <span className="font-medium">{activeHeroImage.title}</span>
              </p>
            </div>
            {activeHeroImage.image_url && (
              <div className="w-20 h-12 rounded-lg overflow-hidden border border-cyan-200">
                <img
                  src={activeHeroImage.image_url}
                  alt="Active Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEditing ? "Edit Hero Section" : "Add Hero Section"}
          </h3>
          <HeroForm ref={formRef} isEditing={isEditing} />
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-cyan-400 transition-colors"
            >
              {saving ? "Saving..." : isEditing ? "Update Hero" : "Add Hero"}
            </button>
          </div>
        </div>

        {/* Table + Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Hero Images List
            </h3>
            <div className="w-64">
              <Search
                placeholder="Search hero images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <HeroTable
            heroImages={filteredHeroImages}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSetActive={handleSetActive}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
