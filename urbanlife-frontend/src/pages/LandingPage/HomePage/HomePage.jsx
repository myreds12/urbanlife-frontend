import Navbar from "../../../components/LandingPage/HomePage/Navbar/Navbar";
import Footer from "../../../components/LandingPage/HomePage/Footer";
import HeroSection from "../../../components/LandingPage/HomePage/HeroSection";
import Destination from "./Destination/Destination";
import CategoriesCard from "../../../components/LandingPage/HomePage/CategoriesCard";
import DiscoverCard from "../../../components/LandingPage/HomePage/DiscoverCard";
import PartnerCard1 from "../../../components/LandingPage/HomePage/PartnerCard1";
import ServiceScheduleCard from "../../AdminDashboard/DataMaster/ServiceSchedule/ServicenScheduleCard";
import TestimonialSection from "../../../components/LandingPage/HomePage/TestimonialSection";
import NewsnBlog from "../../../components/LandingPage/HomePage/NewsnBlog/NewsnBlog";
import PopularCategoriesSection from "./Popular Categoires/PopularCategories";
import AnimatedSection from "../../../components/LandingPage/Utils/AnimatedSection";
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
    const { t } = useTranslation();
  
  return (
    <div>
      <Navbar />

      {/* Hero container */}
      <AnimatedSection animationType="fadeInUp">
        <div className="hero-container">
          <HeroSection />
          <Destination />
        </div>
      </AnimatedSection>

      {/* Popular Categories Section */}
      <div className="w-full px-4 md:px-8 lg:px-10 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="playfair text-[#071C4D] text-[25px] font-bold text-left mt-5 mb-8 ml-5">
            {t("categories.title")}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <PopularCategoriesSection />
        </div>
      </div>

      {/* Discover All Around Section */}
      <div className="w-full px-4 md:px-8 lg:px-10 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="playfair text-[#071C4D] text-[25px] font-bold text-left mb-8 ml-5">
           {t('discover.title')}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <DiscoverCard />
        </div>
      </div>

      {/* Our Partner Section */}
      <AnimatedSection animationType="scaleIn">
        <div className="w-full px-4 md:px-8 lg:px-10 mb-1">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="playfair text-[#071C4D] text-[25px] font-bold text-left mb-8 ml-5">
              {t('partner.title')}
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-14 mb-10">
            <PartnerCard1 image="/images/LandingPage/Partner/BoutiqueHotel2.png" />
            <PartnerCard1 image="/images/LandingPage/Partner/PondokSebatu.png" />
            <PartnerCard1 image="/images/LandingPage/Partner/BeachHotel2.png" />
          </div>
        </div>
      </AnimatedSection>

      {/* Service Schedule Section */}
      <AnimatedSection animationType="fadeInUp">
        <div>
          <ServiceScheduleCard />
        </div>
      </AnimatedSection>

      {/* Testimonial Section */}
      <AnimatedSection animationType="slideInLeft">
        <TestimonialSection />
      </AnimatedSection>

      {/* News Section */}
      <AnimatedSection animationType="fadeInUp">
        <div id="news">
          <NewsnBlog />
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default LandingPage;