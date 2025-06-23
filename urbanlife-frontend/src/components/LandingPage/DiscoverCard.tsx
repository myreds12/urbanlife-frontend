import { Link } from "react-router-dom";
import "../../components/LandingPage/DiscoverCard.css";


const DiscoverCard = ({ country, city, desc, image }: { country: string; city: string; desc: string; image: string }) => {
  return (
    <>
<div className="discover-card">
      <div className="image-container">
        <img src={image}/>
        <div className="description">
          <div className="country-title">{country}</div>
          <h2 className="city-title">{city}</h2>
          <p className="desc-text">{desc}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default DiscoverCard;