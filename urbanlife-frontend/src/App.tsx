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
import Inbox from "./pages/AdminDashboard/Inbox/Inbox";

// Data Master Pages
import type Country from "./pages/AdminDashboard/DataMaster/Country";
import type City from "./pages/AdminDashboard/DataMaster/City";
import type Car from "./pages/AdminDashboard/DataMaster/Car";
import type Driver from "./pages/AdminDashboard/DataMaster/Driver";
import type Guide from "./pages/AdminDashboard/DataMaster/Guide";

// User Profile
import UserProfile from "./pages/AdminDashboard/UserProfile/UserProfile";

// Public Page
import LandingPage from "./pages/LandingPage/LandingPage";
import OrderDetail from "./pages/LandingPage/OrderDetail";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Website landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Order detail page */}
          <Route path="/order-detail" element={<OrderDetail />} />

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
            <Route path="inbox" element={<Inbox />} />


            {/* Data Master */}
            <Route path="country" element={<Country />} />
            <Route path="city" element={<City />} />
            <Route path="car" element={<Car />} />
            <Route path="driver" element={<Driver />} />
            <Route path="guide" element={<Guide />} />

            {/* User Profile */}
            <Route path="profile" element={<UserProfile />} />

          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
