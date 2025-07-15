import React, { useState, useEffect, useMemo } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
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

  // Bulk Action Configuration
  const bulkEditableFields = [
    {
      name: 'durasi',
      label: 'Durasi',
      type: 'number',
      placeholder: 'Masukkan durasi',
      description: 'Durasi paket dalam satuan hari/jam'
    },
    {
      name: 'harga_dewasa',
      label: 'Harga Dewasa',
      type: 'number',
      placeholder: 'Masukkan harga dewasa',
      description: 'Harga paket untuk dewasa dalam rupiah'
    },
    {
      name: 'harga_anak',
      label: 'Harga Anak',
      type: 'number',
      placeholder: 'Masukkan harga anak',
      description: 'Harga paket untuk anak dalam rupiah'
    },
    {
      name: 'lokasi_id',
      label: 'Lokasi',
      type: 'select',
      options: [
        { value: 1, label: 'Jakarta' },
        { value: 2, label: 'Bandung' },
        { value: 3, label: 'Surabaya' },
        { value: 4, label: 'Medan' },
        { value: 5, label: 'Makassar' },
        { value: 6, label: 'Yogyakarta' },
        { value: 7, label: 'Semarang' },
        { value: 8, label: 'Denpasar' }
      ],
      description: 'Lokasi destinasi paket wisata'
    },
    {
      name: 'negara_id',
      label: 'Negara',
      type: 'select',
      options: [
        { value: 1, label: 'Indonesia' },
        { value: 2, label: 'Malaysia' },
        { value: 3, label: 'Singapore' },
        { value: 4, label: 'Thailand' },
        { value: 5, label: 'Vietnam' }
      ],
      description: 'Negara destinasi paket wisata'
    }
  ];

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

  // Handler untuk View
  const handleView = (row) => {
    navigate(`/admin/day-tour/view/${row.id}`);
  };

  // Handler untuk Edit
  const handleEdit = (row) => {
    navigate(`/admin/day-tour/edit/${row.id}`);
  };

  // Handler untuk Delete
  const handleDelete = (row) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${row.nama}"?`);
    if (confirmed) {
      // Add your delete API call here
      console.log('Delete:', row.id);
      alert(`Package "${row.nama}" has been deleted.`);
    }
  };

  // Bulk Action Handlers
  const handleBulkDelete = (selectedData) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${selectedData.length} travel packages?`);
    if (confirmed) {
      const ids = selectedData.map(item => item.id);
      console.log('Bulk delete IDs:', ids);
      setDayTourData(prev => prev.filter(item => !ids.includes(item.id)));
      setSelectedRows([]);
      alert(`Successfully deleted ${selectedData.length} travel packages`);
    }
  };

  const handleBulkEdit = async (selectedData, editData) => {
    try {
      const ids = selectedData.map(item => item.id);
      console.log('Bulk edit data:', { ids, editData });
      
      // API call untuk bulk edit
      // await apiClient.patch("/travel-package/bulk", { ids, data: editData });
      
      // Temporary implementation - update state
      setDayTourData(prev => prev.map(item => 
        ids.includes(item.id) ? { ...item, ...editData } : item
      ));
      setSelectedRows([]);
      
      alert(`Successfully updated ${selectedData.length} travel packages`);
      
      // Refresh data
      fetchDayTours();
    } catch (err) {
      console.error("Failed to bulk edit travel packages", err);
      alert("Failed to update travel packages. Please try again.");
    }
  };

  const handleBulkExport = async (selectedData) => {
    try {
      console.log('Bulk export data:', selectedData);
      
      // Create CSV content
      const headers = ['ID', 'Nama', 'Durasi', 'Harga Dewasa', 'Harga Anak', 'Lokasi', 'Negara'];
      const csvContent = [
        headers.join(','),
        ...selectedData.map(item => [
          item.id,
          `"${item.nama}"`,
          `${item.durasi} ${item.tipe_durasi}`,
          item.harga_dewasa,
          item.harga_anak,
          `"${item.lokasi?.nama || ''}"`,
          `"${item.lokasi?.negara?.nama || ''}"`
        ].join(','))
      ].join('\n');
      
      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `travel_packages_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`Successfully exported ${selectedData.length} travel packages`);
    } catch (err) {
      console.error("Failed to export travel packages", err);
      alert("Failed to export travel packages. Please try again.");
    }
  };

  const handleClearSelection = () => {
    setSelectedRows([]);
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

  // Get selected data for bulk actions
  const selectedData = useMemo(() => {
    return sortedData.filter(item => selectedRows.includes(item.id));
  }, [sortedData, selectedRows]);

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
          {selectedRows.length > 0 && (
            <BulkActionBar
              selectedCount={selectedRows.length}
              selectedData={selectedData}
              onClearSelection={handleClearSelection}
              onBulkDelete={handleBulkDelete}
              onBulkEdit={handleBulkEdit}
              onExport={handleBulkExport}
              editableFields={bulkEditableFields}
            />
          )}

          {/* Header */}
          <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Day Tour / Travel Package</h1>
            </div>
            
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
            onView={handleView}
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