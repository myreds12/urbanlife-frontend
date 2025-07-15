import React, { useEffect, useState, useMemo } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const Accomodation = () => {
  const navigate = useNavigate();
  const [accommodationData, setAccommodationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const itemsPerPage = 10;

  console.log(accommodationData, "accommodationData");

  // Bulk Action Configuration
  const bulkEditableFields = [
    {
      name: 'lokasi_id',
      label: 'Location',
      type: 'select',
      options: [
        { value: 1, label: 'Jakarta' },
        { value: 2, label: 'Bandung' },
        { value: 3, label: 'Surabaya' },
        { value: 4, label: 'Medan' },
        { value: 5, label: 'Makassar' },
        { value: 6, label: 'Yogyakarta' },
        { value: 7, label: 'Semarang' },
        { value: 8, label: 'Denpasar' },
        { value: 9, label: 'Malang' },
        { value: 10, label: 'Solo' }
      ],
      description: 'Lokasi penempatan akomodasi'
    },
    {
      name: 'tipe',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'hotel', label: 'Hotel' },
        { value: 'resort', label: 'Resort' },
        { value: 'villa', label: 'Villa' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'guesthouse', label: 'Guesthouse' },
        { value: 'hostel', label: 'Hostel' },
        { value: 'homestay', label: 'Homestay' }
      ],
      description: 'Tipe akomodasi'
    },
    {
      name: 'kategori',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'budget', label: 'Budget' },
        { value: 'standard', label: 'Standard' },
        { value: 'deluxe', label: 'Deluxe' },
        { value: 'premium', label: 'Premium' },
        { value: 'luxury', label: 'Luxury' }
      ],
      description: 'Kategori akomodasi berdasarkan kelas'
    }
  ];

  const fetchAccommodations = async (page = 1, take = itemsPerPage) => {
    setIsLoading(true);
    try {
      const params = { page, take };
      const response = await apiClient.get("/akomodasi", { params });

      const data = response?.data?.data || [];
      const total = response?.data?.total || 0;

      const formatted = data.map((item) => ({
        id: item.id,
        name: item.nama,
        location: item.lokasi?.nama || "-",
        type: item.tipe,
        category: item.kategori,
        rawData: item, // Keep original data for edit/delete
      }));

      setAccommodationData(formatted);
      setTotalItems(total);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      alert("Failed to load accommodations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccommodations(currentPage);
  }, [currentPage]);

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows(prev =>
      prev.includes(rowId)
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleView = (row) => {
    navigate(`/admin/day-tour/view/${row.id}`);
  };

  const handleEdit = (row) => {
    navigate(`/admin/accommodation/edit/${row.id}`);
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${row.name}"?`);
    if (confirmed) {
      // Add your delete API call here
      console.log('Delete:', row.id);
      alert(`Accommodation "${row.name}" has been deleted.`);
    }
  };

  // Bulk Action Handlers
  const handleBulkDelete = (selectedData) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${selectedData.length} accommodations?`);
    if (confirmed) {
      const ids = selectedData.map(item => item.id);
      console.log('Bulk delete IDs:', ids);
      setAccommodationData(prev => prev.filter(item => !ids.includes(item.id)));
      setSelectedRows([]);
      alert(`Successfully deleted ${selectedData.length} accommodations`);
    }
  };

  const handleBulkEdit = async (selectedData, editData) => {
    try {
      const ids = selectedData.map(item => item.id);
      console.log('Bulk edit data:', { ids, editData });
      
      // API call untuk bulk edit
      // await apiClient.patch("/akomodasi/bulk", { ids, data: editData });
      
      // Temporary implementation - update state
      setAccommodationData(prev => prev.map(item => 
        ids.includes(item.id) ? { ...item, ...editData } : item
      ));
      setSelectedRows([]);
      
      alert(`Successfully updated ${selectedData.length} accommodations`);
      
      // Refresh data
      fetchAccommodations(currentPage);
    } catch (err) {
      console.error("Failed to bulk edit accommodations", err);
      alert("Failed to update accommodations. Please try again.");
    }
  };

  const handleBulkExport = async (selectedData) => {
    try {
      console.log('Bulk export data:', selectedData);
      
      // Create CSV content
      const headers = ['ID', 'Name', 'Location', 'Type', 'Category'];
      const csvContent = [
        headers.join(','),
        ...selectedData.map(item => [
          item.id,
          `"${item.name}"`,
          `"${item.location}"`,
          `"${item.type}"`,
          `"${item.category}"`
        ].join(','))
      ].join('\n');
      
      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `accommodations_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`Successfully exported ${selectedData.length} accommodations`);
    } catch (err) {
      console.error("Failed to export accommodations", err);
      alert("Failed to export accommodations. Please try again.");
    }
  };

  const handleClearSelection = () => {
    setSelectedRows([]);
  };

  // Client-side filtering for search (on current page data)
  const filteredData = useMemo(() => {
    if (!searchTerm) return accommodationData;
    
    return accommodationData.filter((accommodation) => {
      // Search in all visible properties
      const searchableText = `${accommodation.name} ${accommodation.location} ${accommodation.type} ${accommodation.category}`.toLowerCase();
      return searchableText.includes(searchTerm.toLowerCase());
    });
  }, [accommodationData, searchTerm]);

  // Client-side sorting (on current page data)
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // Convert to string for comparison
      aValue = String(aValue);
      bValue = String(bValue);
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Get selected data for bulk actions
  const selectedData = useMemo(() => {
    return sortedData.filter(item => selectedRows.includes(item.id));
  }, [sortedData, selectedRows]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const columns = [
    "#",
    "Name",
    "Location",
    "Type", 
    "Category",
    "Action",
  ];

  if (isLoading) {
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
          {/* Bulk Action Bar - Only show when items are selected */}
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
              <h1 className="text-2xl font-bold text-gray-800">Accommodation</h1>
            </div>
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search accommodations..." />
              </div>
              <Button variant="primary" size="sm" className="whitespace-nowrap" onClick={() => navigate("/admin/accommodation/create")}>
                Add Unit
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
          </div>

          {/* Table */}
          <Table
            data={sortedData}
            columns={columns}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSort={handleSort}
            sortConfig={sortConfig}
            startIndex={startIndex}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            defaultMapping={{
              "#": (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
              Name: "name",
              Location: "location",
              Type: "type",
              Category: "category",
            }}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            handlePageChange={handlePageChange}
          />
        </div>

        {/* Data info dan Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} accommodations
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

export default Accomodation;