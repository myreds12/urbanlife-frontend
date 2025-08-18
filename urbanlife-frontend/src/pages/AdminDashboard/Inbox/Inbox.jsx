import React, { useState, useEffect } from 'react';
import InboxSidebarFilter from '../../../components/AdminDashboard/Inbox/InboxSidebarFilter';
import InboxTable from '../../../components/AdminDashboard/Utils/Table/InboxTable';
import apiClient from '../../../components/AdminDashboard/Utils/ApiClient/apiClient';

const Inbox = () => {
  const [activeFilter, setActiveFilter] = useState("all"); // "all", "success", "failed"
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchMessages = async (filter = "all") => {
    try {
      setLoading(true);

      // Mapping filter UI ke API
      let apiStatus = "";
      if (filter === "success") apiStatus = "terkirim";
      if (filter === "failed") apiStatus = "tidak terkirim";

      const statusQuery = apiStatus
        ? `&status=${encodeURIComponent(apiStatus)}`
        : "";

      const res = await apiClient.get(
        `/whatsapp/message?take=10&page=1${statusQuery}`
      );

      if (res.data?.status === 200) {
        const mapped = res.data.data.map((item) => ({
          id: item.id,
          customerName: item.penerima,
          message: item.pesan,
          status: item.status === "terkirim" ? "success" : "failed",
          time: new Date(item.waktu_kirim).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          timestamp: new Date(item.waktu_kirim),
        }));

        setMessages(mapped);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(activeFilter);
  }, [activeFilter]);

  const messageCounts = {
    all: messages.length,
    success: messages.filter((m) => m.status === "success").length,
    failed: messages.filter((m) => m.status === "failed").length,
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSearchTerm("");
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-gray-600 mt-1">
            Manage your customer messages and communications
          </p>
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