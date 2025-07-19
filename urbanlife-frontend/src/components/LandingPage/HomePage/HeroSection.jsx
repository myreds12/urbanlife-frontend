import "../../../styles/LandingPage/HomePage/HeroSection.css";
import CardForm from "./CardForm/CardForm";

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url('/images/LandingPage/HeroSection/landingpage2.jpg')` }}
    >
      <div className="max-w-7xl mx-auto mt-10 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-16 lg:gap-50 py-10 md:py-20">

        {/* Teks Desktop */}
        <div className="hidden md:block" style={{ width: "60%" }}>
          <p className="playfair text-7xl/25 font-bold text-left text-white py-5 ml-5">
            Discover <br />
            the beauty places <br />
            around the world
          </p>
        </div>

        {/* CardForm */}
        <div
          className="w-full md:w-auto"
          style={{ minWidth: "350px", maxWidth: "400px", flexShrink: 0 }}
        >
          <CardForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
