import Navbar from "../../components/LandingPage/Navbar";
import Footer from "../../components/LandingPage/Footer";
import HeroSection from "../../components/LandingPage/HeroSection";
import DestinationCard from "../../components/LandingPage/DestinationCard";
import "../../components/LandingPage/DestinationCard.css";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="hero-container">
      <HeroSection />
      <div className="destination-grid" style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          <DestinationCard
        country="Indonesia"
        title="Eastern Bali Tour"
        destinations="4 Destination"
        price="1,200,000"
        image="/images/EasternBaliTour.png"
          />
          <DestinationCard
        country="Vietnam"
        title="Danang"
        destinations="4 Destination"
        price="1,200,000"
        image="/images/Danang.png"
          />
          <DestinationCard
        country="Indonesia"
        title="Jakarta"
        destinations="4 Destination"
        price="1,200,000"
        image="/images/Jakarta.png"
          />
          <DestinationCard
        country="Vietnam"
        title="Ho Chi Minh City"
        destinations="4 Destination"
        price="1,200,000"
        image="/images/HoChiMinhCity.png"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;