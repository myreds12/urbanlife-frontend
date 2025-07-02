import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from '../../../components/AdminDashboard/Utils/Table/Table';
import "../../../styles/AdminDashboard/Order/Order.css";

const orders = [
  {
    id: "Order001",
    customer: "Angelina",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "27 June 2025",
    status: "PAID",
  },
  {
    id: "Order002",
    customer: "Daniel Mananta",
    type: "Rent car",
    detail: "Toyota Alphard",
    datefrom: "03 June 2025",
    dateto: "27 June 2025",
    status: "PAID",
  },
  {
    id: "Order003",
    customer: "Anne Hathaway",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "27 June 2025",
    status: "UNPAID",
  },
  {
    id: "Order004",
    customer: "Carlos Quiros",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "27 June 2025",
    status: "PAID",
  },
  {
    id: "Order005",
    customer: "Jimmy Buttler",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "27 June 2025",
    status: "CANCELLED",
  },
  {
    id: "Order006",
    customer: "Marchelino",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "27 June 2025",
    status: "PAID",
  },
  {
    id: "Order007",
    customer: "Daniella",
    type: "Rent car",
    detail: "Toyota Alphard",
    datefrom: "03 June 2025",
    dateto: "27 June 2025",
    status: "PAID",
  },
  {
    id: "Order008",
    customer: "Ceril",
    type: "Rent car",
    detail: "Toyota Alphard",
    datefrom: "03 June 2025",
    dateto: "27 June 2025",
    status: "PAID",
  },
  {
    id: "Order009",
    customer: "Maulana",
    type: "Rent car",
    detail: "Toyota Alphard",
    datefrom: "03 June 2025",
    dateto: "27 June 2025",
    status: "PAID",
  },
];

const Orders = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const columns = [
    "#",
    "Customer name",
    "Type",
    "Detail Order",
    "Date From",
    "Date To",
    "Status",
  ];

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

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

      {/* Reusable Table Component */}
      <Table
        data={sortedOrders}
        columns={columns}
        sortConfig={sortConfig}
        actions={actions}
      />

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">Order</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="text-gray-700 hover:text-cyan-600">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/orders" className="text-cyan-600 font-bold">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/day-tour" className="text-gray-700 hover:text-cyan-600">
              Day Tour
            </Link>
          </li>
          <li>
            <Link to="/rent-car" className="text-gray-700 hover:text-cyan-600">
              Rent Car
            </Link>
          </li>
          <li>
            <Link
              to="/accommodation"
              className="text-gray-700 hover:text-cyan-600"
            >
              Accommodation
            </Link>
          </li>
          <li>
            <Link to="/inbox" className="text-gray-700 hover:text-cyan-600">
              Inbox
            </Link>
          </li>
          <li>
            <Link
              to="/whatsapp-setting"
              className="text-gray-700 hover:text-cyan-600"
            >
              Whatsapp setting
            </Link>
          </li>
          <li>
            <Link to="/setting" className="text-gray-700 hover:text-cyan-600">
              Setting
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Orders;