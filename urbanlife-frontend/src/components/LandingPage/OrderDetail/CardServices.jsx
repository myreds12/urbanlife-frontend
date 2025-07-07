import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingInfoCard = ({ booking, formData, onFormChange }) => {
  const [startDate, setStartDate] = useState(formData.tanggal_mulai ? new Date(formData.tanggal_mulai) : null);
  const [endDate, setEndDate] = useState(formData.tanggal_selesai ? new Date(formData.tanggal_selesai) : null);
  const [duration, setDuration] = useState(formData.durasi_hari || 1);
  const [unit, setUnit] = useState(formData.satuan || 'Hari');

  useEffect(() => {
    // Update parent formData on mount or change
    onFormChange({
      durasi_hari: duration,
    });
  }, [duration, unit]);

  const handleImageError = (e) => {
    e.target.src = '/images/default-thumbnail.png';
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onFormChange({
      tanggal_mulai: start ? start.toISOString().split('T')[0] : '',
      tanggal_selesai: end ? end.toISOString().split('T')[0] : '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Informasi Pemesanan</h2>

      {/* Date Picker */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Tanggal Mulai & Selesai</label>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          isClearable
          dateFormat="dd/MM/yyyy"
          className="w-full px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholderText="Pilih tanggal"
        />
      </div>

      {/* Durasi & Satuan */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Durasi</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Satuan</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Hari">Hari</option>
            <option value="Jam">Jam</option>
          </select>
        </div>
      </div>

      {/* Booking Info */}
      <div className="flex items-start gap-3 pt-2">
        <img
          src={booking.image}
          onError={handleImageError}
          alt="Preview"
          className="w-16 h-16 rounded-md object-cover border"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500">Lokasi: {booking.location}</p>
          <p className="text-base font-semibold text-gray-900 truncate">{booking.title}</p>
        </div>
      </div>
      
      <div className="flex items-center text-cyan-600 text-sm cursor-pointer hover:text-cyan-700 transition-colors">
        <span className="font-medium">Change Package</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default BookingInfoCard;
