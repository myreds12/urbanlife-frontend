import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AdminDashboard/AppLayout";
import Dashboard from "./pages/AdminDashboard/Dashboard/Dashboard";
import Order from "./pages/AdminDashboard/Order/Order";
import Calendar from "./pages/AdminDashboard/Calendar/Calendar"; // Diperbarui ke pages
import DayTour from "./pages/AdminDashboard/DayTour/DayTour";
import RentCar from "./pages/AdminDashboard/RentCar/RentCar";
import Accommodation from "./pages/AdminDashboard/Accomodation/Accomodation";
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
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="order" element={<Order />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="day-tour" element={<DayTour />} />
            <Route path="rent-car" element={<RentCar />} />
            <Route path="accommodation" element={<Accommodation />} />
            <Route path="whatsapp-connect" element={<WhatsappConnect />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;