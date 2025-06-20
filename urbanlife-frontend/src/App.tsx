import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout & Theme
import AppLayout from "./layouts/AdminDashboard/AppLayout";
import { ThemeProvider } from "./components/AdminDashboard/Utils/Context/ThemeContext";

// Admin Pages
import Dashboard from "./pages/AdminDashboard/Dashboard/Dashboard";
import Order from "./pages/AdminDashboard/Order/Order";
import Calendar from "./pages/AdminDashboard/Calendar/Calendar";
import DayTour from "./pages/AdminDashboard/DayTour/DayTour";
import RentCar from "./pages/AdminDashboard/RentCar/RentCar";
import Accommodation from "./pages/AdminDashboard/Accomodation/Accomodation";
import Customer from "./pages/AdminDashboard/Customer/Customer";
import WhatsappConnect from "./pages/AdminDashboard/WhatsappSetting/WhatsappConnect";

// Data Master Pages
import Country from "./pages/AdminDashboard/DataMaster/Country";
import City from "./pages/AdminDashboard/DataMaster/City";
import Car from "./pages/AdminDashboard/DataMaster/Car";

// Public Page
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Website landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin layout and nested routes */}
          <Route path="/admin" element={<AppLayout />}>
            {/* Default redirect */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* Admin routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="order" element={<Order />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="day-tour" element={<DayTour />} />
            <Route path="rent-car" element={<RentCar />} />
            <Route path="accommodation" element={<Accommodation />} />
            <Route path="customer" element={<Customer />} />
            <Route path="whatsapp-connect" element={<WhatsappConnect />} />

            {/* Data Master */}
            <Route path="country" element={<Country />} />
            <Route path="city" element={<City />} />
            <Route path="car" element={<Car />} />

          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
