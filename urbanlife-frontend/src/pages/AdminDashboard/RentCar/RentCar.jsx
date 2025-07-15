import React, { useState, useEffect, useMemo } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const RentCar = () => {
  const navigate = useNavigate();

  const [rentCarData, setRentCarData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);

  // Bulk Action Configuration
  const bulkEditableFields = [
    {
      name: 'nama',
      label: 'Nama Kendaraan',
      type: 'text',
      placeholder: 'Masukkan nama kendaraan',
      description: 'Nama akan diubah untuk semua kendaraan yang dipilih'
    },
    {
      name: 'model',
      label: 'Model',
      type: 'text',
      placeholder: 'Masukkan model kendaraan',
      description: 'Model kendaraan (contoh: Honda Civic, Toyota Avanza)'
    },
    {
      name: 'tipe',
      label: 'Tipe',
      type: 'select',
      options: [
        { value: 'sedan', label: 'Sedan' },
        { value: 'suv', label: 'SUV' },
        { value: 'mpv', label: 'MPV' },
        { value: 'hatchback', label: 'Hatchback' },
        { value: 'pickup', label: 'Pickup' },
        { value: 'van', label: 'Van' }
      ],
      description: 'Tipe kendaraan berdasarkan kategori'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: true, label: 'Aktif' },
        { value: false, label: 'Non-Aktif' }
      ],
      description: 'Status ketersediaan kendaraan'
    },
    {
      name: 'tanggal_pajak_berakhir',
      label: 'Tanggal Pajak Berakhir',
      type: 'date',
      description: 'Tanggal berakhirnya pajak kendaraan'
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
        { value: 5, label: 'Makassar' }
      ],
      description: 'Lokasi penempatan kendaraan'
    }
  ];

  const fetchRentCar = async () => {
    setLoading(true);
    try {
      const params = { page, take };
      const res = await apiClient.get("/kendaraan", { params });
      const { data, total } = res.data;
      setRentCarData(data);
      setTotal(total);
    } catch (err) {
      console.error("Failed to fetch rent car", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentCar();
  }, [page]);

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
    setPage(1); 
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
    navigate(`/admin/rent-car/edit/${row.id}`);
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${row.nama}"?`);
    if (confirmed) {
      console.log('Delete:', row.id);
      alert(`Rent car "${row.nama}" has been deleted.`);
    }
  };

  // Bulk Action Handlers : coba yg apus lokal
  const handleBulkDelete = (selectedData) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${selectedData.length} rent cars?`);
    if (confirmed) {
      const ids = selectedData.map(item => item.id);
      console.log('Bulk delete IDs:', ids);
      setRentCarData(prev => prev.filter(item => !ids.includes(item.id)));
      setSelectedRows([]);
      alert(`Successfully deleted ${selectedData.length} rent cars`);
    }
  };
  const handleBulkEdit = async (selectedData, editData) => {
    try {
      const ids = selectedData.map(item => item.id);
      console.log('Bulk edit data:', { ids, editData });
      
      // API call untuk bulk edit
      // await apiClient.patch("/kendaraan/bulk", { ids, data: editData });
      
      // Temporary implementation - update state
      setRentCarData(prev => prev.map(item => 
        ids.includes(item.id) ? { ...item, ...editData } : item
      ));
      setSelectedRows([]);
      
      alert(`Successfully updated ${selectedData.length} rent cars`);
      
      // Refresh data
      fetchRentCar();
    } catch (err) {
      console.error("Failed to bulk edit rent cars", err);
      alert("Failed to update rent cars. Please try again.");
    }
  };

  const handleBulkExport = async (selectedData) => {
    try {
      console.log('Bulk export data:', selectedData);
      
      // Create CSV content
      const headers = ['ID', 'Nama', 'Model', 'Tipe', 'Plat Nomor', 'Lokasi', 'Status', 'Pajak Berakhir'];
      const csvContent = [
        headers.join(','),
        ...selectedData.map(item => [
          item.id,
          `"${item.nama}"`,
          `"${item.model}"`,
          `"${item.tipe}"`,
          `"${item.plat_nomor || ''}"`,
          `"${item.lokasi?.nama || ''}"`,
          item.status ? 'Aktif' : 'Non-Aktif',
          new Date(item.tanggal_pajak_berakhir).toLocaleDateString()
        ].join(','))
      ].join('\n');
      
      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `rent_cars_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`Successfully exported ${selectedData.length} rent cars`);
    } catch (err) {
      console.error("Failed to export rent cars", err);
      alert("Failed to export rent cars. Please try again.");
    }
  };

  const handleClearSelection = () => {
    setSelectedRows([]);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return rentCarData;
    
    return rentCarData.filter((car) => {
      const directMatch = Object.values(car).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const nestedMatch = 
        (car.lokasi?.nama && car.lokasi.nama.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return directMatch || nestedMatch;
    });
  }, [rentCarData, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'lokasi') {
        aValue = a.lokasi?.nama || '';
        bValue = b.lokasi?.nama || '';
      }
      
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

  const totalPages = Math.ceil(total / take);
  const startIndex = (page - 1) * take;

  const columns = [
    "#",
    "ID",
    "Nama",
    "Model",
    "Tipe",
    "Plat Nomor",
    "Lokasi",
    "Status",
    "Pajak Berakhir",
    "Action",
  ];
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
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
              <h1 className="text-2xl font-bold text-gray-800">Rent Car</h1>
            </div>
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <Search 
                  searchTerm={searchTerm} 
                  onSearchChange={setSearchTerm} 
                  placeholder="Search rent cars..." 
                />
              </div>
              <Button 
                variant="primary" 
                size="sm" 
                className="whitespace-nowrap" 
                onClick={() => navigate("/admin/rent-car/create")}
              >
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
              "#": (row, index) => (page - 1) * take + index + 1,
              "ID": "id",
              "Nama": "nama",
              "Model": "model",
              "Tipe": "tipe",
              "Plat Nomor": (row) => row.plat_nomor || '-',
              "Lokasi": (row) => row.lokasi?.nama || '-',
              "Status": (row) => row.status ? "Aktif" : "Non-Aktif",
              "Pajak Berakhir": (row) => new Date(row.tanggal_pajak_berakhir).toLocaleDateString(),
              "Action": null
            }}
            take={take}
            currentPage={page}
            totalPages={Math.ceil(totalPages / take)}
            handlePageChange={handlePageChange}
          />
        </div>

        {/* Data info dan Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + take, total)} of {total} rent cars
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            size="base"
          />
        </div>
      </div>
    </>
  );
};

export default RentCar;