import "../../styles/LandingPage/HeroSection.css";
import backgroundImage from '../../../public/images/landingpage.jpg';
import CardForm from "./CardForm";

const HeroSection = () => {
  return (
    <>
    <div className="hero-section" style={{ backgroundImage: url(${backgroundImage}) }}> 
<CardForm />
    </div>
    </>
  );
};

export default HeroSection;