import Navbar from "../../components/LandingPage/Navbar";
import Footer from "../../components/LandingPage/Footer";
import HeroSection from "../../components/LandingPage/HeroSection";
import DestinationCard from "../../components/LandingPage/DestinationCard";
import "../../components/LandingPage/DestinationCard.css";
import CategoriesCard from "../../components/LandingPage/CategoriesCard";
import "../../components/LandingPage/CategoriesCard.css";
import DiscoverCard from "../../components/LandingPage/DiscoverCard";
import "../../components/LandingPage/DiscoverCard.css";


const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="hero-container">
        <HeroSection />
        <div
          className="destination-grid mb-10"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            flexWrap: "wrap",
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

        <div>
          <h1 className="text-2xl font-semibold ml-27 mb-5"> Popular Categories </h1>
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

        <div>
          <h1 className="text-2xl font-semibold ml-27 mb-5"> Discover All Around </h1>
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
              desc="4 Destination"
              image="/images/EasternBaliTour.png"
            />
            <DiscoverCard
              country="Vietnam"
              city="2 Cities"
              desc="1 - 4 hours"
              image="/images/Alphard.png"
            />
            <DiscoverCard
              country="Indonesia"
              city="1 City"
              desc="Single Bed"
              image="/images/fourteenroses.png"
            />
          </div>
        </div>




      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
