import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/AdminDashboard/Dashboard/Dashboard";
import Order from "./pages/AdminDashboard/Order/Order";
import DayTour from "./pages/AdminDashboard/DayTour/DayTour";
import WhatsappConnect from "./pages/AdminDashboard/WhatsappSetting/WhatsappConnect";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/day-tour" element={<DayTour />} />
          <Route path="/whatsapp-connect" element={<WhatsappConnect />} />
        </Routes>
    </Router>
  );
}

export default App;