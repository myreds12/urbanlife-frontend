import Navbar from "../../../components/LandingPage/HomePage/Navbar";
import Footer from "../../../components/LandingPage/HomePage/Footer";
import HeroSection from "../../../components/LandingPage/HomePage/HeroSection";
import DestinationCard from "../../../components/LandingPage/HomePage/DestinationCard";
import CategoriesCard from "../../../components/LandingPage/HomePage/CategoriesCard";
import DiscoverCard from "../../../components/LandingPage/HomePage/DiscoverCard";
import ServicenScheduleCard from "../../../components/LandingPage/HomePage/ServicenScheduleCard";
import PartnerCard1 from "../../../components/LandingPage/HomePage/PartnerCard1";
import TestimonialSection from "../../../components/LandingPage/HomePage/TestimonialSection";
import PartnerSection from "../../../components/LandingPage/HomePage/PartnerSection";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      
      <div className="hero-container" style={{ position: "relative", marginBottom: "220px" }}>
        <HeroSection />
        
        <div
          className="destination-grid-floating"
          style={{
            position: "absolute",
            bottom: "-200px", // Adjust this value to control how much overlaps
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            flexWrap: "wrap",
            padding: "0 20px",
            zIndex: 10, // Ensure cards are above hero content
            width: "100%",
            maxWidth: "1200px" // Limit max width for better control
          }}
        >
          <DestinationCard
            country="Indonesia"
            title="Eastern Bali Tour"
            destinations="4 Destination"
            price="1,200,000"
            image="/images/LandingPage/Destination/EasternBaliTour.png"
          />
          <DestinationCard
            country="Vietnam"
            title="Danang"
            destinations="4 Destination"
            price="1,200,000"
            image="/images/LandingPage/Destination/Danang.png"
          />
          <DestinationCard
            country="Indonesia"
            title="Jakarta"
            destinations="4 Destination"
            price="1,200,000"
            image="/images/LandingPage/Destination/Jakarta.png"
          />
          <DestinationCard
            country="Vietnam"
            title="Ho Chi Minh City"
            destinations="4 Destination"
            price="1,200,000"
            image="/images/LandingPage/Destination/HoChiMinhCity.png"
          />
        </div>
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

      <div>
        <h1 className="playfair text-[#071C4D] text-[25px] font-bold ml-27 mb-8">
          {" "}
          Our Partner{" "}
        </h1>
        <div
          className="partner1-grid mb-10"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <PartnerCard1 image="/images/LandingPage/Partner/BoutiqueHotel.png" />
          <PartnerCard1 image="/images/LandingPage/Partner/PondokSebatu.png" />
          <PartnerCard1 image="/images/LandingPage/Partner/BeachHotel.png" />
        </div>
      </div>

      <ServicenScheduleCard />

      <TestimonialSection />
      <PartnerSection />

      <Footer />
    </div>
  );
};

export default LandingPage;