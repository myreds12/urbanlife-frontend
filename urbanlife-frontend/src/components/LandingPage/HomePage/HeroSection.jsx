import "../../../styles/LandingPage/HomePage/HeroSection.css";
import CardForm from "./CardForm";
import DestinationCard from "./DestinationCard";

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url('/images/landingpage.jpg')` }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 md:gap-1 py-10 md:py-20">
        <div className="hidden md:block" style={{ maxWidth: "650px" }}>
          <p className="playfair text-7xl/23 font-bold text-left text-white">
            Discover the beauty places around the world
          </p>
        </div>
        <div className="w-full md:w-auto">
          <CardForm />
        </div>
      </div>
      <div
        className="destination-grid mb-15"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
          padding: "0 20px",
        }}
      >
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
  );
};

export default HeroSection;