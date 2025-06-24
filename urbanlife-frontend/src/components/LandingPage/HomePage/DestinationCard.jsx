import { Link } from "react-router-dom";
import "../../../styles/LandingPage/HomePage/DestinationCard.css";

const DestinationCard = ({ country, title, destinations, price, image }) => {
  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={image} alt={title} />
        <div className="country-label">{country}</div>
        <div className="heart-icon"></div>
        <Link to="/book" className="book-btn">
          Book now <span className="arrow"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>
 </span>
        </Link>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="destinations">{destinations}</p>
        <p className="price">From Rp {price}</p>
      </div>
    </div>
  );
};

export default DestinationCard;