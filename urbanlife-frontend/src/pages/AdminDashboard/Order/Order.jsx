import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/AdminDashboard/Order/Order.css";

const orders = [
  {
    id: "Order001",
    customer: "Angelina",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    date: "03 June 2025",
    amount: "Rp 2,100,000",
    status: "PAID",
  },
  {
    id: "Order002",
    customer: "Daniel Mananta",
    type: "Rent car",
    detail: "Toyota Alphard",
    date: "03 June 2025",
    amount: "Rp 1,200,000",
    status: "PAID",
  },
  {
    id: "Order003",
    customer: "Anne Hathaway",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    date: "03 June 2025",
    amount: "Rp 2,100,000",
    status: "UNPAID",
  },
  {
    id: "Order004",
    customer: "Carlos Quiros",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    date: "03 June 2025",
    amount: "Rp 1,200,000",
    status: "PAID",
  },
  {
    id: "Order005",
    customer: "Jimmy Buttler",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    date: "03 June 2025",
    amount: "Rp 2,100,000",
    status: "CANCELLED",
  },
  {
    id: "Order006",
    customer: "Marchelino",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    date: "03 June 2025",
    amount: "Rp 1,200,000",
    status: "PAID",
  },
  {
    id: "Order007",
    customer: "Daniella",
    type: "Rent car",
    detail: "Toyota Alphard",
    date: "03 June 2025",
    amount: "Rp 1,200,000",
    status: "PAID",
  },
  {
    id: "Order008",
    customer: "Ceril",
    type: "Rent car",
    detail: "Toyota Alphard",
    date: "03 June 2025",
    amount: "Rp 1,200,000",
    status: "PAID",
  },
  {
    id: "Order009",
    customer: "Maulana",
    type: "Rent car",
    detail: "Toyota Alphard",
    date: "03 June 2025",
    amount: "Rp 1,200,000",
    status: "PAID",
  },
];

const getStatusStyle = (status) => {
  const base = {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "9999px",
    fontWeight: 500,
    fontSize: "13px",
  };

  switch (status) {
    case "PAID":
      return { ...base, backgroundColor: "#d1fae5", color: "#10b981" };
    case "UNPAID":
      return { ...base, backgroundColor: "#fef3c7", color: "#f59e0b" };
    case "CANCELLED":
      return { ...base, backgroundColor: "#fee2e2", color: "#ef4444" };
    default:
      return { ...base, backgroundColor: "#e5e7eb", color: "#6b7280" };
  }
};

const Orders = () => {
  return (
    <div className="p-4">
      {/* Title and Tabs */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="mt-3 space-x-6">
          {["All Orders", "Open Orders", "Cancelled Order"].map((tab, idx) => (
            <button
              key={idx}
              className="text-sm font-medium text-gray-900 hover:text-cyan-600 relative group"
            >
              {tab}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-200"></span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="border-b text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-3">Booking ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Type</th>
              <th className="p-3">Detail</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3 font-medium">{order.customer}</td>
                <td className="p-3">{order.type}</td>
                <td className="p-3">{order.detail}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">{order.amount}</td>
                <td className="p-3">
                  <span style={getStatusStyle(order.status.toUpperCase())}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar (suggest to extract as component) */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">Order</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="text-gray-700 hover:text-cyan-600">Dashboard</Link></li>
          <li><Link to="/orders" className="text-cyan-600 font-bold">Orders</Link></li>
          <li><Link to="/day-tour" className="text-gray-700 hover:text-cyan-600">Day Tour</Link></li>
          <li><Link to="/rent-car" className="text-gray-700 hover:text-cyan-600">Rent Car</Link></li>
          <li><Link to="/accommodation" className="text-gray-700 hover:text-cyan-600">Accommodation</Link></li>
          <li><Link to="/inbox" className="text-gray-700 hover:text-cyan-600">Inbox</Link></li>
          <li><Link to="/whatsapp-setting" className="text-gray-700 hover:text-cyan-600">Whatsapp setting</Link></li>
          <li><Link to="/setting" className="text-gray-700 hover:text-cyan-600">Setting</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Orders;
