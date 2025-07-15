import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '../../Utils/Table/Table';

const api = import.meta.env.VITE_API_URL + "/pemesanan";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const columns = [
    "#",
    "Customer name",
    "Type of Order",
    "Detail Order",
    "Date From",
    "Date To",
    "Status",
  ];

  // Fetch recent orders (limit to 10 most recent)
  const fetchRecentOrders = async () => {
    setLoading(true);
    try {
      const params = { 
        page: 1, 
        take: 10,
        // You can add sorting by date if your API supports it
        // sortBy: 'createdAt',
        // sortOrder: 'desc'
      };

      const res = await axios.get(api, { params });
      const { data } = res.data;

      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch recent orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const sortedData = [...orders].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    
    // Handle nested properties if needed
    if (sortConfig.key === 'Customer name') {
      aValue = a.user?.nama || '';
      bValue = b.user?.nama || '';
    }
    
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

      {/* Loading State */}
      {loading ? (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "200px" 
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            border: "3px solid #f3f4f6",
            borderTop: "3px solid #0891b2",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }}></div>
        </div>
      ) : (
        /* Reusable Table Component */
        <Table
          data={sortedData}
          columns={columns}
          sortConfig={sortConfig}
          actions={actions}
          defaultMapping={{
            "#": (row, index) => index + 1,
            "Customer name": (row) => row.user?.nama || '-',
            "Type of Order": (row) => row.type || '-',
            "Detail Order": (row) => row.detail || '-',
            "Date From": (row) => formatDate(row.createdAt),
            "Date To": (row) => formatDate(row.createdAt),
          }}
          onSort={(columnKey) => {
            let direction = 'asc';
            if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
              direction = 'desc';
            }
            setSortConfig({ key: columnKey, direction });
          }}
        />
      )}
    </div>
  );
}