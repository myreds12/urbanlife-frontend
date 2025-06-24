// src/components/PaymentSelection/PaymentTerms.jsx
import React from 'react';

const PaymentTerms = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p className="text-sm text-gray-600 leading-relaxed">
        By proceeding with payment, you accept UrbanLife.id's{' '}
        <a 
          href="#" 
          className="text-blue-600 hover:text-blue-700 underline"
          onClick={(e) => e.preventDefault()}
        >
          Terms & Conditions
        </a>
        {' '}and{' '}
        <a 
          href="#" 
          className="text-blue-600 hover:text-blue-700 underline"
          onClick={(e) => e.preventDefault()}
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default PaymentTerms;
