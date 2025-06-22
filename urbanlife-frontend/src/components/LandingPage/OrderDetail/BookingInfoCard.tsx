import React from 'react';

interface BookingInfo {
  date: string;
  duration: string;
  location: string;
  vehicle: string;
  image: string;
}

interface BookingInfoCardProps {
  booking: BookingInfo;
}

export const BookingInfoCard: React.FC<BookingInfoCardProps> = ({ booking }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Booking date</p>
          <p className="text-base font-semibold text-gray-900">{booking.date}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500 mb-1">Duration</p>
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold text-gray-900">{booking.duration}</p>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex items-start gap-4 mb-6">
        <img 
          src={booking.image} 
          alt={booking.vehicle} 
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0" 
        />
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">Location: {booking.location}</p>
          <p className="text-base font-semibold text-gray-900">{booking.vehicle}</p>
        </div>
      </div>
      
      <div className="flex items-center text-blue-600 text-sm cursor-pointer hover:text-blue-700 transition-colors">
        <span className="font-medium">Refund, reschedule available</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};