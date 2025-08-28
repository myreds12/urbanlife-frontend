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
import { BlogProvider } from "./pages/AdminDashboard/DataMaster/Blog/BlogProvider";
import { CategoryProvider } from "./pages/AdminDashboard/DataMaster/Category/CategoryProvider"; // Tambahkan import ini

// Lazy loaded Pages
const Dashboard = lazy(() =>
  import("./pages/AdminDashboard/Dashboard/Dashboard")
);
const Order = lazy(() => import("./pages/AdminDashboard/Order/Order"));
const OrderEdit = lazy(() => import("./pages/AdminDashboard/Order/OrderEdit"));
const OrderView = lazy(() => import("./pages/AdminDashboard/Order/OrderView"));

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
const AboutUs = lazy(() => import("./pages/AdminDashboard/AboutUs/AboutUs"));
const CreateAboutUsPage = lazy(() =>
  import("./pages/AdminDashboard/AboutUs/CreateAboutUsPage")
);
const Customer = lazy(() => import("./pages/AdminDashboard/Customer/Customer"));
const WhatsappConnect = lazy(() =>
  import("./pages/AdminDashboard/WhatsappSetting/WhatsappConnect")
);
const Template = lazy(() =>
  import("./pages/AdminDashboard/WhatsappSetting/Template")
);
const Inbox = lazy(() => import("./pages/AdminDashboard/Inbox/Inbox"));
const Country = lazy(() => import("./pages/AdminDashboard/DataMaster/Country/Country"));
const City = lazy(() => import("./pages/AdminDashboard/DataMaster/Cities/City"));
const Car = lazy(() => import("./pages/AdminDashboard/DataMaster/Car/Car"));
const Driver = lazy(() => import("./pages/AdminDashboard/DataMaster/Driver/Driver"));
const Guide = lazy(() => import("./pages/AdminDashboard/DataMaster/Guide/Guide"));
const BlogAdmin = lazy(() => import("./pages/AdminDashboard/DataMaster/Blog/BlogAdmin"));
const CreateBlog = lazy(() => import("./pages/AdminDashboard/DataMaster/Blog/CreateBlog"));
const CategoryAdmin = lazy(() => import("./pages/AdminDashboard/DataMaster/Category/CategoryAdmin"));
const User = lazy(() => import("./pages/AdminDashboard/DataMaster/User/User"));
const HeroSection = lazy(() => import("./pages/AdminDashboard/DataMaster/HeroSection/HeroSection"));
const Partner = lazy(() => import("./pages/AdminDashboard/DataMaster/Partner/Partner"));
const ServiceSchedule = lazy(() => import("./pages/AdminDashboard/DataMaster/ServiceSchedule/ServiceSchedule"));
const Testimonial = lazy(() => import("./pages/AdminDashboard/DataMaster/Testimonial/Testimonial"));
const UserProfile = lazy(() => import("./pages/AdminDashboard/UserProfile/UserProfile"));
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
const Detail = lazy(() =>
  import("./pages/LandingPage/DayTour/DaytourDetail")
);
const Login = lazy(() =>
  import("./components/AdminDashboard/Utils/Ui/Login/Login")
);
const NotFound = lazy(() => import("./pages/Others/NotFound"));

// Footer Pages
const CompanyFooter = lazy(() => import("./components/LandingPage/Footer/Content/Company/CompanyFooter"));
const AboutUsPage = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/AboutUs"));
const PrivacyPolicy = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/TermsAndCondition"));
const ContactUs = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/ContactUs"));
const CarRental = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/CarRental"));
const DayTourPage = lazy(() => import("./components/LandingPage/Footer/Content/Company/Content/DayTourPage"));
const CategoriesFooter = lazy(() => import("./components/LandingPage/Footer/CategoriesFooter"));
const BlogPostMain = lazy(() => import("./components/LandingPage/Footer/Content/BlogPost/BlogPostMain"));
const BlogDetail = lazy(() => import("./components/LandingPage/Footer/Content/BlogPost/BlogDetail"));
const AccomodationPage = lazy(() => import("./components/LandingPage/Services/Accomodation/Accomodation"));
const AccoDetail = lazy(() => import("./components/LandingPage/Services/Accomodation/AccoDetail"))

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
            <Route path="/Detail/:id" element={<Detail />} />
            <Route path="/OrderDetail" element={<OrderDetail />} />
            <Route path="/PaymentSection" element={<PaymentSection />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="/PaymentUnsuccess" element={<PaymentUnsuccess />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/login" element={<Login />} />

            {/* Footer */}
            <Route path="/Company" element={<CompanyFooter />} />
            <Route path="/AboutUs" element={<AboutUsPage />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/DayTour" element={<DayTourPage />} />
            <Route path="/DayTour/:slug" element={<Detail />} />
            <Route path="/categories" element={<CategoriesFooter />} />
            <Route path="/blog" element={<BlogPostMain />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/unit-car" element={<CarRental />} />
            <Route path="/accomodation" element={<AccomodationPage />} />
            <Route path="/accomodation/detail/:id" element={<AccoDetail />} />

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
              <Route path="order/detail/:id" element={<OrderView />} />
              <Route path="order/edit/:id" element={<OrderEdit />} />
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
              <Route path="AboutUs" element={<AboutUs />} />
              <Route
                path="aboutus/create"
                element={<CreateAboutUsPage />}
              />
              <Route
                path="aboutus/edit/:id"
                element={<CreateAboutUsPage />}
              />
              <Route path="news" element={<News />} />
              <Route path="news/create" element={<CreateNews />} />
              <Route path="whatsapp-connect" element={<WhatsappConnect />} />
              <Route path="template" element={<Template />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="herosection" element={<HeroSection />} /> 
              <Route path="ourpartner" element={<Partner />} /> 
              <Route path="ServiceSchedule" element={<ServiceSchedule />} />           
              <Route path="country" element={<Country />} />
              <Route path="city" element={<City />} />
              <Route path="car" element={<Car />} />
              <Route path="driver" element={<Driver />} />
              <Route path="guide" element={<Guide />} />
              <Route path="blogs" element={<BlogProvider><BlogAdmin /></BlogProvider>} />
              <Route path="blogs/create" element={<BlogProvider><CreateBlog /></BlogProvider>} />
              <Route path="blogs/edit/:id" element={<BlogProvider><CreateBlog /></BlogProvider>} />
              <Route path="category" element={<CategoryProvider><CategoryAdmin /></CategoryProvider>} />
              <Route path="users" element={<User/>} />
              <Route path="testimonial" element={<Testimonial/>}></Route>
              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;