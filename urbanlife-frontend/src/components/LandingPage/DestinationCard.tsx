import { Link } from "react-router-dom";

const DestinationCard = ({ country, title, destinations, price, image }: { country: string; title: string; destinations: string; price: string; image: string }) => {
  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={image} alt={title} />
        <div className="country-label">{country}</div>
        <div className="heart-icon"></div>
        <Link to="/book" className="book-btn">
          Book now <span className="arrow">→</span>
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