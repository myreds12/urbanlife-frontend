import "../../../styles/LandingPage/HomePage/HeroSection.css";
import CardForm from "./CardForm";

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url('/images/landingpage.jpg')` }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 md:gap-10 py-10 md:py-20">
        <div className="hidden md:block" style={{ maxWidth: "650px" }}>
          <p className="playfair text-7xl/23 font-bold text-left text-white">
            Discover the beauty places around the world
          </p>
        </div>
        <div className="w-full md:w-auto">
          <CardForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;