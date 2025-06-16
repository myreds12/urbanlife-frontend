import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AdminDashboard/AppLayout";
import Dashboard from "./pages/AdminDashboard/Dashboard/Dashboard";
import Order from "./pages/AdminDashboard/Order/Order";
import DayTour from "./pages/AdminDashboard/DayTour/DayTour";
import WhatsappConnect from "./pages/AdminDashboard/WhatsappSetting/WhatsappConnect";
import { ThemeProvider } from "./components/AdminDashboard/Utils/Context/ThemeContext"; // Sesuaikan path

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
            <Route path="/day-tour" element={<DayTour />} />
            <Route path="/whatsapp-connect" element={<WhatsappConnect />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;