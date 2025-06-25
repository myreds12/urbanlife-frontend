import React, { useState } from "react";

const countryOptions = [
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
];

const ContactForm = ({ formData, onFormChange }) => {
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  const handleCountryChange = (e) => {
    const country = countryOptions.find((c) => c.code === e.target.value);
    setSelectedCountry(country);
    // Update kode negara di nomor telepon
    const currentNumber = formData.phoneNumber.replace(/^(\+\d+)/, "");
    onFormChange({ phoneNumber: country.code + currentNumber });
  };

  const handlePhoneNumberChange = (e) => {
    onFormChange({ phoneNumber: selectedCountry.code + e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* Title Selection */}
      <div className="flex gap-6">
        {["Mr", "Mrs"].map((title) => (
          <label key={title} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="title"
              value={title}
              checked={formData.title === title}
              onChange={(e) => onFormChange({ title: e.target.value })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">{title}</span>
          </label>
        ))}
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

      {/* Phone Number with Country Picker */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <div className="flex items-center px-2 py-1">
            <select
              value={selectedCountry.code}
              onChange={handleCountryChange}
              className="bg-transparent pr-2 pl-1 text-sm "
            >
              {countryOptions.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
          </div>
        </div>
        <input
          type="tel"
          placeholder="Phone number"
          value={formData.phoneNumber.replace(/^(\+\d+)/, "")}
          onChange={handlePhoneNumberChange}
          className="w-full pl-24 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

export default ContactForm;
