import React, { useState, useMemo } from 'react';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination';
import Export from '../../../components/AdminDashboard/Utils/Ui/button/Export';
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";

const Customer = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const [customerData, setCustomerData] = useState([
    { id: 'C001', customername: 'Lindsey Curtis', nationality: 'Indonesia', email: 'lindsey.curtis@gmail.com', phonenumber: '6281887766', gender: 'Female', dateofbirth: '12-02-1988' },
    { id: 'C002', customername: 'Baginda Raja', nationality: 'Malaysia', email: 'sangraja@gmail.com', phonenumber: '098765432123', gender: 'Lelaki Jantan', dateofbirth: '17-07-1945' },
    { id: 'C003', customername: 'John Doe', nationality: 'Singapore', email: 'john.doe@gmail.com', phonenumber: '6581234567', gender: 'Male', dateofbirth: '15-03-1990' },
    { id: 'C004', customername: 'Sarah Wilson', nationality: 'Indonesia', email: 'sarah.wilson@gmail.com', phonenumber: '6281234567', gender: 'Female', dateofbirth: '22-11-1985' },
    { id: 'C005', customername: 'Ahmad Rahman', nationality: 'Malaysia', email: 'ahmad.rahman@gmail.com', phonenumber: '60123456789', gender: 'Male', dateofbirth: '08-09-1992' },
    { id: 'C006', customername: 'Lisa Chen', nationality: 'Singapore', email: 'lisa.chen@gmail.com', phonenumber: '6587654321', gender: 'Female', dateofbirth: '03-05-1987' },
    { id: 'C007', customername: 'Muhammad Ali', nationality: 'Indonesia', email: 'muhammad.ali@gmail.com', phonenumber: '6289876543', gender: 'Male', dateofbirth: '14-12-1989' },
    { id: 'C008', customername: 'Emily Johnson', nationality: 'Australia', email: 'emily.johnson@gmail.com', phonenumber: '61423456789', gender: 'Female', dateofbirth: '25-01-1991' },
    { id: 'C009', customername: 'Lisa Chen', nationality: 'Singapore', email: 'lisa.chen@gmail.com', phonenumber: '6587654321', gender: 'Female', dateofbirth: '03-05-1987' },
    { id: 'C0010', customername: 'Muhammad Ali', nationality: 'Indonesia', email: 'muhammad.ali@gmail.com', phonenumber: '6289876543', gender: 'Male', dateofbirth: '14-12-1989' },
    { id: 'C0011', customername: 'Emily Johnson', nationality: 'Australia', email: 'emily.johnson@gmail.com', phonenumber: '61423456789', gender: 'Female', dateofbirth: '25-01-1991' },
    { id: 'C0012', customername: 'Lisa Chen', nationality: 'Singapore', email: 'lisa.chen@gmail.com', phonenumber: '6587654321', gender: 'Female', dateofbirth: '03-05-1987' },
    { id: 'C0013', customername: 'Muhammad Ali', nationality: 'Indonesia', email: 'muhammad.ali@gmail.com', phonenumber: '6289876543', gender: 'Male', dateofbirth: '14-12-1989' },
    { id: 'C0014', customername: 'Emily Johnson', nationality: 'Australia', email: 'emily.johnson@gmail.com', phonenumber: '61423456789', gender: 'Female', dateofbirth: '25-01-1991' },
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
    setSelectedRows(prev =>
      prev.includes(rowId)
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
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

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        </div>

        {/* Data info dan Pagination */}
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
    </>
  );
};

export default Customer;