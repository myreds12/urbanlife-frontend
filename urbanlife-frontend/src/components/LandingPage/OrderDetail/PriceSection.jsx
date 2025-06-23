import React from 'react';
import { useNavigate } from 'react-router-dom';

const PriceSection = ({ 
  amount, 
  bookingInfo,
  formData,
  disabled = false 
}) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate('/PaymentSection', {
      state: {
        bookingInfo,
        orderData: formData
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-600">Final Amount</h3>
        <p className="text-2xl font-bold text-gray-900">{amount}</p>
      </div>
      
      <button
        onClick={handlePayment}
        disabled={disabled}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
          disabled 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl'
        }`}
      >
        Select Payment Option
      </button>
      
      {disabled && (
        <p className="text-xs text-gray-500 text-center mt-2">
          Please agree to terms and conditions to continue
        </p>
      )}
    </div>
  );
};

export default PriceSection;
