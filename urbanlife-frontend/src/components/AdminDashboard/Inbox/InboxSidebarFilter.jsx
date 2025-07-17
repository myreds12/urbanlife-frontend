import React from 'react';

const InboxSidebarFilter = ({
  activeFilter,
  onFilterChange,
  messageCounts = {
    all: 0,
    sent: 0,
    unsent: 0,
    success: 0,
    failed: 0,
  },
}) => {
  const filterItems = [
    {
      id: 'all',
      label: 'All',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      count: messageCounts.all,
    },
    {
      id: 'sent',
      label: 'Sent',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      count: messageCounts.sent,
    },
    {
      id: 'unsent',
      label: 'Unsent',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 18M5.636 5.636L6 6"
          />
        </svg>
      ),
      count: messageCounts.unsent,
    },
  ];

  const labelItems = [
    {
      id: 'success',
      label: 'Success',
      color: 'bg-green-500',
      count: messageCounts.success,
    },
    {
      id: 'failed',
      label: 'Failed',
      color: 'bg-red-500',
      count: messageCounts.failed,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-fit transition-all duration-300">
      {/* Main Filters */}
      <div className="space-y-2 mb-6">
        {filterItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onFilterChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-all duration-300 ease-in-out ${
              activeFilter === item.id
                ? 'bg-cyan-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
            }`}
          >
            <span
              className={`flex-shrink-0 ${
                activeFilter === item.id ? 'text-white' : 'text-gray-400'
              } transition-colors duration-300`}
            >
              {item.icon}
            </span>
            <span className="font-medium flex-1 text-sm">{item.label}</span>
            {item.count > 0 && (
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  activeFilter === item.id
                    ? 'bg-cyan-700 text-white'
                    : 'bg-gray-100 text-gray-600'
                } transition-all duration-300 transform ${
                  activeFilter === item.id ? 'scale-105' : ''
                }`}
                style={{ minWidth: '1.5rem', textAlign: 'center' }} // Pastikan bentuk bulat
              >
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Label Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          LABEL
        </h3>
        <div className="space-y-2">
          {labelItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-all duration-300 ease-in-out ${
                activeFilter === item.id
                  ? 'bg-gray-100 shadow-inner'
                  : 'hover:bg-gray-50 hover:shadow-md'
              } group`}
            >
              <div
                className={`w-3 h-3 rounded-full ${item.color} transition-all duration-300 ${
                  activeFilter === item.id ? 'scale-125' : 'group-hover:scale-110'
                }`}
              ></div>
              <span className="font-medium text-gray-700 flex-1 text-sm transition-colors duration-300">
                {item.label}
              </span>
              {item.count > 0 && (
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all duration-300 transform ${
                    activeFilter === item.id
                      ? 'bg-green-200 text-green-800 scale-110'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}
                  style={{ minWidth: '1.5rem', textAlign: 'center' }} // Pastikan bentuk bulat
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxSidebarFilter;