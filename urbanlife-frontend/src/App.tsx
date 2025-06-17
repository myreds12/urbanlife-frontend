import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AdminDashboard/AppLayout";
import Dashboard from "./pages/AdminDashboard/Dashboard/Dashboard";
import Order from "./pages/AdminDashboard/Order/Order";
import DayTour from "./pages/AdminDashboard/DayTour/DayTour";
import WhatsappConnect from "./pages/AdminDashboard/WhatsappSetting/WhatsappConnect";
import LandingPage from "./pages/LandingPage/LandingPage";
import { ThemeProvider } from "./components/AdminDashboard/Utils/Context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Website landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin layout and nested routes */}
          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/order" element={<Order />} />
            <Route path="/admin/day-tour" element={<DayTour />} />
            <Route path="/admin/whatsapp-connect" element={<WhatsappConnect />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
