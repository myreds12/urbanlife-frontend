import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import React from "react";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 p-4 ml-64 pt-20"> {/* Tambah pt-16 buat ngatasin header */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;