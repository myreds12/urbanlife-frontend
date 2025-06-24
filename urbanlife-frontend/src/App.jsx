import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout & Theme
import AppLayout from "./layouts/AdminDashboard/AppLayout";
import ThemeProvider from "./components/AdminDashboard/Utils/Context/ThemeContext";

// Admin Pages
import Dashboard from "./pages/AdminDashboard/Dashboard/Dashboard";
import Order from "./pages/AdminDashboard/Order/Order";
import Calendar from "./pages/AdminDashboard/Calendar/Calendar";
import DayTour from "./pages/AdminDashboard/DayTour/DayTour";
import RentCar from "./pages/AdminDashboard/RentCar/RentCar";
import Accommodation from "./pages/AdminDashboard/Accomodation/Accomodation";
import Customer from "./pages/AdminDashboard/Customer/Customer";

// Whasapp Setting Pages
import WhatsappConnect from "./pages/AdminDashboard/WhatsappSetting/WhatsappConnect";
import Template from "./pages/AdminDashboard/WhatsappSetting/template";

import Inbox from "./pages/AdminDashboard/Inbox/Inbox";

// Data Master Pages
import Country from "./pages/AdminDashboard/DataMaster/Country"; // Component

import City from "./pages/AdminDashboard/DataMaster/City";
import Car from "./pages/AdminDashboard/DataMaster/Car";
import Driver from "./pages/AdminDashboard/DataMaster/Driver";
import Guide from "./pages/AdminDashboard/DataMaster/Guide";

// User Profile
import UserProfile from "./pages/AdminDashboard/UserProfile/UserProfile";

// Public Page
import HomePage from "./pages/LandingPage/HomePage/HomePage";
import OrderDetail from "./pages/LandingPage/OrderDetail/OrderDetail";
import PaymentSection from "./pages/LandingPage/PaymentSection/PaymentSection";


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Website landing page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Order detail page */}
          <Route path="/OrderDetail" element={<OrderDetail />} />

          {/* Payment selection page */}
          <Route path="/PaymentSection" element={<PaymentSection />} />

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
            <Route path="customer" element={<Customer />} />
            <Route path="accommodation" element={<Accommodation />} />

            {/* WhatsApp Setting */}
            <Route path="whatsapp-connect" element={<WhatsappConnect />} />
            <Route path="template" element={<Template />} />

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
