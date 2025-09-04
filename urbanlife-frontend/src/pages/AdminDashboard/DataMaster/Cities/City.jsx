import { useEffect, useRef, useState, useMemo } from "react";
import CityForm from "./CityForm";
import CityTable from "./CityTable";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import { useSearchParams } from "react-router-dom";
//import dummyCities from "./dummyCity"; // Uncomment for testing with dummy data
//import dummyCountries from "../Country/dummyCountry"; // Uncomment for testing with dummy data

const City = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [nextId, setNextId] = useState(0);
  console.log(nextId, "nextId");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const isEditing = Boolean(editingId);

  console.log(cities, "cities");

  const fetchData = async (endpoint, setter, label) => {
    try {
      const { data } = await apiClient.get(endpoint);
      setter(data.data.code || data.data || []);
    } catch (error) {
      console.error(`❌ Failed to fetch ${label}`, error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchData("/lokasi", setCities, "cities"),
        fetchData("/negara", setCountries, "countries"),
        fetchData("/lokasi/next-code", setNextId, "City ID"),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (!formRef.current || cities.length === 0) return;

    const city = cities.find((c) => c.id === Number(editingId));
    if (editingId && city) {
      formRef.current.setFormData?.({
        id: city.id,
        negara_id: city.negara_id,
        nama: city.nama,
      });
    } else {
      formRef.current.resetForm?.();
    }
  }, [editingId, cities]);

  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      const values = [city.id, city.nama, city.status, city?.negara?.nama];
      return values.some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [cities, searchTerm]);

  const handleSave = async () => {
    const formData = formRef.current?.getFormData?.();
    if (!formData) return;

    const { nama, negara_id } = formData;
    if (!nama.trim() || !negara_id) {
      toast.error("City name or code cannot be empty");
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await apiClient.patch(`/lokasi/${editingId}`, formData);
        toast.success("City updated successfully");
      } else {
        await apiClient.post("/lokasi", formData);
        toast.success("City added succcessfully");
      }

      await fetchData("/lokasi", setCities, "cities");
      formRef.current?.resetForm();
      setSearchParams({});
    } catch (error) {
      console.error("❌ Failed to save city", error);
      toast.error(error.response?.data?.message || "Failed to save city");
    } finally {
      setSaving(false);
    }
  };

   const handleSetActive = async (id, isActive) => {
    const result = await Swal.fire({
      title: "Set as Active City",
      text: "This will deactivate the current active city. Continue?",
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
      await apiClient.patch(`/lokasi/${id}`, formData);

      await fetchData("/lokasi", setCities, "cities");
      toast.success("City status updated successfully");
    } catch (error) {
      console.error("❌ Failed to update city image status", error);
      toast.error(
        error.response?.data?.message || "Failed to update city status"
      );
    }
  };

  const handleEdit = (city) => {
    if (!city?.id) {
      console.warn("City ID undefined!", city);
      return;
    }
    setSearchParams({ edit: city.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete City",
      text: "Are you sure want to delete this city?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/lokasi/${id}`);
      await fetchData("/lokasi", setCities, "cities");
      toast.success("City deleted successfully");
    } catch (error) {
      console.error("❌ Failed to delete city", error);
      toast.error(error.response?.data?.message || "Failed to delete city");
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
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Table + Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">List Cities</h3>
            <div className="w-64">
              <Search
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CityTable
            cities={filteredCities}
            onEdit={handleEdit}
            onSetActive={handleSetActive}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default City;
