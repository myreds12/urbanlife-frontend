import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/AdminDashboard/Order/Order.css";

const Orders = () => {
  // Data dummy untuk tabel
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
      customer: "ceril",
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

  const getStatus = (status) => {
    switch (status) {
      case "PAID":
        return {
          backgroundColor: "#d1fae5", // bg-green-100
          color: "#10b981",           // text-green-600
        };
      case "UNPAID":
        return {
          backgroundColor: "#fef3c7", // bg-yellow-100
          color: "#f59e0b",           // text-yellow-600
        };
      case "CANCELLED":
        return {
          backgroundColor: "#fee2e2", // bg-red-100
          color: "#ef4444",           // text-red-500
        };
      default:
        return {
          backgroundColor: "#e5e7eb", // bg-gray-200
          color: "#6b7280",           // text-gray-500
        };
    }
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>Orders</h1>
        <div className="mt-3 space-x-6">
          <button className="text-sm font-medium transition duration-100 ease-in-out text-gray-900 hover:text-cyan-600 group underline-from-left relative">
            All Orders
          </button>
          <button className="text-sm font-medium transition duration-100 ease-in-out text-gray-900 hover:text-cyan-600 group underline-from-left relative">
            Open Orders
          </button>
          <button className="text-sm font-medium transition duration-100 ease-in-out text-gray-900 hover:text-cyan-600 group underline-from-left relative">
            Cancelled Order
          </button>
        </div>
      </div>

      <div style={{ overflow: "hidden", border: "1px solid #e5e7eb", background: "#ffffff", padding: "16px", borderRadius: "12px" }}>
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ borderBottom: "1px solid #e5e7eb" }}>
              <tr>
                <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Booking ID</th>
                <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Customer Name</th>
                <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Type of Order</th>
                <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Detail Order</th>
                <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Date</th>
                <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Total Amount</th>
                <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Payment Status</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: "1px solid #e5e7eb" }}>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>{order.id}</td>
                  <td style={{ padding: "12px" }}>
                        <p style={{ fontWeight: "500", color: "#1f2937", fontSize: "14px" }}>{order.customer}</p>
                  </td>
                  <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>{order.type}</td>
                  <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>{order.detail}</td>
                  <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>{order.date}</td>
                  <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>{order.amount}</td>
                  <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        fontWeight: 500,
                        fontSize: "13px",
                        ...getStatus(order.status.toUpperCase()),
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar (simplified) */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Order</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link></li>
          <li><Link to="/orders" className="text-green-600 font-bold">Orders</Link></li>
          <li><Link to="/day-tour" className="text-gray-600 hover:text-gray-900">Day Tour</Link></li>
          <li><Link to="/rent-car" className="text-gray-600 hover:text-gray-900">Rent Car</Link></li>
          <li><Link to="/accommodation" className="text-gray-600 hover:text-gray-900">Accommodation</Link></li>
          <li><Link to="/inbox" className="text-gray-600 hover:text-gray-900">Inbox</Link></li>
          <li><Link to="/whatsapp-setting" className="text-gray-600 hover:text-gray-900">Whatsapp setting</Link></li>
          <li><Link to="/setting" className="text-gray-600 hover:text-gray-900">Setting</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Orders;