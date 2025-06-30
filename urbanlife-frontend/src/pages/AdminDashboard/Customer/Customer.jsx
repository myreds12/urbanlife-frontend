import React, { useState, useMemo } from 'react';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination';
import DownloadButton from '../../../components/AdminDashboard/Utils/Ui/button/DownloadButton';

const Customer = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const [customerData, setCustomerData] = useState([
    { id: 'C001', customer_name: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phone_number: '6281887766', gender: 'Female', date_of_birth: '12-02-1988' },
    { id: 'C002', customer_name: 'Baginda Raja', nationality: 'Malaysia', email: 'sangraja@gmail.com', phone_number: '098765432123', gender: 'Lelaki Jantan', date_of_birth: '17-07-1945' },
    { id: 'C003', customer_name: 'John Doe', nationality: 'Singapore', email: 'john.doe@gmail.com', phone_number: '6581234567', gender: 'Male', date_of_birth: '15-03-1990' },
    { id: 'C004', customer_name: 'Sarah Wilson', nationality: 'Indonesia', email: 'sarah.wilson@gmail.com', phone_number: '6281234567', gender: 'Female', date_of_birth: '22-11-1985' },
    { id: 'C005', customer_name: 'Ahmad Rahman', nationality: 'Malaysia', email: 'ahmad.rahman@gmail.com', phone_number: '60123456789', gender: 'Male', date_of_birth: '08-09-1992' },
    { id: 'C006', customer_name: 'Lisa Chen', nationality: 'Singapore', email: 'lisa.chen@gmail.com', phone_number: '6587654321', gender: 'Female', date_of_birth: '03-05-1987' },
    { id: 'C007', customer_name: 'Muhammad Ali', nationality: 'Indonesia', email: 'muhammad.ali@gmail.com', phone_number: '6289876543', gender: 'Male', date_of_birth: '14-12-1989' },
    { id: 'C008', customer_name: 'Emily Johnson', nationality: 'Australia', email: 'emily.johnson@gmail.com', phone_number: '61423456789', gender: 'Female', date_of_birth: '25-01-1991' },
    { id: 'C009', customer_name: 'Lisa Chen', nationality: 'Singapore', email: 'lisa.chen@gmail.com', phone_number: '6587654321', gender: 'Female', date_of_birth: '03-05-1987' },
    { id: 'C0010', customer_name: 'Muhammad Ali', nationality: 'Indonesia', email: 'muhammad.ali@gmail.com', phone_number: '6289876543', gender: 'Male', date_of_birth: '14-12-1989' },
  ]);

  const columns = ['Customer name', 'Nationality', 'Email', 'Phone number', 'Gender', 'Date of birth', 'Action'];

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows(prev => prev.includes(rowId) ? prev.filter(id => id !== rowId) : [...prev, rowId]);
  };

  const handleEdit = (row) => {
    alert(`Edit customer: ${row.customer_name}`);
  };

  const handleDelete = (row) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${row.customer_name}?`);
    if (confirmed) {
      setCustomerData(prev => prev.filter(customer => customer.id !== row.id));
      setSelectedRows(prev => prev.filter(id => id !== row.id));
      alert(`Customer ${row.customer_name} has been deleted.`);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return customerData;
    return customerData.filter(cust =>
      Object.values(cust).some(value =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [customerData, searchQuery]);

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

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-2">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Customer</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-[240px]"
          />
          <DownloadButton data={sortedData} filename="customer-data.csv" />
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
      />

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} customers
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
