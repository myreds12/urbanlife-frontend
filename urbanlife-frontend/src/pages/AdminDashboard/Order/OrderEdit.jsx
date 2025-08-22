import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const api = import.meta.env.VITE_API_URL + "/pemesanan";

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orderData, setOrderData] = useState({
    id: "",
    user: { nama: "", email: "" },
    type: "",
    detail: "",
    total_harga: "",
    status: "",
    notes: "",
    createdAt: "",
  });

  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "DONE", label: "Paid" },
    { value: "DIBATALKAN", label: "Cancelled" },
  ];

  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/${id}`);
      const data = res.data.data;
      setOrderData({
        id: data.id || "",
        user: {
          nama: data.user?.nama || "",
          email: data.user?.email || "",
        },
        type: data.type || "",
        detail: data.detail || "",
        total_harga: data.total_harga || "",
        status: data.status || "",
        notes: data.notes || "",
        createdAt: data.createdAt || "",
      });
    } catch (err) {
      console.error("Failed to fetch order detail", err);
      alert("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setOrderData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setOrderData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData = {
        type: orderData.type,
        detail: orderData.detail,
        total_harga: parseFloat(orderData.total_harga) || 0,
        status: orderData.status,
        notes: orderData.notes,
      };

      await axios.put(`${api}/${id}`, updateData);
      alert("Order updated successfully!");
      navigate("/admin/order");
    } catch (err) {
      console.error("Failed to update order", err);
      alert("Failed to update order. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/order"); 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div
        className="shadow-md"
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          overflow: "hidden",
          maxWidth: "1050px",
          margin: "0 auto",
        }}
      >
        <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800"> Order Edit </h1>
          </div>
        </div>

        <div className="">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking ID
                </label>
                <input
                  type="text"
                  value={orderData.id}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={orderData.user.nama}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Email
                </label>
                <input
                  type="email"
                  value={orderData.user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={orderData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  name="total_harga"
                  value={orderData.total_harga}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={orderData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Created Date
                </label>
                <input
                  type="text"
                  value={
                    orderData.createdAt
                      ? new Date(orderData.createdAt).toLocaleDateString()
                      : "-"
                  }
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Detail */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detail
                </label>
                <textarea
                  name="detail"
                  value={orderData.detail}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Order details..."
                />
              </div>

              {/* Notes*/}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={orderData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Additional notes for this order..."
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 px-6 pb-6 mt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default OrderEdit;
