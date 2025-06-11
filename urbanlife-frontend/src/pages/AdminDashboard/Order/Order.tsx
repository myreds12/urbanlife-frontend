import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/order.css';

const Orders = () => {
  // Data dummy untuk tabel
  const orders = [
    {
      id: 'Order001',
      customer: 'Angelina',
      type: 'Day tour',
      detail: 'Eastern Bali Tour [B]',
      date: '03 June 2025',
      amount: 'Rp 2,100,000',
      status: 'PAID',
    },
    {
      id: 'Order002',
      customer: 'Daniel Mananta',
      type: 'Rent car',
      detail: 'Toyota Alphard',
      date: '03 June 2025',
      amount: 'Rp 1,200,000',
      status: 'PAID',
    },
    {
      id: 'Order003',
      customer: 'Anne Hathaway',
      type: 'Day tour',
      detail: 'Eastern Bali Tour [B]',
      date: '03 June 2025',
      amount: 'Rp 2,100,000',
      status: 'UNPAID',
    },
    {
      id: 'Order004',
      customer: 'Carlos Quiros',
      type: 'Day tour',
      detail: 'Eastern Bali Tour [B]',
      date: '03 June 2025',
      amount: 'Rp 1,200,000',
      status: 'PAID',
    },
    {
      id: 'Order005',
      customer: 'Jimmy Buttler',
      type: 'Day tour',
      detail: 'Eastern Bali Tour [B]',
      date: '03 June 2025',
      amount: 'Rp 2,100,000',
      status: 'CANCELLED',
    },
    {
      id: 'Order006',
      customer: 'Marchelino',
      type: 'Day tour',
      detail: 'Eastern Bali Tour [B]',
      date: '03 June 2025',
      amount: 'Rp 1,200,000',
      status: 'PAID',
    },
    {
      id: 'Order007',
      customer: 'Daniella',
      type: 'Rent car',
      detail: 'Toyota Alphard',
      date: '03 June 2025',
      amount: 'Rp 1,200,000',
      status: 'PAID',
    },
    {
      id: 'Order008',
      customer: 'ceril',
      type: 'Rent car',
      detail: 'Toyota Alphard',
      date: '03 June 2025',
      amount: 'Rp 1,200,000',
      status: 'PAID',
    },
    {
      id: 'Order009',
      customer: 'Maulana',
      type: 'Rent car',
      detail: 'Toyota Alphard',
      date: '03 June 2025',
      amount: 'Rp 1,200,000',
      status: 'PAID',
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        
        <div className="mt-3 space-x-6">
          <button className="text-sm font-medium transition duration-100 ease-in-out text-gray-900 hover:text-green-500 group underline-from-left relative">
            All Orders
          </button>
          <button className="text-sm font-medium transition duration-100 ease-in-out text-gray-900 hover:text-green-500 group underline-from-left relative">
            Open Orders
          </button>
          <button className="text-sm font-medium transition duration-100 ease-in-out text-gray-900 hover:text-green-500 group underline-from-left relative">
            Cancelled Order
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">Booking ID</th>
              <th scope="col" className="px-4 py-3">Customer Name</th>
              <th scope="col" className="px-4 py-3">Type of order</th>
              <th scope="col" className="px-4 py-3">Detail order</th>
              <th scope="col" className="px-4 py-3">Date</th>
              <th scope="col" className="px-4 py-3">Total amount</th>
              <th scope="col" className="px-4 py-3">Payment status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.type}</td>
                <td className="px-4 py-2">{order.detail}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">{order.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'PAID'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'UNPAID'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar (simplified) */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Order</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link></li>
          <li><Link to="/orders" className="text-green-600 font-bold">Orders</Link></li>
          <li><Link to="/day-tour" className="text-gray-600 hover:text-gray-900">Day Tour</Link></li>
          <li><Link to="/rent-car" className="text-gray-600 hover:text-gray-900">Rent Car</Link></li>
          <li><Link to="/accommodation" className="text-gray-600 hover:text-gray-900">Accommodation</Link></li>
          <li><Link to="/inbox" className="text-gray-600 hover:text-gray-900">Inbox</Link></li>
          <li><Link to="/whatsapp-setting" className="text-gray-600 hover:text-gray-900">Whatsapp setting</Link></li>
          <li><Link to="/setting" className="text-gray-600 hover:text-gray-900">Setting</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Orders;