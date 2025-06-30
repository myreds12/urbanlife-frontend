import React, { useState } from 'react';

const CustomerRequest = ({ 
  specialRequest, 
  onRequestChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Customer request</h2>
      
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">add special request</p>
              <p className="text-sm text-gray-500">Type your special needs and enjoy your time.</p>
            </div>
          </div>
          <div className="w-6 h-6 bg-cyan-600 rounded-sm flex items-center justify-center">
            <svg 
              className={`w-4 h-4 text-white transition-transform ${isExpanded ? 'rotate-45' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </button>
        
        {isExpanded && (
          <div className="px-4 pb-4">
            <textarea
              value={specialRequest}
              onChange={(e) => onRequestChange(e.target.value)}
              placeholder="Please describe your special requests here..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRequest;
