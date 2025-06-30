import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookingInfoCard from '../../../components/LandingPage/OrderDetail/BookingInfoCard'; 
import ContactForm from '../../../components/LandingPage/OrderDetail/ContactForm';
import ServiceDescription from '../../../components/LandingPage/OrderDetail/ServiceDescription';
import CustomerRequest from '../../../components/LandingPage/OrderDetail/CustomerRequest';
import PriceSection from '../../../components/LandingPage/OrderDetail/PriceSection';
import Navbar from '../../../components/LandingPage/HomePage/Navbar';

const OrderDetail = () => {
  const location = useLocation();
  const bookingFromState = location.state;

  const [formData, setFormData] = useState({
    title: 'Mr',
    fullName: '',
    phoneNumber: '+62',
    email: '',
    specialRequest: '',
    agreeToTerms: false,
  });

  const bookingInfo = bookingFromState || {
    date: 'Kam, 08 Mei 2025',
    duration: '1 - 12 hours',
    location: 'Bali',
    vehicle: 'Toyota Innova Reborn',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=100&h=100&fit=crop&crop=center',
    price: 'Rp 1.050.000',
  };

  const handleFormChange = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handlePayment = () => {
    console.log('Proceeding to payment with:', formData);
    // implement payment logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Main Content with proper top padding */}
      <div className="pt-30 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Detail</h1>
                <p className="text-gray-600">
                  These contact details will be used to send the e-invoice and for rescheduling purposes.
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
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
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <BookingInfoCard booking={bookingInfo} />
                <PriceSection 
                  amount={bookingInfo.price}
                  onPayment={handlePayment}
                  disabled={!formData.agreeToTerms}
                  bookingInfo={bookingInfo}
                  formData={formData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;