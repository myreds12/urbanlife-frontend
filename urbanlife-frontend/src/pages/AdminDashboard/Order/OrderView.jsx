import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import StatusBadge from "../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";

const api = import.meta.env.VITE_API_URL + "/pemesanan";

const OrderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${api}/${id}`);
      const orderData = response.data.data;

      const mappedOrder = {
        ...orderData,
        customer_name: orderData.user?.nama || "-",
        customer_email: orderData.user?.email || "-",
      };

      setOrder(mappedOrder);
    } catch (err) {
      console.error("Failed to fetch order details:", err);
      setError("Failed to load order details");
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete order "${order.id}"?`
    );
    if (!confirmed) return;

    try {
      const deletePromise = axios.delete(`${api}/${order.id}`);

      await toast.promise(deletePromise, {
        loading: "Deleting order...",
        success: `Order "${order.id}" was successfully deleted.`,
        error: "Could not delete the order. Please try again.",
      });

      navigate("/admin/order");
    } catch (err) {
      console.error("Failed to delete order:", err);
      toast.error("Failed to delete order. Please try again.");
    }
  };

  const handleEdit = () => {
    navigate(`/admin/order/edit/${order.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return `Rp${Number(amount).toLocaleString("id-ID")}`;
  };

  if (loading) {
    return (
      <div className="p-4 ml-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-4 ml-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error || "Order not found"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/order")}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 ml-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/order")}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>

          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-600">Order ID: {order.id}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* Order Information Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Order Information
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking ID
                </label>
                <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-md">
                  {order.id}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Type
                </label>
                <p className="text-sm text-gray-900 px-3 py-2 bg-cyan-50 rounded-md inline-block">
                  {order.type || "-"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <StatusBadge status={order.status} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Date
                </label>
                <p className="text-sm text-gray-900">
                  {order.createdAt ? formatDate(order.createdAt) : "-"}
                </p>
              </div>

              {order.updatedAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Updated
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatDate(order.updatedAt)}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <p className="text-sm text-gray-900">{order.customer_name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Email
                </label>
                <p className="text-sm text-gray-900">{order.customer_email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Amount
                </label>
                <p className="text-lg font-semibold text-green-600">
                  {order.total_harga ? formatCurrency(order.total_harga) : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          {order.detail && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Details
              </label>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">
                  {order.detail}
                </p>
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {Object.entries(order)
                .filter(
                  ([key, value]) =>
                    ![
                      "id",
                      "type",
                      "status",
                      "customer_name",
                      "customer_email",
                      "total_harga",
                      "detail",
                    ].includes(key) &&
                    value !== null &&
                    value !== undefined &&
                    value !== ""
                )
                .map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium text-gray-700 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="ml-2 text-gray-900">
                      {typeof value === "object"
                        ? JSON.stringify(value, null, 2)
                        : String(value)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
