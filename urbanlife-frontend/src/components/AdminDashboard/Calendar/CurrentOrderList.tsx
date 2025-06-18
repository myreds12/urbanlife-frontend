import React from 'react';

const CurrentOrderList = () => {
  const orders = [
    { id: 1, name: 'Selena gomes', type: 'Accommodation', details: 'Bali - Fourteen Roses Boutique Hotel', date: '2025-06-17' },
    { id: 2, name: 'Selena gomes', type: 'Accommodation', details: 'Bali - Fourteen Roses Boutique Hotel', date: '2025-06-17' },
    { id: 3, name: 'Ahmad dhani', type: 'Day tour', details: 'Bali - Eastern Nusa Penida Tour', date: '2025-06-17' },
    { id: 4, name: 'Ahmad dhani', type: 'Day tour', details: 'Bali - Eastern Nusa Penida Tour', date: '2025-06-17' },
    { id: 5, name: 'Ahmad dhani', type: 'Rent car', details: 'Jakarta - Toyota Alphard', date: '2025-06-17' },
    { id: 6, name: 'Ahmad dhani', type: 'Rent car', details: 'Jakarta - Toyota Alphard', date: '2025-06-17' },
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="current-order-list">
      <h3>Recent Orders Recap</h3>
      <div className="order-list-container">
        {orders.map((order) => (
          <div key={order.id} className={`order-item ${order.type.toLowerCase().replace(' ', '-')}`}>
            <span className="checkmark">✔</span>
            <div className="order-details">
              <span className="order-name">{order.name}</span>
              <span className="order-type">{order.type}</span>
              <span className="order-info">{order.details}</span>
              <span className="order-date">{formatDate(order.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentOrderList;