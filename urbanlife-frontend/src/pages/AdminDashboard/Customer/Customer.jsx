import React, { useState, useEffect, useMemo } from 'react';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination';
import Export from '../../../components/AdminDashboard/Utils/Ui/button/Export';
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import BulkActionBar from "../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
import apiClient from '../../../components/AdminDashboard/Utils/ApiClient/apiClient';

const Customer = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const [customerData, setCustomerData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const columns = ['Name', 'Email', 'Phone Number', 'Gender', 'Role', 'Action'];

  // 🔹 Fetch data dari API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/users', {
          params: {
            take: itemsPerPage,
            page: currentPage,
            is_admin: false,
            search: searchTerm || undefined, // optional jika backend support
          }
        });

        const users = res.data.data || [];
        setCustomerData(users);
        // kalau backend kasih total records, pakai itu
        setTotal(res.data.total || users.length);

      } catch (err) {
        console.error("❌ Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, searchTerm]);

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
    alert(`Edit customer: ${row.nama}`);
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${row.nama}?`);
    if (confirmed) {
      setCustomerData(prev => prev.filter(customer => customer.id !== row.id));
      setSelectedRows(prev => prev.filter(id => id !== row.id));
      alert(`${row.nama} was successfully deleted.`);
    }
  };

  const handleBulkDelete = (selectedData) => {
    const confirmed = window.confirm(`Delete ${selectedData.length} selected customers?`);
    if (confirmed) {
      const ids = selectedData.map(item => item.id);
      setCustomerData(prev => prev.filter(item => !ids.includes(item.id)));
      setSelectedRows([]);
      alert(`${selectedData.length} was successfully deleted.`);
    }
  };

  const handleBulkExport = (selectedData) => {
    try {
      const headers = ['ID', 'Name', 'Email', 'Phone Number', 'Gender', 'Role'];
      const csvContent = [
        headers.join(','),
        ...selectedData.map(item => [
          item.id,
          `"${item.nama}"`,
          `"${item.email}"`,
          `"${item.nomor_hp}"`,
          `"${item.gender}"`,
          `"${item.role?.name || "-"}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `customers_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`Successfully exported ${selectedData.length} customers`);
    } catch (err) {
      console.error("Export failed", err);
      alert("Failed to export customers.");
    }
  };

  const handleClearSelection = () => {
    setSelectedRows([]);
  };

  const filteredData = useMemo(() => {
    return customerData.filter((customer) =>
      Object.values(customer).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [customerData, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const selectedData = useMemo(() => {
    return sortedData.filter(item => selectedRows.includes(item.id));
  }, [sortedData, selectedRows]);

  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
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
            onExport={handleBulkExport}
            editableFields={[]}
          />
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
          <h1 className="text-2xl font-bold text-gray-800">Customer</h1>
          <div className="flex items-center gap-4">
            <Search
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search..."
            />
            <Export
              data={filteredData}
              filename="customers.csv"
              buttonText="Download"
            />
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
          loading={loading}
          // 🔹 mapping data supaya sesuai kolom
          defaultMapping={{
            "Name": (row) => row.nama,
            "Email": (row) => row.email,
            "Phone Number": (row) => row.nomor_hp,
            "Gender": (row) => row.gender,
            "Role": (row) => row.role?.name || "-"
          }}
        />
      </div>

      {/* Data info + Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, total)} of {total} customers
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          size="base"
        />
      </div>
    </div>
  );
};

export default Customer;
