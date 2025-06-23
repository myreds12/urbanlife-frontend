import "../../styles/LandingPage/HeroSection.css";
import CardForm from "./CardForm";

const HeroSection = () => {
  return (
    <div
      className="hero-section justify-between gap-40"
      style={{ backgroundImage: `url('/images/landingpage.jpg')` }} // langsung dari public
    >
      <div style={{ maxWidth: "650px" }}>
        <p className="text-7xl/23 font-bold text-left text-white">
          Discover the beauty places around the world
        </p>
      </div>
      <div>
        <CardForm />
      </div>
    </div>
  );
};

export default HeroSection;
