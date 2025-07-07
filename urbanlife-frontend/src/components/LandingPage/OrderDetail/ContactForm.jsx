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
    // opsional: reset phone number kalau ganti kode negara
    onFormChange({ phoneNumber: "" });
  };

  return (
    <div className="space-y-6">
      {/* Title Selection */}
      <div className="flex gap-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="Mr"
            checked={formData.gender === 'Mr'}
            onChange={(e) => onFormChange({ gender: e.target.value })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Mr</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="Mrs"
            checked={formData.gender === 'Mrs'}
            onChange={(e) => onFormChange({ gender: e.target.value })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Mrs</span>
        </label>
      </div>

      {/* Full Name */}
      <div>
        <input
          type="text"
          name="nama"
          placeholder="Full Name (as stated in ID/Passport/Driver's License)"
          value={formData.nama}
          onChange={(e) => onFormChange({ nama: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Phone Number with Country Picker */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <select
            value={selectedCountry.code}
            onChange={handleCountryChange}
            className="h-full pl-2 pr-6 bg-white border border-gray-300 rounded-l-lg focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600 text-sm appearance-none"
          >
            {countryOptions.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>
        </div>
        <input
          type="tel"
          placeholder="Phone number"
          name="nomor_hp"
          value={formData.nomor_hp.replace('+62', '')}
          onChange={(e) => onFormChange({ nomor_hp: '+62' + e.target.value })}
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default ContactForm;
