// CategoryAdmin.jsx
import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import Pagination from "../../../../components/Pagination/Pagination";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";
import ModalEdit from "../../../../components/AdminDashboard/Utils/Ui/modal/ModalEdit";
import { CategoryContext } from "./CategoryProvider";

const CategoryAdmin = () => {
  const navigate = useNavigate();
  const { categories, setCategories } = useContext(CategoryContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const itemsPerPage = 10;

  const handleSort = (columnKey) => {
    let direction = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const handleEdit = (row) => {
    setEditingCategory(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleModalSave = (updatedData) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === updatedData.id ? updatedData : cat))
    );
    handleModalClose();
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(`Yakin mau hapus "${row.name}"?`);
    if (confirmed) {
      setCategories((prev) => prev.filter((cat) => cat.id !== row.id));
      setSelectedRows((prev) => prev.filter((id) => id !== row.id));
      alert(`Kategori "${row.name}" berhasil dihapus.`);
    }
  };

  const handleBulkDelete = (selectedData) => {
    const confirmed = window.confirm(`Yakin mau hapus ${selectedData.length} kategori?`);
    if (confirmed) {
      const ids = selectedData.map((item) => item.id);
      setCategories((prev) => prev.filter((item) => !ids.includes(item.id)));
      setSelectedRows([]);
      alert(`Berhasil hapus ${selectedData.length} kategori.`);
    }
  };

  const filteredData = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const selectedData = useMemo(() => {
    return sortedData.filter((item) => selectedRows.includes(item.id));
  }, [sortedData, selectedRows]);

  const columns = ["Name", "Aksi"];
  const defaultMapping = {
    Name: (row) => row.name || "-",
    Aksi: (row) => (
      <div>
        <span onClick={() => handleEdit(row)} style={{ cursor: "pointer", color: "blue" }}>Edit</span> | 
        <span onClick={() => handleDelete(row)} style={{ cursor: "pointer", color: "red" }}>Delete</span>
      </div>
    ),
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreate = () => {
    setEditingCategory({ id: Date.now(), name: "" });
    setIsModalOpen(true);
  };

  return (
    <div className="p-5">
      <div style={{ background: "#ffffff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
        {selectedRows.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20 mb-6">
            <button
              onClick={() => handleBulkDelete(selectedData)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Hapus Terpilih
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
          <h1 className="text-2xl font-bold text-gray-800">Data Master - Category</h1>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Cari kategori..." />
            </div>
            <Button
              variant="primary"
              size="sm"
              className="whitespace-nowrap"
              onClick={handleCreate}
            >
              Tambah Kategori <i className="fa-solid fa-plus ml-2"></i>
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
          <Table
            data={currentData}
            columns={columns}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSort={handleSort}
            sortConfig={sortConfig}
            startIndex={startIndex}
            defaultMapping={defaultMapping}
          />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, sortedData.length)} dari{" "}
            {sortedData.length} kategori
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="base"
          />
        </div>
      </div>

      <ModalEdit
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        title={editingCategory?.id ? "Edit Kategori" : "Tambah Kategori"}
        data={editingCategory || { id: Date.now(), name: "" }}
        fields={[
          { name: "name", label: "Nama Kategori", required: true },
        ]}
        isLoading={false}
      />
    </div>
  );
};

export default CategoryAdmin;