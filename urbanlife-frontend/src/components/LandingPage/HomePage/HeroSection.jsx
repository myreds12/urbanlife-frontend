import "../../../styles/LandingPage/HomePage/HeroSection.css";
import CardForm from "./CardForm/CardForm";

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url('/images/LandingPage/HeroSection/landingpage2.jpg')` }}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-6 lg:gap-45 py-8 sm:py-12 lg:py-20 min-h-screen">

        {/* Hero Text - Only visible on desktop */}
        <div className="hidden lg:block flex-1 max-w-2xl">
          <h1 className="playfair text-4xl sm:text-5xl lg:text-7xl font-bold text-left text-white leading-tight">
            Discover <br />
            the beauty places <br />
            around the world
          </h1>
        </div>

        {/* CardForm - Full width on mobile, fixed width on desktop */}
        <div className="w-full lg:w-auto lg:min-w-[400px] lg:max-w-[400px] flex-shrink-0 cardform">
          <CardForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;