import React, { useState, useEffect } from 'react';
import InboxSidebarFilter from '../../../components/AdminDashboard/Inbox/InboxSidebarFilter';
import InboxTable from '../../../components/AdminDashboard/Utils/Table/InboxTable';

const Inbox = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyMessages = [
    {
      id: '1',
      customerName: 'Selena',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda vitae sunt blanditiis...',
      status: 'failed',
      time: '12:16 pm',
      timestamp: new Date('2024-04-16T12:16:00')
    },
    {
      id: '2',
      customerName: 'Selena',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda vitae sunt blanditiis...',
      status: 'failed',
      time: '12:16 pm',
      timestamp: new Date('2024-04-16T12:16:00')
    },
    {
      id: '3',
      customerName: 'Selena',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda vitae sunt blanditiis...',
      status: 'failed',
      time: 'Apr, 16',
      timestamp: new Date('2024-04-16T10:30:00')
    },
    {
      id: '4',
      customerName: 'John Doe',
      message: 'Hello, I would like to inquire about your tour packages to Bali...',
      status: 'success',
      time: 'Apr, 15',
      timestamp: new Date('2024-04-15T14:20:00')
    },
    {
      id: '5',
      customerName: 'Jane Smith',
      message: 'Thank you for the wonderful service! The trip was amazing.',
      status: 'sent',
      time: 'Apr, 14',
      timestamp: new Date('2024-04-14T16:45:00')
    },
    {
      id: '6',
      customerName: 'Mike Johnson',
      message: 'Can you provide more information about the car rental service?',
      status: 'unsent',
      time: 'Apr, 13',
      timestamp: new Date('2024-04-13T09:15:00')
    }
  ];

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setTimeout(() => {
        setMessages(dummyMessages);
        setLoading(false);
      }, 1000);
    };

    fetchMessages();
  }, []);

  const messageCounts = {
    all: messages.length,
    sent: messages.filter((m) => m.status === 'sent').length,
    unsent: messages.filter((m) => m.status === 'unsent').length,
    success: messages.filter((m) => m.status === 'success').length,
    failed: messages.filter((m) => m.status === 'failed').length,
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSearchTerm('');
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-96 animate-pulse">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
              <p className="text-gray-600 mt-1">
                Manage your customer messages and communications
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <InboxSidebarFilter
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              messageCounts={messageCounts}
            />
          </div>

          <div className="lg:col-span-3">
            <InboxTable
              messages={messages}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              activeFilter={activeFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
