import React from 'react';

interface CustomerFormData {
  title: 'Mr' | 'Mrs';
  fullName: string;
  phoneNumber: string;
  email: string;
  specialRequest: string;
  agreeToTerms: boolean;
}

interface ContactFormProps {
  formData: CustomerFormData;
  onFormChange: (data: Partial<CustomerFormData>) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ formData, onFormChange }) => {
  return (
    <div className="space-y-6">
      {/* Title Selection */}
      <div className="flex gap-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="title"
            value="Mr"
            checked={formData.title === 'Mr'}
            onChange={(e) => onFormChange({ title: e.target.value as 'Mr' | 'Mrs' })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Mr</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="title"
            value="Mrs"
            checked={formData.title === 'Mrs'}
            onChange={(e) => onFormChange({ title: e.target.value as 'Mr' | 'Mrs' })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Mrs</span>
        </label>
      </div>

      {/* Full Name */}
      <div>
        <input
          type="text"
          placeholder="Full Name (as stated in ID/Passport/Driver's License)"
          value={formData.fullName}
          onChange={(e) => onFormChange({ fullName: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Phone Number */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <div className="flex items-center px-3 py-2 border-r border-gray-300">
            <div className="w-6 h-4 bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-600">+62</span>
          </div>
        </div>
        <input
          type="tel"
          placeholder="Phone number"
          value={formData.phoneNumber.replace('+62', '')}
          onChange={(e) => onFormChange({ phoneNumber: '+62' + e.target.value })}
          className="w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => onFormChange({ email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
    </div>
  );
};