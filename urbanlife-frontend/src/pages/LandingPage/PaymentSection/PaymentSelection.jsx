import React, { useState, useEffect } from 'react';
import PaymentTimer from '../../components/PaymentSelection/PaymentTimer';
import PaymentMethods from '../../components/PaymentSelection/PaymentMethods';
import OrderSummary from '../../components/PaymentSelection/OrderSummary';
import PaymentButton from '../../components/PaymentSelection/PaymentButton';
import PaymentTerms from '../../components/PaymentSelection/PaymentTerms';

const PaymentSelection = () => {
  const [selectedMethod, setSelectedMethod] = useState('bca_va');
  const [timeLeft, setTimeLeft] = useState(59 * 60 + 31); // 59:31 in seconds
  const [showAllMethods, setShowAllMethods] = useState(false);

  const paymentMethods = [
    {
      id: 'bca_va',
      name: 'BCA Virtual Account',
      type: 'virtual_account',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/100px-Bank_Central_Asia.svg.png'
    },
    {
      id: 'card',
      name: 'Pakai Kartu Kredit/Debit',
      type: 'card',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mastercard-logo.png/100px-Mastercard-logo.png'
    },
    {
      id: 'mandiri_va',
      name: 'Mandiri Virtual Account',
      type: 'virtual_account',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/100px-Bank_Mandiri_logo_2016.svg.png'
    }
  ];

  const orderInfo = {
    id: '1309980725',
    vehicle: 'Toyota Innova reborn',
    date: 'Thu, 8 May 2025',
    duration: '1-12 hours',
    totalAmount: 'IDR 1.050.000'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePayment = () => {
    console.log('Processing payment with method:', selectedMethod);
    // Handle payment logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Payment Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timer Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Selesaikan dalam</h2>
                <PaymentTimer timeLeft={timeLeft} />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Metode Pembayaran</h2>
              <PaymentMethods
                methods={paymentMethods}
                selectedMethod={selectedMethod}
                onMethodSelect={setSelectedMethod}
                showAll={showAllMethods}
                onToggleShowAll={() => setShowAllMethods(!showAllMethods)}
              />
            </div>

            {/* Terms */}
            <PaymentTerms />
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <OrderSummary order={orderInfo} />
            <PaymentButton
              selectedMethod={selectedMethod}
              onPayment={handlePayment}
              amount={orderInfo.totalAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelection;
