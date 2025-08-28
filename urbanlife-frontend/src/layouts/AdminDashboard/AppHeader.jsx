import React from "react";
import ThemeToggleButton from "../../components/AdminDashboard/common/ThemeToggleButton"; 
import NotificationDropdown from "../../components/AdminDashboard/common/NotificationDropdown";
import UserDropdown from "../../components/AdminDashboard/common/UserDropdown";
import { useAuthStore } from "../../components/AdminDashboard/Utils/Auth/AuthStore";

const AppHeader = () => {
  const role = useAuthStore((s) => s.user?.role);
  return (
    <header className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 z-40 p-3 px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{role === "super_admin" ? "Dashboard Super Admin" : "Dashboard Admin" }</h1>
        <div className="flex items-center space-x-4">
          {/* <ThemeToggleButton /> */}
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;