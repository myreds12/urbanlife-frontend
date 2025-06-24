export default function RecentOrders() {
  const tableData = [
    {
      id: 1,
      name: "Angella",
      date: "03 June 2025",
      type: "Day tour",
      detail: "Eastern Bali Tour [B]",
      dateFrom: "03 June 2025",
      dateTo: "03 June 2025",
      status: "PAID",
    },
    {
      id: 2,
      name: "Daniel Mananta",
      date: "03 June 2025",
      type: "Rent car",
      detail: "Toyota Alphard",
      dateFrom: "03 June 2025",
      dateTo: "03 June 2025",
      status: "PAID",
    },
    {
      id: 3,
      name: "Anne Hathaway",
      date: "03 June 2025",
      type: "Day tour",
      detail: "Eastern Bali Tour [B]",
      dateFrom: "03 June 2025",
      dateTo: "03 June 2025",
      status: "UNPAID",
    },
    {
      id: 4,
      name: "Carlos Quireos",
      date: "03 June 2025",
      type: "Day tour",
      detail: "Eastern Bali Tour [B]",
      dateFrom: "03 June 2025",
      dateTo: "03 June 2025",
      status: "UNPAID",
    },
    {
      id: 5,
      name: "Jimmy Buttler",
      date: "03 June 2025",
      type: "Day tour",
      detail: "Eastern Bali Tour [B]",
      dateFrom: "03 June 2025",
      dateTo: "03 June 2025",
      status: "CANCELLED",
    },
    {
      id: 6,
      name: "Marchelino",
      date: "03 June 2025",
      type: "Day tour",
      detail: "Eastern Bali Tour [B]",
      dateFrom: "03 June 2025",
      dateTo: "03 June 2025",
      status: "PAID",
    },
    {
      id: 7,
      name: "Daniela",
      date: "03 June 2025",
      type: "Rent car",
      detail: "Toyota Alphard",
      dateFrom: "03 June 2025",
      dateTo: "03 June 2025",
      status: "PAID",
    },
    {
      id: 8,
      name: "Maulana",
      date: "03 June 2025",
      type: "Rent car",
      detail: "Toyota Alphard",
      dateFrom: "03 June 2025",
      dateTo: "03 June 2025",
      status: "PAID",
    },
    {
      id: 9,
      name: "Maulana",
      date: "03 June 2025",
      type: "Rent car",
      detail: "Toyota Alphard",
      dateFrom: "03 June 2025",
      dateTo: "03 June 2025",
      status: "PAID",
    },
  ];

const getStatus = (status) => {
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
                #
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
                Customer Name
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
                Type of order
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
                Detail order
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
                Date from
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
                Date to
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
            {tableData.map((order, index) => (
              <tr key={order.id} style={{ 
                borderBottom: index < tableData.length - 1 ? "1px solid #f3f4f6" : "none",
                transition: "background-color 0.2s ease"
              }}>
                <td style={{ 
                  padding: "16px 24px", 
                  color: "#6b7280", 
                  fontSize: "14px" 
                }}>
                  {order.id}
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ color: "#111827", fontSize: "14px", fontWeight: "500" }}>
                    {order.name}
                  </div>
                </td>
                <td style={{ 
                  padding: "16px 24px", 
                  color: "#6b7280", 
                  fontSize: "14px" 
                }}>
                  {order.type}
                </td>
                <td style={{ 
                  padding: "16px 24px", 
                  color: "#6b7280", 
                  fontSize: "14px" 
                }}>
                  {order.detail}
                </td>
                <td style={{ 
                  padding: "16px 24px", 
                  color: "#6b7280", 
                  fontSize: "14px" 
                }}>
                  {order.dateFrom}
                </td>
                <td style={{ 
                  padding: "16px 24px", 
                  color: "#6b7280", 
                  fontSize: "14px" 
                }}>
                  {order.dateTo}
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.025em",
                    ...getStatus(order.status),
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
  );
}