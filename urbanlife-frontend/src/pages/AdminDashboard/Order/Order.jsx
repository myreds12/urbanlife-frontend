import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import "../../../styles/AdminDashboard/Order/Order.css";
import Export from "../../../components/AdminDashboard/Utils/Ui/button/Export";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import Pagination from '../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination';

const orders = [
  { id: "Order001", customer: "Angelina", type: "Day tour", detail: "Eastern Bali Tour [B]", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
  { id: "Order002", customer: "Daniel Mananta", type: "Rent car", detail: "Toyota Alphard", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
  { id: "Order003", customer: "Anne Hathaway", type: "Day tour", detail: "Eastern Bali Tour [B]", datefrom: "03 June 2025", dateto: "27 June 2025", status: "UNPAID" },
  { id: "Order004", customer: "Carlos Quiros", type: "Day tour", detail: "Eastern Bali Tour [B]", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
  { id: "Order005", customer: "Rusdi Buttler", type: "Day tour", detail: "Eastern Bali Tour [B]", datefrom: "03 June 2025", dateto: "27 June 2025", status: "CANCELLED" },
  { id: "Order006", customer: "Marchelino", type: "Day tour", detail: "Eastern Bali Tour [B]", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
  { id: "Order007", customer: "Daniella", type: "Rent car", detail: "Toyota Alphard", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
  { id: "Order008", customer: "Ceril", type: "Rent car", detail: "Toyota Alphard", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
  { id: "Order009", customer: "Maulana", type: "Rent car", detail: "Toyota Alphard", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
  { id: "Order0010", customer: "Ceril", type: "Rent car", detail: "Toyota Alphard", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
  { id: "Order0011", customer: "Maulana", type: "Rent car", detail: "Toyota Alphard", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
  { id: "Order0012", customer: "Ceril", type: "Rent car", detail: "Toyota Alphard", datefrom: "03 June 2025", dateto: "27 June 2025", status: "CANCELLED" },
  { id: "Order0013", customer: "Maulana", type: "Rent car", detail: "Toyota Alphard", datefrom: "03 June 2025", dateto: "27 June 2025", status: "PAID" },
];

const Orders = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10; //10 data per page iyh
  const columns = [
    "#",
    "Customer name",
    "Type",
    "Detail Order",
    "Date From",
    "Date To",
    "Status",
  ];

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Filter data berdasarkan search term
  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      Object.values(order).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Sort filtered data
  const sortedOrders = useMemo(() => {
    const dataToSort = [...filteredOrders];
    if (!sortConfig.key) return dataToSort;
    
    return dataToSort.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [filteredOrders, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedOrders.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset pagination when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDetailClick = (row) => {
    console.log("Detail clicked for order:", row);
    // Add your detail page navigation logic here
  };

  const actions = [
    {
      type: "detail",
      label: "Detail",
      onClick: handleDetailClick,
      variant: "outline",
      size: "sm",
    },
  ];

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
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <div className="flex items-center gap-4">
          <Search
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search..."
          />
          <Export
            data={sortedOrders}
            filename="orders.csv"
            buttonText="Download"
          />
        </div>
      </div>

      {/* Table */}
      <Table
        data={currentData}
        columns={columns}
        sortConfig={sortConfig}
        actions={actions}
        startIndex={startIndex}
      />

    </div>
      {/* Data info dan Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedOrders.length)} of {sortedOrders.length} orders
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

export default Orders;