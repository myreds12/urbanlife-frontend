import React, { useState } from "react";
import Table from '../../Utils/Table/Table';

const tableData = [
  {
    id: 1,
    name: "Angella",
    date: "03 June 2025",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "03 June 2025",
    status: "PAID",
  },
  {
    id: 2,
    name: "Daniel Mananta",
    date: "03 June 2025",
    type: "Rent car",
    detail: "Toyota Alphard",
    datefrom: "03 June 2025",
    dateto: "03 June 2025",
    status: "PAID",
  },
  {
    id: 3,
    name: "Anne Hathaway",
    date: "03 June 2025",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "03 June 2025",
    status: "UNPAID",
  },
  {
    id: 4,
    name: "Carlos Quireos",
    date: "03 June 2025",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "03 June 2025",
    status: "UNPAID",
  },
  {
    id: 5,
    name: "Jimmy Buttler",
    date: "03 June 2025",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "03 June 2025",
    status: "CANCELLED",
  },
  {
    id: 6,
    name: "Marchelino",
    date: "03 June 2025",
    type: "Day tour",
    detail: "Eastern Bali Tour [B]",
    datefrom: "03 June 2025",
    dateto: "03 June 2025",
    status: "PAID",
  },
  {
    id: 7,
    name: "Daniela",
    date: "03 June 2025",
    type: "Rent car",
    detail: "Toyota Alphard",
    datefrom: "03 June 2025",
    dateto: "03 June 2025",
    status: "PAID",
  },
  {
    id: 8,
    name: "Maulana",
    date: "03 June 2025",
    type: "Rent car",
    detail: "Toyota Alphard",
    datefrom: "03 June 2025",
    dateto: "03 June 2025",
    status: "PAID",
  },
  {
    id: 9,
    name: "Maulana",
    date: "03 June 2025",
    type: "Rent car",
    detail: "Toyota Alphard",
    datefrom: "03 June 2025",
    dateto: "03 June 2025",
    status: "PAID",
  },
];

export default function RecentOrders() {
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

  const sortedData = [...tableData].sort((a, b) => {
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
    <div style={{ 
      background: "#ffffff", 
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        padding: "20px 24px",
        borderBottom: "1px solid #f3f4f6"
      }}>
        <div>
          <h3 style={{ 
            fontSize: "18px", 
            fontWeight: "600", 
            color: "#111827",
            margin: "0"
          }}>
            Recent Orders
          </h3>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            border: "1px solid #d1d5db", 
            background: "#ffffff", 
            padding: "8px 16px", 
            borderRadius: "8px", 
            fontSize: "14px", 
            color: "#374151",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.29 5.90393H17.7067" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.7075 14.0961H2.29085" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" fill="#ffffff" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" fill="#ffffff" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Filter
          </button>
          <button style={{ 
            background: "transparent",
            border: "none",
            color: "#6b7280",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            padding: "8px 16px"
          }}>
            See all
          </button>
        </div>
      </div>

      {/* Reusable Table Component */}
      <Table
        data={sortedData}
        columns={columns}
        sortConfig={sortConfig}
        actions={actions}
      />
    </div>
  );
}