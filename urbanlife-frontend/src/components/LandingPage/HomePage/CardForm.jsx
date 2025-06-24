import React, { useState } from 'react';

const CardForm = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      <div className="space-y-2">
        <select className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500" defaultValue="">
          <option value="" disabled>Select country</option>
          {/* Add country options here */}
        </select>
        <select className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500" defaultValue="">
          <option value="" disabled>Select city</option>
          {/* Add city options here */}
        </select>
        <select className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500" defaultValue="">
          <option value="" disabled>Select services</option>
          {/* Add service options here */}
        </select>

        <div className="flex space-x-2">
          <div className="w-1/2">
            <label className="block text-xs font-medium text-gray-500">From</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm"
                value={fromDate}
                onClick={() => document.getElementById('fromDateInput')?.focus()}
                readOnly
              />
              <input
                type="date"
                id="fromDateInput"
                className="absolute inset-0 opacity-0"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <span
                className="absolute right-2 top-2 text-gray-400 text-sm cursor-pointer"
                onClick={() => document.getElementById('fromDateInput')?.focus()}
              >
                📅
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <label className="block text-xs font-medium text-gray-500">To</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 bg-gray-100 border-0 rounded-md text-gray-500 text-sm"
                value={toDate}
                onClick={() => document.getElementById('toDateInput')?.focus()}
                readOnly
              />
              <input
                type="date"
                id="toDateInput"
                className="absolute inset-0 opacity-0"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              <span
                className="absolute right-2 top-2 text-gray-400 text-sm cursor-pointer"
                onClick={() => document.getElementById('toDateInput')?.focus()}
              >
                📅
              </span>
            </div>
          </div>
        </div>

        <button className="w-full bg-teal-500 text-white p-2 rounded-md text-sm hover:bg-teal-600">
          Search
        </button>
      </div>
    </div>
  );
};

export default CardForm;
