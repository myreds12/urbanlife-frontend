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
    
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm mb-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleFormChange({ agreeToTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I agree to Urbanlife's{' '}
                    <a href="#" className="text-cyan-600 hover:underline font-medium">
                      terms and conditions
                    </a>
                  </span>
                </label>
              </div>
    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-600">Final Amount</h3>
        <p className="text-2xl font-bold text-gray-900 text-red-500">{amount}</p>
      </div>
      
      <button
        onClick={handlePayment}
        disabled={disabled}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
          disabled 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 shadow-lg hover:shadow-xl'
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
    </div>
  );
};

export default PriceSection;
