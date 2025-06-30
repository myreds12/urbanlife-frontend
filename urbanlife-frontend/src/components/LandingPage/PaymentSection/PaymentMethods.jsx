import React from 'react';

const PaymentMethods = ({
  methods,
  selectedMethod,
  onMethodSelect,
  showAll,
  onToggleShowAll
}) => {
  const displayedMethods = showAll ? methods : methods.slice(0, 3);

  const getMethodIcon = (method) => {
    return (
      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
        {method.id === 'bca_va' && (
          <div className="w-8 h-6 bg-cyan-600 rounded text-white text-xs font-bold flex items-center justify-center">
            BCA
          </div>
        )}
        {method.id === 'card' && (
          <div className="w-8 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">💳</span>
          </div>
        )}
        {method.id === 'mandiri_va' && (
          <div className="w-8 h-6 bg-yellow-500 rounded text-white text-xs font-bold flex items-center justify-center">
            MDR
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {displayedMethods.map((method) => (
        <label
          key={method.id}
          className={`
            flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all
            ${selectedMethod === method.id 
              ? 'border-cyan-500 bg-cyan-50 ring-2 ring-cyan-200' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={selectedMethod === method.id}
            onChange={() => onMethodSelect(method.id)}
            className="w-5 h-5 text-cyan-600 bg-gray-100 border-gray-300 focus:ring-cyan-500"
          />
          
          <div className="flex items-center gap-3 flex-1">
            {getMethodIcon(method)}
            <span className="font-medium text-gray-900">{method.name}</span>
          </div>
        </label>
      ))}

      {methods.length > 3 && (
        <button
          onClick={onToggleShowAll}
          className="w-full py-3 text-cyan-600 font-medium hover:text-cyan-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>{showAll ? 'Lihat lebih sedikit' : 'Lihat semua'}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PaymentMethods;
