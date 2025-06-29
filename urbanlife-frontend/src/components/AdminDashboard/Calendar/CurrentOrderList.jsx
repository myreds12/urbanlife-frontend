import OrderItem from './OrderItem';

const CurrentOrderList = ({ orders = [] }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
      <h3 className="text-lg font-semibold mb-4">Current order list</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderItem
              key={order.id || index}
              customerName={order.customerName}
              orderType={order.orderType}
              location={order.location}
              date={order.date}
              status={order.status}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-2">📋</div>
            <p>No orders found</p>
            <p className="text-sm">Orders will appear here when added to calendar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentOrderList;