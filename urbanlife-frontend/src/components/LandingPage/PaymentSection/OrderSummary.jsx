// src/components/PaymentSelection/OrderSummary.jsx
import React from 'react';

const OrderSummary = ({ order }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
      <div className="space-y-4">
        {/* Order ID */}
        <div className="text-right">
          <p className="text-sm text-gray-500">Order ID: {order.id}</p>
        </div>

        {/* Vehicle Info */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{order.vehicle}</h3>
            <p className="text-sm text-gray-600">{order.date}</p>
          </div>
          <div className="text-right ml-4">
            <p className="font-medium text-gray-900">{order.duration}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Total Amount */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Total Pembayaran</span>
          <span className="text-xl font-bold text-gray-900">{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
