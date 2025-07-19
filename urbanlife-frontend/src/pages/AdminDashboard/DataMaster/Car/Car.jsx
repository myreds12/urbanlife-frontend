import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CarForm from "./CarForm";
import Dropzone from "../../../../components/AdminDashboard/Utils/Form/DropZone";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import Export from "../../../../components/AdminDashboard/Utils/Ui/button/Export";
import CarTable from "./CarTable";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast/headless";
import Swal from "sweetalert2";

const Car = () => {
  const [cars, setCars] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);

  const formRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get("edit");

  const isEditing = Boolean(editingId);

  const fetchData = useCallback(async (endpoint, setter) => {
    try {
      const { data } = await apiClient.get(endpoint);
      setter(data.data || data.code || []);
    } catch (error) {
      console.error(`❌ Failed to fetch ${endpoint}`, error);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchData("/kendaraan", setCars),
      fetchData("/kendaraan/next-code", (data) => setNextId(data.code), "City ID"),
    ]);
    setLoading(false);
  }, [fetchData]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (!formRef.current) return;

    const car = cars.find((c) => c.id === Number(editingId));
    if (isEditing && car) {
      formRef.current.setFormData({
        id: car.id,
        model: car.model,
        nama: car.nama,
        plat_nomor: car.plat_nomor,
        tanggal_pajak_berakhir: car.tanggal_pajak_berakhir,
        status_pajak: car.status_pajak,
      });

      const images = (car.kendaraan_file).map((file) => ({
        id: file.id,
        name: file.nama_file,
        url: `${
          apiClient.defaults.baseURL
        }/public/${file.url.replace("uploads\\", "")}`,
      }));

      setExistingFiles(images);
    } else {
      formRef.current.resetForm();
    }
  }, [editingId, cars, isEditing]);

  const handleSave = async () => {
    const data = formRef.current?.getFormData();
    if (!data) return;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    if (isEditing && existingFiles?.length > 0) {
      existingFiles.forEach((file, index) => {
        formData.append(`existingFiles[${index}][id]`, file.id);
        formData.append(`existingFiles[${index}][nama_file]`, file.name); // atau file.nama_file
        formData.append(`existingFiles[${index}][url]`, file.url);
      });
    }

    formData.append("nama", data.nama);
    formData.append("model", data.model || "");
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

      const response = await method(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response, "Response from save operation");

      toast.success(
        `Kendaraan berhasil ${isEditing ? "diperbarui" : "disimpan"}`
      );
      fetchAllData();
      formRef.current?.resetForm();
      setFiles([]);
      setExistingFiles([]);
      if (isEditing) setSearchParams({});
    } catch (error) {
      console.error("❌ Gagal menyimpan:", error);
      toast.error("Gagal menyimpan data kendaraan");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    setFiles([]);
    setExistingFiles([]);
    setSearchParams({});
  };

  const handleEdit = (car) => {
    setSearchParams({ edit: car.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Kendaraan?",
      text: "Apakah kamu yakin ingin menghapus kendaraan ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await apiClient.delete(`/kendaraan/${id}`);
      console.log(`✅ Kendaraan dengan ID ${id} berhasil dihapus`);
      toast.success("Kendaraan berhasil dihapus");
      fetchData("/kendaraan", setCars);
    } catch (error) {
      console.error("❌ Gagal menghapus kendaraan", error);
      toast.error(error.response?.data?.message || "Gagal menghapus kendaraan");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  const filteredData = useMemo(() => {
    return cars.filter((car) => 
      Object.values(car).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [cars, searchTerm]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Car</h3>
          <CarForm ref={formRef} carId={nextId} />
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
          <h3 className="text-lg font-semibold text-gray-800">List Car Unit</h3>
          <div className="flex gap-2">
            <div className="w-64">
              <Search
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              <i className="fa-solid fa-sliders mr-2"></i>Filter
            </button>
            <Export 
              data={filteredData}
              filename="car.csv"
              buttonText="Download"
            />
          </div>
        </div>
        <CarTable onEdit={handleEdit} onDelete={handleDelete} cars={cars} />
      </div>
    </div>
  );
};

export default Car;
