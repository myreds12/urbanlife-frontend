import { useState, useEffect } from "react";
import axios from "axios";
import OrdersTable from "./OrderTable";
import OrdersTabs from "./OrderTabs";
import Pagination from "../../../components/Pagination/Pagination";

const api = import.meta.env.VITE_API_URL + "/pemesanan";

const tabStatusMap = {
  "All Orders": null,
  "Open Orders": "PENDING",
  "Cancelled Order": "DIBATALKAN",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState("All Orders");

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

  const totalPages = Math.ceil(total / take);

  return (
    <div className="p-4 ml-6">
      <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

      {/* Tabs */}
      <OrdersTabs activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setPage(1); // Reset to page 1 on tab change
      }} />

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="mt-6">
            <OrdersTable orders={orders} />
          </div>

          {/* Pagination */}
          {totalPages >= 1 && (
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing {(page - 1) * take + 1} to{" "}
                {Math.min(page * take, total)} of {total} orders
              </div>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                  if (newPage >= 1 && newPage <= totalPages) {
                    setPage(newPage);
                  }
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
