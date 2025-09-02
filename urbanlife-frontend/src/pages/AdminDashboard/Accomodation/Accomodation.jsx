import React, { useEffect, useState, useMemo, useCallback } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import ModalView from "../../../components/AdminDashboard/Utils/Ui/modal/ModalDetail";
import { dummyAccomodationData } from "./DummyAccomodation";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

const bulkEditableFields = [
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
      { value: 9, label: "Malang" },
      { value: 10, label: "Solo" },
    ],
    description: "Lokasi penempatan akomodasi",
  },
  {
    name: "tipe",
    label: "Type",
    type: "select",
    options: [
      { value: "hotel", label: "Hotel" },
      { value: "resort", label: "Resort" },
      { value: "villa", label: "Villa" },
      { value: "apartment", label: "Apartment" },
      { value: "guesthouse", label: "Guesthouse" },
      { value: "hostel", label: "Hostel" },
      { value: "homestay", label: "Homestay" },
    ],
    description: "Tipe akomodasi",
  },
  {
    name: "kategori",
    label: "Category",
    type: "select",
    options: [
      { value: "budget", label: "Budget" },
      { value: "standard", label: "Standard" },
      { value: "deluxe", label: "Deluxe" },
      { value: "premium", label: "Premium" },
      { value: "luxury", label: "Luxury" },
    ],
    description: "Kategori akomodasi berdasarkan kelas",
  },
];

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

const mapRoomAndPrice = (roomArray = []) => {
  return roomArray.map((room) => ({
    destination: room.nama || "-",
    description: `Rp${Number(room.harga).toLocaleString("id-ID")}`,
  }));
};

