// CategoryAdmin.jsx
import React, { useState, useContext, useMemo, useEffect } from "react";
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import Pagination from "../../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";
import ModalEdit from "../../../../components/AdminDashboard/Utils/Ui/modal/ModalEdit";
import { CategoryContext } from "./CategoryProvider";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

const CategoryAdmin = () => {
  const {categories, setCategories} = useContext(CategoryContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/category");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("❌ Failed to fetch categories", error);
        toast.error("Failed to load category data");
      }
    };

    fetchCategories();
  }, []);

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

 const handleModalSave = async (updatedData) => {
  try {
    if (categories.some((cat) => cat.id === updatedData.id)) {
      // Edit
      await apiClient.put(`/category/${updatedData.id}`, updatedData);
    } else {
      // Create
      await apiClient.post("/category", updatedData);
    }

    // Setelah create/update, ambil ulang data dari server
    const refreshed = await apiClient.get("/category");
    setCategories(refreshed.data.data || []);

    handleModalClose();
    toast.success("Category added successfully");
  } catch (err) {
    console.error("Failed to save category:", err);
    toast.error("Failed to save category.");
  }
};


  const handleDelete = async (row) => {
    const confirmed = window.confirm(`Are you sure want to delete "${row.name}"?`);
    if (!confirmed) return;

    const deletePromise = apiClient.delete(`/category`, {
      data: { ids: [row.id] },
    });

    try {
      await toast.promise(deletePromise, {
        loading: "Deleting category...",
        success: `"${row.name}" was deleted successfully`,
        error: "Failed to delete category",
      });

      setCategories((prev) => prev.filter((cat) => cat.id !== row.id));
      setSelectedRows((prev) => prev.filter((id) => id !== row.id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleBulkDelete = async (selectedData) => {
    const confirmed = window.confirm(`Are you sure want to delete ${selectedData.length} selected category?`);
    if (!confirmed) return;

    const ids = selectedData.map((item) => item.id);

    const deletePromise = apiClient.delete("/category", {
      data: { ids },
    });

    try {
      await toast.promise(deletePromise, {
        loading: "Deleting categories...",
        success: `${selectedData.length} was successfully deleted.`,
        error: "Could not delete the packages. Please try again.",
      });

      setCategories((prev) => prev.filter((item) => !ids.includes(item.id)));
      setSelectedRows([]);
    } catch (err) {
      console.error("Bulk delete failed:", err);
    }
  };

  const filteredData = useMemo(() => {
  return categories.filter((cat) => {
    const name = (cat.name || "").toLowerCase(); // fallback ke string kosong
    return name.includes(searchTerm.toLowerCase());
  });
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

  const columns = ["Name", "Action"];
  const defaultMapping = {
    Name: (row) => row.name || "-",
    Action: (row) => (
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
              Delete Selected
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
          <h1 className="text-2xl font-bold text-gray-800">Category</h1>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search category..." />
            </div>
            <Button
              variant="primary"
              size="sm"
              className="whitespace-nowrap"
              onClick={handleCreate}
            >
              Add Category <i className="fa-solid fa-plus ml-2"></i>
            </Button>
          </div>
        </div>

          <Table
            data={currentData}
            columns={columns}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSort={handleSort}
            onEdit={handleEdit}
            onDelete={handleDelete}
            sortConfig={sortConfig}
            startIndex={startIndex}
            defaultMapping={defaultMapping}
          />
      </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} categories
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="base"
          />
        </div>


      <ModalEdit
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        title={editingCategory?.id ? "Edit Category" : "Add Category"}
        data={editingCategory || { id: Date.now(), name: "" }}
        fields={[
          { name: "name", label: "Category Name", required: true },
        ]}
        isLoading={false}
      />
    </div>
  );
};

export default CategoryAdmin;
