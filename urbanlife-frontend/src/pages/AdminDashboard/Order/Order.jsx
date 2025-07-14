import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import OrdersTabs from "./OrderTabs";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";

const api = import.meta.env.VITE_API_URL + "/pemesanan";

const tabStatusMap = {
  "All Orders": null,
  "Paid Orders": "SELESAI",
  "Unpaid Orders": "PENDING",
  "Cancelled Order": "DIBATALKAN",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    "#",
    "Booking ID",
    "Customer",
    "Type",
    "Detail",
    "Date",
    "Amount",
    "Status",
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const status = tabStatusMap[activeTab];
      const params = { page, take };
      if (status) params.status = status;

      const res = await axios.get(api, { params });
      const { data, total } = res.data;

      setOrders(data);
      setTotal(total);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, activeTab]);

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

  const filteredData = useMemo(() => {
    if (!searchTerm) return orders;
    
    return orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      
      // Search in direct properties
      const directMatch = Object.values(order).some(value => 
        String(value).toLowerCase().includes(searchLower)
      );
      
      // Search in nested objects - disesuaikan dengan struktur data Orders
      const nestedMatch = 
        (order.user?.nama && order.user.nama.toLowerCase().includes(searchLower)) ||
        (order.user?.email && order.user.email.toLowerCase().includes(searchLower)) ||
        (order.detail && order.detail.toLowerCase().includes(searchLower)) ||
        (order.id && String(order.id).toLowerCase().includes(searchLower));
      
      return directMatch || nestedMatch;
    });
  }, [orders, searchTerm]);

  // Client-side sorting (on current page data)
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // Handle nested objects
      if (sortConfig.key === 'Amount') {
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
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4 ml-6">
      <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

      <div className="flex justify-between items-center">
        {/* Tabs */}
        <OrdersTabs activeTab={activeTab} setActiveTab={(tab) => {
          setActiveTab(tab);
          setPage(1); // Reset to page 1 on tab change
        }} />

        {/* Search */}
        <div className="flex flex-wrap justify-between items-center gap-4">
             <div className="flex-1 min-w-[200px]">
              <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search orders..." />
            </div>
        </div>

      </div>
      

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="mt-6">
            <Table
              data={sortedData}
              columns={columns}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSort={handleSort}
              sortConfig={sortConfig}
              startIndex={startIndex}
              defaultMapping={{
                "#": (row, index) => (page - 1) * take + index + 1,
                "Booking ID": (row) => row.id,
                "Customer": (row) => row.user.nama || '-',
                "Type": "type",
                "Detail": (row) => row.detail || '-',
                "Date": (row) => row.createdAt || '-',
                "Amount": (row) => row.total_harga || '-',
              }}
              take={take}
              currentPage={page}
              totalPages={totalPages} // Fixed calculation
              handlePageChange={handlePageChange}
            />
          </div>

          {/* Data info dan Pagination */}
          {totalPages >= 1 && (
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing {(page - 1) * take + 1} to{" "}
                {Math.min(page * take, total)} of {total} orders
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                size="base"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;