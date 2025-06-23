import React, { useState } from 'react';
import { BookingInfoCard } from '../../../components/LandingPage/OrderDetail/BookingInfoCard';
import { ContactForm } from '../../../components/LandingPage/OrderDetail/ContactForm';
import { ServiceDescription } from '../../../components/LandingPage/OrderDetail/ServiceDescription';
import { CustomerRequest } from '../../../components/LandingPage/OrderDetail/CustomerRequest';
import { PriceSection } from '../../../components/LandingPage/OrderDetail/PriceSection';

const OrderDetail = () => {
  const [formData, setFormData] = useState({
    title: 'Mr',
    fullName: '',
    phoneNumber: '+62',
    email: '',
    specialRequest: '',
    agreeToTerms: false,
  });

  const bookingInfo = {
    date: 'Kam, 08 Mei 2025',
    duration: '1 - 12 hours',
    location: 'Bali',
    vehicle: 'Toyota Innova reborn',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=100&h=100&fit=crop&crop=center',
  };

  const handleFormChange = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handlePayment = () => {
    console.log('Proceeding to payment with:', formData);
    // Implement payment logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Detail Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Detail</h1>
              <p className="text-gray-600">
                These contact details will be used to send the e-invoice and for rescheduling purposes.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ContactForm 
                formData={formData} 
                onFormChange={handleFormChange} 
              />
            </div>

            {/* Service Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ServiceDescription />
            </div>

            {/* Customer Request */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CustomerRequest 
                specialRequest={formData.specialRequest}
                onRequestChange={(request) => handleFormChange({ specialRequest: request })}
              />
            </div>

            {/* Terms Agreement */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleFormChange({ agreeToTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to Urbanlife's{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </a>
                </span>
              </label>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BookingInfoCard booking={bookingInfo} />
            <PriceSection 
              amount="IDR 1.050.000"
              onPayment={handlePayment}
              disabled={!formData.agreeToTerms}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
