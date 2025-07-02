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