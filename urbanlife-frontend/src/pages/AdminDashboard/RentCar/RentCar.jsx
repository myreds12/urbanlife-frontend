import React, { useState, useEffect, useMemo } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import ModalView from "../../../components/AdminDashboard/Utils/Ui/modal/ModalDetail";
import dummyRentCarData from "./DummyRentcar";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

const mapKendaraanContent = (contentArray = []) => {
  const result = {
    deskripsi: { indonesia: "-", english: "-" },
    kebijakan: { indonesia: "-", english: "-" },
  };

  contentArray.forEach((item) => {
    const lang = item.bahasa?.toLowerCase();
    if (lang === "indonesia" || lang === "english") {
      result.deskripsi[lang] = item.deskripsi?.trim() || "-";
      result.kebijakan[lang] = item.kebijakan?.trim() || "-";
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

const RentCar = () => {
  const navigate = useNavigate();

  const [rentCarData, setRentCarData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);

  console.log(rentCarData, "rentCarData");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  // Modal config rentcar
  const rentCarModalConfig = {
    sections: [
      {
        fields: [
          { key: "lokasi", label: "Location" },
          { key: "nama", label: "Unit Name" },
          { key: "model", label: "Model" },
          { key: "capacity", label: "Capacity" },
          { key: "plat_nomor", label: "Plat Nomor" },
          { key: "tanggal_pajak_berakhir", label: "Tanggal Pajak Berakhir" },
          { key: "status", label: "Status" },
          { key: "description", label: "Deskripsi", type: "language-toggle" },
          {
            key: "policy_and_procedure",
            label: "Policy and Procedure",
            type: "language-toggle",
          },
          { key: "price", label: "Harga", type: "language-toggle" },
        ],
      },
    ],
  };

  // Bulk Action Configuration
  const bulkEditableFields = [
    {
      name: "nama",
      label: "Nama Unit",
      type: "text",
      placeholder: "Masukkan nama kendaraan",
      description: "Nama akan diubah untuk semua kendaraan yang dipilih",
    },
    {
      name: "model",
      label: "Model",
      type: "text",
      placeholder: "Masukkan model kendaraan",
      description: "Model kendaraan (contoh: Honda Civic, Toyota Avanza)",
    },
    {
      name: "tipe",
      label: "Tipe",
      type: "select",
      options: [
        { value: "sedan", label: "Sedan" },
        { value: "suv", label: "SUV" },
        { value: "mpv", label: "MPV" },
        { value: "hatchback", label: "Hatchback" },
        { value: "pickup", label: "Pickup" },
        { value: "van", label: "Van" },
      ],
      description: "Tipe kendaraan berdasarkan kategori",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: true, label: "Aktif" },
        { value: false, label: "Non-Aktif" },
      ],
      description: "Status ketersediaan kendaraan",
    },
    {
      name: "tanggal_pajak_berakhir",
      label: "Tanggal Pajak Berakhir",
      type: "date",
      description: "Tanggal berakhirnya pajak kendaraan",
    },
    {
      name: "lokasi_id",
      label: "Lokasi",
      type: "select",
      options: [
        { value: 1, label: "Jakarta" },
        { value: 2, label: "Bandung" },
        { value: 3, label: "Surabaya" },
        { value: 4, label: "Medan" },
        { value: 5, label: "Makassar" },
      ],
      description: "Lokasi penempatan kendaraan",
    },
  ];

  const debouncedSearch = useDebouncedValue(searchTerm);

  const fetchRentCar = async (search = "") => {
    setLoading(true);
    try {
      const params = {
        page,
        take,
        ...(search.trim() && { search: search.trim() }),
      };
      const res = await apiClient.get("/kendaraan", { params });
      const { data, total } = res.data;
      setRentCarData(data);
      setTotal(total);
    } catch (err) {
      console.error("API Error:", err);
      setRentCarData(dummyRentCarData);
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD

    // catch (err) {
    //   console.error("Failed to fetch rent car", err);
    // } finally {
    //   setLoading(false);
    // }
=======
>>>>>>> 9859d52d7f5c69ad2d7bb89c344c89831f3ae5d8
  };

  useEffect(() => {
    fetchRentCar(debouncedSearch);
  }, [debouncedSearch, page]);

  const handleSort = (columnKey) => {
    let direction = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });
    setPage(1);
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
      const { data } = await apiClient.get(`/kendaraan/${row.id}`);

      const kendaraanContentMapped = mapKendaraanContent(
        data.data.kendaraan_content
      );

      const mappedData = {
        ...data.data,
        deskripsi: kendaraanContentMapped.deskripsi,
        kebijakan: kendaraanContentMapped.kebijakan,
      };

      console.log(mappedData, "mappedData");

      setSelectedModalData(mappedData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Gagal mengambil data kendaraan:", error);
    }
  };

  const handleEdit = (row) => {
    navigate(`/admin/rent-car/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    const confirmed = window.confirm(`Yakin ingin menghapus "${row.nama}"?`);
    if (!confirmed) return;

    const deletePromise = apiClient.delete(`/kendaraan`, {
      data: {
        ids: [row.id],
      },
    });

    try {
      const result = await deletePromise;
      console.log(result, "result");
      await toast.promise(deletePromise, {
        loading: "Menghapus kendaraan...",
        success: `Kendaraan "${row.nama}" berhasil dihapus.`,
        error: "Terjadi kesalahan saat menghapus.",
      });

      // TODO: Refresh list data jika perlu
      fetchRentCar();
    } catch (err) {
      console.error("Delete gagal:", err);
    }
  };

  // Bulk Action Handlers : coba yg apus lokal
  const handleBulkDelete = async (selectedData) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus ${selectedData.length} kendaraan terpilih?`
    );
    if (!confirmed) return;

    const ids = selectedData.map((item) => item.id);

    const deletePromise = apiClient.delete("/kendaraan", {
      data: { ids },
    });

    try {
      await toast.promise(deletePromise, {
        loading: "Menghapus kendaraan...",
        success: `Berhasil menghapus ${selectedData.length} kendaraan.`,
        error: "Gagal menghapus kendaraan. Silakan coba lagi.",
      });

      // Update state lokal setelah sukses
      setRentCarData((prev) => prev.filter((item) => !ids.includes(item.id)));
    } catch (err) {
      console.error("Bulk delete gagal:", err);
      // (Optional) toast error ditangani oleh toast.promise, jadi bisa dihapus jika tidak diperlukan
    }
  };

  const handleBulkExport = async (selectedData) => {
    try {
      console.log("Bulk export data:", selectedData);

      // Create CSV content
      const headers = [
        "ID",
        "Nama",
        "Model",
        "Capacity",
        "Plat Nomor",
        "Lokasi",
        "Status",
        "Pajak Berakhir",
      ];
      const csvContent = [
        headers.join(","),
        ...selectedData.map((item) =>
          [
            item.id,
            `"${item.nama}"`,
            `"${item.model}"`,
            `"${item.capacity}"`,
            `"${item.plat_nomor || ""}"`,
            `"${item.lokasi?.nama || ""}"`,
            item.status ? "Aktif" : "Non-Aktif",
            new Date(item.tanggal_pajak_berakhir).toLocaleDateString(),
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
        `rent_cars_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`Successfully exported ${selectedData.length} rent cars`);
    } catch (err) {
      console.error("Failed to export rent cars", err);
      alert("Failed to export rent cars. Please try again.");
    }
  };

  const handleClearSelection = () => {
    setSelectedRows([]);
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return rentCarData;

    return [...rentCarData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "lokasi") {
        aValue = a.lokasi?.nama || "";
        bValue = b.lokasi?.nama || "";
      }

      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rentCarData, sortConfig]);

  // Get selected data for bulk actions
  const selectedData = useMemo(() => {
    return sortedData.filter((item) => selectedRows.includes(item.id));
  }, [sortedData, selectedRows]);

  const totalPages = Math.ceil(total / take);
  const startIndex = (page - 1) * take;

  const columns = [
    "#",
    "ID",
    "Name",
    "Model",
    "Capacity",
    "License Plate",
    "Location",
    "Status",
    "Tax Expiry",
    "Action",
  ];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
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
          {/* Bulk Action Bar */}
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
              <h1 className="text-2xl font-bold text-gray-800">Rent Car</h1>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <Search
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Search rent cars..."
                />
              </div>
              <Button
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => navigate("/admin/rent-car/create")}
              >
                Add Unit
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <Table
              data={sortedData}
              columns={columns}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSort={handleSort}
              sortConfig={sortConfig}
              startIndex={startIndex}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              defaultMapping={{
                "#": (row, index) => (page - 1) * take + index + 1,
                ID: "id",
                Nama: "nama",
                Model: "model",
                Capacity: (row) => row.capacity || "-",
                "License Plate": (row) => row.plat_nomor || "-",
                Location: (row) => row.lokasi?.nama || "-",
                Status: (row) => (row.status ? "Aktif" : "Non-Aktif"),
                "Tax Expiry": (row) =>
                  new Date(row.tanggal_pajak_berakhir).toLocaleDateString(),
                Action: null,
              }}
              take={take}
              currentPage={page}
              totalPages={Math.ceil(totalPages / take)}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>

        {/* Data info dan Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + take, total)} of{" "}
            {total} rent cars
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="base"
          />
        </div>
      </div>

      {/* Modal Detail */}
      <ModalView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detail Unit"
        data={selectedModalData}
        config={rentCarModalConfig}
        images={selectedModalData?.kendaraan_file || []}
      />
    </>
  );
};

export default RentCar;
