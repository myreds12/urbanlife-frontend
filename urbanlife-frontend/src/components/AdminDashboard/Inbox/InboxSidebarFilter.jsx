import React from 'react';

const InboxSidebarFilter = ({
  activeFilter,
  onFilterChange,
  messageCounts = {
    all: 0,
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
      id: 'success',
      label: 'Success',
      icon: (
        <svg
          className="w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      count: messageCounts.success,
    },
    {
      id: 'failed',
      label: 'Failed',
      icon: (
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
      count: messageCounts.failed,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-fit transition-all duration-300">
      <div className="space-y-2">
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
                }`}
                style={{ minWidth: '1.5rem', textAlign: 'center' }}
              >
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InboxSidebarFilter;
