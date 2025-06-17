import Navbar from "../../components/LandingPage/Navbar";
import HeroSection from "../../components/LandingPage/HeroSection";
import DestinationCard from "../../components/LandingPage/DestinationCard";
import "../../components/LandingPage/DestinationCard.css";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <section className="py-10">
        <h2 className="text-2xl font-bold text-center mb-6">Destination</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
          <DestinationCard
            title="Eastern Bali Tour"
            price="1,200,000"
            image="/images/EasternBaliTour.png"
          />
          <DestinationCard
            title="Danang"
            price="1,200,000"
            image="/images/Danang.png"
          />
          <DestinationCard
            title="Jakarta"
            price="1,200,000"
            image="/images/Jakarta.png"
          />
          <DestinationCard
            title="Ho Chi Minh City"
            price="1,200,000"
            image="/images/HoChiMinhCity.png"
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;