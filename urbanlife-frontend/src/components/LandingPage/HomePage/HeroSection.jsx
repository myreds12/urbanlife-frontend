import "../../../styles/LandingPage/HomePage/HeroSection.css";
import CardForm from "./CardForm";

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url('/images/landingpage.jpg')` }}
    >
      {/* Tambahkan container biar sejajar dengan navbar */}
      <div className="max-w-7xl mx-auto px-4 flex justify-between gap-10 py-20">
        <div style={{ maxWidth: "650px" }}>
          <p className="playfair text-7xl/23 font-bold text-left text-white">
            Discover the beauty places around the world
          </p>
        </div>
        <div>
          <CardForm />
        </div>
      </div>
    </div>
  );
};


export default HeroSection;
