import "../../../styles/LandingPage/HomePage/HeroSection.css";
import CardForm from "./CardForm/CardForm";

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url('/images/LandingPage/HeroSection/landingpage2.jpg')` }}
    >
      <div className="max-w-7xl mx-auto mt-10 px-6 flex flex-col md:flex-row justify-between gap-6 md:gap-4 py-10 md:py-20">
        <div className="hidden md:block" style={{ maxWidth: "900px" }}>
          <p className="playfair text-7xl/25 font-bold text-left text-white py-5 ml-5">
            Discover <br />
            the 
            beauty places 
            around the world
          </p>
        </div>
        <div className="w-full md:w-auto ">
          <CardForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;