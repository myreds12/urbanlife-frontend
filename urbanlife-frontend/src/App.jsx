import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Accomodation from "./pages/AdminDashboard/Accomodation/Accomodation";
import Customer from "./pages/AdminDashboard/Customer/Customer";

// Whasapp Setting Pages
import WhatsappConnect from "./pages/AdminDashboard/WhatsappSetting/WhatsappConnect";
import Template from "./pages/AdminDashboard/WhatsappSetting/template";

import Inbox from "./pages/AdminDashboard/Inbox/Inbox";

// Data Master Pages
import Country from "./pages/AdminDashboard/DataMaster/Country/Country"; // Component
import City from "./pages/AdminDashboard/DataMaster/Cities/City";
import Car from "./pages/AdminDashboard/DataMaster/Car/Car";
import Driver from "./pages/AdminDashboard/DataMaster/Driver";
import Guide from "./pages/AdminDashboard/DataMaster/Guide";

// User Profile
import UserProfile from "./pages/AdminDashboard/UserProfile/UserProfile";

// Public Page
import HomePage from "./pages/LandingPage/HomePage/HomePage";
import OrderDetail from "./pages/LandingPage/OrderDetail/OrderDetail";
import PaymentSection from "./pages/LandingPage/PaymentSection/PaymentSection";
import PaymentSuccess from "./pages/LandingPage/PaymentSection/PaymentSuccess";
import PaymentUnsuccess from "./pages/LandingPage/PaymentSection/PaymentUnsuccess";
import Services from "./pages/LandingPage/Services/Services";
import Login from "./components/AdminDashboard/Utils/Ui/Login/Login";
import DaytourDetail from "./pages/LandingPage/DayTour/DaytourDetail";

// Notifications
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { getToken } from "./components/AdminDashboard/Utils/Auth/Auth";
import apiClient from "./components/AdminDashboard/Utils/ApiClient/apiClient";
import ReactModal from "react-modal";
import CreateRentCarPage from "./pages/AdminDashboard/RentCar/CreateRentCar";
import CreateAccomodationPage from "./pages/AdminDashboard/Accomodation/CreateAccomodation";
import CreateDayTourPage from "./pages/AdminDashboard/DayTour/CreateDayTourPage";

//404 ERROR NOT FOUND
import NotFound from "./pages/Others/NotFound";

function App() {
  useEffect(() => {
    const initAuth = async () => {
      const stored = localStorage.getItem("authToken");

      if (stored) {
        console.log("🔑 Menggunakan token yang sudah ada");
        axios.defaults.headers.common["Authorization"] = `Bearer ${stored}`;
      } else {
        await getToken();
      }

      apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            console.log("🔁 Token expired. Mencoba login ulang...");

            const newToken = await getToken();

            if (newToken) {
              console.log("✅ Token baru didapat:", newToken);
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            }
          }

          return Promise.reject(error);
        }
      );
    };

    initAuth();
  }, []);
  ReactModal.setAppElement("#root"); // Jika elemen root kamu punya ID "root"


  return (
    <ThemeProvider>
    
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Website landing page */}
          <Route path="/" element={<HomePage />} />

          {/* 404 ERROR NOT FOUND */}
          <Route path="*" element={<NotFound />} />

          {/* DayTour detail page */}
          <Route path="/DaytourDetail" element={<DaytourDetail />} />

          {/* Order detail page */}
          <Route path="/OrderDetail" element={<OrderDetail />} />

          {/* Payment selection page */}
          <Route path="/PaymentSection" element={<PaymentSection />} />

          {/* Payment success page */}
          <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
          
          {/* Payment unsuccess page */}
          <Route path="/PaymentUnsuccess" element={<PaymentUnsuccess />} />

          {/* Services page */}
          <Route path="/Services" element={<Services />} />

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Admin layout and nested routes */}
          <Route path="/admin" element={<AppLayout />}>
            {/* Default redirect */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* Admin routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="order" element={<Order />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="day-tour" element={<DayTour />} />
            <Route path="day-tour/create" element={<CreateDayTourPage />} />
            <Route path="rent-car" element={<RentCar />} />
            <Route path="rent-car/create" element={<CreateRentCarPage />} />
            <Route path="customer" element={<Customer />} />
            <Route path="accommodation" element={<Accomodation />} />
            <Route path="accommodation/create" element={<CreateAccomodationPage />} />

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