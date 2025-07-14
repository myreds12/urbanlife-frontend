import React, { useState, useEffect, useMemo } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
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

  const filteredData = useMemo(() => {
    if (!searchTerm) return rentCarData;
    
    return rentCarData.filter((car) => {
      // Search in direct properties
      const directMatch = Object.values(car).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Search in nested objects
      const nestedMatch = 
        (car.lokasi?.nama && car.lokasi.nama.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return directMatch || nestedMatch;
    });
  }, [rentCarData, searchTerm]);

  // Client-side sorting (on current page data)
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // Handle nested objects
      if (sortConfig.key === 'lokasi') {
        aValue = a.lokasi?.nama || '';
        bValue = b.lokasi?.nama || '';
      }
      
      // Convert to string for comparison
      aValue = String(aValue);
      bValue = String(bValue);
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

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
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
            <h1 className="text-2xl font-bold text-gray-800">Rent Car</h1>
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search rent cars..." />
              </div>
              <Button variant="primary" size="sm" className="whitespace-nowrap" onClick={() => navigate("/admin/rent-car/create")}>
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            defaultMapping={{
              "#": (row, index) => (page - 1) * take + index + 1,
              "ID": "id",
              "Name": "name",
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