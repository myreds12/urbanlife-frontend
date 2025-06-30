// src/components/PaymentSelection/PaymentButton.jsx
import React from 'react';

const PaymentButton = ({
  selectedMethod,
  onPayment,
  amount,
  disabled = false
}) => {
  const getButtonText = () => {
    switch (selectedMethod) {
      case 'bca_va':
        return 'Pay with Virtual Account';
      case 'card':
        return 'Pay with Card';
      case 'mandiri_va':
        return 'Pay with Virtual Account';
      default:
        return 'Proceed to Payment';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm ">
      <button
        onClick={onPayment}
        disabled={disabled}
        className={`
          w-full py-4 px-6 rounded-lg font-semibold text-white transition-all text-lg
          ${disabled 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 shadow-lg hover:shadow-xl'
          }
        `}
      >
        {getButtonText()}
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Total: <span className="font-semibold text-gray-900">{amount}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentButton;
