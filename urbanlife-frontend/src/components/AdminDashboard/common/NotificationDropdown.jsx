import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../Utils/ApiClient/apiClient";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const take = 10;
  const navigate = useNavigate();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  // Fetch notifications
  const fetchNotifications = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/notification?take=${take}&page=${pageNumber}`);
      if (res.data?.status === 200) {
        setNotifications(res.data.data || []);
        setTotal(res.data.total || 0);
        setPage(res.data.page || 1);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications(page);
    }
  }, [isOpen, page]);

  const handleNotificationClick = (notif) => {
    closeDropdown();
    navigate(`/admin/order/detail/${notif.pemesanan_id}`);
  };

  const totalPages = Math.ceil(total / take);

  return (
    <div className="relative">
      {/* 🔔 Button */}
      <button
        className="relative flex items-center justify-center text-gray-600 transition-colors bg-white border border-gray-300 rounded-full h-11 w-11 hover:bg-gray-100 shadow-sm"
        onClick={handleClick}
      >
        {/* 🔸 Ping indicator */}
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-500 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* 📩 Dropdown */}
      {isOpen && (
        <div
          className="absolute -right-[240px] mt-4 flex flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-xl sm:w-[380px] lg:right-0 max-h-[420px]"
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={closeDropdown}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-2 pb-2 border-b border-gray-200">
            <h5 className="text-base font-semibold text-gray-800">Notifications</h5>
            <button
              onClick={toggleDropdown}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* List */}
          <ul className="flex flex-col overflow-y-auto custom-scrollbar max-h-[300px]">
            {loading ? (
              <li className="p-4 text-center text-gray-500">Loading...</li>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => {
                const parsed = JSON.parse(notif.data);
                const userName = parsed?.data?.user?.nama || "Unknown User";
                const message = parsed?.message || "No message";
                return (
                  <li key={notif.id}>
                    <div
                      onClick={() => handleNotificationClick(notif)}
                      className={`flex flex-col gap-1 rounded-lg border-b border-gray-100 p-3 cursor-pointer transition ${
                        notif.is_read
                          ? "bg-white hover:bg-gray-50"
                          : "bg-orange-50 hover:bg-orange-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">
                          {userName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(notif.createdAt).toLocaleString("id-ID", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                      <span className="text-gray-700 text-sm">{message}</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          Order ID: {notif.pemesanan_id}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${
                            notif.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : notif.status === "SUCCESS"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {notif.status}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="p-4 text-center text-gray-500">No notifications</li>
            )}
          </ul>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-3 px-2">
            <button
              disabled={page <= 1}
              onClick={() => fetchNotifications(page - 1)}
              className="px-3 py-1 text-xs font-medium border rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-xs text-gray-600">
              Page {page} of {totalPages || 1}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => fetchNotifications(page + 1)}
              className="px-3 py-1 text-xs font-medium border rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
