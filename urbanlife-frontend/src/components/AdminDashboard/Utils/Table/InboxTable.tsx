import React, { useState } from 'react';

// Interface untuk data message
interface Message {
  id: string;
  customerName: string;
  message: string;
  status: 'success' | 'failed' | 'sent' | 'unsent';
  time: string;
  timestamp: Date;
}

interface InboxTableProps {
  messages: Message[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeFilter: string;
}

const InboxTable: React.FC<InboxTableProps> = ({
  messages,
  searchTerm,
  onSearchChange,
  activeFilter
}) => {
  // Filter messages berdasarkan activeFilter dan searchTerm
  const filteredMessages = messages.filter(message => {
    // Filter berdasarkan status
    let statusMatch = true;
    if (activeFilter !== 'all') {
      statusMatch = message.status === activeFilter;
    }

    // Filter berdasarkan search term
    const searchMatch = message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       message.message.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  // Fungsi untuk mendapatkan badge status
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'sent':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'unsent':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // Fungsi untuk format status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Success';
      case 'failed':
        return 'Failed';
      case 'sent':
        return 'Sent';
      case 'unsent':
        return 'Unsent';
      default:
        return status;
    }
  };

  // Fungsi untuk truncate message
  const truncateMessage = (message: string, maxLength: number = 80) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header dengan Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Inbox Messages
          </h2>
          <span className="text-sm text-gray-500">
            {filteredMessages.length} messages
          </span>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-gray-500 text-lg font-medium">No messages found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-teal-800">
                              {message.customerName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {message.customerName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {truncateMessage(message.message)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(message.status)}>
                        {getStatusText(message.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {message.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-teal-600 hover:text-teal-900 transition-colors duration-150">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-150">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors duration-150">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer dengan Pagination (opsional) */}
      {filteredMessages.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredMessages.length}</span> results
            </div>
            {/* Bisa ditambahkan pagination disini jika diperlukan */}
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxTable;