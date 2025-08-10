import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import React from "react";
import { ThemeProvider } from "../../components/AdminDashboard/Utils/Context/ThemeContext";
import "./../../../src/Admin.css";



const AppLayout = () => {
  return (
    <ThemeProvider>
          <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 p-4 ml-64 pt-20">
          {/* Tambah pt-20 buat ngatasin header */}
          <Outlet />
        </main>
      </div>
    </div>

    </ThemeProvider>
  );
};

export default AppLayout;