const mapFacilities = (facilityGroups = []) => {
  return facilityGroups.flatMap((group) => group.fasilitas.map((f) => f.nama));
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

const akomodasiModalConfig = {
  sections: [
    {
      fields: [
        { key: "lokasi", label: "Location" },
        { key: "nama", label: "Accommodation Name" },
        { key: "kategori", label: "Category" },
        { key: "tipe", label: "Type" },
        {
          key: "deskripsi",
          label: "Description",
          type: "language-toggle",
          languageKey: "deskripsi",
        },
        {
          key: "facility",
          label: "Facility",
        },
        {
          key: "room_and_price",
          label: "Room & Price",
        },
        {
          key: "status",
          label: "Status",
          type: "boolean",
        },
      ],
    },
  ],
};

const Accomodation = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: null, direction: "asc" });
  const [selected, setSelected] = useState([]);
  const debouncedSearch = useDebouncedValue(search);

  console.log(data, "Data Accomodation");

  //Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const fetchData = useCallback(
    async (search = "") => {
      setLoading(true);
      try {
        const { data: response } = await apiClient.get("/akomodasi", {
          params: {
            page,
            take: ITEMS_PER_PAGE,
            ...(search.trim() && { search: search.trim() }),
          },
        });
        const rows = response.data.map((item) => ({
          id: item.id,
          name: item.nama,
          location: item.lokasi?.nama || "-",
          type: item.tipe,
          category: item.kategori,
          rawData: item,
        }));
        setData(rows);
        setTotal(response.total);
      } catch (e) {
        console.error(
          "Failed to fetch accomodation from API, using dummy data",
          e
        );
        // Use dummy data if API fails
        setTimeout(() => {
          setData(dummyAccomodationData);
          setLoading(false);
        }, 1000);
        return;
        // catch (e) {
        // console.error(e);
        // alert("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, debouncedSearch, page]);

  const handleView = async (row) => {
    const { data } = await apiClient.get(`/akomodasi/${row.id}`);

    const deskripsiMapped = mapContent(data.data.akomodasi_content);
    const facilityMapped = mapFacilities(data.data.akomodasi_facility_group);
    const rooms = mapRoomAndPrice(data.data.akomodasi_room_and_price);

    const modalData = {
      ...data.data,
      deskripsi: deskripsiMapped.deskripsi,
      facility: facilityMapped,
      room_and_price: rooms,
    };

    console.log(modalData, "modalData");

    setSelectedModalData(modalData);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    navigate(`/admin/accommodation/edit/${row.id}`);
  };

  // Handler untuk Popular (sementara)
const handlePopular = async (row) => {
  const newStatus = !row.is_popular; // langsung akses row.is_popular

  const confirmed = window.confirm(
    `${newStatus ? "Add" : "Remove"} "${row.nama}" ${
      newStatus ? "to" : "from"
    } Popular Categories?`
  );
  if (!confirmed) return;

  try {
    const updatePromise = apiClient.patch(`/akomodasi/${row.id}/popular`, {
      is_popular: newStatus,
    });

    await toast.promise(updatePromise, {
      loading: newStatus
        ? "Marking as popular..."
        : "Removing from popular...",
      success: `"${row.nama}" ${
        newStatus ? "added to" : "removed from"
      } popular categories!`,
      error: "Failed to update popular status. Please try again.",
    });

    fetchData(); // sama kayak handler lain, refresh data
  } catch (err) {
    console.error("Failed to update popular status:", err);
  }
};


  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter((d) =>
      `${d.name} ${d.location} ${d.type} ${d.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;
    return [...filtered].sort((a, b) => {
      const valA = String(a[sort.key]);
      const valB = String(b[sort.key]);
      return sort.direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }, [filtered, sort]);

  const selectedData = useMemo(() => {
    return sorted.filter((item) => selected.includes(item.id));
  }, [sorted, selected]);

  const handleBulkDelete = async (selectedData) => {
    const confirmed = window.confirm(
      `Delete ${selectedData.length} selected accommodations?`
    );
    if (!confirmed) return;

    const ids = selectedData.map((item) => item.id);

    const deletePromise = apiClient.delete("/akomodasi", {
      data: { ids },
    });

    try {
      await toast.promise(deletePromise, {
        loading: "Deleting accommodations...",
        success: `${selectedData.length} was successfully deleted.`,
        error: "Could not delete the accomodations. Please try again.",
      });

      // Update state lokal setelah sukses
      setData((prev) => prev.filter((item) => !ids.includes(item.id)));
      setSelected([]);
    } catch (err) {
      console.error("Bulk delete failed:", err);
      // (Optional) toast error ditangani oleh toast.promise, jadi bisa dihapus jika tidak diperlukan
    }
  };

  const handleDelete = async (row) => {
    const confirmed = window.confirm(
      `Are you sure want to delete "${row.nama}"?`
    );
    if (!confirmed) return;

    const deletePromise = apiClient.delete(`/akomodasi`, {
      data: {
        ids: [row.id],
      },
    });

    try {
      const result = await deletePromise;
      console.log(result, "result");
      await toast.promise(deletePromise, {
        loading: "Deleting accommodation...",
        success: `"${row.nama}" was successfully deleted.`,
        error: "Could not delete the accommodation. Please try again.",
      });

      // TODO: Refresh list data jika perlu
      fetchData();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleBulkExport = (rows) => {
    const csv = [
      ["ID", "Name", "Location", "Type", "Category"].join(","),
      ...rows.map((r) =>
        [r.id, r.name, r.location, r.type, r.category].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `accommodations_${Date.now()}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-[1050px] mx-auto">
        {/* Bulk Action Bar */}
        {selected.length > 0 && (
          <BulkActionBar
            selectedCount={selected.length}
            selectedData={selectedData}
            onClearSelection={() => setSelected([])}
            onBulkDelete={handleBulkDelete}
            onExport={handleBulkExport}
            editableFields={bulkEditableFields}
          />
        )}

        {/* Header */}
        <div className="flex justify-between items-center p-5">
          <h1 className="text-2xl font-bold">Accommodation</h1>
          <div className="flex gap-4">
            <Search
              searchTerm={search}
              onSearchChange={setSearch}
              placeholder="Search accommodations..."
            />
            <Button
              variant="primary"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => navigate("/admin/accommodation/create")}
            >
              Add Unit <i className="fa-solid fa-plus"></i>{" "}
            </Button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <Table
            data={sorted}
            columns={["#", "Name", "Location", "Type", "Category", "Action"]}
            selectedRows={selected}
            onRowSelect={(id) =>
              setSelected((prev) =>
                prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
              )
            }
            onSort={(key) => {
              const dir =
                sort.key === key && sort.direction === "asc" ? "desc" : "asc";
              setSort({ key, direction: dir });
            }}
            sortConfig={sort}
            startIndex={(page - 1) * ITEMS_PER_PAGE}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPopular={handlePopular}
            defaultMapping={{
              "#": (row, index) => (page - 1) * ITEMS_PER_PAGE + index + 1,
              Name: (row) => row.name,
              Location: (row) => row.location || '',
              Type: (row) => row.type,
              Category: (row) => row.category,
            }}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={page}
            totalPages={Math.ceil(total / ITEMS_PER_PAGE)}
            handlePageChange={setPage}
          />
        </div>
      </div>

      {/* Data info dan Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600 px-5 pb-4">
        <span>
          Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(page * ITEMS_PER_PAGE, total)} of {total} accommodations
        </span>
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / ITEMS_PER_PAGE)}
          onPageChange={setPage}
        />
      </div>

      {/* Modal Detail */}
      <ModalView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detail Unit"
        data={selectedModalData}
        config={akomodasiModalConfig}
        images={selectedModalData?.images || []}
      />
    </div>
  );
};

export default Accomodation;
