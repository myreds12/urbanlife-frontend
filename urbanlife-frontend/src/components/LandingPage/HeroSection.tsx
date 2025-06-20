import "../../styles/LandingPage/HeroSection.css";
import backgroundImage from '../../../public/images/landingpage.jpg';
import CardForm from "./CardForm";

const HeroSection = () => {
  return (
    <>
    <div className="hero-section justify-between gap-40" style={{ backgroundImage: `url(${backgroundImage})` }}> 
      <div style={{ maxWidth: "650px", margin: "" }}>
        <p className="text-7xl/23 font-bold text-left ">
          Discover the beauty places around the world
        </p>
      </div>
      <div className="">
        <CardForm />
      </div>
    </div>
    </>
  );
};

export default HeroSection;