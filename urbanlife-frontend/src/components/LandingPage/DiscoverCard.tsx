import { Link } from "react-router-dom";
import "../../components/LandingPage/DiscoverCard.css";


const DiscoverCard = ({ country, city, desc, image }: { country: string; city: string; desc: string; image: string }) => {
  return (
    <>
      <div className="discover-card">
          <div className="image-discover">
            <img src={image} alt={city} />
            <div className="country-discover">{country}</div>
          </div>
          <div className="body-discover">
            <h2 className="title-discover">{city}</h2>
            <p className="desc-discover">{desc}</p>
          </div>
      </div>

    </>
  );
};

export default DiscoverCard;