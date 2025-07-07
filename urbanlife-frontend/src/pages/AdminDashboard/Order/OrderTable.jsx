const OrdersTable = ({ orders }) => {
const getStatusStyle = (status) => {
  switch (status) {
    case "SELESAI":
      return {
        backgroundColor: "#10b981",
        color: "#ffffff",
      };
    case "PENDING":
      return {
        backgroundColor: "#f59e0b",
        color: "#ffffff",
      };
    case "DIBATALKAN":
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
    <div className="bg-white rounded shadow overflow-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-6 py-3">Booking ID</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Detail</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom:
                      index < orders.length - 1 ? "1px solid #f3f4f6" : "none",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 24px",
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    {order.id}
                  </td>
                  <td style={{ padding: "10px 24px" }}>
                    <div
                      style={{
                        color: "#111827",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {order.user.nama}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "10px 24px",
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    {order.type}
                  </td>
                  <td
                    style={{
                      padding: "10px 24px",
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    {order.detail}
                  </td>
                  <td
                    style={{
                      padding: "10px 24px",
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    {order.createdAt}
                  </td>
                  <td
                    style={{
                      padding: "10px 24px",
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    {order.total_harga}
                  </td>
                  <td style={{ padding: "10px 24px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontWeight: "600",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.025em",
                        ...getStatusStyle(order.status),
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
  );
};

export default OrdersTable;
