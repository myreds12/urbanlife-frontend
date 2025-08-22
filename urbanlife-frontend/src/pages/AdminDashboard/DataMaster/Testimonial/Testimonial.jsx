import { useEffect, useRef, useState, useMemo } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import TestimonialForm from "./TestimonialForm";
import TestimonialTable from "./TestimonialTable";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import Export from "../../../../components/AdminDashboard/Utils/Ui/button/Export";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import dummyTestimonials from "./dummyTestimonial";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const [searchTerm, setSearchTerm] = useState("");
  const isEditing = Boolean(editingId);
  const formRef = useRef(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/testimonials");
      setTestimonials(res.data.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch testimonials", err);
      // Fallback to dummy data if API fails
      setTestimonials(dummyTestimonials);
      toast.error("Failed to load testimonials data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const newData = formRef.current?.getFormData();
    console.log(newData, "NEW DATA");
    if (!newData) return;

    const payload = {
      name: newData.name,
      occupation: newData.occupation,
      description: newData.description,
      order_id: Number(newData.order_id),
    };

    setSaving(true);
    try {
      if (isEditing) {
        await apiClient.patch(`/testimonials/${editingId}`, payload);
        toast.success("Testimonial updated successfully");
      } else {
        await apiClient.post("/testimonials", payload);
        toast.success("Testimonial added successfully");
      }
      await fetchTestimonials();
      formRef.current?.resetForm?.();
      setSearchParams({});
    } catch (err) {
      console.error("❌ Failed to save testimonial", err);
      toast.error("Could not save the testimonial. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    setSearchParams({});
  };

  const handleEdit = (testimonial) => {
    if (!testimonial || !testimonial.id) {
      console.warn("Testimonial ID undefined!", testimonial);
      return;
    }
    setSearchParams({ edit: testimonial.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Testimonial",
      text: "Are you sure you want to delete this testimonial?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/testimonials/${id}`);
      toast.success("Testimonial was successfully deleted");
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Could not delete the testimonial. Please try again.");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (editingId && testimonials.length > 0) {
      const testimonial = testimonials.find((t) => t.id === Number(editingId));
      if (testimonial) {
        formRef.current.setFormData({
          id: testimonial.id,
          name: testimonial.name,
          occupation: testimonial.occupation,
          description: testimonial.description,
          order_id: testimonial.order_id,
        });
      }
    } else if (!isEditing) {
      formRef.current?.resetForm();
    }
  }, [editingId, testimonials, isEditing]);

  const filteredData = useMemo(() => {
    return testimonials.filter((testimonial) =>
      Object.values(testimonial).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [testimonials, searchTerm]);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
        </h3>

        <TestimonialForm ref={formRef} />

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

      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Testimonials List</h3>
          <div className="flex gap-2">
            <div className="w-64">
              <Search
                searchTerm={searchTerm}
                onSearchChange={(value) => setSearchTerm(value)}
              />
            </div>
            <Export
              data={filteredData}
              filename="testimonials.csv"
              buttonText="Download"
            />
          </div>
        </div>
        <TestimonialTable
          testimonials={filteredData}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Testimonial;