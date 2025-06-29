import React, { useState, useMemo } from 'react';
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination';

const Customer = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
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
    { id: 'C0011', customer_name: 'Emily Johnson', nationality: 'Australia', email: 'emily.johnson@gmail.com', phone_number: '61423456789', gender: 'Female', date_of_birth: '25-01-1991' },
    { id: 'C0012', customer_name: 'Lisa Chen', nationality: 'Singapore', email: 'lisa.chen@gmail.com', phone_number: '6587654321', gender: 'Female', date_of_birth: '03-05-1987' },
    { id: 'C0013', customer_name: 'Muhammad Ali', nationality: 'Indonesia', email: 'muhammad.ali@gmail.com', phone_number: '6289876543', gender: 'Male', date_of_birth: '14-12-1989' },
    { id: 'C0014', customer_name: 'Emily Johnson', nationality: 'Australia', email: 'emily.johnson@gmail.com', phone_number: '61423456789', gender: 'Female', date_of_birth: '25-01-1991' },
  ]);

  const columns = ['Customer name', 'Nationality', 'Email', 'Phone number', 'Gender', 'Date of birth', 'Action'];

  // Handle sorting
  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Handle row selection
  const handleRowSelect = (rowId) => {
    setSelectedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  // Handle edit customer
  const handleEdit = (row) => {
    console.log('Edit customer:', row);
    // TODO: Implement edit logic
    // Misalnya buka modal atau navigate ke edit page
    alert(`Edit customer: ${row.customer_name}`);
  };

  // Handle delete customer
  const handleDelete = (row) => {
    console.log('Delete customer:', row);
    // TODO: Implement delete confirmation
    const confirmed = window.confirm(`Are you sure you want to delete ${row.customer_name}?`);
    
    if (confirmed) {
      // Remove from customerData
      setCustomerData(prev => prev.filter(customer => customer.id !== row.id));
      
      // Remove from selected rows if selected
      setSelectedRows(prev => prev.filter(id => id !== row.id));
      
      // Show success message
      alert(`Customer ${row.customer_name} has been deleted.`);
    }
  };

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return customerData;
    
    return [...customerData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [customerData, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Customer</h2>
        {selectedRows.length > 0 && (
          <p className="text-sm text-gray-600">
            {selectedRows.length} rows selected
          </p>
        )}
      </div>
      
      {/* Table with edit and delete handlers */}
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

      {/* Data info dan Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Data info */}
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} customers
        </div>
        
        {/* Pagination */}
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