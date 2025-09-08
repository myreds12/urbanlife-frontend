import React, { useState, useEffect, useMemo } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import ModalView from "../../../components/AdminDashboard/Utils/Ui/modal/ModalDetail";
import { dummyDayTourData } from "./DummyDaytour";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

const mapContent = (contentArray = []) => {
  const result = {
    deskripsi: { indonesia: "-", english: "-" },
  };

  contentArray.forEach((item) => {
    const lang = item.bahasa?.toLowerCase();
    if (lang === "indonesia" || lang === "english") {
      result.deskripsi[lang] = item.deskripsi?.trim() || "-";
    }
  });

  return result;
};

const mapItinerary = (itineraryArray = []) => {
  const result = {
    indonesia: [],
    english: [],
  };

  itineraryArray.forEach((item) => {
    const lang = item.bahasa?.toLowerCase();
    if (lang === "indonesia" || lang === "english") {
      result[lang].push({
        destination: item.nama || "-",
        description: item.deskripsi?.trim() || "-",
      });
    }
  });

  return result;
};

const useDebouncedValue = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const DayTour = () => {
  const navigate = useNavigate();

  const [dayTourData, setDayTourData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const itemsPerPage = 10;

  // Modal configuration untuk day tour
  const dayTourModalConfig = {
    sections: [
      {
        fields: [
          { key: "lokasi", label: "Location" },
          { key: "nama", label: "Day tour package name" },
          {
            key: "deskripsi",
            label: "Decription",
            type: "language-toggle",
            languageKey: "deskripsi",
          },
          {
            key: "itinerary",
            label: "Itinerary",
            type: "language-toggle",
            languageKey: "itinerary",
          },
          {
            key: "harga_anak",
            label: "Child Price",
          },
          {
            key: "harga_dewasa",
            label: "Adult Price",
          },
        ],
      },
    ],
  };

  // Bulk Action Configuration
  const bulkEditableFields = [
    {
      name: "durasi",
      label: "Durasi",
      type: "number",
      placeholder: "Masukkan durasi",
      description: "Durasi paket dalam satuan hari/jam",
    },
    {
      name: "harga_dewasa",
      label: "Adult Price",
      type: "number",
      placeholder: "Input adult price",
      description: "Package prices for adults in rupiah",
    },
    {
      name: "harga_anak",
      label: "Child Price",
      type: "number",
      placeholder: "Input child price",
      description: "Package prices for children in rupiah",
    },
    {
      name: "lokasi_id",
      label: "Location",
      type: "select",
      options: [
        { value: 1, label: "Jakarta" },
        { value: 2, label: "Bandung" },
        { value: 3, label: "Surabaya" },
        { value: 4, label: "Medan" },
        { value: 5, label: "Makassar" },
        { value: 6, label: "Yogyakarta" },
        { value: 7, label: "Semarang" },
        { value: 8, label: "Denpasar" },
      ],
      description: "Destination location",
    },
    {
      name: "negara_id",
      label: "Negara",
      type: "select",
      options: [
        { value: 1, label: "Indonesia" },
        { value: 2, label: "Malaysia" },
        { value: 3, label: "Singapore" },
        { value: 4, label: "Thailand" },
        { value: 5, label: "Vietnam" },
      ],
      description: "Destination country",
    },
  ];

  const debouncedSearch = useDebouncedValue(searchTerm);

  const fetchDayTours = async (search = "") => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        take,
        ...(search.trim() && { search: search.trim() }),
      };
      const res = await apiClient.get("/travel-package", {
        params,
      });
      const { data, total } = res.data;
      setDayTourData(data);
      setTotal(total);
    } catch (err) {
      console.error(
        "Failed to fetch travel packages from API, using dummy data",
        err
      );
      // Use dummy data if API fails
      setTimeout(() => {
        setDayTourData(dummyDayTourData);
        setLoading(false);
      }, 1000);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDayTours(debouncedSearch);
  }, [debouncedSearch, currentPage]);

  const handleSort = (columnKey) => {
    let direction = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleView = async (row) => {
    try {
      const { data } = await apiClient.get(`/travel-package/${row.id}`);

      const deskripsiMapped = mapContent(data.data.travel_package_content);
      const itineraryMapped = mapItinerary(data.data.travel_package_itinerary);

      const mappedData = {
        ...data.data,
        deskripsi: deskripsiMapped.deskripsi,
        itinerary: itineraryMapped,
      };

      setSelectedModalData(mappedData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch details:", error);
      toast.error("Failed to load package details");
    }
  };

  // Handler untuk Edit
  const handleEdit = (row) => {
    navigate(`/admin/day-tour/edit/${row.id}`);
  };

  // Handler untuk Popular (sementara)
  const handlePopular = async (row) => {
    const newStatus = !row.is_popular;

    const confirmed = window.confirm(
      `${newStatus ? "Add" : "Remove"} "${row.nama}" ${
        newStatus ? "to" : "from"
      } Popular Categories?`
    );
    if (!confirmed) return;

    try {
      const updatePromise = apiClient.patch(
        `/travel-package/${row.id}/popular`,
        {
          is_popular: newStatus,
        }
      );

      await toast.promise(updatePromise, {
        loading: newStatus
          ? "Marking as popular..."
          : "Removing from popular...",
        success: `"${row.nama}" ${
          newStatus ? "added to" : "removed from"
        } popular packages!`,
        error: "Failed to update popular status. Please try again.",
      });

      // Refresh list biar keliatan update
      fetchDayTours();
    } catch (err) {
      console.error("Failed to update popular status:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
      }
    }
  };

  // Handler untuk Delete
  const handleDelete = async (row) => {
    const confirmed = window.confirm(
      `Are you sure want to delete "${row.nama}"?`
    );
    if (!confirmed) return;

    const deletePromise = apiClient.delete(`/travel-package`, {
      data: {
        ids: [row.id],
      },
    });

    try {
      const result = await deletePromise;
      console.log(result, "result");
      await toast.promise(deletePromise, {
        loading: "Deleting package...",
        success: `"${row.nama}" was successfully deleted.`,
        error: "Could not delete the package. Please try again.",
      });

      // TODO: Refresh list data jika perlu
      fetchDayTours();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  // Bulk Action Handlers
  const handleBulkDelete = async (selectedData) => {
    const confirmed = window.confirm(
      `Delete ${selectedData.length} selected packages?`
    );
    if (!confirmed) return;

    const ids = selectedData.map((item) => item.id);

    const deletePromise = apiClient.delete("/travel-package", {
      data: { ids },
    });

    try {
      await toast.promise(deletePromise, {
        loading: "Deleting packages...",
        success: `${selectedData.length} was successfully deleted.`,
        error: "Could not delete the packages. Please try again.",
      });

      // Update state lokal setelah sukses
      setDayTourData((prev) => prev.filter((item) => !ids.includes(item.id)));
    } catch (err) {
      console.error("Bulk delete failed:", err);
      // (Optional) toast error ditangani oleh toast.promise, jadi bisa dihapus jika tidak diperlukan
    }
  };

  const handleBulkExport = async (selectedData) => {
    try {
      console.log("Bulk export data:", selectedData);

      // Create CSV content
      const headers = [
        "ID",
        "Name",
        "Duration",
        "Adult Price",
        "Child Price",
        "Location",
        "Country",
      ];
      const csvContent = [
        headers.join(","),
        ...selectedData.map((item) =>
          [
            item.id,
            `"${item.nama}"`,
            `${item.durasi} ${item.tipe_durasi}`,
            item.harga_dewasa,
            item.harga_anak,
            `"${item.lokasi?.nama || ""}"`,
            `"${item.lokasi?.negara?.nama || ""}"`,
          ].join(",")
        ),
      ].join("\n");

      // Download CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `travel_packages_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`Successfully exported ${selectedData.length} travel packages`);
    } catch (err) {
      console.error("Failed to export travel packages", err);
      alert("Failed to export travel packages. Please try again.");
    }
  };

  const handleClearSelection = () => {
    setSelectedRows([]);
  };

  const filteredData = useMemo(() => {
    return dayTourData.filter((tour) =>
      Object.values(tour).some((value) => {
        if (value && typeof value === "object") {
          return Object.values(value).some((nestedValue) =>
            String(nestedValue).toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [dayTourData, searchTerm]);

  const sortedData = useMemo(() => {
    const dataToSort = filteredData || dayTourData;
    if (!sortConfig.key) return dataToSort;
    return [...dataToSort].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "lokasi") {
        aValue = a.lokasi?.nama || "";
        bValue = b.lokasi?.nama || "";
      } else if (sortConfig.key === "negara") {
        aValue = a.lokasi?.negara?.nama || "";
        bValue = b.lokasi?.negara?.nama || "";
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, dayTourData, sortConfig]);

  // Get selected data for bulk actions
  const selectedData = useMemo(() => {
    return sortedData.filter((item) => selectedRows.includes(item.id));
  }, [sortedData, selectedRows]);

  const totalPages =
    Math.ceil(total / take) || Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    "#",
    "ID",
    "Name",
    "Duration",
    "Adult Price",
    "Child Price",
    "Location",
    "Country",
    "Action",
  ];

  const mapping = {
    "#": (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
    "ID": (row) => row.id,
    "Name": (row) => row.nama || "-",
    "Duration": (row) => `${row.durasi} ${row.tipe_durasi}`,
    "Adult Price": (row) => `Rp${Number(row.harga_dewasa).toLocaleString("id-ID")}`,
    "Child Price": (row) => `Rp${Number(row.harga_anak).toLocaleString("id-ID")}`,
    "Location": (row) => row.lokasi?.nama || "-",
    "Country": (row) => row.lokasi?.negara?.nama || "-",
    "Action": null,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="p-5">
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            maxWidth: "1050px",
            margin: "0 auto",
          }}
        >
          {selectedRows.length > 0 && (
            <BulkActionBar
              selectedCount={selectedRows.length}
              selectedData={selectedData}
              onClearSelection={handleClearSelection}
              onBulkDelete={handleBulkDelete}
              onExport={handleBulkExport}
              editableFields={bulkEditableFields}
            />
          )}

          {/* Header */}
          <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Day Tour / Travel Package
              </h1>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <Search
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Search packages..."
                />
              </div>
              <Button
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => navigate("/admin/day-tour/create")}
              >
                Add Package
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <Table
              data={currentData}
              columns={columns}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSort={handleSort}
              sortConfig={sortConfig}
              startIndex={startIndex}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPopular={handlePopular}
              defaultMapping={mapping}
            />
          </div>
        </div>

        {/* Data info dan Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + take, total)} of{" "}
            {total} packages
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="base"
          />
        </div>
      </div>

      {/* Modal View */}
      <ModalView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detail Package"
        data={selectedModalData}
        config={dayTourModalConfig}
        images={selectedModalData?.travel_package_file || []}
      />
    </>
  );
};

export default DayTour;
