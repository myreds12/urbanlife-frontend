// BlogAdmin.jsx
import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import Pagination from "../../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";
import BulkActionBar from "../../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import EditBlog from "./EditBlog";
import { BlogContext } from "./BlogProvider";

const BlogAdmin = () => {
  const navigate = useNavigate();
  const { blogData, setBlogData, categories } = useContext(BlogContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const itemsPerPage = 10;

  const bulkEditableFields = [
    { name: "category", label: "Category", type: "select", options: categories, description: "Blog category" },
  ];

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
    setEditingBlog(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
  };

  const handleModalSave = (updatedData) => {
    setBlogData((prev) => prev.map((blog) => (blog.id === updatedData.id ? updatedData : blog)));
    handleModalClose();
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(`Yakin mau hapus "${row.content[0]?.judul || "blog ini"}"?`);
    if (confirmed) {
      setBlogData((prev) => prev.filter((blog) => blog.id !== row.id));
      setSelectedRows((prev) => prev.filter((id) => id !== row.id));
      alert(`Blog "${row.content[0]?.judul || "item"}" berhasil dihapus.`);
    }
  };

  const handleBulkDelete = (selectedData) => {
    const confirmed = window.confirm(`Yakin mau hapus ${selectedData.length} blog?`);
    if (confirmed) {
      const ids = selectedData.map((item) => item.id);
      setBlogData((prev) => prev.filter((item) => !ids.includes(item.id)));
      setSelectedRows([]);
      alert(`Berhasil hapus ${selectedData.length} blog.`);
    }
  };

  const handleBulkEdit = (selectedData, editData) => {
    const confirmed = window.confirm(`Yakin mau update ${selectedData.length} blog?`);
    if (confirmed) {
      const ids = selectedData.map((item) => item.id);
      setBlogData((prev) =>
        prev.map((item) => (ids.includes(item.id) ? { ...item, ...editData } : item))
      );
      setSelectedRows([]);
      alert(`Berhasil update ${selectedData.length} blog.`);
    }
  };

  const filteredData = useMemo(() => {
    return blogData.filter((blog) => {
      const categoryName = blog.category?.toLowerCase() || "";
      const contentTitles = blog.content.map((c) => c.judul?.toLowerCase() || "").join(" ");
      const combinedText = `${categoryName} ${contentTitles}`;
      return combinedText.includes(searchTerm.toLowerCase());
    });
  }, [blogData, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const getFieldValue = (item) => {
        switch (sortConfig.key) {
          case "Kategori":
            return item.category || "";
          case "Judul":
            return item.content[0]?.judul || "";
          case "Tanggal":
            return item.date || "";
          default:
            return "";
        }
      };
      const aValue = getFieldValue(a);
      const bValue = getFieldValue(b);
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const selectedData = useMemo(() => {
    return sortedData.filter((item) => selectedRows.includes(item.id));
  }, [sortedData, selectedRows]);

  const columns = ["Category", "Title", "Date", "Action"];
  const defaultMapping = {
    Category: (row) => row.category || "-",
    Title: (row) => row.content[0]?.judul || "-",
    Date: (row) => (row.date ? new Date(row.date).toLocaleDateString("id-ID") : "-"),
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

  return (
    <div className="p-5">
      <div style={{ background: "#ffffff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
        {selectedRows.length > 0 && (
          <BulkActionBar
            selectedCount={selectedRows.length}
            selectedData={selectedData}
            onClearSelection={() => setSelectedRows([])}
            onBulkDelete={handleBulkDelete}
            onBulkEdit={handleBulkEdit}
            editableFields={bulkEditableFields}
          />
        )}

        <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
          <h1 className="text-2xl font-bold text-gray-800">Blog</h1>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search blog..." />
            </div>
            <Button
              variant="primary"
              size="sm"
              className="whitespace-nowrap"
              onClick={() => navigate("/admin/blogs/create")}
            >
              Add Blog <i className="fa-solid fa-plus ml-2"></i>
            </Button>
          </div>
        </div>

        <Table
          data={currentData}
          columns={columns}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSort={handleSort}
          sortConfig={sortConfig}
          startIndex={startIndex}
          onEdit={handleEdit}
          onDelete={handleDelete}
          defaultMapping={defaultMapping}
        />        
      </div>

      {/* Data info dan Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of{" "}
            {sortedData.length} blogs
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="base"
          />
        </div>


      <EditBlog
        id={editingBlog?.id}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        blogData={editingBlog}
        onSave={handleModalSave}
        categories={categories}
      />
    </div>
  );
};

export default BlogAdmin;