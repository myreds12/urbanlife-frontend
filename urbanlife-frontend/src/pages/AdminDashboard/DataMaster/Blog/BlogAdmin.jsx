// BlogAdmin.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import Pagination from "../../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";
import BulkActionBar from "../../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import { BlogContext } from "./BlogProvider";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import { useDebounce } from "../../../../hooks/useDebounce";
import toast from "react-hot-toast";

const BlogAdmin = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const params = {
        take: itemsPerPage,
        page: currentPage,
      };
      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      const response = await apiClient.get("/blog", { params });
      const { data, total } = response.data;
      setBlogData(data);
      setTotalItems(total);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
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

  const handleEdit = (row) => {
    navigate(`/admin/blogs/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    const judul = row.content?.[0]?.judul || "blog ini";
    const confirmed = window.confirm(`Yakin ingin menghapus "${judul}"?`);
    if (!confirmed) return;

    const deletePromise = apiClient.delete(`/blog`, {
      data: {
        ids: [row.id],
      },
    });

    try {
      await toast.promise(deletePromise, {
        loading: "Menghapus blog...",
        success: `Blog "${judul}" berhasil dihapus.`,
        error: "Terjadi kesalahan saat menghapus.",
      });

      // Hapus dari state lokal jika berhasil
      setBlogData((prev) => prev.filter((blog) => blog.id !== row.id));
      setSelectedRows((prev) => prev.filter((id) => id !== row.id));
    } catch (err) {
      console.error("Gagal menghapus blog:", err);
    }
  };

  const handleBulkDelete = (selectedData) => {
    const confirmed = window.confirm(
      `Yakin mau hapus ${selectedData.length} blog?`
    );
    if (confirmed) {
      const ids = selectedData.map((item) => item.id);
      setBlogData((prev) => prev.filter((item) => !ids.includes(item.id)));
      setSelectedRows([]);
      alert(`Berhasil hapus ${selectedData.length} blog.`);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return blogData;
    return [...blogData].sort((a, b) => {
      const getFieldValue = (item) => {
        switch (sortConfig.key) {
          case "Kategori":
            return item.blog_category?.name?.toLowerCase() || "";
          case "Judul":
            return item.blog_content[0]?.judul?.toLowerCase() || "";
          case "Tanggal":
            return item.createdAt || "";
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
  }, [blogData, sortConfig]);

  const selectedData = useMemo(() => {
    return sortedData.filter((item) => selectedRows.includes(item.id));
  }, [sortedData, selectedRows]);

  const columns = ["Category", "Title", "Date", "Action"];
  const defaultMapping = {
    Category: (row) => row.blog_category.name || "-",
    Title: (row) => row.blog_content[0]?.judul || "-",
    Date: (row) =>
    Category: (row) => row.blog_category.name || "-",
    Title: (row) => row.blog_content[0]?.judul || "-",
    Date: (row) =>
      row.createdAt ? new Date(row.createdAt).toLocaleDateString("id-ID") : "-",
    Action: (row) => (
    Action: (row) => (
      <div className="flex gap-2 text-sm">
        <button
          onClick={() => handleEdit(row)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <span>|</span>
        <button
          onClick={() => handleDelete(row)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    ),
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentData = blogData;

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div
        className="bg-white rounded-xl shadow overflow-hidden"
      >
        {selectedRows.length > 0 && (
          <BulkActionBar
            selectedCount={selectedRows.length}
            selectedData={selectedData}
            onClearSelection={() => setSelectedRows([])}
            onBulkDelete={handleBulkDelete}
          />
        )}

        <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
          <h1 className="text-2xl font-bold text-gray-800 darktitle">Blog</h1>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Search
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search blog..."
                placeholder="Search blog..."
                isLoading={loading}
              />
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
          startIndex={(currentPage - 1) * itemsPerPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          defaultMapping={defaultMapping}
        />        
      </div>

      {/* Data info dan Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700 darksubtitle">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, sortedData.length)} of{" "}
            {sortedData.length} blogs
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
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
