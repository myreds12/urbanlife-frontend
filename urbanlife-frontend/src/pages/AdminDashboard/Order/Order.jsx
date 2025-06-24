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
  switch (status) {
    case "PAID":
      return {
        backgroundColor: "#10b981",
        color: "#ffffff",
      };
    case "UNPAID":
      return {
        backgroundColor: "#f59e0b",
        color: "#ffffff",
      };
    case "CANCELLED":
      return {
        backgroundColor: "#ef4444",
        color: "#ffffff",
      };
    default:
      return {
        backgroundColor: "#6b7280",
        color: "#ffffff",
      };
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
      <div style={{ 
        background: "#ffffff", 
        borderRadius: "5px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        overflow: "hidden"
      }}>

        {/* Table */}
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb" }}>
                <th style={{ 
                  padding: "12px 24px", 
                  fontWeight: "500", 
                  color: "#6b7280", 
                  textAlign: "left", 
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Booking ID
                </th>
                <th style={{ 
                  padding: "12px 24px", 
                  fontWeight: "500", 
                  color: "#6b7280", 
                  textAlign: "left", 
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Customer
                </th>
                <th style={{ 
                  padding: "12px 24px", 
                  fontWeight: "500", 
                  color: "#6b7280", 
                  textAlign: "left", 
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Type
                </th>
                <th style={{ 
                  padding: "12px 24px", 
                  fontWeight: "500", 
                  color: "#6b7280", 
                  textAlign: "left", 
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Detail
                </th>
                <th style={{ 
                  padding: "12px 24px", 
                  fontWeight: "500", 
                  color: "#6b7280", 
                  textAlign: "left", 
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Date
                </th>
                <th style={{ 
                  padding: "12px 24px", 
                  fontWeight: "500", 
                  color: "#6b7280", 
                  textAlign: "left", 
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Amount
                </th>
                <th style={{ 
                  padding: "12px 24px", 
                  fontWeight: "500", 
                  color: "#6b7280", 
                  textAlign: "left", 
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} style={{ 
                  borderBottom: index < orders.length - 1 ? "1px solid #f3f4f6" : "none",
                  transition: "background-color 0.2s ease"
                }}>
                  <td style={{ 
                    padding: "10px 24px", 
                    color: "#6b7280", 
                    fontSize: "14px" 
                  }}>
                    {order.id}
                  </td>
                  <td style={{ padding: "10px 24px" }}>
                    <div style={{ color: "#111827", fontSize: "14px", fontWeight: "500" }}>
                      {order.customer}
                    </div>
                  </td>
                  <td style={{ 
                    padding: "10px 24px", 
                    color: "#6b7280", 
                    fontSize: "14px" 
                  }}>
                    {order.type}
                  </td>
                  <td style={{ 
                    padding: "10px 24px", 
                    color: "#6b7280", 
                    fontSize: "14px" 
                  }}>
                    {order.detail}
                  </td>
                  <td style={{ 
                    padding: "10px 24px", 
                    color: "#6b7280", 
                    fontSize: "14px" 
                  }}>
                    {order.date}
                  </td>
                  <td style={{ 
                    padding: "10px 24px", 
                    color: "#6b7280", 
                    fontSize: "14px" 
                  }}>
                    {order.amount}
                  </td>
                  <td style={{ padding: "10px 24px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontWeight: "600",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.025em",
                      ...getStatusStyle(order.status),
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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