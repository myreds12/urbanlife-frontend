import Navbar from "../../../components/LandingPage/HomePage/Navbar";
import Footer from "../../../components/LandingPage/HomePage/Footer";
import HeroSection from "../../../components/LandingPage/HomePage/HeroSection";
import AutoScrollDestinationSlider from "../../../components/LandingPage/HomePage/AutoScrollDestinationSlider";
import CategoriesCard from "../../../components/LandingPage/HomePage/CategoriesCard";
import DiscoverCard from "../../../components/LandingPage/HomePage/DiscoverCard";
import PartnerCard1 from "../../../components/LandingPage/HomePage/PartnerCard1";
import ServiceScheduleCard from "../../../components/LandingPage/HomePage/ServicenScheduleCard";
import TestimonialSection from "../../../components/LandingPage/HomePage/TestimonialSection";
import NewsnBlog from "../../../components/LandingPage/HomePage/NewsnBlog/NewsnBlog";
import Destination from "./Destination/Destination";

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero container */}
      <div className="hero-container">
        <HeroSection />

        {/* Responsive destination cards dengan autoscroll */}
        <div
          className="destination-slider-container mt-[-150px] mb-10"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            zIndex: 10,
          }}
        >
          <Destination>
            {(orderItem) => <AutoScrollDestinationSlider travelData={orderItem} />}
          </Destination>
        </div>
      </div>

      {/* === Popular Categories Section === */}
      <div className="w-full px-4 md:px-8 lg:px-10 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="playfair text-[#071C4D] text-[25px] font-bold text-left mt-5 mb-8 ml-5">
            Popular Categories
          </h1>
        </div>

        <div
          className="flex flex-wrap justify-center gap-4"
        >
          <CategoriesCard
            country="Indonesia"
            title="Eastern Bali Tour"
            destinations="4 Destination"
            price="1,200,000"
            image="/images/LandingPage/Destination/EasternBaliTour.png"
          />
          <CategoriesCard
            country="Vietnam"
            title="Toyota Alphard"
            destinations="1 - 4 hours"
            price="1,200,000"
            image="/images/LandingPage/Categories/Alphard.png"
          />
          <CategoriesCard
            country="Indonesia"
            title="Fourteen Roses Boutique Hotel"
            destinations="Single Bed"
            price="1,200,000/night"
            image="/images/LandingPage/Categories/Fourteenroses.png"
          />
          <CategoriesCard
            country="Vietnam"
            title="Fourteen Roses Boutique Hotel"
            destinations="Single Bed"
            price="1,200,000/night"
            image="/images/LandingPage/Categories/Fourteenroses.png"
          />
        </div>
      </div>

      {/* === Discover All Around Section === */}
      <div className="w-full px-4 md:px-8 lg:px-10 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="playfair text-[#071C4D] text-[25px] font-bold text-left mb-8 ml-5">
            Discover All Around
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <DiscoverCard
            country="Indonesia"
            city="2 Cities"
            desc="20 Destination"
            image="/images/LandingPage/Discover/Monas.png"
          />
          <DiscoverCard
            country="Vietnam"
            city="2 Cities"
            desc="20 Unit rental cars"
            image="/images/LandingPage/Discover/Car.png"
          />
          <DiscoverCard
            country="Indonesia"
            city="1 City"
            desc="3 Hotel"
            image="/images/LandingPage/Discover/Hotel.png"
          />
        </div>
      </div>

      {/* === Our Partner Section === */}
      <div className="w-full px-4 md:px-8 lg:px-10 mb-1">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="playfair text-[#071C4D] text-[25px] font-bold text-left mb-8 ml-5 ">
            Our Partner
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-14 mb-10">
          <PartnerCard1 image="/images/LandingPage/Partner/BoutiqueHotel2.png" />
          <PartnerCard1 image="/images/LandingPage/Partner/PondokSebatu.png" />
          <PartnerCard1 image="/images/LandingPage/Partner/BeachHotel2.png" />
        </div>
        
      </div>

      <div>
          <ServiceScheduleCard />
      </div>
      
      {/* === Testimonial Section === */}
      <TestimonialSection />

      {/* === News Section === */}
      <div id="news">
        <NewsnBlog />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
