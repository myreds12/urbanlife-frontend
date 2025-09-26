// src/pages/AdminDashboard/AboutUs/AboutUs.jsx
import React, { useState, useEffect, useMemo } from "react";
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import ModalView from "../../../../components/AdminDashboard/Utils/Ui/modal/ModalDetail";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

const AboutUs = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  console.log(contents, "CONTENTS");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);


  const fetchContents = async (search = "") => {
    setLoading(true);
    try {
      const params = { page: currentPage, take, ...(search.trim() && { search: search.trim() }) };
      const res = await apiClient.get("/aboutus", { params });
      const { data, total } = res.data;
      setContents(data);
      setTotal(total);
    } catch (err) {
      console.error("Failed to fetch about us contents", err);
      toast.error("Gagal memuat data About Us. Menggunakan data dummy.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents(searchTerm);
  }, [currentPage, searchTerm]);

  const handleSort = (columnKey) => {
    let direction = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const handleView = async (row) => {
    try {
      const { data } = await apiClient.get(`/aboutus/${row.id}`);
      setSelectedModalData(data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch details:", error);
      toast.error("Gagal memuat detail About Us");
    }
  };

  const handleEdit = (row) => {
    navigate(`/admin/aboutus/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    console.log(row, "ROW");
    if (!window.confirm(`Hapus konten "${row.title_id}"?`)) return;
    try {
      await apiClient.delete(`/aboutus/${row.id}`);
      toast.success(`content "${row.title_id}" successfully deleted`);
      fetchContents();
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete content. Please try again.");
    }
  };

  const handleBulkDelete = async (selectedData) => {
    if (!window.confirm(`Hapus ${selectedData.length} konten?`)) return;
    const ids = selectedData.map((item) => item.id);
    try {
      await apiClient.post("/aboutus/bulk-delete", {ids});
      toast.success(`successfully deleted ${selectedData.length} content`);
      setSelectedRows([]);
      fetchContents();
    } catch (err) {
      console.error("Bulk delete failed:", err);
      toast.error("Bulk delete failed. Please try again.");
    }
  };

  const handleClearSelection = () => setSelectedRows([]);

  const filteredData = useMemo(() => {
    return contents.filter((content) =>
      Object.values(content).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [contents, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(total / take);
  const startIndex = (currentPage - 1) * take;
  const currentData = sortedData.slice(startIndex, startIndex + take);

  const handlePageChange = (page) => setCurrentPage(page);

  const columns = ["#", "Title", "Description", "Action"];
  const mapping = {
    "#": (_, index) => startIndex + index + 1,
    "Title": (row) => row.title_en,
    "Description": (row) => row.content_en,
    
    Action: null,
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
            selectedData={sortedData.filter((item) => selectedRows.includes(item.id))}
            onClearSelection={handleClearSelection}
            onBulkDelete={handleBulkDelete}
          />
        )}

        <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">About Us Management</h1>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Search
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search sections..."
              />
            </div>
            { total == 0 
              ? <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/admin/aboutus/create")}
                >
                  Add Section <i className="fa-solid fa-plus"></i>
                </Button>
              : <></>
            }
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <Table
            data={currentData}
            columns={columns}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSort={handleSort}
            sortConfig={sortConfig}
            startIndex={startIndex}
            // onView={handleView}
            onEdit={handleEdit}
            // onDelete={handleDelete}
            defaultMapping={mapping}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + take, total)} of {total} sections
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          size="base"
        />
      </div>

      <ModalView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="About Us Detail"
        data={selectedModalData}
        config={{
          sections: [
            {
              fields: [
                { key: "section", label: "Section" },
                { key: "title_en", label: "Title)" },
                { key: "title_id", label: "Title (ID)" },
                { key: "subtitle_en", label: "Subtitle (EN)" },
                { key: "subtitle_id", label: "Subtitle (ID)" },
                { key: "description_en", label: "Description (EN)" },
                { key: "description_id", label: "Description (ID)" },
                { key: "button_text", label: "Button Text" },
                { key: "button_link", label: "Button Link" },
                { key: "images", label: "Images", type: "image" },
                {
                  key: "services",
                  label: "Services",
                  type: "list",
                  fields: [
                    { key: "title_en", label: "Title (EN)" },
                    { key: "title_id", label: "Title (ID)" },
                    { key: "description_en", label: "Description (EN)" },
                    { key: "description_id", label: "Description (ID)" },
                    { key: "icon", label: "Icon" },
                    { key: "location", label: "Location" },
                    { key: "order", label: "Order" },
                  ],
                },
                {
                  key: "schedule",
                  label: "Schedule",
                  type: "list",
                  fields: [
                    { key: "day", label: "Day" },
                    { key: "time", label: "Time" },
                    { key: "highlight", label: "Highlight" },
                  ],
                },
                {
                  key: "stats",
                  label: "Achievements",
                  type: "list",
                  fields: [
                    { key: "number", label: "Number" },
                    { key: "label_en", label: "Label (EN)" },
                    { key: "label_id", label: "Label (ID)" },
                    { key: "icon", label: "Icon" },
                  ],
                },
              ],
            },
          ],
        }}
        images={selectedModalData?.images || []}
      />
    </div>
  );
};

export default AboutUs;