import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import OrdersTabs from "./OrderTabs";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
import Export from "../../../components/AdminDashboard/Utils/Ui/button/Export";
import StatusBadge from "../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";
import dummyOrders from "./dummyOrders";

const api = import.meta.env.VITE_API_URL + "/pemesanan";

const tabStatusMap = {
  "All Orders": null,
  "Paid Orders": "DONE",
  "Pending Orders": "PENDING",
  "Cancelled Order": "DIBATALKAN",
};

const Orders = () => {
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const columns = [
    "#",
    "Booking ID",
    "Customer",
    "Type",
    "Detail",
    "Date",
    "Amount",
    "Status",
    "Action",
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
      console.error("Failed to fetch orders from API, using dummy data", err);
      // Use dummy data if API fails
      setTimeout(() => {
        // Filter dummy data based on active tab
        const status = tabStatusMap[activeTab];
        let filteredDummyOrders = dummyOrders;
        
        if (status) {
          filteredDummyOrders = dummyOrders.filter(order => order.status === status);
        }
        
        setOrders(filteredDummyOrders);
        setTotal(filteredDummyOrders.length);
        setLoading(false);
      }, 1000);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, activeTab]);

  const handleSort = (columnKey) => {
    let direction = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });
    setPage(1);
  };

  const handleView =(row) => {
    navigate(`/admin/order/detail/${row.id}`);
  };

  const handleEdit = (row) => {
    navigate(`/admin/order/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    const confirmed = window.confirm(`Are you sure you want to delete order "${row.id}"?`);
    if (!confirmed) return;

    try {
      const deletePromise = axios.delete(`${api}/${row.id}`);
      
      await toast.promise(deletePromise, {
        loading: "Deleting order...",
        success: `Order "${row.id}" was successfully deleted.`,
        error: "Could not delete the order. Please try again.",
      });

      // Refresh the orders list
      fetchOrders();
    } catch (err) {
      console.error("Failed to delete order:", err);
      toast.error("Failed to delete order. Please try again.");
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return orders;

    return orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase();

      const directMatch = Object.values(order).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      );

      const nestedMatch =
        (order.user?.nama &&
          order.user.nama.toLowerCase().includes(searchLower)) ||
        (order.user?.email &&
          order.user.email.toLowerCase().includes(searchLower)) ||
        (order.detail && order.detail.toLowerCase().includes(searchLower)) ||
        (order.id && String(order.id).toLowerCase().includes(searchLower));

      return directMatch || nestedMatch;
    });
  }, [orders, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "Customer") {
        aValue = a.user?.nama || "";
        bValue = b.user?.nama || "";
      } else if (sortConfig.key === "Amount") {
        aValue = a.total_harga || 0;
        bValue = b.total_harga || 0;
      }

      aValue = String(aValue);
      bValue = String(bValue);

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
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
    <>
      <div className="p-4 ml-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

        <div className="flex justify-between items-center">
          {/* Tabs */}
          <OrdersTabs
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setPage(1);
            }}
          />

          {/* Search */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Search
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search orders..."
              />
            </div>
            <Export
              data={filteredData}
              filename="orders.csv"
              buttonText="Download"
            />
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
                onSort={handleSort}
                sortConfig={sortConfig}
                startIndex={startIndex}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                defaultMapping={{
                  "#": (row, index) => (page - 1) * take + index + 1,
                  "Booking ID": (row) => row.id,
                  Customer: (row) => row.user?.nama || "-",
                  Type: "type",
                  Detail: (row) => row.detail || "-",
                  Date: (row) => {
                    const date = new Date(row.createdAt);
                    return date.toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    });
                  },
                  Amount: (row) => `Rp${Number(row.total_harga).toLocaleString("id-ID")}`,
                  Status: (row) => <StatusBadge status={row.status} />,
                  Action: null,
                }}
                take={take}
                currentPage={page}
                totalPages={totalPages}
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

      {/* Modal View */}
      {/* <ModalView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Details"
        data={selectedModalData}
        config={orderModalConfig}
      /> */}
    </>
  );
};

export default Orders;
