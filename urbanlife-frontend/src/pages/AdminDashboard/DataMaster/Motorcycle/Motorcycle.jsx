import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import MotorcycleForm from "./MotorcycleForm";
import Dropzone from "../../../../components/AdminDashboard/Utils/Form/DropZone";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import Export from "../../../../components/AdminDashboard/Utils/Ui/button/Export";
import FilterBar from "../../../../components/AdminDashboard/Utils/Ui/button/FilterBar";
import MotorcycleTable from "./MotorcycleTable";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast/headless";
import Swal from "sweetalert2";
//import dummyMotorcycles from "./dummyMotorcycle"; // Uncomment for testing with dummy data

const Motorcycle = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const formRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");
  const isEditing = Boolean(editingId);
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchData = useCallback(async (endpoint, setter, options = {}) => {
    try {
      const { params = {}, direct = false, tipe = "MOTOR" } = options;
      console.log(`Fetching ${endpoint} with params:`, params);

      const { data } = await apiClient.get(endpoint, { params });
      console.log(`✅ Fetched ${endpoint}`, data);

      if (direct) {
        setter(data.data);
        return;
      }

      const items = Array.isArray(data?.data) ? data.data : [];

      const result = tipe ? items.filter(item => item.tipe === tipe) : items;

      setter(result);
    } catch (error) {
      console.error(`❌ Failed to fetch ${endpoint}`, error);
    }
  }, []);

  // Fetch initial data, comment if testing with dummy data
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchData("/kendaraan", setMotorcycles, {
        params: { is_rent: false },
        tipe: "MOTOR",
      }),
      fetchData("/kendaraan/next-code", (data) => setNextId(data.code), {
        direct: true,
      }),
    ]);
    setLoading(false);
  }, [fetchData]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  console.log(motorcycles, "motorcycles data");

  // Uncomment for testing with dummy data
  // const fetchAllData = useCallback(async () => {
  //   setLoading(true);
  //   setMotorcycles(dummyMotorcycles);
  //   setNextId("U005");
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   fetchAllData();
  // }, [fetchAllData]);

  useEffect(() => {
    if (!formRef.current) return;

    const motorcycle = motorcycles.find((c) => c.id === Number(editingId));
    if (isEditing && motorcycle) {
      formRef.current.setFormData({
        id: motorcycle.id,
        model: motorcycle.model,
        nama: motorcycle.nama,
        plat_nomor: motorcycle.plat_nomor,
        tanggal_pajak_berakhir: motorcycle.tanggal_pajak_berakhir,
        status_pajak: motorcycle.status_pajak,
      });

      const images = (motorcycle.kendaraan_file || []).map((file) => ({
        id: file.id,
        name: file.nama_file,
        url: `${apiClient.defaults.baseURL}/public/${file.url.replace(
          "uploads\\",
          ""
        )}`,
      }));

      setExistingFiles(images);
    } else {
      formRef.current.resetForm?.(); // safe call
      setFiles([]);
      setExistingFiles([]);
    }
  }, [editingId, motorcycles, isEditing]);

  const handleSave = async () => {
    const data = formRef.current?.getFormData?.();
    if (!data) return;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    if (isEditing && existingFiles.length > 0) {
      existingFiles.forEach((file, index) => {
        formData.append(`existingFiles[${index}][id]`, file.id);
        formData.append(`existingFiles[${index}][nama_file]`, file.name);
        formData.append(`existingFiles[${index}][url]`, file.url);
      });
    }

    formData.append("nama", data.nama);
    formData.append("model", data.model || "");
    formData.append("tipe", "MOTOR");
    formData.append("plat_nomor", data.plat_nomor);
    formData.append(
      "tanggal_pajak_berakhir",
      data.tanggal_pajak_berakhir || ""
    );
    formData.append("status_pajak", data.status_pajak ? "true" : "false");

    try {
      setSaving(true);
      const endpoint = isEditing ? `/kendaraan/${editingId}` : "/kendaraan";
      const method = isEditing ? apiClient.patch : apiClient.post;

      await method(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`Vehicle successfully ${isEditing ? "updated" : "added"}`);
      fetchAllData();
      formRef.current?.resetForm?.();
      setFiles([]);
      setExistingFiles([]);
      if (isEditing) setSearchParams({});
    } catch (error) {
      console.error("❌ Failed to save vehicle:", error);
      toast.error("Failed to save vehicle data");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm?.();
    setFiles([]);
    setExistingFiles([]);
    setSearchParams({});
  };

  const handleEdit = (motorcycle) => {
    setSearchParams({ edit: motorcycle.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (data) => {
    const id = data.id

    const result = await Swal.fire({
      title: "Delete Vehicle",
      text: "Are you sure want to delete this vehicle?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/kendaraan/delete-kendaraan/${id}`);
      toast.success("Vehicle was successfully deleted");
      fetchAllData()
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error(
        error.response?.data?.message ||
        "Could not delete the vehicle. Please try again."
      );
    }
  };

  const filteredData = useMemo(() => {
    return motorcycles.filter((motorcycle) =>
      Object.values(motorcycle).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [motorcycles, searchTerm]);

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
          <h3 className="text-lg font-semibold text-gray-800">Motorcycle</h3>
          <MotorcycleForm ref={formRef} motorcycleId={nextId} />
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
        <Dropzone
          files={files}
          setFiles={setFiles}
          multiple={true}
          existingFiles={existingFiles}
          setExistingFiles={setExistingFiles}
        />
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">List Motorcycle Unit</h3>
          <div className="flex gap-2">
            <div className="w-67">
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
              filename="motorcycle.csv"
              buttonText="Download"
            />
          </div>
        </div>
        <MotorcycleTable
          onEdit={handleEdit}
          onDelete={handleDelete}
          motorcycles={filteredData}
        />
      </div>
    </div>
  );
};

export default Motorcycle;
