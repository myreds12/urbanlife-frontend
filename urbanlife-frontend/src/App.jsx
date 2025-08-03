import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ReactModal from "react-modal";

// Layout & Context
import AppLayout from "./layouts/AdminDashboard/AppLayout";
import ThemeProvider from "./components/AdminDashboard/Utils/Context/ThemeContext";
import ProtectedRoute from "./components/AdminDashboard/Utils/Auth/ProtectedRoute";
import AuthInitializer from "./components/AdminDashboard/Utils/Auth/AuthInitializer";

// Lazy loaded Pages
const Dashboard = lazy(() =>
  import("./pages/AdminDashboard/Dashboard/Dashboard")
);
const Order = lazy(() => import("./pages/AdminDashboard/Order/Order"));
const Calendar = lazy(() => import("./pages/AdminDashboard/Calendar/Calendar"));
const DayTour = lazy(() => import("./pages/AdminDashboard/DayTour/DayTour"));
const CreateDayTourPage = lazy(() =>
  import("./pages/AdminDashboard/DayTour/CreateDayTourPage")
);
const RentCar = lazy(() => import("./pages/AdminDashboard/RentCar/RentCar"));
const CreateRentCarPage = lazy(() =>
  import("./pages/AdminDashboard/RentCar/CreateRentCar")
);
const Accomodation = lazy(() =>
  import("./pages/AdminDashboard/Accomodation/Accomodation")
);
const CreateAccomodationPage = lazy(() =>
  import("./pages/AdminDashboard/Accomodation/CreateAccomodation")
);
const Customer = lazy(() => import("./pages/AdminDashboard/Customer/Customer"));
const WhatsappConnect = lazy(() =>
  import("./pages/AdminDashboard/WhatsappSetting/WhatsappConnect")
);
const Template = lazy(() =>
  import("./pages/AdminDashboard/WhatsappSetting/Template")
);
const Inbox = lazy(() => import("./pages/AdminDashboard/Inbox/Inbox"));
const Country = lazy(() =>
  import("./pages/AdminDashboard/DataMaster/Country/Country")
);
const City = lazy(() =>
  import("./pages/AdminDashboard/DataMaster/Cities/City")
);
const Car = lazy(() => import("./pages/AdminDashboard/DataMaster/Car/Car.jsx"));
const Driver = lazy(() =>
  import("./pages/AdminDashboard/DataMaster/Driver/Driver")
);
const Guide = lazy(() =>
  import("./pages/AdminDashboard/DataMaster/Guide/Guide")
);
const UserProfile = lazy(() =>
  import("./pages/AdminDashboard/UserProfile/UserProfile")
);
const News = lazy(() => import("./pages/AdminDashboard/News/News"));
const CreateNews = lazy(() => import("./pages/AdminDashboard/News/CreateNews"));

// Public pages
const HomePage = lazy(() => import("./pages/LandingPage/HomePage/HomePage"));
const Services = lazy(() => import("./pages/LandingPage/Services/Services"));
const OrderDetail = lazy(() =>
  import("./pages/LandingPage/OrderDetail/OrderDetail")
);
const PaymentSection = lazy(() =>
  import("./pages/LandingPage/PaymentSection/PaymentSection")
);
const PaymentSuccess = lazy(() =>
  import("./pages/LandingPage/PaymentSection/PaymentSuccess")
);
const PaymentUnsuccess = lazy(() =>
  import("./pages/LandingPage/PaymentSection/PaymentUnsuccess")
);
const DaytourDetail = lazy(() =>
  import("./pages/LandingPage/DayTour/DaytourDetail")
);
const Login = lazy(() =>
  import("./components/AdminDashboard/Utils/Ui/Login/Login")
);
const NotFound = lazy(() => import("./pages/Others/NotFound"));

// Footer Pages
const CompanyFooter = lazy(() => import("./components/LandingPage/Footer/Content/Company/CompanyFooter"));
const AboutUs = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/AboutUs.jsx"));
const PrivacyPolicy = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/TermsAndCondition"));
const ContactUs = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/ContactUs"));

const CarRental = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/CarRental"));
const DayTourPage = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/DayTourPage"));
const CategoriesFooter = lazy(() => import("./components/LandingPage/Footer/CategoriesFooter"));
const BlogPostMain = lazy(() => import("./components/LandingPage/Footer/Content/BlogPost/BlogPostMain"));
const BlogDetail = lazy(() => import("./components/LandingPage/Footer/Content/BlogPost/BlogDetail"));


function App() {
  // Set the root element for React Modal
  ReactModal.setAppElement("#root");

  return (
    <ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthInitializer /> {/* ✅ Tambahkan ini */}
      <Router>
        <Suspense fallback={<div className="text-center p-12">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/DaytourDetail/:id" element={<DaytourDetail />} /> {/* Rute dinamis */}
            <Route path="/OrderDetail" element={<OrderDetail />} />
            <Route path="/PaymentSection" element={<PaymentSection />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="/PaymentUnsuccess" element={<PaymentUnsuccess />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/login" element={<Login />} />

            {/* Footer */}
            <Route path="/Company" element={<CompanyFooter />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
            <Route path="/ContactUs" element={<ContactUs />} /> 
            
            <Route path="/DayTour" element={<DayTourPage />} />
            <Route path="/DayTour/:slug" element={<DaytourDetail />} />
            <Route path="/categories" element={<CategoriesFooter />} />
            <Route path="/blog" element={<BlogPostMain />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />

            <Route path="/unit-car" element={<CarRental />} />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="order" element={<Order />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="day-tour" element={<DayTour />} />
              <Route path="day-tour/create" element={<CreateDayTourPage />} />
              <Route path="day-tour/edit/:id" element={<CreateDayTourPage />} />
              <Route path="rent-car" element={<RentCar />} />
              <Route path="rent-car/create" element={<CreateRentCarPage />} />
              <Route path="rent-car/edit/:id" element={<CreateRentCarPage />} />
              <Route path="customer" element={<Customer />} />
              <Route path="accommodation" element={<Accomodation />} />
              <Route
                path="accommodation/create"
                element={<CreateAccomodationPage />}
              />
              <Route
                path="accommodation/edit/:id"
                element={<CreateAccomodationPage />}
              />
              <Route path="news" element={<News />} />
              <Route path="news/create" element={<CreateNews />} />
              <Route path="whatsapp-connect" element={<WhatsappConnect />} />
              <Route path="template" element={<Template />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="country" element={<Country />} />
              <Route path="city" element={<City />} />
              <Route path="car" element={<Car />} />
              <Route path="driver" element={<Driver />} />
              <Route path="guide" element={<Guide />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;