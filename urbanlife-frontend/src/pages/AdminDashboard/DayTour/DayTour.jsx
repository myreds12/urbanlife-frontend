import React, { useState, useEffect, useMemo } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const DayTour = () => {
  const navigate = useNavigate();

  const [dayTourData, setDayTourData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const itemsPerPage = 10;

  const fetchDayTours = async () => {
    setLoading(true);
    try {
      // Fetch all data for client-side pagination and search
      const res = await apiClient.get("/travel-package", { params: { page: 1, take: 1000 } });
      const { data } = res.data;
      setDayTourData(data);
    } catch (err) {
      console.error("Failed to fetch travel packages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDayTours();
  }, []);

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows(prev =>
      prev.includes(rowId)
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleEdit = (row) => {
    navigate(`/admin/day-tour/edit/${row.id}`);
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${row.nama}"?`);
    if (confirmed) {
      // Add your delete API call here
      console.log('Delete:', row.id);
      alert(`Package "${row.nama}" has been deleted.`);
    }
  };

  const filteredData = useMemo(() => {
    return dayTourData.filter((tour) =>
      Object.values(tour).some(value => {
        if (value && typeof value === 'object') {
          return Object.values(value).some(nestedValue =>
            String(nestedValue).toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [dayTourData, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'lokasi') {
        aValue = a.lokasi?.nama || '';
        bValue = b.lokasi?.nama || '';
      } else if (sortConfig.key === 'negara') {
        aValue = a.lokasi?.negara?.nama || '';
        bValue = b.lokasi?.negara?.nama || '';
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    "#",
    "ID",
    "Nama",
    "Durasi",
    "Harga Dewasa",
    "Harga Anak",
    "Lokasi",
    "Negara",
    "Action",
  ];

  const mapping = {
    "#": (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
    "ID": "id",
    "Nama": "nama",
    "Durasi": (row) => `${row.durasi} ${row.tipe_durasi}`,
    "Harga Dewasa": (row) => `Rp${Number(row.harga_dewasa).toLocaleString("id-ID")}`,
    "Harga Anak": (row) => `Rp${Number(row.harga_anak).toLocaleString("id-ID")}`,
    "Lokasi": (row) => row.lokasi?.nama || "-",
    "Negara": (row) => row.lokasi?.negara?.nama || "-",
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
        <div style={{ 
          background: "#ffffff", 
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
            <h1 className="text-2xl font-bold text-gray-800">Day Tour / Travel Package</h1>
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search packages..." />
              </div>
              <Button variant="primary" size="sm" className="whitespace-nowrap" onClick={() => navigate("/admin/day-tour/create")}>
                Add Package
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
            defaultMapping={mapping}
          />
        </div>

        {/* Data info dan Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} packages
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="base"
          />
        </div>
      </div>
    </>
  );
};

export default DayTour;