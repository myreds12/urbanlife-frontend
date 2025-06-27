import Navbar from "../../../components/LandingPage/HomePage/Navbar";
import Footer from "../../../components/LandingPage/HomePage/Footer";
import HeroSection from "../../../components/LandingPage/HomePage/HeroSection";
import CategoriesCard from "../../../components/LandingPage/HomePage/CategoriesCard";
import DiscoverCard from "../../../components/LandingPage/HomePage/DiscoverCard";
import ServicePromoCard from "../../../components/LandingPage/HomePage/ServicePromoCard";
import PartnerCard1 from "../../../components/LandingPage/HomePage/PartnerCard1";
import TestimonialSection from "../../../components/LandingPage/HomePage/TestimonialSection";
import PartnerSection from "../../../components/LandingPage/HomePage/PartnerSection";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="hero-container mb-50">
        <HeroSection />
      </div>

      <div className="mb-15">
        <h1 className="playfair text-[#071C4D] text-[25px] font-bold ml-27 mb-8">
          {" "}
          Popular Categories{" "}
        </h1>
        <div
          className="categories-grid mb-10"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <CategoriesCard
            country="Indonesia"
            title="Eastern Bali Tour"
            destinations="4 Destination"
            price="1,200,000"
            image="/images/EasternBaliTour.png"
          />
          <CategoriesCard
            country="Vietnam"
            title="Toyota Alphard"
            destinations="1 - 4 hours"
            price="1,200,000"
            image="/images/Alphard.png"
          />
          <CategoriesCard
            country="Indonesia"
            title="Fourteen Roses Boutique Hotel"
            destinations="Single Bed"
            price="1,200,000/night"
            image="/images/Fourteenroses.png"
          />
          <CategoriesCard
            country="Vietnam"
            title="Fourteen Roses Boutique Hotel"
            destinations="Single Bed"
            price="1,200,000/night"
            image="/images/Fourteenroses.png"
          />
        </div>
      </div>

      <div className="mb-15">
        <h1 className="playfair text-[#071C4D] text-[25px] font-bold ml-27 mb-8">
          {" "}
          Discover All Around{" "}
        </h1>
        <div
          className="discover-grid mb-10"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <DiscoverCard
            country="Indonesia"
            city="2 Cities"
            desc="20 Destination"
            image="/images/Monas.png"
          />
          <DiscoverCard
            country="Vietnam"
            city="2 Cities"
            desc="20 Unit rental cars"
            image="/images/Car.png"
          />
          <DiscoverCard
            country="Indonesia"
            city="1 City"
            desc="3 Hotel"
            image="/images/Hotel.png"
          />
        </div>
      </div>

      <div>
        <h1 className="playfair text-[#071C4D] text-[25px] font-bold ml-27 mb-8"> Our Partner </h1>
        <div
          className="partner1-grid mb-10"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <PartnerCard1
            image="/images/BoutiqueHotel.png"
          />
          <PartnerCard1
            image="/images/PondokSebatu.png"
          />
          <PartnerCard1
            image="/images/BeachHotel.png"
          />
        </div>
      </div>

      <div>
        <ServicePromoCard/>
      </div>

      <TestimonialSection />
      <PartnerSection />

      <Footer />
    </div>
  );
};

export default LandingPage;