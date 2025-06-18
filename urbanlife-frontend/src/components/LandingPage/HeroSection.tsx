import "../../styles/LandingPage/HeroSection.css";
import backgroundImage from '../../../public/images/landingpage.jpg';
import CardForm from "./CardForm";

const HeroSection = () => {
  return (
    <>
    <div className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>      {/* Konten hero, misal teks atau button */}
<CardForm />
    </div>
    </>
  );
};

export default HeroSection;