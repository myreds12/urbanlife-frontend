import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import EditNews from "./EditNews";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const News = () => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  console.log(editingNews, "editingNews");

  const [newsData, setNewsData] = useState([]);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/news");
      setNewsData(response.data.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
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
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleEdit = (row) => {
    setEditingNews(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setIsLoading(false);
  };

  // Updated handleModalSave to work with NewsEditModal
  const handleModalSave = async (updatedData) => {
    try {
      // Update the news data
      setNewsData((prev) =>
        prev.map((news) =>
          news.id === editingNews.id ? { ...news, ...updatedData } : news
        )
      );

      // Close modal
      handleModalClose();
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${row.newssubject}"?`
    );
    if (confirmed) {
      setNewsData((prev) => prev.filter((news) => news.id !== row.id));
      setSelectedRows((prev) => prev.filter((id) => id !== row.id));
      alert(`News "${row.newssubject}" has been deleted.`);
    }
  };

  const filteredData = useMemo(() => {
    return newsData.filter((news) => {
      const categoryName = news.news_category?.name?.toLowerCase() || "";
      const contentTitles = news.news_content
        .map((c) => c.judul?.toLowerCase() || "")
        .join(" ");

      const combinedText = `${categoryName} ${contentTitles}`;
      return combinedText.includes(searchTerm.toLowerCase());
    });
  }, [newsData, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const getFieldValue = (item) => {
        switch (sortConfig.key) {
          case "News_Category":
            return item.news_category?.name || "";
          case "News_Subject":
            return item.news_content[0]?.judul || "";
          case "Date_Created":
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
  }, [filteredData, sortConfig]);
  const columns = ["News Category", "News Subject", "Date Created", "Action"];
  const defaultMapping = {
    "News Category": (row) => row.news_category?.name || "",
    "News Subject": (row) =>
      row.news_content[0].judul ? row.news_content[0].judul : "-",
    "Date Created": (row) =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "-",
  };
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="p-5">
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
            <h1 className="text-2xl font-bold text-gray-800">News</h1>

            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <Search
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Search news..."
                />
              </div>
              <Button
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => navigate("/admin/news/create")}
              >
                Add News
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
          </div>

          {/* Table */}
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
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, sortedData.length)} of{" "}
            {sortedData.length} news
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="base"
          />
        </div>
      </div>

      {/* News Edit Modal */}
      {editingNews && (
        <EditNews
          id={editingNews.id}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          newsData={editingNews}
          onSave={handleModalSave}
        />
      )}
    </>
  );
};

export default News;
