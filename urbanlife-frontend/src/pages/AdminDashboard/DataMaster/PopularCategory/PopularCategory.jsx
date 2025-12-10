import { useEffect, useRef, useState, useMemo } from "react";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import PopularCategoryForm from "./PopularCategoryForm";
import PopularCategoryTable from "./PopularCategoryTable";
// import dummyCountries from "./dummyCountry"; // Uncomment for testing with dummy data

const PopularCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef(null);
  const [disabledForm, setDisabledForm] = useState(false)

  const fetchData = async () => {
    setLoading(true);
    try {
      const getPopularData = async (endpoint) => {
        const response = await apiClient.get(endpoint);
        return response.data.data.filter(item => item.is_popular);
      };

      const [filteredTravelPackage, filteredKendaraan, filteredAkomodasi, filteredAirport, filteredPort] = await Promise.all([
        getPopularData("/travel-package"),
        getPopularData("/kendaraan"),
        getPopularData("/akomodasi"),
        getPopularData("/airport-shuttle"),
        getPopularData("/port-shuttle")
      ]);

      const allData = [
        ...filteredTravelPackage.map(item => ({
          id: item.id,
          nama: item.nama,
          type: "travel_package",
          service_type: "Travel Package"
        })),
        ...filteredKendaraan.map(item => ({
          id: item.id,
          nama: item.nama,
          type: "rent_car",
          service_type: "Rent a car"
        })),
        ...filteredAkomodasi.map(item => ({
          id: item.id,
          nama: item.nama,
          type: "accomodation",
          service_type: "Accommodation"
        })),
        ...filteredAirport.map(item => ({
          id: item.id,
          nama: item.nama,
          type: "airport_shuttle",
          service_type: "Airport Shuttle"
        })),
        ...filteredPort.map(item => ({
          id: item.id,
          nama: item.nama,
          type: "port_shuttle",
          service_type: "Port Shuttle"
        }))
      ];

      setData(allData || []);
      setDisabledForm(allData.length >= 6)
    } catch (error) {
      console.error("❌ Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((name) =>
      Object.values(name).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const handleSave = async () => {
    const formDataState = formRef.current?.getFormData();
    if (!formDataState) return;
    setLoading(true)
    
    const serviceId = parseInt(formDataState.service_id, 10);

    let endpoint = "";
    switch (formDataState.service_type) {
      case "travel_package":
        endpoint = `/travel-package/update-popular-status/${serviceId}`;
        break;
      case "rent_car":
        endpoint = `/kendaraan/update-popular-status/${serviceId}`;
        break;
      case "accomodation":
        endpoint = `/akomodasi/update-popular-status/${serviceId}`;
        break;
      case "airport_shuttle":
        endpoint = `/airport-shuttle/update-popular-status/${serviceId}`;
        break;
      case "port_shuttle":
        endpoint = `/port-shuttle/update-popular-status/${serviceId}`;
        break;
      default:
        endpoint = "";
    }

    try {
      await apiClient.patch(endpoint, { is_popular: true })

      formRef.current?.reset();
      toast.success("Upload successful!");
      await fetchData()
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setLoading(false)
    }
  };

  const handleDelete = async (id, type) => {
    const result = await Swal.fire({
      title: "Delete Popular Category",
      text: "Are you sure want to delete this popular category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    let endpoint = "";
    switch (type) {
      case "travel_package":
        endpoint = `/travel-package/update-popular-status/${id}`;
        break;
      case "rent_car":
        endpoint = `/kendaraan/update-popular-status/${id}`;
        break;
      case "accomodation":
        endpoint = `/akomodasi/update-popular-status/${id}`;
        break;
      case "airport_shuttle":
        endpoint = `/airport-shuttle/update-popular-status/${id}`;
        break;
      case "port_shuttle":
        endpoint = `/port-shuttle/update-popular-status/${id}`;
        break;
      default:
        endpoint = "";
    }

    try {
      await apiClient.patch(endpoint, { is_popular: false })

      await fetchData();
      toast.success("Popular category successfully deleted.");
    } catch (error) {
      console.error("❌ Failed to delete popular category", error);
      toast.error(error.response?.data?.message || "Failed to delete popular category");
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
            Add Popular Category
          </h3>

          <PopularCategoryForm ref={formRef} disabledForm={disabledForm} />
          {!disabledForm && (
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {/* Table Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Popular Category List
            </h3>
            <div className="w-64">
              <Search
                searchTerm={searchTerm}
                onSearchChange={(value) => setSearchTerm(value)}
              />
            </div>
          </div>
          <PopularCategoryTable
            data={filteredData}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default PopularCategory;
