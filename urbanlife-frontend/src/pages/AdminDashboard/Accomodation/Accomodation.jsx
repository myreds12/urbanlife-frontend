import React, { useEffect, useState, useMemo, useCallback } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

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

const Accomodation = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: null, direction: "asc" });
  const [selected, setSelected] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: response } = await apiClient.get("/akomodasi", {
        params: { page, take: ITEMS_PER_PAGE },
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
      console.error(e);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      return sort.direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [filtered, sort]);

  const selectedData = useMemo(() => {
    return sorted.filter((item) => selected.includes(item.id));
  }, [sorted, selected]);

  const handleBulkEdit = async (rows) => {
    const ids = rows.map((r) => r.id);
    // await apiClient.patch("/akomodasi/bulk", { ids, data: changes });
    alert(`Updated ${ids.length} rows`);
    setSelected([]);
    fetchData();
  };

  const handleBulkDelete = (rows) => {
    const ids = rows.map((r) => r.id);
    setData((prev) => prev.filter((d) => !ids.includes(d.id)));
    setSelected([]);
    alert(`Deleted ${ids.length} rows`);
  };

  const handleBulkExport = (rows) => {
    const csv = [
      ["ID", "Name", "Location", "Type", "Category"].join(","),
      ...rows.map((r) => [r.id, r.name, r.location, r.type, r.category].join(",")),
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
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {selected.length > 0 && (
          <BulkActionBar
            selectedCount={selected.length}
            selectedData={selectedData}
            onClearSelection={() => setSelected([])}
            onBulkDelete={handleBulkDelete}
            onBulkEdit={handleBulkEdit}
            onExport={handleBulkExport}
            editableFields={bulkEditableFields}
          />
        )}

        <div className="flex justify-between items-center p-5">
          <h1 className="text-2xl font-bold">Accommodation</h1>
          <div className="flex gap-4">
            <Search
              searchTerm={search}
              onSearchChange={setSearch}
              placeholder="Search accommodations..."
            />
            <Button onClick={() => navigate("/admin/accommodation/create")}>Add Unit</Button>
          </div>
        </div>

        <Table
          data={sorted}
          columns={["#", "Name", "Location", "Type", "Category", "Action"]}
          selectedRows={selected}
          onRowSelect={(id) =>
            setSelected((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]))
          }
          onSort={(key) => {
            const dir = sort.key === key && sort.direction === "asc" ? "desc" : "asc";
            setSort({ key, direction: dir });
          }}
          sortConfig={sort}
          startIndex={(page - 1) * ITEMS_PER_PAGE}
          onView={(row) => navigate(`/admin/day-tour/view/${row.id}`)}
          onEdit={(row) => navigate(`/admin/accommodation/edit/${row.id}`)}
          onDelete={(row) => alert(`Delete: ${row.name}`)}
          defaultMapping={{
            "#": (row, index) => (page - 1) * ITEMS_PER_PAGE + index + 1,
            Name: "name",
            Location: "location",
            Type: "type",
            Category: "category",
          }}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={page}
          totalPages={Math.ceil(total / ITEMS_PER_PAGE)}
          handlePageChange={setPage}
        />

        <div className="mt-4 flex justify-between items-center text-sm text-gray-600 px-5 pb-4">
          <span>
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, total)} of {total} accommodations
          </span>
          <Pagination currentPage={page} totalPages={Math.ceil(total / ITEMS_PER_PAGE)} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default Accomodation;