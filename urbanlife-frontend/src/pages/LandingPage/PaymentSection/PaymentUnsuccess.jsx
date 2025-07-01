import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../styles/LandingPage/Payment/PaymentUnsuccess.css";

const PaymentUnsuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      {/* Header */}
      <header className="w-full py-4 flex justify-center items-center space-x-2">
        <img src="/images/All/Logo.png" alt="UrbanLife Logo" className="h-10" />
        <div className="text-sm text-gray-600 font-medium">Beyond the explorer of the world</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <img
            src="/images/All/payment-failed.png"
            alt="Payment Failed"
            className="w-48 h-48 mx-auto animate-shake"
          />
        </div>
        <h1 className="text-4xl font-bold text-red-600 mb-6">Your payment Unsuccessful!</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          We've sent you to WhatsApp Number and email for trip instruction<br />
          please read it as well
        </p>
        <button
          onClick={handleGoHome}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          Home Page
        </button>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        <p>© 2025 UrbanLife. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PaymentUnsuccess;