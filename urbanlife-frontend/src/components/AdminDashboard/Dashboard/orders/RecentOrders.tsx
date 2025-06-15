export default function RecentOrders() {
  const tableData = [
    {
      id: 1,
      name: "Angelina",
      date: "3 June 2025",
      type: "Day Tour",
      detail: "Eastern Bali Tour [B]",
      status: "Paid",
    },
    {
      id: 2,
      name: "Daniel Mananta",
      date: "6 June 2025",
      type: "Rent Car",
      detail: "Toyota Alphard",
      status: "Unpaid",
    },
    {
      id: 3,
      name: "Anne Hathaway",
      date: "8 June 2025",
      type: "Day Tour",
      detail: "Eastern Bali Tour [B]",
      status: "Paid",
    },
    {
      id: 4,
      name: "Jimmy Buttler",
      date: "10 June 2025",
      type: "Rent Car",
      detail: "Toyota Alphard",
      status: "Canceled",
    },
    {
      id: 5,
      name: "Daniella",
      date: "12 June 2025",
      type: "Day Tour",
      detail: "Eastern Bali Tour [B]",
      status: "Paid",
    },
  ];

const getStatus = (status: string) => {
  switch (status) {
    case "Paid":
      return {
        backgroundColor: "#d1fae5", // bg-green-100
        color: "#10b981",           // text-green-600
      };
    case "Unpaid":
      return {
        backgroundColor: "#fef3c7", // bg-yellow-100
        color: "#f59e0b",           // text-yellow-600
      };
    case "Canceled":
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
    <div style={{ overflow: "hidden", border: "1px solid #e5e7eb", background: "#ffffff", padding: "16px", borderRadius: "12px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>Recent Orders</h3>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #d1d5db", background: "#ffffff", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", color: "#374151", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.29 5.90393H17.7067" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.7075 14.0961H2.29085" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" fill="#ffffff" stroke="#374151" strokeWidth="1.5"/>
              <path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" fill="#ffffff" stroke="#374151" strokeWidth="1.5"/>
            </svg>
            Filter
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #d1d5db", background: "#ffffff", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", color: "#374151", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)" }}>
            See all
          </button>
        </div>
      </div>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ borderBottom: "1px solid #e5e7eb"}}>
            <tr>
              <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>#</th>
              <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Customer Name</th>
              <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Type of Order</th>
              <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Detail of Order</th>
              <th style={{ padding: "12px", fontWeight: "500", color: "#6b7280", textAlign: "left", fontSize: "12px" }}>Status</th>
            </tr>
          </thead>
          <tbody style={{ borderTop: "1px solid #e5e7eb" }}>
            {tableData.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>{product.id}</td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div>
                      <p style={{ fontWeight: "500", color: "#1f2937", fontSize: "14px" }}>{product.name}</p>
                      <span style={{ color: "#6b7280", fontSize: "12px" }}>{product.date}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>{product.type}</td>
                <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>{product.detail}</td>
                <td style={{ padding: "12px", color: "#6b7280", fontSize: "14px" }}>
                  <span
                     style={{
                     display: "inline-block",
                     padding: "4px 12px",
                     borderRadius: "9999px", // full rounded
                     fontWeight: 500,
                     fontSize: "13px",
                     ...getStatus(product.status),
                     }}>
                     {product.status}
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

